import React, { Fragment } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import { Link } from 'react-router-dom';

import { withEnvironment } from '~/src/utils/Relay';
import { Spinner, ErrorContainer } from '~/src/App';
import { Button } from '~/src/Form';
import { Details } from '~/src/Repos';

import styles from './styles';

const query = graphql`
  query DetailsQuery ($id: ID!) {
    repository: node(id: $id) {
      ... on Repository {
        ...Details_repository
      }
    }
  }
`;

function DetailsPage({ environment, match: { params } }) {
  return (
    <Fragment>
      <Link to="/"><Button className={styles.btn}>Back</Button></Link>
      <QueryRenderer
        query={query}
        environment={environment}
        variables={params}
        render={({ error, props }) => {
          if (error) {
            return <ErrorContainer error={error}></ErrorContainer>;
          } else if (props) {
            return <Details {...props} />;
          }
          return <Spinner />;
        }} />
    </Fragment>
  );
}

export default withEnvironment(DetailsPage);
