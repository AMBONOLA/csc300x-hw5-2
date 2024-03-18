async function fetchCategories() {
  try {
    const response = await fetch('/jokebook/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    console.log(response);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching categories: ', error);
    return [];
  }
}

// to show the categories
function displayCategories(categories) {
  const categoriesContainer = document.getElementById('categories');
  categoriesContainer.innerHTML = '';
  if (categories.length === 0) {
    categoriesContainer.innerHTML = '<p> No Categories found </p>';
    return;
  }
  const list = document.createElement('ul');
  categories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.classList.add('btn', 'btn-primary', 'mb-2', 'me-2');
    categoryButton.addEventListener('click', () => showCategoryJokes(category));
    categoriesContainer.appendChild(categoryButton);
  });
  categoriesContainer.appendChild(list);
}

//event listener to Get categories button
document.getElementById('getCategories').addEventListener('click', async () => {
  const categories = await fetchCategories();
  displayCategories(categories);
})
////////////////////////////////////////////////////////////
//Return jokes from a specific category


async function showCategoryJokes(category) {
  try {
    const fetchResponse = await fetch(`jokebook/joke/${category}`);
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch jokes for category ${category}`);
    }
    const jokes = await fetchResponse.json();
    displayCategoryJokes(jokes);
  } catch (error) {
    console.error('Error fetching jokes:', error);
  }
}


function displayCategoryJokes(addedJokes) {
  const addedJokeContainer = document.getElementById('addedJoke');
  addedJokeContainer.innerHTML = '';

  addedJokes.forEach(addedJoke => {
    const jokeElement = document.createElement('div');
    jokeElement.innerHTML = `
      <div>
        <p>Joke: ${addedJoke.joke}</p>
        <p>Response: ${addedJoke.response}</p>
      </div>
    `;
    addedJokeContainer.appendChild(jokeElement);
  });
}

//////////////////////////////////////////////////////////////
//Adding  joke

async function addJoke(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const joke = document.getElementById('joke').value;
  const responseText = document.getElementById('response').value;

  try {
    const fetchResponse = await fetch('/jokebook/joke/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, joke, response: responseText })
    });
    if (!fetchResponse.ok) {
      throw new Error('Failed to add joke');
    }
    const addedJoke = await fetchResponse.json();
    console.log(addedJoke)
    displayAddedJoke(addedJoke);

  } catch (error) {
    console.error('Error adding joke: ', error);
  }
}



function displayAddedJoke(addedJokes) {
  const addedJokeContainer = document.getElementById('addedJoke');
  addedJokeContainer.innerHTML = '';

  addedJokes.forEach(addedJoke => {
    const jokeElement = document.createElement('div');
    jokeElement.innerHTML = `
      <div>
        <p>Category: ${addedJoke.category}</p>
        <p>Joke: ${addedJoke.joke}</p>
        <p>Response: ${addedJoke.response}</p>
      </div>
    `;
    addedJokeContainer.appendChild(jokeElement);
  });
}

document.getElementById('addJokeForm').addEventListener('submit', addJoke);