Vue.component('fulltext-input', {
  template: `
    <input
      class="fulltext-input"
      ref="input"
      type="text"
      v-bind:placeholder="i18n.placeholder"
      v-bind:value="inputText"
      @input="updateValue($event.target.value)"
      @keydown="saveText($event.target.value)"
      @keydown.shift.tab="move(-1)"
      @keyup.shift.tab="move(-1)"
      @keydown.tab.prevent="move(1)"
      @keyup.enter="enter"
      @keyup.delete="destroy"
      @keyup.right="move(1)"
      @keyup.left="move(-1)"
      @keyup.up="move(0, -1)"
      @keyup.down="move(0, 1)"
      @keyup.esc="move(null)"
    >
    `,
    props: ['inputText'],
    data() {
      return {
        i18n: i18n.fulltext,
        savedText: null,
      };
    },

    mounted() {
      this.focus();
    },

    methods: {
      enter(event) {
        if (event.target.value) {
          this.$emit('submit', {
            value: event.target.value,
            label: this.i18n.label
          });
        } else {
          this.$emit('enter');
        }
        this.currentText = null;
      },

      move(x, y) {
        this.$emit('move', x, y);
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
