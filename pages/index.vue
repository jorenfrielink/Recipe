<template>
  <section class="container center">
    <div class="col-5 padding center">
      <span v-for="(navItem, index) in recipes" :key="index">
      <nuxt-link :to="'/' + navItem.fields.slug" role="menuitem" class="link">{{navItem.fields.title}}</nuxt-link>
   </span>
    </div>
  </section>
</template>

<script>
import Navigation from '../components/Navigation';
import {createClient} from '../plugins/contentful';
import slug from '../plugins/slug';

const contentfulClient = createClient();

export default {
  // components: {
  //   Navigation
  // },
  // methods: {
  //   sanitizeTitle: slug.sanitizeTitle,
  // },
  asyncData ({env}) {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      contentfulClient.getEntries({
        'content_type': 'recipe',
        order: '-sys.createdAt'
      })
    ]).then(([pages]) => {
      // return data that should be available
      // in the template
      return {
        recipes: pages.items
      }
    }).catch(console.error)
  }
}
</script>