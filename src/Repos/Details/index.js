import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import styles from './styles.css';

function Details({ repository: { name, description, owner } }) {
  return (
    <div className={styles.details}>
      <img src={owner.avatarUrl} />
      <h2>{owner.login}{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default createFragmentContainer(
  Details,
  graphql`
    fragment Details_repository on Repository {
      name
      description
      homepageUrl
      owner {
        avatarUrl
        login
      }
    }
  `
);
