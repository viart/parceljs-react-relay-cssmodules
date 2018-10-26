import React, { Component } from 'react';
import cx from 'classname';

import Input from '../Input';

import icon from './icon.svg';
import styles from './styles.css';

const PrefixIcon = <img className={styles.icon} src={icon} />;

class SearchInput extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <Input
        type="search"
        prefix={PrefixIcon}
        className={cx(styles.searchField, className)}
        {...props}
      />
    );
  }
}

export default SearchInput;
