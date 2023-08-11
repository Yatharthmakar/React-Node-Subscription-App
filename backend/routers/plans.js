const express = require('express');
const { getplan, getallplans, setplan, getuserplan, deleteuserplan } = require('../database/dbFunctions');

const router = express.Router();


router.post('/getuserplan', async(req, res)=>{
    try{
        console.log('getuserplan');
        const response = await getuserplan(req.body.data);
        res.json(response);
    }
    catch(err){
        console.log('getplan error', err);
    }
});

router.get('/getallplans', async(req, res)=>{
    try{
        console.log('getallplans');
        const response = await getallplans();
        res.json(response);
    }
    catch(err){
        console.log('getallplan error', err);
    }
});

router.post('/setplan', async(req, res)=>{
    try{
        console.log('setplan');
        const response = await setplan(req.body.data);
        res.sendStatus(200);
    }
    catch(err){
        console.log('setplan error', err);
    }
});

router.post('/getplan', async(req, res)=>{
    try{
        console.log('getplan');
        const response = await getplan(req.body.data);
        res.json(response);
    }
    catch(err){
        console.log('getplan error', err);
    }
});

router.post('/deleteuserplan', async(req, res)=>{
    try{
        console.log('deleteuserplan');
        const response = await deleteuserplan(req.body.data);
        res.sendStatus(200);
    }
    catch(err){
        console.log('getplan error', err);
    }
});

module.exports = router;