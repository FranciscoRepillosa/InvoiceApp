const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");
const Invoice = require("../../invoice/model/invoice.model");
/*
const ldapClient = require("../../utils/ldapClient"); */

exports.showCoinFer = async (req, res) => {
    try {

        res.render("user/coinfer");

    } catch (error) {
        res.send(error)
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            users
          })
          
    } catch (error) {
        res.send(error)
    }
}

exports.getSignupForm = async (req, res) => {
    try {

        res.render("user/signup");

    } catch (error) {
        res.send(error)
    }
}

exports.getLoginForm = async (req, res) => {
    try {
        res.render("user/login");
    } catch (error) {
        res.send(error)
    }
}


exports.test = async (req, res) => {
    console.log("enter");
    try {
        res.render("user/newCompany");
    } catch (error) {
        res.send(error)
    }
}

exports.grtHomePage = async (req,res) => {
    res.render('homepage.pug')
}

exports.changeUserRole = async (req,res) => {

    const user = await User.findOne({userName: req.body.userName});
    console.log('user from',user);
    console.log(req.body.newRole);
    user.role = req.body.newRole;
    console.log(user.role);
    const updatedUSer = await user.save();
    console.log(updatedUSer);
    res.status(200).json({
        status: "success",
        updatedUSer
    })
}

exports.renderChangeRolePage = async (req, res) => {
    res.render('user/changeRole.pug')
}

exports.showClients = async (req, res) => {

    res.render('user/myClients.pug', {clients: req.user.clients})
}

exports.showClient = async (req, res) => {

    const client = req.user.clients.find((client) => {
        return client._id == req.params.id
    })

    const ClientInvoices = Invoice.find({userThatHasToPayEmail: client.email})

    res.render('user/myClient.pug', {client, ClientInvoices})
}




// exports.updateUsersDb = async (req, res) => {
    
//     const localUsers = await User.find();
//     const usersInDirectoty = await ldapClient.getUsers();

//     let localUsersObj = {};
    
//     localUsers.forEach((user) => {
//         localUsersObj[user.userName] = {userName: user.userName, password: user.password, role: user.role}
//     })

//     usersInDirectoty.forEach(async (user) => {

//         if(!localUsersObj[user.userName]) {
//             console.log(user.userName, " doesn''t exist in db");
//             const newUser = await User.create({ userName: user.userName, password: user.password})
//             console.log("new user", newUser);
//         }

//         if (localUsersObj[user.userName]) {
//             console.log(localUsersObj[user.userName].userName, localUsersObj[user.userName].role ," exist in db");
//             delete localUsersObj[user.userName]
//         }
//     })

//     for (remainingUsers in localUsersObj) {
//         console.log(localUsersObj[remainingUsers].userName, " exist in db but not in the directory so... bye");
//         const newUser = await User.deleteOne({userName: localUsersObj[remainingUsers].userName})
//     }
    
// }