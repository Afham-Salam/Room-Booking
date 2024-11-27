const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register=async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        const hassedPassword=await bcrypt.hash(password,8);
        const newuser=new User({name,email,password:hassedPassword})
        await newuser.save();
        res.status(201).json({message:'User registered successfully'})
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
          }
          const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
          res.json({ token });
          
          console.log(token)
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }

}