Vue.component('fulltext-input', {
  template: `
    <input
      ref="input"
      type="text"
      @keyup.enter="submit"
      @keydown="saveText"
      @keyup.delete="destroy"
      @keyup="keyup"
      v-model="inputText"
    >
    `,
    data: () => {
      return {
        inputText: '',
        savedText: null
      };
    },

    mounted: function() {
      this.$refs.input && this.$refs.input.focus();
    },

    methods: {
      submit: function(event) {
        this.$emit('submit', {
          value: event.target.value,
          title: 'Text search'
        });
        this.inputText = null;
      },

      keyup: function() {
        this.$emit('update', this.inputText);
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
