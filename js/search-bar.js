Vue.component('search-bar', {
  template: `
    <section class="search-bar">
      <div class="search-tags">
        <search-tag
          v-for="(data, key) in searchTags"
          v-bind:data="data"
          v-bind:key="key"
          @destroy="destroy"
          @editingDone="editingDone"
          @created="updateInput('')"
          @createAnother="submit"
        />
        <fulltext-input
          ref="fulltextInput"
          v-bind:inputText="inputText"
          @update="updateInput"
          @submit="submit"
          @enter="$emit('enter')"
          @destroy="destroyLast"
          @move="move"
        />
      </div>
      <button @click="$emit('search')" class="search-bar__button" type="submit">Search</button>
    </section>
    `,
    props: ['searchTags', 'inputText'],
    methods: {
      submit(data) {
        this.$emit('submit', data);
      },

      editingDone(data) {
        const target = this.$refs.fulltextInput.$el;
        target && target.focus();
        this.$emit('editingDone', data);
      },

      move(x, y) {
        this.$emit('move', x, y);
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
