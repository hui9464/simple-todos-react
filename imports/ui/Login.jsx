import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Accounts } from '../api/accounts.js';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            user: null,
        };
    }

    showAccounts() {
        console.log(Accounts);
    }

    handleSubmit(e) {
        e.preventDefault();
        const buttonId = e.target.id;
        console.log(buttonId);

        const account = ReactDOM.findDOMNode(this.refs.account).value.trim();
        const pwd = ReactDOM.findDOMNode(this.refs.password).value.trim();
        const user = Accounts.findOne({ 'account': account });

        switch (buttonId) {
            case "login":
                if (!user) {
                    console.log('账户不正确');
                    console.log(this.props.children.showTest());
                } else if (user.pwd == pwd) {
                    this.setState({
                        isLogin: true,
                        user: user,
                    });
                    this.props.login(user);
                    console.log('登录成功' + this.state.isLogin);
                } else {
                    console.log('密码不正确');
                }
                break;
            case "register":
                Meteor.call('accounts.insert', '', account, pwd);
                console.log("注册成功")
                break;
        }
    }

    renderLogin() {
        if (!this.state.isLogin) {
            return (
                <div>
                    <form action="" >
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                ref="account"
                                placeholder="请输入账户："
                            />
                        </div>
                        <div className="form-group help">
                            <input
                                className="form-control"
                                type="password"
                                ref="password"
                                placeholder="请输入密码："
                            />
                        </div>
                        <button
                            id="login"
                            type="button"
                            onClick={this.handleSubmit.bind(this)}
                            className="btn btn-default"
                        >登陆</button>
                        <button
                            id="register"
                            type="button"
                            onClick={this.handleSubmit.bind(this)}
                            className="btn btn-default"
                        >注册</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <p >{this.state.user.userName} </p>
                    {/* <p>{this.state.user._id}</p> */}
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {this.renderLogin()}
            </div>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('accounts');
    return {
        accounts: Accounts.find({}).fetch(),
    }
}, Login);