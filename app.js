
const express = require("express");
const morgan = require('morgan')
const client = require('./db/index.js')
const postList = require('./views/postList')
const postDetails = require('./views/postDetails')

const app = express();
app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/posts', async (req, res, next) => {
  try {
    const data = await client.query('SELECT * FROM posts')
    const posts = data.rows
    res.send(postList(posts))
  } catch(err) { next(err) }
})

app.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await client.query('SELECT post FROM posts WHERE id=$1', [req.params.id])
    res.send(postDetails(post))
  } catch(err) { next(err) }

  // const post = postBank.find(req.params.id)
  // // this will put out a new error for our error handler down below
  // if (!post.id) {
  //   next(new Error(404))
  // } else {
  //   res.send(postDetails(post))
  // }
})

// this is waiting for a new Error object
// app.use(function (err, req, res, next) {
//   console.error(err.message)
//   if (err.message === 404) {
//     res.status(404).send('404 not found')
//   } else {
//     res.status(500).send('Internal server error')
//   }
// })

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
