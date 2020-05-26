import mongoose from '../database/mongoose.db';

const { Schema } = mongoose;

const UserModel = {};

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('Users', userSchema);
//UserModel.User = User;

userSchema.set('toJSON', { virtuals: true });

UserModel.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

UserModel.list = (perPage, page) => new Promise((resolve, reject) => {
  User.find().limit(perPage).skip(perPage * page).exec((err, users) => {
    if (err) {
      reject(err);
    } else {
      resolve(users);
    }
  });
});

UserModel.findById = (id) => new Promise((resolve) => {
  User.findById(id).then((result) => {
    resolve(result);
  });
});
UserModel.findByEmail = (email) => {
  return User.find({email: email});
};

UserModel.findOne = (email) => new Promise((resolve) => {
  User.findOne({ email }).then((result) => {
    resolve(result);
  });
});
export default UserModel;
