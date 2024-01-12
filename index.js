import express from 'express'
const app = express()
const port = 3500
import mongoose, { Schema } from 'mongoose';
import cors from "cors";

app.use(cors());
app.use(express.json())

const servicesSchema = new Schema({
    image:String,
    name:String,
    description:String
   });
   
 const servicesModel = mongoose.model('Datas', servicesSchema)

app.get('/', async (req, res) => {
    try {
        const services= await servicesModel.find({})
    res.send(services)

    } catch (error) {
    res.send(error.message``)
        
    }
  })

  app.get('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const services= await servicesModel.findById(id)
    res.send(services)
    } 
    catch (error) {
    res.send(error.message)
    }
  })
  
  app.post('/', async (req, res) => {
    try {
        const {image,name,description}=req.body
        const newServices=  new  servicesModel({image,name,description});
        await newServices.save()
    res.send('post methodu ugurlu')
        
    } catch (error) {
        res.send(error.message)
    }
  })

  app.put('/:id', async (req, res) => {
    try {
        const {id}=req.params
        const {image,name,description}=req.body
        const newServices= await servicesModel.findByIdAndUpdate(id)
    res.send('post methodu ugurlu')
        
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.delete('/:id', async (req, res) => {
    try {
     const {id}= req.params
     const newServices=await servicesModel.findByIdAndDelete(id)
     res.send({message:"delete methodu ugurlu"})
    } catch (error) {
     res.send(error.message)
    }
 })
 

  mongoose
  .connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch(()=>console.log('not connected'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})