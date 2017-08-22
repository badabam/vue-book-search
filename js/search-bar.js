Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <input class="search-bar__input" type="text" name="q">
      <ul class="search-tags">
        <li
        is="search-tag"
        v-for="(tag, index) in searchTags"
        v-bind:data="tag"
        v-bind:index="index"
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
        console.log('close', index);
        searchTags.splice(index, 1);
      }
    }
});
