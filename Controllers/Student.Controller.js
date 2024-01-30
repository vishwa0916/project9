import StudentModel from '../Models/Student.Schema.js';

export const createStudent = async (req, res) => {
  try {
    const studentDetails = await StudentModel.create(req.body);
    console.log(studentDetails);
    res.status(201).json({ message: 'Student created successfully', data: studentDetails });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Error in creating student', error });
  }
};

// Get Student List
export const getStudentList = async (req, res) => {
  try {
    const Students = await StudentModel.find();
    res.status(200).json({ message: 'Student list fetched successfully', data: Students });
  } catch (error) {
    console.error('Error listing Students:', error);
    res.status(500).json({ message: 'Error in listing Students', error });
  }
};
