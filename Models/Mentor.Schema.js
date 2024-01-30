import mongoose from 'mongoose';

const MentorSchema = mongoose.Schema({
  MentorName: String,
  Students: String,
});

const MentorModel = mongoose.model('MentorModel', MentorSchema);

export default MentorModel;
