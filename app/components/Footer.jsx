import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Login from './Login';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style= {{backgroundColor: '#ADD8E6'}}>This is the Footer Fix Me Later</div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = null

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Navbar);
