const { MongoClient } = require("mongodb");
const mdbclient = new MongoClient(process.env.MONGO_URI);

const users = async () => {
    const result = await mdbclient.connect();
    const db = result.db('richpanel');
    return db.collection('users');
};

const plans = async () => {
    const result = await mdbclient.connect();
    const db = result.db('richpanel');
    return db.collection('plans');
};

const login = async (data)=>{
    if(!data.email || !data.password){
        return {'message': 'All fields are required'};
    }
    const db = await users();
    const response = await db.find({ "email": data.email, "password": data.password }).toArray();
    if(response.length!=0){
        return {'message': 'success'};
    }
    return {'message': 'Wrong Email/Password'};
}

const signup = async(data)=>{
    if(!data.name || !data.email|| !data.password){
        return {'message': 'All fields are required'};
    }
    const db = await users();
    const response = await db.find({ "email": data.email}).toArray();
    if(response.length!=0){
        return {'message': 'Email Already registered. Go to login page'};
    }
    await db.insertOne({"name": data.name, "email": data.email, "password": data.password, "plan": "null"})
    return {'message': 'success'};
}

const getuserplan = async(data)=>{
    const db = await users();
    const response = await db.find({ "email": data}).toArray();
    return {"plan": response[0]};
}

const getallplans = async()=>{
    const db = await plans();
    const response = await db.find().toArray();
    return {"plans": response};
}

const setplan = async(data)=>{
    const db = await users();
    db.updateOne({"email": data.email}, {$set: {"plan": {"name": data.plan, "period": data.period, "time":currentDate() }}})
}

const getplan = async(data)=>{
    const db = await plans();
    const response = await db.find({"name": data}).toArray();
    return {"plan": response[0]}
}

const deleteuserplan = async(data)=>{
    const db = await users();
    db.updateOne({"email": data}, {$set: {"plan": "null"}})
}

const currentDate = ()=>{
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

module.exports = { login, signup, getplan, getallplans, setplan, getuserplan, deleteuserplan }