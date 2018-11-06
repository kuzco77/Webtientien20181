import React, { Component } from 'react';
import * as firebase from "firebase"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Button, Image, Well } from "react-bootstrap"
import FileUploader from "react-firebase-file-uploader";
import PropType from "prop-types"


class TeacherTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacherID: "",
            isUploading: false,
            progress: 0,
            showDeleteTeacherModal: false,
            idTeacherOfDeleteModal: ""
        }

        this.state.listTeachers = [];
        const columns = [{
            dataField: "idTeacher",
            text: "Mã Giáo Viên",
            headerStyle: {
                width: "5%",
            },
        }, {
            dataField: "name",
            text: "Tên Giáo Viên",
            headerStyle: {
                width: "7%",
            }
        }, {
            dataField: "school",
            text: "Trường",
            headerStyle: {
                width: "10%",
            }
        }, {
            dataField: "achievement",
            text: "Thành Tựu",
            headerStyle: {},
            editor: {
                type: "textarea",

            },
            editorStyle: {
                height: "120px"
            },
            
        }, {
            dataField: "phoneNumber",
            text: "Số Điện Thoại",
            headerStyle: {
                width: "10%",
            }
        }, {
            dataField: "gmail",
            text: "Gmail",
            headerStyle: {
                width: "10%",
            },
            
        }, {
            dataField: "linkAvatar",
            text: "Avatar",
            headerStyle: {
                width: "12%",
            }
        }, {
            dataField: "Action",
            text: "Action",
            formatter: this.actionFormater,
            headerStyle: {
                width: "7%",
            },
        }];

        columns.forEach((value, index) => {

            value.editor = {
                type: "textarea",
            }

            Object.assign(value.headerStyle, { textAlign: "center" })
            value.editable = !(value.dataField === "linkAvatar" || value.dataField === "Action") && this.props.isSignedIn

        })

        this.state.columns = columns
    }

    

    actionFormater = (cell, row, rowIndex, formatExtraData) => {
        return <div style={{ margin: "auto auto" }}>
            <Button style={{ marginTop: "50%" }} bsStyle="danger" onClick={this.props.onDeleteTeacher(row.idTeacher)}>Delete</Button>

        </div>
    }


    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = (row) => (filename) => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(this.setAvatarLink.bind(this, row));
    };

    setAvatarLink = (row, url) => {
        console.log(url, row)
        const teacherIDRef = firebase.database().ref().child("ListTeacher").child(row["idTeacher"]).child("linkAvatar")
        teacherIDRef.set(url)
    }

    onHideDeleteTeacherModal = (event) => {
        this.setState({ showDeleteTeacherModal: false })
    }

    handleShowDeleteModal = (row) => (event) => {
        this.setState({
            showDeleteTeacherModal: true,
            idTeacherOfDeleteModal: row.idTeacher
        })
    }

    testFunction() {
        return new Promise((resolve, reject) => {
          resolve(["test1", "test2"]);
        });
      }

    async afterSaveCell(oldValue, newValue, row, column) {
        console.log(column.dataField, firebase.auth().currentUser.emailVerified);
        var dataField = column.dataField

        const [test1, test2] = await this.testFunction()
        console.log("sdfasdf")
        console.log("test ne: " + test1 + test2);
        
        
        if (oldValue !== newValue) {
            const teacherIDRef = firebase.database().ref().child("ListTeacher").child(row["idTeacher"]).child(dataField)
            teacherIDRef.set(newValue)

            const teacherInListClassRef = firebase.database().ref().child("ListClass").orderByChild("teacher/idTeacher").equalTo(row.idTeacher)
            teacherInListClassRef.once("value", (snaps) => {
                var updatedTeacherInClasses = {}
                snaps.forEach((snap) => {
                    updatedTeacherInClasses[snap.key+"/teacher/"+dataField] = newValue
                })
                snaps.ref.update(updatedTeacherInClasses, (error) => {
                    if (error) {
                        console.log("Co loi khi cap nhat thong tin giao vien: ", error.message)
                    } else {
                        console.log("Cap nhat thong tin giao vien thanh cong")
                    }
                })

            })
        }


    }

    render() {
        return (
            <BootstrapTable
                keyField="idTeacher"
                data={this.props.listTeachers}
                columns={this.state.columns}
                striped
                hover
                condensed
                cellEdit={cellEditFactory({
                    mode: 'dbclick',
                    afterSaveCell: this.afterSaveCell,
                    blurToSave: true
                })}
            />
        )
    }
}
export default TeacherTable;

TeacherTable.propTypes = {
    isSignedIn: PropType.bool.isRequired,
    onDeleteTeacher: PropType.func.isRequired,
    listTeachers: PropType.array.isRequired,
}