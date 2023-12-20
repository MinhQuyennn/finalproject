const express = require("express")
const meetingRouter = express.Router();
const models = require('../models/meetingRequire');
const meetingController = require('../controller/meetingController')

meetingRouter.get("/meetingDemo" , meetingController.getAllDemo);
meetingRouter.post("/createMeeting" , meetingController.createMeeting);
meetingRouter.delete("/deleteMeeting/:id" , meetingController.deleteMeetingbyID);
meetingRouter.get("/getDatafromUserAndMeeting" , meetingController.getDatafromUserAndMeeting);
meetingRouter.put("/UpdateMeetingByID/:id" , meetingController.UpdateMeetingByID);
meetingRouter.get("/getByDate/:date" , meetingController.getByDate);
meetingRouter.get("/getAllBookingByUserID/:user_id" , meetingController.getAllBookingByUserID);


module.exports = meetingRouter;


