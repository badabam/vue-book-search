Vue.component('fulltext-input', {
  template: `
    <input
      type="text"
      @keyup.enter="submit"
      v-model="inputText"
    >
    `,
    data: () => {
      return {
        inputText: ''
      };
    },
    methods: {
      submit: function(event) {
        this.$emit('submit', {
          value: event.target.value,
          title: 'Text search'
        });
        this.inputText = null;
      }
    }
});
