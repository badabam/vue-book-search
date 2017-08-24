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

  data() {
    return {
      currentTags: tagButtons,
      tagButtons: tagButtons,
      currentInput: '',
      searchTags: {},
      nextSearchTodoId: 0,
      selectedTag: null
    };
  },

  methods: {
    createSearchTag(data) {
      const newTag = {
        value: data.value,
        type: data.title,
        valueType: data.type,
        placeholder: data.placeholder,
        id: this.nextSearchTodoId++
      };
      Vue.set(this.searchTags, newTag.id, newTag);
    },

    sortTags(value) {
      this.currentTags = this.tagButtons.slice().sort( (a, b) => {
        const titleA = a.title;
        const titleB = b.title;

        if (titleA.indexOf(value) === 0) {
          if (titleB.indexOf(value) === 0) {
            return titleA < titleB ? -1 : 1;
          } else {
            return -1;
          }
        } else if (titleB.indexOf(value) === 0) {
          return 1;
        } else {
          return titleA < titleB ? -1 : 1;
        }
      });
    },

    updateInput(value) {
      this.sortTags(value);
      this.currentInput = value;
    },

    destroySearchTag(id) {
      Vue.delete(this.searchTags, id);
    },

    focusTarget(target) {
      target && target.focus();
    }
  }
});
