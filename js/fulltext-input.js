Vue.component('fulltext-input', {
  template: `
    <input
      ref="input"
      type="text"
      @keyup.enter="submit"
      @keydown="saveText"
      @keyup.delete="destroy"
      @input="updateValue"
      v-bind:value="currentText"
    >
    `,
    props: ['inputText'],
    data: () => {
      return {
        savedText: null,
        currentText: this.inputText
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
        this.currentText = '';
      },

      updateValue: function(event) {
        this.$emit('update', event.target.value);
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
