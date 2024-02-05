import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import os from 'os';
import dotenv from 'dotenv';
import fs from "fs";

if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', 'MONGO_URL=');
    console.log('Created .env file. Please add your MongoDB URL to the .env file and restart the server.');
    process.exit();
}

dotenv.config()

const port = 3030;
const hostname = os.hostname();
const server_url = `http://${hostname}:${port}`

const app = express()
app.use(cors());
app.use(express.json())

//Item structure
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    photos: [Buffer],
    price: {type: Number, required: true}
})

const Product = mongoose.model("Product", itemSchema)

//POST endpoint for adding new item
app.post('/addItem', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product)
});

//GET endpoint for getting all items
app.get('/getItems', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

//PUT endpoint for changing info in any item
app.put('/putItem/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(product);
});

//DELETE endpoint for deleting item from database
app.delete('/deleteItem/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => console.log(`Server is working` + "\n" + `Server URL: ${server_url}`))
}).catch((error) => {
    console.log(error)
})
