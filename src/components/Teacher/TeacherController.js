import React, { Component } from 'react';
import '../App.css';
import * as firebase from "firebase"
import "react-bootstrap-table-next"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap"
import 'cropperjs/dist/cropper.css';


const tooltip = <Tooltip id="modal-tooltip">Thêm Giảng Viên</Tooltip>;

class TeacherController extends Component {

  constructor() {
    super()
    this.state = {
       
    }
}

render() {
    

    return (
        <div>
            <div className="App">
                    <p>Trang web này dùng để quản lý TEACHER</p>
                    <TeacherTable
            isSignedIn={(firebase.auth().currentUser !== null)}
            onDeleteTeacher={this.onDeleteTeacher}
            listTeachers= {this.state.listTeachers}
          />
            </div>

        </div>

    )
}
}

export default TeacherController;
