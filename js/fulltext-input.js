Vue.component('fulltext-input', {
  template: `
    <input
      class="fulltext-input"
      ref="input"
      type="text"
      v-bind:value="inputText"
      @input="updateValue($event.target.value)"
      @keydown="saveText($event.target.value)"
      @keydown.tab.prevent="move(1)"
      @keyup.enter="submit"
      @keyup.delete="destroy"
      @keyup.right="move(1)"
      @keyup.left="move(-1)"
      @keyup.esc="move(null)"
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
