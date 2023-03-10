require('dotenv').config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json()) 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xdpsuxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)
// hello
async function run() {
    try {
        const informationCollection = client.db('digitalComp').collection('information')
        const categoryCollection = client.db('digitalComp').collection('categories')
        const productsCollection = client.db('digitalComp').collection('products')


        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await categoryCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/categories', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await categoryCollection.insertOne(item)
            res.send(result)
        })

        app.put('/categories/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            console.log(user)
            const option = {upsert: true};
            const updatedUser = {
                $set: {
                  name: user.name
                 }
            }
            const result = await categoryCollection.updateOne(filter, updatedUser, option);
            res.send(result);
         })

         app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query)
            const result = await categoryCollection.find(query).toArray();
            res.send(result);

        })

        app.delete('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoryCollection.deleteOne(query);
            res.send(result)
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            console.log(query)
            const result = await productsCollection.find(query).toArray();
            res.send(result);

        })
        
        app.post('/products', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await productsCollection.insertOne(item)
            res.send(result)
        })

        
        app.get('/products/:id/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query)
            const result = await productsCollection.find(query).toArray();
            res.send(result);

        })

        app.put('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            console.log(user)
            const option = {upsert: true};
            const updatedUser = {
                $set: {
                  name: user.name,
                  price: user.price
                }
            }
            const result = await productsCollection.updateOne(filter, updatedUser, option);
            res.send(result);
         })

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result)
        })

        app.post('/information', async (req, res) => {
            const info = req.body
            console.log(info)
            const result = await informationCollection.insertOne(info)
            res.send(result)
        })

        app.get('/information', async(req , res) =>{
            let query = {};
            if(req.query.email){
                query ={
                    email : req.query.email
                }
            }
            const cursor = informationCollection.find(query);
            const about = await cursor.toArray();
            res.send(about)
        })
        app.get('/information/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query)
            const result = await informationCollection.find(query).toArray();
            res.send(result);

        })
        app.put('/information/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            console.log(user)
            const option = {upsert: true};
            const updatedUser = {
                $set: {
                  age: user.age,
                  address: user.address,
                  phone: user.phone
                }
            }
            const result = await informationCollection.updateOne(filter, updatedUser, option);
            res.send(result);
         })
    }
    finally{

    }
}
run().catch(err => console.error(err))
app.get('/', (req, res) => {
    res.send('post is running on ')
})

app.listen(port, () => {
    console.log(`my post is running on ${port}`)
})