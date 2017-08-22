Vue.component('search-tag', {
  template: `
    <div class="search-tag">
      <span class="prefix">{{type}}: </span>
      <span class="value" @click="click" v-if="!editing">{{price(value, valueType)}}</span>
      <span class="suffix" v-if="!editing" @click="remove">&times;</span>
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
    </div>
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
        this.$emit('focusMainInput');
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
