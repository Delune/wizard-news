
const express = require("express");
const morgan = require('morgan')
const postBank = require('./postBank')
const postList = require('./views/postList')
const postDetails = require('./views/postDetails')

const app = express();
app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/posts', (req, res) => {
  const list = postBank.list()
  res.send(postList(list))
})

app.get('/posts/:id', (req, res, next) => {
  const post = postBank.find(req.params.id)
  // this will put out a new error for our error handler down below
  if (!post.id) {
    next(new Error(404))
  } else {
    res.send(postDetails(post))
  }
})

// this is waiting for a new Error object
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (err.message === 404) {
    res.status(404).send('404 not found')
  } else {
    res.status(500).send('Internal server error')
  }
})

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
