const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
const text = 'I love cupcakes'
const key = uuidv4();

const value=crypto.createHmac('sha256', key)
  .update(text)
  .digest('hex')

  console.log(value)