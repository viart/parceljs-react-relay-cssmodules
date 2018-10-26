import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Link } from 'react-router-dom';
import cx from 'classname';

import styles from './styles.css';

class Item extends Component {
  handleClick = () => {
    this.props.onClick(this.props.repository.id);
  }
  render() {
    const { repository, className } = this.props;
    const { id, name, description, owner } = repository;
    return (
      <div className={cx(styles.card, className)} onClick={this.handleClick}>
        <Link to={`/details/${id}`} className={styles.name}>{name}</Link>
        <div className={styles.description}>
          <img className={styles.avatar} src={owner.avatarUrl} />
          {description}
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  Item,
  graphql`
    fragment Item_repository on Repository {
      name
      id
      description
      owner {
        avatarUrl
      }
    }
  `
);
