import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
    },
    userName: String,
    email: {
      type: String,
      uniqe: [true, 'email must be uniqe'],
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber is required'],
    },
    profileImg: String,
    address: {
      country: String,
      city: String,
      street: String,
      postalCode: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

// Hash User Password
userModel.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.userName = `${this.firstName} ${this.lastName}`;
  next();
});


userModel.post('init', (doc) => {
  doc.userName = `${doc.firstName} ${doc.lastName}`;
});


const User = mongoose.model('User', userModel);

export default User;
