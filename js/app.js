Vue.component('app', {
  template: `
  <div>
    <search-bar
    @submit="createSearchTag"
    @focusMainInput="focusTarget"
    @destroy="destroySearchTag"
    v-bind:searchTags="searchTags"
    ></search-bar>
    <section class="tag-buttons">
      <tag-button
        v-for="data in tagButtons"
        @click="createSearchTag"
        v-bind:initialData="data"
        v-bind:key="data.title" />
    </section>
  </div>
  `,
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

    destroySearchTag: function(id) {
      Vue.delete(this.searchTags, id);
    },

    focusTarget: function(target) {
      target && target.focus();
    }
  },

  data: function() {
    return {
      tagButtons,
      searchTags: {},
      nextSearchTodoId: 0
    }
  }
});
