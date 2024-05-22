const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cấu hình tk mk 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Up ảnh lên cloud
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// trả về buffer
module.exports = async (buffer) => {
  let result = await streamUpload(buffer);
  return result;
}