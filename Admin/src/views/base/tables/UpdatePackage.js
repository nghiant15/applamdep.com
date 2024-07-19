import React, { Component } from 'react';

import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class UpdatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <div>
        COMMING SOON
      </div>
    );


  }
}

export default UpdatePackage;
