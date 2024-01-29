import  express  from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../model/Users.js";
const router =  express.Router()

router.post("/register",async(req,res)=>{
    const {username,password} = req.body;

    const user  = await UserModel.findOne({username});

    if(user) {
        return res.json({message:"User alreasy exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({username,password:hashedPassword})
    await newUser.save();
    console.log("userjs",newUser._id);
    const response = await fetch('http://localhost:3000/data/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: newUser._id }),
        });

        const dataFromCreateEndpoint = await response.json();

        console.log('Response from /create:', dataFromCreateEndpoint);

    res.json("User Created Successfully");


    // res.json(user);
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    try {
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json("User doesn't exist");
      }
      const id = user._id
      console.log(id);
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json("Username or password is incorrect");
      }
  
      const token = jwt.sign({ id: user._id }, "secret");
      res.json({ token, userID: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
    }
  });
  



export {router as userRouter};

export const verifyToken = (req,res,next) =>{
    const token  = req.headers.authorization
    if(token)
    {
        jwt.verify(token,"secret",(err)=>{
            if(err) return res.sendStatus(403);
            next();
        })
    }
        else{
                res.sendStatus(401)
        }
    
}

