Vue.component('app', {
  template: `
  <div>
    <hintbar v-if="currentHint" v-bind:text="currentHint"/>
    <search-bar
      @submit="createSearchTag"
      @editingDone="reset"
      @destroy="destroySearchTag"
      @update="updateInput"
      @move="moveSelection"
      @search="search"
      v-bind:inputText="currentInput"
      v-bind:searchTags="searchTags"
    />
    <section class="tag-buttons">
      <tag-button
        v-for="(data, index) in currentTags"
        @click="createSearchTag"
        v-bind:initialData="data"
        v-bind:selected="index === selectedTagIndex"
        v-bind:highlight="currentInput"
        v-bind:doFilter="someHighlight"
        v-bind:key="data.title" />
    </section>
    <section className="searching">Searching for {{}}</section>
  </div>
  `,

  data() {
    return {
      currentTags: tagButtons,
      tagButtons: tagButtons,
      currentInput: '',
      searchTags: {},
      nextSearchTodoId: 0,
      selectedTagIndex: null,
      currentHint: null
    };
  },

  computed: {
    someHighlight() {
      return this.currentTags.some( tag => tag.title.indexOf(this.currentInput) === 0);
    },

    currentSearch() {
      return this.currentTags.reduce(prev, current => {

      }, '');
    }
  },

  mounted() {
    this.sortTags();
  },

  methods: {
    createSearchTag(data) {
      let currentTag;
      if (this.selectedTagIndex != null) {
        try {
          currentTag = this.currentTags[this.selectedTagIndex];
        } catch(error) { }
      }
      const newTag = {
        value: currentTag ? null : data.value,
        values: currentTag ? currentTag.values : data.values,
        title: currentTag ? currentTag.title : data.title,
        valueType: currentTag ? currentTag.type : data.type,
        placeholder: currentTag ? currentTag.placeholder : data.placeholder,
        multi: currentTag ? currentTag.multi : data.multi,
        hint: currentTag ? currentTag.hint : data.hint,
        id: this.nextSearchTodoId++
      };
      Vue.set(this.searchTags, newTag.id, newTag);
      if (currentTag) this.selectedTagIndex = null;
      this.currentHint = currentTag ? currentTag.hint : data.hint;
    },

    search() {
      this.searchTags = {};
      this.currentHint = '';
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

    moveSelection(step) {
      if (step == null) {
        this.selectedTagIndex = null;
        return;
      }

      if(step === 1 && this.selectedTagIndex == null) {
        this.selectedTagIndex = 0;
        return;
      }

      const newSelection = this.selectedTagIndex + step;
      if (newSelection > this.currentTags.length - 1) {
        this.selectedTagIndex = 0;
      } else if (newSelection < 0) {
        this.selectedTagIndex = this.currentTags.length - 1;
      } else {
        this.selectedTagIndex = newSelection;
      }
    },

    destroySearchTag(id) {
      Vue.delete(this.searchTags, id);
      this.reset();
    },

    reset(target) {
      target && target.focus();
      this.currentHint = '';
    }
  }
});
