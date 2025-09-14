const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
});

// To set strictQuery to false and prepare for Mongoose 7
mongoose.set('strictQuery', false);

// Or, to set strictQuery to true and suppress the warning
mongoose.set('strictQuery', true);


const UserModel = model('User', UserSchema);

module.exports = UserModel;