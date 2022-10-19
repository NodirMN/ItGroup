const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Menu =require('../model/menu')

router.get('/dashboard',auth,(req,res)=>{
    res.render('pages/dashboard',{
        isHome:true,
    })
})

router.get("/", async(req, res) => {
    let menu = await Menu.find({status:1}).sort({order:1}).lean()
    res.render("pages/index",{
        layout:'front',
        title:'Home page',
        active:true,
        menu   
    });  
});


router.get("/about", async (req, res) => {
        res.render("pages/about", {
        layout: "front",
        title: "About",
        about: true,
        });
});


router.get("/portfolio", async (req, res) => {
    res.render("pages/portfolio", {
      layout: "front",
      title: "Portfolio",
      portfolio: true,
    });
});

router.get("/contact", async (req, res) => {
  res.render("pages/contact", {
    layout: "front",
    title: "Contact",
    contact: true,
  });
});
module.exports = router  