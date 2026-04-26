fetch('/api/recipes')
  .then(response => response.json())
  .then(data => {
    const recipesDiv = document.getElementById('recipes');
    data.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.textContent = recipe.name;
      recipesDiv.appendChild(recipeElement);
    });
  });