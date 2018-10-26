import React, { Component } from 'react';
import cx from 'classname';

import styles from './styles.css';

class Input extends Component {
  inputRef = React.createRef()

  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { className, prefix, suffix, ...props } = this.props;
    return (
      <div className={cx(styles.field, className)}>
        {prefix}
        <input {...props} ref={this.inputRef} />
        {suffix}
      </div>
    );
  }
}

export default Input;
