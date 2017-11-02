import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Accounts = new Mongo.Collection('accounts');

if(Meteor.isServer) {
    Meteor.publish('accounts', function accountsPublication() {
        return Accounts.find();
    })
}

Meteor.methods({
    'accounts.insert'(userName, account, pwd) {
        check(account, String);
        check(pwd, String);
        check(userName, String);

        Accounts.insert({
            account,
            pwd,
            userName,
            createdAt: new Date(),
        })
    },
    'accounts.findOne'(account) {
        check(account, String);

        Accounts.findOne({'account': account});
    },
});