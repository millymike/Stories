

// const story = require('./models/Story');
// const author = require('./models/Author');
// let Story = story.Story;
// let Author = author.Author;


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StoriesDB', {useNewUrlParser: true}, (err)=> {
    if (!err) {console.log('Mongodb connection successful')}
    else {console.log('Error in DB connection :' + err)}
});

const express = require("express");
const app = express();
const stories = [];
let user



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const storySchema = require('../Database/storySchema');
const authorSchema = require('../Database/authorSchema');



app.post("/stories", async (req, res) => {
  if (!user) return res.status(403).json("Access denied! Login first");
  stories.push ( new storySchema(req.body, user));
  try {
    const myStory = await storySchema.insertMany(stories)
    res.json(myStory);
  } catch (error) {
    res.send('error')
    console.log(error);
  }
  res.sendStatus(201); 
});

app.get("/stories", async (req, res) => {
  try {
    const myStory = await storySchema.find()
    res.json(myStory)
  } catch (error) {
    res.send('error')
    console.log(error)
  }
  res.json(stories);
});


app.post("/login", async (req, res) => {
  user = new authorSchema(req.body);
  try {
    const myAuthor = await authorSchema.insertMany(user)
    res.json(myAuthor)
  } catch (error) {
    res.send('error')
    console.log(error)
  }
  res.sendStatus(204);
});

app.listen(4000, () => {
  console.log("server running");
});