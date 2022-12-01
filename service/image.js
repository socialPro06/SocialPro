const firebaseAdmin = require("firebase-admin")
const { v4: uuidv4 } = require('uuid')
const { initializeApp, cert } = require('firebase-admin/app')
const { getStorage, deleteObject } = require('firebase-admin/storage')
const serviceAccount = require('../helper/socialpro-fe346-firebase-adminsdk-6khkq-ddc257aff7.json')
const fs = require('fs')
const path = require('path')

initializeApp({ credential: cert(serviceAccount) })

const bucket = getStorage().bucket('gs://socialpro-fe346.appspot.com/')

module.exports = {

    upload:  (image) => {
        return new Promise(async (res, rej) => {
            try {
                let media = []
                console.log('image',image)
                let uploaded = bucket.upload(image.path, {
                    public: true,
                    destination: `images/${Math.random() * 1000 + image.filename}`,
                    metadata: {
                        firebaseStorageDownloadTokens: uuidv4()
                    }
                })
                let data = await uploaded
                data = data[0]
                if (data) {
                    media.push({
                        mediaLink: data.metadata.mediaLink,
                        name: data.metadata.name
                    })
                    res({ status: 200, data: media })
                    console.log('image ..........', image)
                    fs.unlink(image.path, (err) => {
                        if (err) 
                            console.log("someError: ", err)
                    })
                }
                else {
                    rej({ status: 404, message: "something went wrong!!" });
                }
            } catch (err) {
                console.log("error ...", err);
                rej({ status: 500, error: err });
            }
        })
    },
    delete: async (file) => {
        return new Promise(async (res, rej) => {
            try {
                const deleted = await bucket.file(file).delete();
                if (deleted) {
                    res({ status: 200, data: "File Deleted Successfully!!" });
                } else {
                    rej({ status: 404, error: err });
                }
            } catch (err) {
                console.log("err...", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },
}