import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Password es requerido']
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.password;
  }
})

export const UserModel = mongoose.model('User', userSchema);

