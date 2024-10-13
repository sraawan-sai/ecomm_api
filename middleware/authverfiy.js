const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req,res,next)=>{
const token = req.header('Authorization').split(' ') [1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required.' });
      }
      try{ 
        const decoded= jwt.verify(token,process.env.SECRET)
        console.log(decoded)
        req.userId = decoded.userId
        next() ;
    }catch (err){
        return res.status(401).json({ message: 'Invalid token.' });
    }
    
}

module.exports = verifyToken