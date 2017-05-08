var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
var slugHero = require('mongoose-slug-hero');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var PostSchema = new Schema({
  title: {
    type: String
  },
  // image: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Image',
  // },
  content: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // comments: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Comment'
  // },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category'
  // },
  // tags: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Tag'
  // },
  public: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

PostSchema.plugin(slugHero, { field: 'title' });



module.exports = mongoose.model('Post', PostSchema);