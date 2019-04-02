import React, { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div className={`${styles['Header']} ${styles[this.props.currentPage]}`}>
        <p>header</p>
      </div>
    );
  }
}

export default Header;
