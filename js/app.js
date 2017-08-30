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
        v-bind:key="data.label" />
    </section>
    <section class="searching" v-show="searching" v-html="'<h3>Searching for</h3>' + currentSearch"></section>
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
      currentHint: null,
      searching: false
    };
  },

  computed: {
    someHighlight() {
      return this.currentTags.some( tag => tag.label.indexOf(this.currentInput) === 0);
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
      let currentTag;
      if (this.selectedTagIndex != null) {
        try {
          currentTag = this.currentTags[this.selectedTagIndex];
        } catch(error) { }
      }
      const newTag = {
        value: currentTag ? null : data.value,
        values: currentTag ? currentTag.values : data.values,
        label: currentTag ? currentTag.label : data.label,
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
      this.currentHint = '';
      this.searching = true;
      setTimeout(() => {
        this.searching = false;
        this.searchTags = {};
      }, 2000);
    },

    sortTags(value) {
      this.currentTags = this.tagButtons.slice().sort( (a, b) => {
        const labelA = a.label;
        const labelB = b.label;

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
      this.currentHint = '';
    },

    updateSearchTag(data) {
      this.currentHint = '';
      Object.keys(this.searchTags).forEach(key => {
        const tag = this.searchTags[key];
        Vue.set(this.searchTags, key, (tag.id === data.id) ? {...tag, value: data.value} : tag);
        console.log('updateSearchTag', key, data.value);
      });
    }
  }
});
