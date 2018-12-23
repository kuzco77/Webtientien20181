import React, { Component } from 'react';
import { Button, Jumbotron } from "react-bootstrap"
import firebase from "firebase"
import ChangeTeacherIDView from '../ChangeTeacherIDView';
import ChangeClassIDView from '../ChangeClassIDView';
import firebaseui from 'firebaseui'
import moment from 'moment';

class RequestController extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {


        return (
            <div>
                <div className="App">
                    <p>Trang web này dùng để quản lý Đơn đăng ký mới</p>
                </div>
            </div>

        )
    }
}

export default RequestController;