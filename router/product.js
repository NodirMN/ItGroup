const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()
const Product = require('../model/product')
const Menu = require('../model/menu')
const upload = require('../middleware/file')

router.get('/',auth,async(req,res)=>{
    let menu = await Menu.find().lean()
    let products = await Product.find().populate('menu').lean()
    products = products.map(product=>{
        product.img = product.photos[0]
        product.status = product.status == 0 ? 'Mahsulot mavjud' : product.status == 1 ? 'Mahsulot buyurtma asosida' : product.status == 2 ? 'Mahsulot mavjud emas' : 'Mahsulot faol emas'
        product.hot  = product.hot?  'Ha':'Yo`q'
        
    })
    res.render("product/index", {
        products,
        menu,
    });
})


router.get('/get/:id',async(req,res)=>{
    let _id =  req.params.id
    let product = await Product.findOne({_id})
    res.send(product)
})
router.post('/save',upload.fields([
    {name:'photo1',maxCount:1},
    {name:'photo2',maxCount:1},
    {name:'photo3',maxCount:1},
    {name:'photo4',maxCount:1},
    {name:'photo5',maxCount:1}]),
    auth, async(req,res)=>{
        let{_id,title,menu,author,desc,hot,price,text,status} = req.body
        let product = await Product.findOne({_id})

        if (req.files) {
            if(req.files.photo1){
                product.photos[0]= req.files.photo1[0].path
            }
            if (req.files.photo2) {
                product.photos[1] = req.files.photo1[0].path;
            }
            if (req.files.photo3) {
                product.photos[2] = req.files.photo1[0].path;
            }
            if (req.files.photo4) {
                product.photos[3] = req.files.photo1[0].path;
            }
            if (req.files.photo5) {
                product.photos[4] = req.files.photo1[0].path;
            }
        }
        let photos = product.photos
        await Product.findByIdAndUpdate(_id,{title,menu,author,desc,hot,price,text,status,photos})
        req.flash('success','Mahsulot qo`shildi')
        res.redirect('/product')
    }
)

router.post('/',upload.fields([
    {name:'photo1',maxCount:1},
    {name:'photo2',maxCount:1},
    {name:'photo3',maxCount:1},
    {name:'photo4',maxCount:1},
    {name:'photo5',maxCount:1}]),
    auth, async(req,res)=>{
        let{title,menu,author,desc,hot,price,text,status} = req.body
        let photos = []   
        if (req.files) {
            if(req.files.photo1){
                photos.push(req.files.photo1[0].path)
            }
            if (req.files.photo2) {
                photos.push(req.files.photo2[0].path);
            }
            if (req.files.photo3) {
                photos.push(req.files.photo3[0].path);
            }
            if (req.files.photo4) {
                photos.push(req.files.photo4[0].path);
            }
            if (req.files.photo5) {
                photos.push(req.files.photo5[0].path);
            }
        }
        let newProduct = await new Product({title,menu,author,desc,hot,price,text,status,photos})
        await newProduct.save()
        req.flash('success','Mahsulot qo`shildi')
        res.redirect('/product')
    }
)

module.exports = router