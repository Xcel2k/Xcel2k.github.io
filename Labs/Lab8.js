let recipes = [];

function addRecipe() {
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('image').files[0]; // Handle image as needed

    const recipe = {
        id: Date.now(),
        title,
        ingredients,
        instructions,
        image: URL.createObjectURL(image) // Create a URL for the image
    };

    recipes.push(recipe);
    displayRecipes();
    clearForm();
}

function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach((recipe) => {
        const li = document.createElement('li');
        li.textContent = recipe.title; // For simplicity
        recipeList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
    document.getElementById('image').value = '';
}

window.onload = function() {
    displayRecipes();
}
