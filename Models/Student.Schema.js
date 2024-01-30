import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema({
  StudentName: String,
  Subject: String,
  Mentor: String,
  PreviousMentor: String
});

const StudentModel = mongoose.model('StudentModel', StudentSchema);

export default StudentModel;
