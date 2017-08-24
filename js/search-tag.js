Vue.component('search-tag', {
  template: `
    <div class="search-tag" v-bind:class="{error: hasError, editing: editing}">
      <span @click="click" class="prefix">{{type}}: </span>
      <span @click="click" class="value" v-if="!editing">{{price(value, valueType)}}</span>
      <span @click="destroy(true)" class="suffix" v-if="!editing">&times;</span>
      <input
        class="search-tag__input"
        type="text"
        ref="input"
        v-if="editing"
        v-model="value"
        v-bind:placeholder="placeholder"
        @blur="blur"
        @keydown="saveInterimKey"
        @keyup.delete="destroy()"
        @keyup.enter="submit"
        @keyup.esc="destroy"
        >
    </div>
  `,
  props: ['data'],
  data() {
    return {
      type: this.data.type,
      value: this.data.value,
      valueType: this.data.valueType,
      editing: !this.data.value,
      placeholder: this.data.placeholder,
      interimValue: null,
      id: this.data.id
    };
  },
  computed: {
    hasError() {
      const result = this.valueType === 'price' && this.value && !/\d+/.test(this.value);
      console.log('hasError', result);
      return result;
    }
  },
  methods: {
    price: price,
    submit(event) {
      if (this.hasError) { return; } // early out
      if (event.target.value) {
        this.value = event.target.value;
        this.editing = false;
        this.$emit('focusMainInput');
      } else {
        this.destroy();
      }
    },
    destroy(force) {
      if(!this.value && !this.interimValue || force) {
        this.$emit('destroy', this.id);
      }
    },
    saveInterimKey(event) {
      this.interimValue = event.target.value;
    },
    blur(event) {
      this.value = event.target.value;
      this.editing = false;
      this.destroy();
    },
    click(event) {
      if (this.value) {
        this.editing = true;
        const value = this.value;
        this.value = null;
        this.$refs.input && this.$refs.input.focus();
        setTimeout(() => this.value = value);
      }
    }
  },
  mounted() {
    this.$refs.input && this.$refs.input.focus();
    this.$emit('created');
  }
});
