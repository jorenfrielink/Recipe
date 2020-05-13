document.addEventListener('DOMContentLoaded', (event) => {})

var toggle_ingredients = document.getElementById("toggle_ingredients"),
  clear_ingredients = document.getElementById("clear_ingredients"),
  clear_instructions = document.getElementById("clear_recipe"),
  recipe = document.getElementById("recipe"),
  instructions = document.getElementById("instructions"),
  items_all = document.querySelectorAll("#recipe li"),
  items_ingredients = document.querySelectorAll("#ingredients li"),
  items_instructions = document.querySelectorAll("#instructions li"),
  items_session = Object.keys(sessionStorage);

toggle_ingredients.onclick = function() {
  recipe.classList.toggle("hide_ingredients");
  instructions.classList.toggle("col-8");
  instructions.classList.toggle("col-12");
};

clear_ingredients.onclick = function() {
  clearChecked(items_ingredients, 'ingr_');
}

clear_instructions.onclick = function() {
  clearChecked(items_instructions, 'inst_');
}

items_ingredients.forEach((el, index) => {
  el.onclick = function() {
    if (this.classList.contains("checked")) {
      this.classList.remove("checked");
      sessionStorage.removeItem('ingr_' + index);
    } else {
      this.classList.add("checked");
      sessionStorage.setItem('ingr_' + index, 'checked');
    }
  }
})

items_session.forEach((el, index) => {
  if (el.includes('ingr_')) {
    items_ingredients[el.replace('ingr_', '')].classList.toggle("checked");
  }

})

items_instructions.forEach((el, index) => {
  el.onclick = function() {
    if (this.classList.contains("checked")) {
      this.classList.remove("checked");
      sessionStorage.removeItem('inst_' + index);
    } else {
      this.classList.add("checked");
      sessionStorage.setItem('inst_' + index, 'checked');
    }
  }
})

items_session.forEach((el, index) => {
  if (el.includes('inst_')) {
    items_instructions[el.replace('inst_', '')].classList.toggle("checked");
  }

})


function clearChecked(el, type) {
  el.forEach((mnt, index) => {
    mnt.classList.remove("checked");
    sessionStorage.removeItem(type + index);
  })
}
