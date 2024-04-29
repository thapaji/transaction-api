import express from 'express'
const router = express.Router()

router.get('/',(req,res)=>{
    try{
        res.json({
            status:'success',
            message:'todo get'
        })
    }catch(error){
        res.json({
            status:'error'
        })
    }
})

router.post('/',(req,res)=>{
    try{
        res.json({
            status:'success',
            message:'todo get'
        })
    }catch(error){
        res.json({
            status:'error'
        })
    }
})


export default router;
