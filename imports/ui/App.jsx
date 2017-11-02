import React, { Component } from 'react';
import PropTypes from 'prop-types'; //新版本prop-types独立出来
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import Login from './Login.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    showTest() {
        console.log(this.state.isLogin);
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        
        Meteor.call('tasks.insert', text);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    getTasks() {
        return [
            { _id: 1, text: '任务1' },
            { _id: 2, text: '任务2' }
        ]
    }

    mapTasks() {
        return this.getTasks().map((task) => (
            // <li key={task._id}>{task._id}, {task.text}</li>
            <Task key={task._id} task={task} testString='测试' />
        ));
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} testString='测试' />
        ));
    }

    render() {
        return (
            <div className="container">
                <div>
                     <button onClick={this.showTest.bind(this)} className="btn btn-block btn-primary">测试</button>
                </div>
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>
                    <div className="">
                        <Login />
                    </div>
                    <label className="hide-completed">
                        <input 
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="请输入task:"
                        />
                    </form>

                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
}, App);