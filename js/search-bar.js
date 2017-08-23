Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <input class="search-bar__input" type="text" name="q">
      <div class="search-tags">
        <search-tag
        v-for="(data, key) in searchTags"
        v-bind:data="data"
        v-bind:key="key"
        @close="close"
        @focusMainInput="focusMainInput"
        />
        <div ref="fulltextInput" is="fulltext-input" @submit="onCreateSearchTag" />
      </div>
      <button type="submit">Search</button>
    </section>
    `,
    props: ['searchTags'],
    methods: {
      onCreateSearchTag: function(data) {
        this.$emit('submit', data);
      },
      focusMainInput: function() {
        const target = this.$refs.fulltextInput.$el;
        this.$emit('focusMainInput', target);
      },
      close: function(id) {
        this.$emit('close', id);
      }
    }
});
