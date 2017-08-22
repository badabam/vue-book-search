var tagButtons = [
  'Author',
  'Release date',
  'Publisher',
  'Price from',
  'Price to',
  'Keyword',
  'Language',
  'Media',
  'ISBN',
];

let searchTags = [
  {type: "Author", value: "Tolkien"},
  {type: "Publisher", value: "Allen & Unwin"},
];

Vue.component('app', {
  template: `
  <div>
    <search-bar></search-bar>
    <section class="advanced">
    <tag-button
      v-for="name in tagButtons"
      @click="onTagButtonClick"
      v-bind:name="name"
      v-bind:key="name" />
    </section>
  </div>
  `,
  methods: {
    onTagButtonClick: function(event) {
      this.createSearchTag(event);
    },
    createSearchTag: function(type, text) {
      searchTags.push({
        type,
        text
      });
    }
  },

  data: () => {
    return {
      tagButtons
    }
  }
});

Vue.component('search-bar', {
  template: `
    <section class="simple">
      <input type="text" name="q">
      <ul class="tags">
        <li
        is="search-tag"
        v-for="(tag, index) in searchTags"
        v-bind:data="tag"
        v-bind:index="index"
        key="tag.type"
        @close="close(index)"
        />
      </ul>
      <button type="submit">Search</button>
    </section>
    `,
    data: () => {
      return {
        searchTags: searchTags
      };
    },
    methods: {
      close: function(index) {
        console.log('close', index);
        searchTags.splice(index, 1);
      }
    }
});

Vue.component('search-tag', {
  template: `
    <li>
      <span class="prefix">{{type}}: </span>
      {{value}}
      <span v-if="value" class="suffix" @click="close">&times;</span>
      <input
        v-if="!value"
        type="text"
        ref="input"
        @blur="blur"
        @keyup.delete="destroy"
        @keyup.enter="submit">
    </li>
  `,
  props: ['data', 'index'],
  data: function() {
    return {
      type: this.data.type,
      value: this.data.value
    };
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    submit: function(event) {
      if (event.target.value) {
        this.value = event.target.value;
      }
    },
    destroy: function () {
      if(!this.$refs.input.value) {
        searchTags.splice(this.index, 1);
      }
    },
    blur: function() {
      console.log('blur');
      this.destroy();
    }
  },
  mounted: function() {
    this.$refs.input && this.$refs.input.focus();
  }
});

Vue.component('tag-button', {
  template: `
  <div @click="onClick()">{{name}}</div>
  `,
  props: ['name'],
  methods: {
    onClick: function() {
      this.$emit('click', this.name);
    }
  }
});

new Vue({
  el: '#app'
});
