const mongoose = require('mongoose');

const connect = async ()=>{
    try {
        const con = await mongoose.connect("mongodb+srv://tsha4394:Friday3000@cluster0.oomj40w.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Mongodb connected");
    } catch (error) {
        console.log("Mongodb connection failed! ", error)
    }
}

module.exports = connect;