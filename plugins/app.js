module.exports = {
	toggleIngredients: function(title) {
		recipe.classList.toggle("hide_ingredients");
		instructions.classList.toggle("col-8");
		instructions.classList.toggle("col-12");
	}
}
