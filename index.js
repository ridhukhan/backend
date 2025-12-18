require("dotenv").config()


const express=require("express")
const app =express()
const mongoose=require("mongoose")
const cors =require("cors")
PORT =3000
//middleware
app.use(cors({origin: "https://naturalhealthbd.netlify.app"}))
app.use(express.json())

//mongoose atlas connect
const  connectDB= async ()=>{
    try {
 await  mongoose.connect(process.env.MONGO_URL)
        console.log("db is connect")
    } catch (error) {
        console.log("db is not connected")
    }
}

//Schema + model
const orderSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
     phone :{
        type: String,
        required: true
    },
     address :{
        type: String,
        required: true
    },
     quantity :{
        type: String,
        required: true
    },
     price :{
        type: String,
        required: true
    },
});

const Order = mongoose.model("Order" ,orderSchema)


app.post("/order", async (req,res)=>{
const {name,phone,address}=req.body
if(!name || !phone || !address){ 

    return res.status(400).json({
        message: "please fill all field"
    })
}
const newOrder=new Order({
    name,
    phone,
    address,
    quantity,
    price
});
await newOrder.save()
res.status(201).json({
    message:"order done"
})
})





app.listen(PORT, async ()=>{

console.log(`your app is runnig at http://localhost:${PORT}`)
await connectDB()
})
