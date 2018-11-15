import React, { Component } from 'react';
import '../App.css';
import * as firebase from "firebase"
import "react-bootstrap-table-next"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap"
import 'cropperjs/dist/cropper.css';
import AddTeacherModal from './AddTeacherModal';
import TeacherTable from './TeacherTable';
import DeleteTeacherModal from './DeleteTeacherModal';

const tooltip = <Tooltip id="modal-tooltip">Thêm Giảng Viên</Tooltip>;

class TeacherController extends Component {

  constructor() {
    super()
    this.state = {
      src: "http://braavos.me/images/posts/college-rock/the-smiths.png",
      selectedAvatarRow: null,
      isUploading: false,
      progress: 0,
      showAddTeacherModal: false,
      showDeleteTeacherModal: false,
      idTeacherDeleteModal: "",
      listTeachers: [],
    }
  }

  handleChangeValueBtn() {
    const rootRef = firebase.database().ref().child("react")
    const speedRef = rootRef.child("speed")
    speedRef.set(this.state.speed)

  }



  render() {
    return (
      <div>
        {/* <NewHeader/> */}
        <form className="App">

          <p className="App-intro">
            Nhấp đúp vào ô muốn chỉnh sửa . Is signedIn
          </p>


          <OverlayTrigger placement="right" overlay={tooltip}>
            <Button style={{ width: "100px", marginRight: "10px" }} bsStyle="success" onClick={this.handleAddTeacherBtn}>+</Button>
          </OverlayTrigger>

          <AddTeacherModal
            show={this.state.showAddTeacherModal}
            onHide={this.onHideAddTeacherModal} />

        </form>
      </div>

    );
  }
}

export default TeacherController;
