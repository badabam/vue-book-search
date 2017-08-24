Vue.component('fulltext-input', {
  template: `
    <input
      ref="input"
      type="text"
      @keyup.enter="submit"
      @keydown="saveText($event.target.value)"
      @keyup.delete="destroy"
      @input="updateValue($event.target.value)"
      v-bind:value="inputText"
    >
    `,
    props: ['inputText'],
    data: () => {
      return {
        savedText: null,
      };
    },

    mounted: function() {
      this.focus();
    },

    methods: {
      submit(event) {
        this.$emit('submit', {
          value: event.target.value,
          title: 'Text search'
        });
      },

      updateValue(value) {
        this.$emit('update', value);
      },

      saveText(value) {
        this.savedText = value;
      },

      focus() {
        this.$refs.input && this.$refs.input.focus();
      },

      destroy() {
        if (!this.savedText) {
          this.$emit('destroy');
        }

      }
    }
});
