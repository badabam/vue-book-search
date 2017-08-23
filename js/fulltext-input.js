Vue.component('fulltext-input', {
  template: `
    <input
      type="text"
      @keyup.enter="submit"
      @keydown="saveText"
      @keyup.delete="destroy"
      v-model="inputText"
    >
    `,
    data: () => {
      return {
        inputText: '',
        savedText: null
      };
    },
    methods: {
      submit: function(event) {
        this.$emit('submit', {
          value: event.target.value,
          title: 'Text search'
        });
        this.inputText = null;
      },

      saveText: function(event) {
        this.savedText = event.target.value;
      },

      destroy: function(event) {
        if (!this.savedText) {
          this.$emit('destroy');
        }
      }
    }
});
