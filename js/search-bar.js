Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <input class="search-bar__input" type="text" name="q">
      <div class="search-tags">
        <search-tag
        v-for="(tag, index) in searchTags"
        v-bind:data="tag"
        v-bind:index="index"
        key="tag.type"
        @close="close(index)"
        @focusMainInput="focusMainInput"
        />
        <div ref="fulltextInput" is="fulltext-input" @submit="onCreateSearchTag" />
      </div>
      <button type="submit">Search</button>
    </section>
    `,
    data: () => {
      return {
        searchTags: searchTags
      };
    },
    methods: {
      onCreateSearchTag: function(data) {
        this.$emit('submit', data);
      },
      focusMainInput: function() {
        const target = this.$refs.fulltextInput.$el;
        this.$emit('focusMainInput', target);
      },
      close: function(index) {
        searchTags.splice(index, 1);
      }
    }
});
