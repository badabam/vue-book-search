Vue.component('search-tag', {
  template: `
    <div class="search-tag" v-bind:class="{error: hasError, editing: editing}">
      <span @click="click" class="prefix">{{title}}: </span>
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
        @keydown="keydown"
        @keyup.delete="destroy()"
        @keyup.enter="submit($event.target.value)"
        @keyup.esc="destroy"
        >
    </div>
  `,
  props: ['data'],
  data() {
    return {
      title: this.data.title,
      value: this.data.value,
      valueType: this.data.valueType,
      editing: !this.data.value,
      placeholder: this.data.placeholder,
      multi: this.data.multi,
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

    submit(value) {
      if (this.hasError) { return; } // early out
      if (value) {
        this.value = value;
        console.log('submit', this.value, value);
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

    keydown(event) {
      this.saveInterimValue(event);
      this.checkMulti(event);
    },

    saveInterimValue(event) {
      this.interimValue = event.target.value;
    },

    checkMulti(event) {
      if (event.key === ',' && this.multi) {
        event.stopImmediatePropagation();
        event.preventDefault();
        const val = event.target.value.split(',')[0];
        this.submit(val);
        this.$emit('createAnother', {
          title: this.title,
          value: '',
          valueType: this.valueType,
          placeholder: this.placeholder,
          multi: this.multi
        });
      }
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
        setTimeout(() => {
          this.value = value;
          this.$refs.input && this.$refs.input.focus()
        });
      }
    }
  },
  mounted() {
    this.$refs.input && this.$refs.input.focus();
    this.$emit('created');
  }
});
