const mongoose = require('mongoose');
//const {Schema,model} = mongoose;

const PostSchema = new mongoose.Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

// To set strictQuery to false and prepare for Mongoose 7
mongoose.set('strictQuery', false);

// Or, to set strictQuery to true and suppress the warning
mongoose.set('strictQuery', true);

// ... the rest of your Mongoose configuration and code

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;