/* eslint-disable no-console */
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";
import multer from "multer";

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
  secure: true,
});
export const sendImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // delete a file asynchronously
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
            }
            // file removed
            console.log(`${path} is deleted`);
          });
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
