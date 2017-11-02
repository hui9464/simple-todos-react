import React, { Component } from 'react';
import PropTypes from 'prop-types'; //新版本prop-types独立出来
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

class Task extends Component {
    constructor(props) {
        super(props);
    }

    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('task.remove', this.props.task._id);
    }

    showBug() {
        console.log('ID：' + this.props.task._id);
    }

    componentDidMount() {
        // console.log(Tasks);
        this.showBug();
    }

    getId() {
        if(this.props.task._id._str) {
            return this.props.task._id._str;
        } else {
            return this.props.task._id;
        }
    }

    render() {

        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                
                <input 
                    type="checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                <span className="text">
                    {this.getId()}, 
                    {this.props.task.text}. 
                    {this.props.testString}
                </span>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    testString: PropTypes.string.isRequired,
};

export default Task;