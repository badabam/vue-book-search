Vue.component('app', {
  template: `
  <div>
    <search-bar></search-bar>
    <section class="tag-buttons">
      <tag-button
        v-for="data in tagButtons"
        @click="onTagButtonClick"
        v-bind:initialData="data"
        v-bind:key="data.title" />
    </section>
  </div>
  `,

  methods: {
    onTagButtonClick: function(data) {
      this.createSearchTag(data);
    },

    createSearchTag: function(data) {
      searchTags.push({
        type: data.title,
        dataType: data.type
      });
    }
  },

  data: () => {
    return {
      tagButtons
    }
  }
});
