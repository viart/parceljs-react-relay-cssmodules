import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import SearchPage from '~/src/Pages/Search';
import DetailsPage from '~/src/Pages/Details';

export default function () {
  return (
    <Fragment>
      <Route exact path="/" component={SearchPage} />
      <Route path="/details/:id" component={DetailsPage} />
    </Fragment>
  );
}
