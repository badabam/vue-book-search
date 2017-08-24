Vue.component('fulltext-input', {
  template: `
    <input
      class="fulltext-input"
      ref="input"
      type="text"
      @keyup.enter="submit"
      @keydown="saveText($event.target.value)"
      @keyup.delete="destroy"
      @input="updateValue($event.target.value)"
      v-bind:value="inputText"
      @keydown.tab.prevent="move(1)"
      @keyup.right="move(1)"
      @keyup.left="move(-1)"
    >
    `,
    props: ['inputText'],
    data() {
      return {
        savedText: null,
      };
    },

    mounted() {
      this.focus();
    },

    methods: {
      submit(event) {
        this.$emit('submit', {
          value: event.target.value,
          title: 'Text search'
        });
        console.log('submit', this.currentText);
        this.currentText = '';
      },

      move(step) {
        console.log('move', step);
        this.$emit('move', step);
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
