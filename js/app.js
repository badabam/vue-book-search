Vue.component('app', {
  template: `
  <div>
    <search-bar @submit="createSearchTag" @focusMainInput="focusTarget"></search-bar>
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
      searchTags.push({
        value: data.value,
        type: data.title,
        valueType: data.type,
        placeholder: data.placeholder
      });
    },

    focusTarget: function(target) {
      console.log('focusTarget', target);
      target && target.focus();
    }
  },

  data: () => {
    return {
      tagButtons
    }
  }
});
