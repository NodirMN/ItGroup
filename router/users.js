const {Router} = require('express');
const router = Router()
const Users = require('../model/users');
const bcrypt = require("bcrypt");


router.get('/login',async(req,res)=>{
    res.render("users/login", {
        title: "Please Sign-in to your account.",
        layout: "no-head", 
        success: req.flash("success"),
        error: req.flash("error"),
    });  
    
})

router.get("/reg", async (req, res) => {
    res.render("users/reg", {
        title: "Enter your details to create your account",
        layout: "no-head",
    });  
    
});


router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/users/login");
  });
});

router.post("/login", async (req, res) => {
    let { login, password } = req.body;
    let checkUser = await Users.findOne({ login }).lean();
    if (checkUser) {
      let comparePass = await bcrypt.compare(password, checkUser.password);
      if (comparePass) {
        req.session.isAuthed = true;
        req.session.user = checkUser;
        req.flash("success", "Tizizmga kirdingiz");
        res.redirect("/dashboard");
      } else {
        req.flash("error", "Hatolik yuzaga keldi");
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/login");
    }
});
///////////////////////////////////////////
router.get("/check/:login", async (req, res) => {
    let login = req.params.login;
    let checkLogin = await Users.findOne({ login });
    if (checkLogin) {
        res.send(true);
    }else{
        res.send(false)
    }
});



router.post('/reg', async(req, res) => {
    let {login,password,name} = req.body
    const checkUser = await Users.findOne({login}).lean()
    if (checkUser) {
        req.flash('error','This is user olerady token')
        res.redirect('/users/reg')
    }else{
        let hashpass = await bcrypt.hash(password,6)
        let user = await new Users({login,password:hashpass,name})
        await user.save()       
        res.redirect('/users/login')
    } 
});  
    

module.exports = router;