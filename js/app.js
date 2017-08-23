Vue.component('app', {
  template: `
  <div>
    <search-bar
      @submit="createSearchTag"
      @focusMainInput="focusTarget"
      @destroy="destroySearchTag"
      @inputUpdate="filterTags"
      v-bind:searchTags="searchTags"
    />
    <section class="tag-buttons">
      <tag-button
        v-for="data in currentTags"
        @click="createSearchTag"
        v-bind:initialData="data"
        v-bind:key="data.title" />
    </section>
  </div>
  `,

  data: function() {
    return {
      currentTags: tagButtons,
      tagButtons: tagButtons,
      searchTags: {},
      nextSearchTodoId: 0
    }
  },

  methods: {
    createSearchTag: function(data) {
      const newTag = {
        value: data.value,
        type: data.title,
        valueType: data.type,
        placeholder: data.placeholder,
        id: this.nextSearchTodoId++
      };
      Vue.set(this.searchTags, newTag.id, newTag);
      console.log('createSearchTag', data, this.searchTags);
    },

    filterTags: function(value) {
      this.currentTags = this.tagButtons.filter(tag => tag.title.indexOf(value) !== -1);
    },

    destroySearchTag: function(id) {
      Vue.delete(this.searchTags, id);
    },

    focusTarget: function(target) {
      target && target.focus();
    }
  }
});
