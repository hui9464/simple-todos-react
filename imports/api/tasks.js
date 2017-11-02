import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find();
    });
}

Meteor.methods({
    'tasks.insert'(text, owner, userName) {
        check(text, String);
        check(owner, String);
        check(userName, String);

        // if(!Meteor.userId()) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: owner,
            userName: userName,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);
     
        const task = Tasks.findOne(taskId);
     
        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }
     
        Tasks.update(taskId, { $set: { private: setToPrivate } });
      },

});
