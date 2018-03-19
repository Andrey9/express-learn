import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel } from '../interfaces/models/IUser';


const encryptPassword = (password: string) => {
  return bcrypt.genSalt(8)
    .then(salt => bcrypt.hash(password, salt));
};

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  userInfo: {
    firstName: String,
    lastName: String,
    phone: String,
    birthDate: Date,
    avatar: String
  }
},                        { timestamps: true });

schema.methods.comparePass = async function (password: string) {
  return bcrypt.compare(password, this.password);
};


schema.pre('save', async function (this: IUserModel, next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await encryptPassword(this.password);
  next();
});

export default model<IUserModel>('User', schema);
