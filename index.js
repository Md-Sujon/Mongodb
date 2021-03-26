const express=require('express');
// const bodyParser=require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

const password='5uFjT!k9j-nwn$2'
const userName='sujonrobin'

const uri = "mongodb+srv://sujonrobin:5uFjT!k9j-nwn$2@cluster0.7zutu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app=express();
 app.use(express.json());
 app.use(express.urlencoded({ extended: true}));

 app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
})


client.connect(err => {
  
  const productCollection = client.db("mydata").collection("product");

app.get('/products',(req,res)=>{
productCollection.find({})
 .toArray((err,documents) =>{
   res.send(documents);
 })
})

app.get('/product/:id',(req,res)=>{
  productCollection.find({_id:ObjectId(req.params.id)})
  .toArray((err,document)=>{
    res.send(document[0]);
  })
})



  app.post('/addProduct',(req,res)=>{
    const products=req.body;
    productCollection.insertOne(products)
    .then(result =>{
      console.log('data added successfully');
      res.redirect('/')
    })
  })


    app.patch('/update/:id', (req, res) => {
      // console.log(req.body.price);
      productCollection.updateOne({_id: ObjectId(req.params.id)},
      {
        $set:{price:req.body.price, quantity:req.body.quantity}
      })
      .then(result=>{
        res.send(result.modifiedCount > 0)
      })

    })


app.delete('/delete/:id',(req, res )=>{
 
  productCollection.deleteOne({_id:ObjectId(req.params.id)})
  .then( result =>{
    res.send(result.deletedCount > 0)
  })
})

  
});
app.listen(3000);
