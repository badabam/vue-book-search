Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <div class="search-tags">
        <search-tag
          v-for="(data, key) in searchTags"
          v-bind:data="data"
          v-bind:key="key"
          @destroy="destroy"
          @focusMainInput="focusMainInput"
          @created="updateInput('')"
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
      onCreateSearchTag(data) {
        this.$emit('submit', data);
      },

      focusMainInput() {
        const target = this.$refs.fulltextInput.$el;
        this.$emit('focusMainInput', target);
      },

      updateInput(value) {
        this.$emit('update', value);
      },

      destroy(id) {
        this.$emit('destroy', id);
        this.$refs.fulltextInput.focus();
      },

      destroyLast() {
        const lastItemId = Object.keys(this.searchTags).slice(-1)[0];
        this.$emit('destroy', lastItemId);
      }
    }
});
