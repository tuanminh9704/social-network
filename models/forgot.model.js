const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 3600000 // Expiry time: 1 hour from createdAt
    }
});

// Đặt chỉ số TTL cho trường 'expiresAt' (đơn vị là giây)
forgotPasswordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 5 });

const ForgotPassword = mongoose.model(
    "ForgotPassword",
    forgotPasswordSchema,
    "forgot-password"
  );
  
  module.exports = ForgotPassword;
