const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Message = require('../models/Message')
const { IgnorePlugin } = require('webpack')
const bcryptSalt = 10

require('../configs/database')

let users = [
  {
    username: 'alice',
    email: 'hwek21@gmail.com',
    phone: '7896059877',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    messages:[{
      subject: "I need a new project manager",
      text: "please call me"
    }]
  },
  {
    username: 'bob',
    email: 'ed@ainomads.com',
    phone: '7896059877',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  },
]

let messages = [
  {
    userId: "1",
    email: "info@ainomads.com",
    subject: "testing dogecoin",
    text: "INVEST MORE",

  },
  {
    userId: "2",
    email: "ed@ainomads.com",
    subject: "buy some eth?",
    text: "INVEST MORE nad get rich",
  }
]



User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`)
    console.log(usersCreated.map(u => u._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

Message.deleteMany()
  .then(() => {
    return Message.create(messages)
  })
  .then(messagesCreated => {
    console.log(`${messagesCreated.length} messages created with the following id:`)
    console.log(messagesCreated.map(message => message._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

