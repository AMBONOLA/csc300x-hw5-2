const express = require('express');
const cors = require('cors');
const jokebook = require('./jokebook');
const app = express();

app.use(cors());
//gonna use to parse JSON and multi-part/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET endpoint @ /jokebook/categories
app.get('/jokebook/categories', (req, res) => {
  try {
    console.log("is this being hit")
    if (!jokebook.categories || jokebook.categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }
    res.json(jokebook.categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


//GET endpoint @ /jokebook/joke/:category
app.get('/jokebook/joke/:category', (req, res) => {
  try {
    const category = req.params.category;

    if (!jokebook[category]) {
      return res.status(404).json({ error: `No jokes found for category ${category}` });
    }

    const jokes = jokebook[category];
    const limit = req.query.limit ? parseInt(req.query.limit) : (jokes ? jokes.length : 0);

    res.json(jokes ? jokes.slice(0, limit) : []);
  } catch (error) {
    console.error('Error retrieving jokes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


// POST endpoint @ /jokebook/joke/new
app.post('/jokebook/joke/new', (req, res) => {
  const { category, joke, response } = req.body;
  console.log('This is the body');
  console.log(req.body);

  if (!category || !joke || !response || !jokebook[category]) {
    return res.status(400).json({ error: `invalid or insufficient user input` });
  }

  jokebook[category].push({ joke, response });
  return res.json(jokebook[category]);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});