const express = require('express');
const modelpath = require('../models/users');

const router = express.Router(); //define router

router.post('/add',(request, response)=>{
    let newUser = new modelpath(request.body);
    newUser.save((err) => {
        if (err) {
            return response.status(400).json({error: err});
        }
        return response.status(200).json({success: "Saved successfully !"});
    });
});

module.exports = router;