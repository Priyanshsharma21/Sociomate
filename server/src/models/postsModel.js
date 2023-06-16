import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280 
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50 
      },
      user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  photo:{
    id : {
      type : String,
      required : true
  },
  secure_url : {
      type : String,
      required : true
  }
  },
  tags: {
    type: [String]
    }
}, { timestamps: true });

const Post = model('Post', postSchema);

export default Post;
