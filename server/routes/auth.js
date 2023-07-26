const router = require("express").Router()
const passport = require("passport")


router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Succesfully logged in",
            user:req.user,
        });
    }
    else{
        res.status(404).json({error:true,message:"Not authoried"})
    }
})


router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Failure while login",
    })
})
router.get(
    '/google/callaback',
    passport.authenticate("google",{
        successRedirect:process.env.CLINET_URL,
        failureRedirect:"/login/failed",
    })
)
router.get("/google",passport.authenticate("google",["profile","email"]))

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect(process.env.CLINET_URL);
});

module.exports = router;