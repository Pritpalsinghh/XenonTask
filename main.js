const express = require('express');
const app = express();
const mongoose = require("mongoose");

const path = require('path');
app.use(express.json());
const  bodyParser =  require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const User = require("./model/user")
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views (assuming they are in a 'views' folder)
app.set("view engine", "ejs");
app.use(express.static("public"));
// Define a route to render your EJS file
app.get('/', (req, res) => {
    // Render the 'index.ejs' file
    res.render('index', { title: 'Welcome to my app!' }); // Pass any data you want to use in your EJS file
});

app.get('/contact', (req, res) => {
    // Render the 'index.ejs' file
    res.render('contact'); // Pass any data you want to use in your EJS file
});

app.post("/users/login", async(req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    try {
        
        let oldUser = await User.findOne({ username });
        if(!oldUser){
            res.send("User does not exist");
        }else{
            if (oldUser.password === password) {
                res.render("home");
            }
        }
    } catch (error) {
        
    }
})
app.post("/users/signup", async(req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        
        let oldUser = await User.findOne({ username });
        if(oldUser){
            alert("User already exist");
            res.render("");
        }else{
            await User.create({
                username: username,
                email: email,
                password: password,
              })

              res.render("home");
        }
    } catch (error) {
        
    }



})



//Connecting DB

mongoose.connect("mongodb://localhost:27017/pritpal").then(()=>{
    console.log("db connected");
})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





