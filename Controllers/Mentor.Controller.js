import mongoose from 'mongoose';
import MentorModel from '../Models/Mentor.Schema.js';
import StudentModel from '../Models/Student.Schema.js';

export const createMentor = async (req, res) => {
  try {
    const mentorDetails = await MentorModel.create(req.body);
     console.log(mentorDetails);
     await mentorDetails.save();

    res.status(201).json({ message: 'Mentor created successfully', data: mentorDetails });
  } catch (error) {
    console.error('Error creating mentor:', error);
    res.status(500).json({ message: 'Error in creating mentor', error });
  }
};

// Get Mentor List
export const getMentorList = async (req, res) => {
  try {
    const mentors = await MentorModel.find();
    res.status(200).json({ message: 'Mentor list fetched successfully', data: mentors });
  } catch (error) {
    console.error('Error listing mentors:', error);
    res.status(500).json({ message: 'Error in listing mentors', error });
  }
};



// Get Previous Mentor for a student

export const previousMentor = async (req, res) => {
  
  try {

const {StudentName} = req.body 

    const student = await StudentModel.find({StudentName});

      if(student) {   
        const preMentor = student[0]["PreviousMentor"];

    console.log(preMentor);
        return res.status(200).json({ message: 'Previous mentor found', data:preMentor});
    }
    
        return res.status(200).json({ message: 'Previous mentor not found'});


  } catch (error) {
    console.error('Error in previous mentor:', error);
    res.status(500).json({ message: "Error in previous mentor", error });
  }
};




// Assign Student to Mentor
export const assignStudentToMentor = async (req, res) => {
  const { StudentName, MentorName } = req.body;
  try {
    
    const mentor = await MentorModel.findOne({ MentorName: MentorName });
    if (!mentor) res.status(404).json({ message: "mentor not found please create mentor" });
    console.log(mentor);
    
    const Student = await StudentModel.findOne({ StudentName: StudentName });
    if (!Student) res.status(404).json({ message: "Student not found please create Student" });
  
    
    if (Student.Mentor == mentor.MentorName)
      return res.status(403).json({ message: "Mentor already assigned please enter alternate mentor name" });

    if(!Student.Mentor)
    {    const newMentor = await StudentModel.findOneAndUpdate(
      { StudentName: StudentName },
      { $set: { Mentor: mentor.MentorName } },
      { new: true }
    );
 
  return  res.status(200).json({ message: 'Student assigned to mentor successfully', data: newMentor });
}    


    const PrevNewMentorforStudent = await StudentModel.findOneAndUpdate(
      { StudentName: Student.StudentName },
      { $set: { PreviousMentor: Student.Mentor,Mentor:mentor.MentorName } },
      { new: true }
    );
    console.log("MentorforStudent>>>>>", PrevNewMentorforStudent);

    return    res.status(200).json({ message: 'Student assigned to mentor successfully', data: PrevNewMentorforStudent });


  } catch (error) {
    console.error('Error assigning student to mentor:', error);
    res.status(500).json({ message: 'Error in assigning student to mentor', error });
  }
};

//Assign Multiple student for one mentor

export const MultiStudForOneMen = async (req, res) => {
  
try {
  
  const { StudentsName, MentorName } = req.body;

  
    const mentor = await MentorModel.findOne({ MentorName: MentorName });
    if (!mentor) res.status(404).json({ message: "mentor not found please create mentor" });
    console.log(mentor);
  
  
  const UpdatedStudents = await StudentModel.updateMany({
    StudentName: {
      $in:StudentsName
    }
  }, {
    $set: {
      Mentor: mentor.MentorName
      }
  });


  if (UpdatedStudents.matchedCount!==0) {
      return    res.status(200).json({ message: 'Students assigned to mentor successfully',UpdatedStudents });
  }   else {
      return    res.status(404).json({ message: 'No Matching found for the students'});
    
}

} catch (error) {
  

    console.error('Error assigning student to mentor:', error);
    res.status(500).json({ message: 'Error in assigning multi student to one mentor', error });
}


}





// Get Students for a Particular Mentor
export const getStudentsForMentor = async (req, res) => {
  
  const { MentorName } = req.body;

  
  try {
  const students = await StudentModel.aggregate([
    {
      $match: {
        Mentor: MentorName,
      },
    },
    {
      $lookup: {
        from: "mentormodels",
        localField: "Mentor",
        foreignField: "MentorName",
        as: "mentorDetails",
      },
    }
  ]);

    console.log("students",students);

   res.status(200).json({ message: 'Students for mentor fetched successfully', data: students });
  } catch (error) {
    console.error('Error fetching students for mentor:', error);
    res.status(500).json({ message: 'Error in fetching students for mentor', error });
  }
};
