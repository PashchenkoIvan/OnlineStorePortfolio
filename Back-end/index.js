import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'

const port = 3000;
const url = "mongodb+srv://vanapasenko886:ifkmipXrDIIkeQUc@store-cluster.jamblw7.mongodb.net/?retryWrites=true&w=majority"

const app = express()
app.use(cors());
app.use(express.json())

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    photos: [Buffer],
    price: {type: Number, required: true}
})

const Product = mongoose.model("Product", itemSchema)

app.post('/addItem', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product)
});

app.get('/getItems', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.put('/putItem/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(product);
});

app.delete('/deleteItem/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
});

mongoose.connect(url).then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
}).catch((error) => {
    console.log(error)
})