import User from '../models/User';
import Owner from '../models/Owner';

export const getProfile = async (req,res) =>{
    try{
        const owner = await Owner.findById(req.User._id);
        if(!owner){
            return res.status(400).json({message:"No ownerId found!"});
        }

        return res.status(200).json({message:"Profile fetched successfully!", owner});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}