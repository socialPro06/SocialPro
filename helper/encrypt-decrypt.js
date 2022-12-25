const cryptojs = require('crypto-js')
require("dotenv").config();

function encrypt(text,key){
    if(text)
        return cryptojs.AES.encrypt(JSON.stringify(text),key.trim()).toString()
}    
function decrypt(text,key){
    if(text)
        return JSON.parse(cryptojs.AES.decrypt(text,key. trim()).toString(cryptojs.enc.Utf8))
}    


module.exports = {encrypt,decrypt};