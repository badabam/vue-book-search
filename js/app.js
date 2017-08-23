Vue.component('app', {
  template: `
  <div>
    <search-bar
      @submit="createSearchTag"
      @focusMainInput="focusTarget"
      @destroy="destroySearchTag"
      @update="updateInput"
      v-bind:inputText="currentInput"
      v-bind:searchTags="searchTags"
    />
    <section class="tag-buttons">
      <tag-button
        v-for="(data, index) in currentTags"
        @click="createSearchTag"
        v-bind:initialData="data"
        v-bind:selected="index === selectedTag"
        v-bind:highlight="currentInput"
        v-bind:key="data.title" />
    </section>
  </div>
  `,

  data: function() {
    return {
      currentTags: tagButtons,
      tagButtons: tagButtons,
      currentInput: '',
      searchTags: {},
      nextSearchTodoId: 0,
      selectedTag: null
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
      this.currentTags = this.tagButtons.filter(tag => tag.title.indexOf(value) === 0);
    },

    updateInput: function(value) {
      this.filterTags(value);
      this.currentInput = value;
    },

    destroySearchTag: function(id) {
      Vue.delete(this.searchTags, id);
    },

    focusTarget: function(target) {
      target && target.focus();
    }
  }
});
