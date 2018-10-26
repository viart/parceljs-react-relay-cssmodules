import React, { Fragment, Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import { connect, compose } from 'react-redux';

import debounce from '~/src/utils/debounce';

import { Button, SearchInput } from '~/src/Form';
import { Spinner } from '~/src/App';
import { List as ReposList, actions } from '~/src/Repos';
import { withEnvironment } from '~/src/utils/Relay';

import styles from './styles.css';
import octocat from './octocat.svg';

const gqlQuery = graphql`
  query SearchQuery ($query: String!, $first: Int) {
    ...List_root
  }
`;

class Search extends Component {
  handleQueryChange = (e) => {
    this.props.setQuery(e.target.value);
  }

  render() {
    const { environment, query, resetState } = this.props;
    return (
      <div>
        <Button className={styles.btn} onClick={resetState}>Reset App State</Button>
        <SearchInput
          placeholder="Search repo by name"
          defaultValue={query}
          onChange={this.handleQueryChange}
          className={styles.searchField}
          autoFocus
        />
        {query ? <QueryRenderer
          query={gqlQuery}
          environment={environment}
          variables={{ query, first: 20 }}
          render={({ error, props }) => {
            if (error) {
              return <ErrorContainer error={error}></ErrorContainer>;
            } else if (props) {
              return <ReposList root={props} />;
            }
            return <Spinner />;
          }} /> : <img src={octocat} className={styles.octocat} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.repos.query
});

const mapDispatchToProps = dispatch => ({
  setQuery: debounce(query => dispatch(actions.setQuery(query)), 400),
  resetState: () => dispatch(actions.resetState())
});

export default withEnvironment(connect(mapStateToProps, mapDispatchToProps)(Search));
