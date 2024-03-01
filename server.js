const express = require("express");
require("dotenv").config();

require("./Config/connect");
const cors = require("cors");
const {
  authenticateToken,
  checkPermissions,
} = require("./middlewares/auth.middlewarese");

// Create an Express app
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers
app.use(cors());



//users routes
app.use("/api/v1/users", require("./routes/users.routes"));
//auth routes
app.use("/api/v1/auth", require("./routes/auth.routes"));

//admin routes
app.use("/api/v1/admin", require("./routes/admin.routes"));
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});

/*
const app = express(); //heritage ll kol les fonctionnalités li mawjoudin f express
app.use(express.json());//tkhali el app taqra el data eli jeya mel front(postman,etc) w type mteeha json


app.post('/add', (req,res)=>{

    data = req.body; // ne5dho el data el t7atet fl request 
    usr = new User(data); //initialisation ll object User w hatit fih data li qritha mel request
    usr.save()
        .then(
            (savedUser)=>{res.send(savedUser)}
        )
        .catch(
            (err)=>{res.send(err)}
        )
    

});
//2eme method 
app.post('/create', async(req, res) =>{ //async t3awedh et .then .catch 

    try{
        data = req.body;
        usr = new User(data);
        savedUser = await usr.save();  // testana lin yekmel el save w ba3d te5dh res w thotha f var
        res.send(savedUser);//traja3ha f postman 

    }catch{
        res.send(err)
    }

});


app.get('/getall' , (req, res)=>{
   User.find()//teb3a mongoose w tjib el users lkol ml db
   .then(//taqra el res 
        (users)=>{res.send(users);}
    )
   .catch( //taqra el error
    (err)=>{
        res.send(err)
    })
   
   
});
//2eme methode
app.get('/all' ,async (req, res)=>{

    try {
        users = await User.find({ name:'amine' });
        res.send(users);
    }catch (error){

        res.send(error)
    }
    });

app.get('/getbyid/:id' , (req,res)=>{
   
    myid=req.params.id;//var bechh taqra feha eli bch yji mel params

    User.findOne({ _id: myid })
        .then(
           (user) =>{res.send(user)}
        )
        .catch(
            (err)=>{res.send(err)}
        )



})

app.get('/byid/:id', async(req,res)=>{

    try {
            id=req.params.id;
            user= await User.findById({_id:id})//mayet3ada ll send ken mayjib el données
            res.send(user);
    } catch (error) {
        res.send(error)  
    }    




})

app.put('/update/:id' , (req, res)=>{
    id = req.params.id;

    newData= req.body;

    User.findByIdAndUpdate({_id:id}, newData)
    .then(
        (updated) =>{res.send(updated)}
     )
     .catch(
         (err)=>{res.send(err)}
     )
});

app.put('/change/:id', async(req,res)=>{

    try {
            id=req.params.id;
            newData= req.body;
            updated= await User.findByIdAndUpdate({_id:id}, newData )//mayet3ada ll send ken mayjib el données
            res.send(updated);
    } catch (error) {
        res.send(error)  
    }    




})








app.delete('/delete/:id', (req, res)=>{

   id = req.params.id;
   User.findOneAndDelete({ _id:id})
        .then(
            (deletedUser)=>{res.send(deletedUser)}
        ).catch((err)=>{res.send(err)})
});

app.delete('/del/:id', async(req, res)=>{

    try{
        id =req.params.id
        deletedUser = await User.findByIdAndDelete({_id:id});
        res.send(deletedUser)
    }catch (error){
        res.send(error)
    }

 });

 //PRODUCT CRUD

 app.post('/createproduct', async(req, res) =>{ //async t3awedh et .then .catch 

    try{
        data = req.body;
        prod = new Product(data);
        savedProduct = await prod.save();  // testana lin yekmel el save w ba3d te5dh res w thotha f var
        res.status(200).send(savedProduct);//traja3ha f postman 

    }catch{
        res.status(400).send(err)
    }

});



///listen tkhali el serveur yestana f requests men 3ana meghir matsakro
app.listen(3000,()=>{   //tekho comme paramétres port eli chyekhdem alih el serveur w function eli chtekhdem al serveur
    console.log('server works!');
});

*/
