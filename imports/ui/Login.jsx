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
            
        };
    }

    showAccounts() {
        console.log(Accounts);
    }

    handleSubmit(e) {
        e.preventDefault();
        const account = ReactDOM.findDOMNode(this.refs.account).value.trim();
        const pwd = ReactDOM.findDOMNode(this.refs.password).value.trim();
        const user = Accounts.findOne({'account': account});
        if(!user) {
            console.log('账户不正确');
        } else if(user.pwd == pwd) {
            console.log('登录成功');
        } else {
            console.log('密码不正确');
        }
    }


    render() {
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
                        type="button"
                        onClick={this.handleSubmit.bind(this)}
                        className="btn btn-default"
                    >登陆</button>
                </form>
            </div>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('accounts');
    return {
        accounts: Accounts.find({}).fetch(),
    }
}, Login) ;