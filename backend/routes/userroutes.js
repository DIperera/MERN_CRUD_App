const express = require('express');
const modelpath = require('../models/users');

const router = express.Router(); //define router

//add user
router.post('/add',(request, response)=>{
    let newUser = new modelpath(request.body);
    newUser.save((err) => {
        if (err) {
            return response.status(400).json({error: err});
        }
        return response.status(200).json({success: "Saved successfully !"});
    });
});
//get all users
router.get('/getuser',(request,response)=>{
    modelpath.find().exec((err,userdata)=>{
        if(err){
            return response.status(400).json({error: err});
        }
        return response.status(200).json({success: true, existingusers: userdata});
    });
});
//Update a user
router.put('/updateuser/:id',(request,response)=>{
    modelpath.findByIdAndUpdate(
        request.params.id,
        {$set:request.body},
        (err, userdata)=>{
            if(err){
                return response.status(400).json({error:err});
            }
            return response.status(200).json({success: "Updated Successfully"});
        }
    );
});
//delete a user
router.delete('/deleteuser/:id',(request,response)=>{
    modelpath.findByIdAndRemove(request.params.id).exec((err,deleteduser)=>{
        if(err){
            return response.status(400).json({error:err});
        }
        return response.status(200).json({message: "Delete Successful", deleteduser: deleteduser});
    });
});
module.exports = router;