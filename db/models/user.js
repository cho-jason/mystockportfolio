const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // This getter will hide '.password' since functions are ignored when converting
    // to JSON. We don't to reveal password when sending User instance to client.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // This getter will hide '.salt' since functions are ignored when converting
    // to JSON. We don't to reveal salt when sending User instance to client.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    allowNull: false
  }
})

// INSTANCE METHODS
User.prototype.isPasswordCorrect = function(passwordInput) {
  return User.encryptPassword(passwordInput, this.salt()) === this.password()
}

// CLASS METHODS
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

// Hash password with salt so a different user with same password will still
// have a different encrypted value for password in the database.
User.encryptPassword = function(password, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(password)
    .update(salt)
    .digest('hex')
}

// HOOKS
const setSaltandPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltandPassword)
User.beforeUpdate(setSaltandPassword)

module.exports = User
