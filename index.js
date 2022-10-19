const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");

const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const varMiddle = require('./middleware/var')
const auth = require("./middleware/auth");    


///////////////////////////////////Sessiya
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

///////////////////////////////ROUTER ULASH

const userRouter = require('./router/users')
const pageRouter = require("./router/page");
const menuRouter = require("./router/menu");  
const productRouter = require('./router/product')
// const aboutRouter = require("./router/about");




///////////////////////////////EXPRESS
const  app = express();

////////////////////////////////HENDLEBARS  
const hbs = exphbs.create({
    // defaultLayout: "main", 
    extname: ".hbs",
});



//////////////////////////////PABLIC PAPKA
app.use(express.static('public'));
app.use('/uploads',express.static('uploads'))


//////////////////////////////INPUTS Jonatish uchun
app.use(express.urlencoded({extended: true}))

////////////////////////////////////////////////
const MONGODB_URI  = 'mongodb://127.0.0.1:27017/workers'
let store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "mySessions",
});

////////////////////////////////Sessiya saqlash
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        // cookie: { secure: true },
        store
        
    })
);   

/////////////////////////////////

app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(flash());

/////////////////////////////
app.use(varMiddle)



app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views') 

////////////////////////////////ROUTER


/////////////////////////////////Router use


app.use('/', pageRouter);
app.use('/users',userRouter);
app.use('/menu', menuRouter);
app.use('/product', productRouter)
app.use("/userprofile", productRouter);
// app.use("/about", aboutRouter);




//////////////////////SERVER RUNNING
// app.listen(3000,()=>{
//     console.log("server is running ==> http://localhost:3000/");
// })


//////////////////////////MONGOSE RUNNING

async function dev(){
    try {      
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        app.listen(3000,()=>{
            console.log("Server is running ==> http://localhost:3000/");
        })
    } catch (error) {
        console.log(error);
    }
}


dev(); 
