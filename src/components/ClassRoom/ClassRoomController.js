import React, { Component } from 'react';
import '../App.css';
import * as firebase from "firebase"
import "react-bootstrap-table-next"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import 'cropperjs/dist/cropper.css';

const tooltip = <Tooltip id="modal-tooltip">Thêm Lớp Học</Tooltip>;

class ClassRoomController extends Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {


    return (
      <div>
        <div className="App">
          <p>Trang web này dùng để quản lý CLASS</p>
        </div>
      </div>

    )
  }
}

export default ClassRoomController;
