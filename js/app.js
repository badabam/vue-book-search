Vue.component('app', {
  template: `
  <div>
    <hintbar v-if="currentHint" v-bind:text="currentHint"/>
    <search-bar
      @submit="createSearchTag"
      @editingDone="updateSearchTag"
      @destroy="destroySearchTag"
      @update="updateInput"
      @move="moveSelection"
      @enter="enter"
      v-bind:inputText="currentInput"
      v-bind:searchTags="searchTags"
    />
    <section class="tag-buttons">
      <tag-button
        v-for="(data, index) in currentTags"
        @click="click"
        v-bind:initialData="data"
        v-bind:selected="index === selectedTagIndex"
        v-bind:highlight="currentInput"
        v-bind:doFilter="someHighlight"
        v-bind:key="data.label" />
    </section>
    <section class="searching" v-if="searching && Object.keys(searchTags).length" v-html="i18n.searching.heading + currentSearch"></section>
  </div>
  `,

  data() {
    return {
      i18n: i18n,
      currentTags: tagButtons,
      tagButtons: tagButtons,
      currentInput: '',
      searchTags: {},
      nextSearchTodoId: 0,
      tagRowSelected: true,
      selectedSearchTagIndex: null,
      selectedTagIndex: null,
      currentHint: null,
      searching: false
    };
  },

  computed: {
    someHighlight() {
      return this.currentInput && this.currentTags.some( tag => tag.label.toLowerCase().indexOf(this.currentInput) === 0);
    },

    currentSearch() {
      return '<p>' +
        Object.values(this.searchTags).reduce( (prev, current, index, arr) => {
        return prev += `<i class="searching__label">${current.label}:</i> ${current.value}${index < arr.length -1 ? ', ' : ''}`;
      }, '')  +
      '</p>';
    }
  },

  mounted() {
    this.sortTags();
  },

  methods: {
    createSearchTag(data) {
      const currentTag = this.getCurrentTag();
      const newTag = Object.assign({}, currentTag ? currentTag : data, {
        value: currentTag ? null : data.value,
        id: this.nextSearchTodoId++
      });

      Vue.set(this.searchTags, newTag.id, newTag);
      if (currentTag) this.selectedTagIndex = null;
      this.currentHint = currentTag ? currentTag.hint : data.hint;
    },

    getCurrentTag() {
      if (this.selectedTagIndex != null) {
        try {
          return this.currentTags[this.selectedTagIndex];
        } catch(error) {
          console.log('getCurrentTag: no currentTag found for index', this.selectedSearchTagIndex);
          return;
        }
      }
    },

    click(data) {
      this.removeEmptySearchTags();
      this.createSearchTag(data);
    },

    removeEmptySearchTags() {
      Object.values(this.searchTags).forEach(tag => tag.value || this.destroySearchTag(tag.id));
    },

    enter() {
      if(this.selectedTagIndex) {
        this.createSearchTag();
      } else {
        this.currentHint = '';
        this.searching = true;
        setTimeout(() => {
          this.searching = false;
          this.searchTags = {};
        }, 2000);
      }
    },

    sortTags(value) {
      value = value && value.toLowerCase();
      this.currentTags = this.tagButtons.slice().sort( (a, b) => {
        const labelA = a.label.toLowerCase();
        const labelB = b.label.toLowerCase();

        if (labelA.indexOf(value) === 0) {
          if (labelB.indexOf(value) === 0) {
            return labelA < labelB ? -1 : 1;
          } else {
            return -1;
          }
        } else if (labelB.indexOf(value) === 0) {
          return 1;
        } else {
          return labelA < labelB ? -1 : 1;
        }
      });
    },

    updateInput(value) {
      this.sortTags(value);
      this.currentInput = value;
    },

    moveSelection(x, y) {
      if (y) {
        this.tagRowSelected = !this.tagRowSelected;
        return;
      }

      if (this.tagRowSelected) {
        // TODO: implement later
      }


      if (x == null) {
        this.selectedTagIndex = null;
        return;
      }

      if(x === 1 && this.selectedTagIndex == null) {
        this.selectedTagIndex = 0;
        return;
      }

      const newSelection = this.selectedTagIndex + x;
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
      this.currentHint = '';
    },

    updateSearchTag(data) {
      this.currentHint = '';
      Object.keys(this.searchTags).forEach(key => {
        const tag = this.searchTags[key];
        Vue.set(this.searchTags, key, (tag.id === data.id)
        ? Object.assign({}, tag, {value: data.value})
        : tag);
      });
    }
  }
});
