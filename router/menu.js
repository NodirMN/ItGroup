const { Router } = require("express");
const auth = require("../middleware/auth");
const menu = require("../model/menu");
const Menu = require("../model/menu");
const router = Router();


router.get("/",auth, async(req,res) => {   
        let menu = await Menu.find().lean()
            categmenuories = menu.map(menu =>{
            menu.status = menu.status == 1
                ? '<span class="badge bg-success">Faol</span>'
                : '<span class="badge bg-danger">Faol emas</span>'; 
            menu.menu = menu.menu == 1
                ? '<span class="badge bg-success">Ha</span>'
                : '<span class="badge bg-danger">Yo`q</span>'; 
            })
        res.render('menu/index',{
            isMenu:true,
            menu,
            title:"Menyu ro'yhati"
        })


});

router.get('/get/:id',auth,async(req,res)=>{
        let _id = req.params.id
        let menu = await Menu.findOne({_id}).lean()
        res.send(menu)

})

router.get('/menu/:id',auth,async(req,res)=>{
    try {
        let _id = req.params.id
        let menu = await Menu.findOne({_id})
        menu.menu = menu.menu == 1 ? 0:1
        await menu.save()
        res.redirect('/menu')
    } catch (error) {
        console.log(error);  
    }
})   

router.get("/status/:id", auth, async (req, res) => {
    try {
        let _id = req.params.id; 
        let menu = await Menu.findOne({ _id });
        menu.status = menu.status == 1 ? 0 : 1;
        await menu.save();
        res.redirect("/menu");
    } catch (error) {
        console.log(error);
    }
});

router.post("/save", auth, async (req, res) => {
        let { _id, title, status, menu, order } = req.body;
        status = status || 0;
        menu = menu || 0;
        await  Menu.findByIdAndUpdate(_id,{ title, status, menu, order });
        res.redirect("/menu");
});


router.get("/delete/:id",async(req, res) => {
        let _id = req.params.id
        await Menu.findByIdAndDelete({_id})
        res.redirect("/menu");
});

router.post('/',auth,async(req,res)=>{
    let {title,status,menu,order} = req.body
    status = status || 0;
    menu = menu || 0
    let newMenu = await Menu({ title, status, menu, order });
    await newMenu.save()
    res.redirect('/menu')
})


module.exports = router;
