<template>
  <div id="app">
    <header>
      <div class="container center">
        <div class="padding">
          <nav>
            <a @click="$router.go(-1)" class="link">Go back to overview</a>
          </nav>
        </div>
      </div>
    </header>
    <div class="container center">
      <article id="recipe">
        <div class="col-12 padding">
          <section>
            <h1>{{recipe.fields.title}}</h1>
            <span v-html="richtText(recipe.fields.description)"></span>
          </section>
        </div>
        <div class="left padding" v-bind:class="[ingredientsVisible ? 'col-8' : 'col-12']" id="instructions">
          <div class="flex">
            <h2>Instructions</h2>
            <button id="clear_recipe" class="clear">clear checked</button>
          </div>
          <span v-html="richtText(recipe.fields.instructions)"></span>
        </div>
        <div class="col-4 right padding" v-if="ingredientsVisible" id="ingredients">
          <aside>
            <div class="flex">
              <h2>Ingredients</h2>
              <button v-if="checked_ingr.length > 0" class="clear" @click="clearItems('ingr')">clear checked</button>
            </div>
            <ul id="example-1">
              <li v-for="(item, i) in recipe.fields.ingredients" :key="i" :class="{checked:checked_ingr.includes(i)}" @click="checkItem(i, 'ingr', id)">
                {{ item }}
              </li>
            </ul>
            <span v-html="richtText(recipe.fields.ingredients)"></span>
          </aside>
        </div>
      </article>
    </div>
    <div id="toolbar">
      <div class="container center padding">
        <div class="tools">
          <span>
            <input id="toggle_ingredients" class="button toggle" type="checkbox" @click="toggleIngredients()">
            <label for="toggle_ingredients" class="tog"></label>
            <label for="toggle_ingredients">Toggle ingredients</label>
          </span>
        </div>
      </div>
    </div>
    <footer>
    </footer>
  </div>
</template>
<script>
import { createClient } from '../../plugins/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const contentfulClient = createClient();

export default {
  name: 'index',
  asyncData({ env, params }) {
    return contentfulClient.getEntries({
      'content_type': 'recipe',
      'fields.slug': params.id
    }).then(page => {
      return {
        recipe: page.items[0],
        id: page.items[0].sys.id,
      }
    }).catch(console.error)
  },
  data: function() {
    return {
      checked_ingr: [],
      checked_inst: [],
      ingredientsVisible: true,
      instructionsFull: true,
    }
  },
  mounted() {
    if (sessionStorage.getItem(this.id + '_ingr')) this.checked_ingr = JSON.parse(sessionStorage.getItem(this.id + '_ingr'));
  },
  methods: {
    richtText(message) {
      return documentToHtmlString(message);
    },
    toggleIngredients: function() {
      this.ingredientsVisible = !this.ingredientsVisible;
    },
    checkItem(i, type, id) {
    	if(type = 'ingr')
      this.checked_ingr.includes(i) ? this.checked_ingr.splice(this.checked_ingr.indexOf(i), 1) : this.checked_ingr.push(i);
    },
    clearItems(type) {
    	if(type = 'ingr')
    	this.checked_ingr = [];
    }
  },
  watch: {
    checked_ingr: {
      handler() {
      	sessionStorage.setItem(this.id + '_ingr', JSON.stringify(this.checked_ingr));
      },
      deep: true,
    },
  },
}

</script>
