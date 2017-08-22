Vue.component('search-tag', {
  template: `
    <li class="search-tag">
      <span class="prefix">{{type}}: </span>
      <span @click="click" v-if="!editing">{{price(value, valueType)}}</span>
      <span v-if="!editing" class="suffix" @click="remove">&times;</span>
      <input
        class="search-tag__input"
        type="text"
        ref="input"
        v-if="editing"
        v-model="value"
        v-bind:placeholder="placeholder"
        @blur="blur"
        @keydown="saveInterimKey"
        @keyup.delete="destroy"
        @keyup.enter="submit"
        @keyup.esc="destroy"
        >
    </li>
  `,
  props: ['data', 'index'],
  data: function() {
    return {
      type: this.data.type,
      value: this.data.value,
      valueType: this.data.valueType,
      editing: !this.data.value,
      placeholder: this.data.placeholder,
      interimValue: null
    };
  },
  methods: {
    price: price,
    remove: function() {
      this.$emit('close');
    },
    submit: function(event) {
      if (event.target.value) {
        this.value = event.target.value;
        this.editing = false;
      }
    },
    destroy: function (event) {
      if(!this.value && !this.interimValue) {
        this.remove();
      }
    },
    saveInterimKey: function(event) {
      this.interimValue = event.target.value;
    },
    blur: function(event) {
      this.value = event.target.value;
      this.editing = false;
      this.destroy();
    },
    click: function(event) {
      if (this.value) {
        this.editing = true;
        const value = this.value;
        this.value = null;
        this.$refs.input && this.$refs.input.focus();
        setTimeout(() => this.value = value);
      }
    }
  },
  mounted: function() {
    this.$refs.input && this.$refs.input.focus();
  }
});
