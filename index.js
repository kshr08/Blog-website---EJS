import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

// Home
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// New post
app.post('/new', (req, res) => {
  posts.push({ title: req.body.name, content: req.body.info });
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  if (post) {
    res.render('edit', { id: id, post: post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Handle edit
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  if (posts[id]) {
    posts[id].title = req.body.name;
    posts[id].content = req.body.info;
  }
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Live at server ${port}`);
});
