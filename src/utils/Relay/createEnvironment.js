import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';

const oneMinute = 60 * 1000;
const cache = new RelayQueryResponseCache({ size: 250, ttl: oneMinute });

// Pretty naive cache implementation
// https://facebook.github.io/relay/docs/en/network-layer.html#caching

const createFetcher = ({ GQLEndpoint, token }) => async (
  operation,
  variables,
  cacheConfig,
) => {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;

  // Try to get data from cache on queries
  const fromCache = cache.get(queryID, variables);
  if (
    isQuery
    && fromCache !== null
    && !forceFetch
  ) {
    return fromCache;
  }

  // Otherwise, fetch data from server
  return fetch(GQLEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(
    response => response.json()
  ).then((json) => {
    // Update cache on queries
    if (isQuery && json) {
      cache.set(queryID, variables, json);
    }
    // Clear cache on mutations
    if (isMutation) {
      cache.clear();
    }

    return json;
  });
};

export default config => new Environment({
  network: Network.create(createFetcher(config)),
  store: new Store(new RecordSource())
});
