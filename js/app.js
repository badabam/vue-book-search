var tags = [
  'Author',
  'Release date',
  'Publisher',
  'Price from',
  'Price to',
  'Keyword',
  'Language',
  'Media',
  'ISBN',
];

let searchTags = [
  {type: "Author", value: "Tolkien"},
  {type: "Publisher", value: "Allen & Unwin"},
  {type: "Price from"},
];

Vue.component('app', {
  template: `
  <div>
    <search-bar></search-bar>
    <section class="advanced">
    <tag
    v-for="tag in tags"
    v-bind:name="tag"
    v-bind:key="tag" />
    </section>
  </div>
  `,
  methods: {
  },

  data: () => {
    return {
      tags: tags
    }
  }
});

Vue.component('search-bar', {
  template: `
    <section class="simple">
      <input type="text" name="q">
      <ul class="tags">
        <search-tag
        v-for="(tag, index) in searchTags"
        v-bind:data="tag"
        key="tag.type"
        @close="close(index)"
        />
      </ul>
      <button type="submit">Search</button>
    </section>
    `,
    data: () => {
      return {
        searchTags: searchTags
      };
    },
    methods: {
      close: function(index) {
        searchTags.splice(index, 1);
      }
    }
});

Vue.component('search-tag', {
  template: `
    <li>
      <span class="prefix">{{data.type}}</span>
      {{data.value}}
      <span class="suffix" @click="close">&times;</span>
    </li>
  `,
  props: ['data'],
  data: () => {
    return {};
  },
  methods: {
    close: function() {
      this.$emit('close');
    }
  }
});

Vue.component('tag', {
  template: `
  <div>{{name}}</div>
  `,
  props: ['name']
});

new Vue({
  el: '#app'
});
