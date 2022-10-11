const User = require('../models/users')

const userController = {
    getAll: async (req, res) => {
        try{
            const user = await User.find()
            return res.status(200).json(user)
        }
        catch(error){
            return res.status(500).json(error)
        }       
    },
    getUser: async (req, res) => {
        try{
            const user = await User.findById(req.params.userId)
            return res.status(200).json(user)

        }
        catch(error){
            return res.status(500).json(error)
        }
        
    },
    deleteUser: async (req, res) => {
        try{
            const user = await User.findById(req.params.userId)
            return res.status(200).json('delete successfully')
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    updateInfo: async(req, res) => {
        
        try{    
            // const userInfo = await new User.info
            const info ={
                name: req.body.name,
                liveIn: req.body.liveIn,
                comeFrom: req.body.comeFrom, 
                about: req.body.about,    
                avatarUrl: req.body.avatarUrl,
                theme: req.body.theme,  
            }

            const user = await User.findByIdAndUpdate(req.params.userId, 
            {info: info},
            {
                new: true,
                upsert: true // Make this update into an upsert
            })
            return res.status(200).json(user)
            
        }
        catch(error){
            return res.status(500).json(error)
        }
        
    },
    search: async(req, res) => {
        try {
         const data = await User.find({ 
           $or:[
                {
                    'info.name':{$regex : req.query.key}
                }

            ]
        })
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json('not found')
        }
    }

}

module.exports = userController