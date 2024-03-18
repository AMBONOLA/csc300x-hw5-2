async function fetchCategories() {
  try {
    const response = await fetch('/jokebook/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.categories;
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
    const listItem = document.createElement('li');
    listItem.textContent = category;
    list.appendChild(listItem);
  });
  categoriesContainer.appendChild(list);
}

//event listener to Get categories button
document.getElementById('getCategories').addEventListener('click', async () => {
  const categories = await fetchCategories();
  displayCategories(categories);
})