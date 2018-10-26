import React from 'react';
import { connect } from 'react-redux';
import { graphql, createPaginationContainer } from 'react-relay';
import cx from 'classname';

import Item from '../Item';
import { toggleRepo } from '../actions';

import styles from './styles.css';

function List({ root, selected, handleClick }) {
  return (
    <ul className={styles.list}>
      {root.search.edges.map(({ node }) => (
        <Item
          key={node.__id}
          onClick={handleClick}
          className={cx(styles.item, selected.includes(node.__id) && styles.selected)}
          repository={node}
        />
      ))}
    </ul>
  );
}

const mapStateToProps = state => ({
  selected: state.repos.selected
});

const mapDispatchToProps = dispatch => ({
  handleClick: id => dispatch(toggleRepo(id))
});

export default createPaginationContainer(
  connect(mapStateToProps, mapDispatchToProps)(List),
  graphql`
    fragment List_root on Query {
      search(query: $query, first: $first, type: REPOSITORY) @connection(key: "List_search") {
        edges {
          node {
            ...Item_repository
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps: props => props.root.search,
    getFragmentVariables: (previousVars, first) => ({
      ...previousVars,
      first
    })
  }
);
