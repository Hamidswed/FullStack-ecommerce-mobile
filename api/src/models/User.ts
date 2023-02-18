import mongoose,{Document} from "mongoose";

type UserDocument = Document &{
  firstName:string
  lastName:string
  email:string

}
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  
});

export default mongoose.model('User', UserSchema)
