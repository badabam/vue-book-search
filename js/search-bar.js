Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <input class="search-bar__input" type="text" name="q">
      <div class="search-tags">
        <search-tag
          v-for="(data, key) in searchTags"
          v-bind:data="data"
          v-bind:key="key"
          @destroy="destroy"
          @focusMainInput="focusMainInput"
        />
        <fulltext-input
          ref="fulltextInput"
          v-bind:inputText="inputText"
          @update="updateInput"
          @submit="onCreateSearchTag"
          @destroy="destroyLast"
        />
      </div>
      <button class="search-bar__button" type="submit">Search</button>
    </section>
    `,
    props: ['searchTags', 'inputText'],
    methods: {
      onCreateSearchTag: function(data) {
        this.$emit('submit', data);
      },

      focusMainInput: function() {
        const target = this.$refs.fulltextInput.$el;
        this.$emit('focusMainInput', target);
      },

      updateInput: function(value) {
        this.$emit('update', value);
      },

      destroy: function(id) {
        this.$emit('destroy', id);
      },

      destroyLast: function() {
        const lastItemId = Object.keys(this.searchTags).slice(-1)[0];
        this.$emit('destroy', lastItemId);
      }
    }
});
