import express from 'express';
import { createStudent, getStudentList } from '../Controllers/Student.Controller.js';

const router = express.Router();

router.post('/createstudent', createStudent); // to create a student
router.get('/allstudentlist', getStudentList); //to get all student list


//                 -----------------> SEE MORE ROUTERS IN MENTOR ROUTER


export default router;
