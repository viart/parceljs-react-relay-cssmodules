import React from 'react';

import EnvironmentContext from './EnvironmentContext';

export default function withEnvironment(Component) {
  return function WrappedComponent(props) {
    return (
      <EnvironmentContext.Consumer>
        {environment => <Component {...props} environment={environment} />}
      </EnvironmentContext.Consumer>
    );
  };
}
