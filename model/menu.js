const {Schema,model} = require('mongoose');


const menu = new Schema ({
    title:String,
    status:{ 
        type:Number,
        default:0,
    },
    menu:{
        type:Number,
        default:0,
    },
    order:{
        type:Number,
        default:0,
    }
})

module.exports = model('Menu',menu)