import React, { Component } from 'react';
import '../App.css';
import * as firebase from "firebase"
import "react-bootstrap-table-next"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap"
import 'cropperjs/dist/cropper.css';
import AddTeacherModal from './AddTeacherModal';
import TeacherTable from './TeacherTable';
import NewHeader from "../Header/NewHeader"

const tooltip = <Tooltip id="modal-tooltip">Thêm Giảng Viên</Tooltip>;

class TeacherController extends Component {
// Phuong thuc khoi tao
  constructor() {
    super()
    this.state = {
      searchTeacherID: "",
      src: "http://braavos.me/images/posts/college-rock/the-smiths.png",
      selectedAvatarRow: null,
      isUploading: false,
      progress: 0,
      // Khong hien thi Frame them giao vien
      showAddTeacherModal: false,
      searchTeacherID: "",
      numberOfTeacher: 0,
    }
  }

  handleChangeValueBtn() {
    const rootRef = firebase.database().ref().child("react")
    const speedRef = rootRef.child("speed")
    speedRef.set(this.state.speed)

  }

  componentDidMount() {
    document.title = "Giảng viên"

    firebase.database().ref("Count/ListTeacher").on("value", (snapshot) => {
      this.setState({numberOfTeacher: snapshot.val()})
    })
// Khi nguoi dung dang nhap thanh cong, firebase se load du lieu ra man hinh
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
          console.log("User is sign in")
          // User is signed in.
          this.setState({user})
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
      } else {
          console.log("User is signed out")
          this.setState({user: {}})
      }
  });
  }

  handleIDTF = (event) => {
    const searchTeacherID = event.target.value
    this.setState({searchTeacherID: ""})
  }
// Bat su kien bam nut them, hien thi ra Frame them giao vien
  handleAddTeacherBtn = (event) => {
    this.setState({showAddTeacherModal: true,})
  }
// Bat su kien bam nut close, tat di Frame them giao vien
  handleClose = (event) => {
    this.setState({showAddTeacherModal: false})
  }
// Bat su kien tim kiem giao vien
  handleSearchTeacher = (event) => {
    this.state.searchTeacherID = event.target.value
  }
// Ket xuat noi dung HTML de hien thi tren trang web
  render() {
    return (
      <div>
        {/* <NewHeader/> */}
        <form className="App">
        // Label hien thi 
          <p className="App-intro">
            Nhấp đúp vào ô muốn chỉnh sửa . Is signedIn {this.state.user != 0} <br></br>
            Số người dạy: {this.state.numberOfTeacher}
          </p>

        // Nut bam them giao vien, hien thi ra dau +  
          <OverlayTrigger placement="right" overlay={tooltip}>
            <Button style={{width: "100px", marginRight: "10px"}} bsStyle="success" onClick={this.handleAddTeacherBtn}>+</Button>
          </OverlayTrigger>
        // Frame them giao vien
          <AddTeacherModal show={this.state.showAddTeacherModal} onHide={this.handleClose} />
        // Bang danh sach giao vien
          <TeacherTable searchTeacherID={this.state.searchTeacherID} isSignedIn={(this.state.user != null)}/>
        </form>
      </div>

    );
  }
}

export default TeacherController;
