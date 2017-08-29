Vue.component('search-tag', {
  template: `
    <div class="search-tag" v-bind:class="{error: hasError, editing: editing}">
      <span @click="click" class="prefix">{{title}}: </span>
      <span @click="click" class="value" v-if="!editing">{{price(value, valueType)}}</span>
      <span @click="destroy(true)" class="suffix" v-if="!editing">&times;</span>
      <div className="wrapper">
        <input
          class="search-tag__input"
          type="text"
          ref="input"
          v-if="editing"
          v-model="value"
          v-bind:placeholder="placeholder"
          @keyup="saveFilterValue"
          @keydown="keydown"
          @keyup.delete="destroy()"
          @keyup.enter="submit($event.target.value)"
          @keyup.esc="destroy"
          @keyup.up="move(-1)"
          @keyup.down="move(1)"
          >
          <suggestions
            ref="suggestions"
            v-if="values && editing"
            v-bind:items="values"
            @submit="submit"
            v-bind:filter="filterValue" />
      </div>
    </div>
  `,
  props: ['data'],
  data() {
    return {
      editing: !this.data.value,
      interimValue: null,
      filterValue: null,
      // jshint ignore:start
      ...this.data
      // jshint ignore:end
    };
  },
  computed: {
    hasError() {
      const result = this.valueType === 'price' && this.value && !/\d+/.test(this.value);
      return result;
    }
  },
  methods: {
    price: price,

    submit(value) {
      if (this.hasError) { return; } // early out

      if (this.values) {
        if (this.values.indexOf(this.value) !== -1) {
          this.stopEditing(this.value);
        } else if (this.suggestions.currentItem) {
          this.stopEditing(this.suggestions.currentItem);
        } else {
          this.filterValue = null;
          this.value = null;
          this.suggestions.clear();
        }
      } else if (value) {
        this.stopEditing(value);
      } else {
        this.destroy();
      }
    },

    stopEditing(value) {
      this.value = value.trim();
      this.editing = false;
      this.$emit('focusMainInput');

    },

    destroy(force) {
      if(!this.value && !this.interimValue || force) {
        this.$emit('destroy', this.id);
      }
    },

    saveFilterValue(event) {
      this.filterValue = event.target.value;
    },

    keydown(event) {
      this.saveInterimValue(event);
      this.checkMulti(event);
    },

    saveInterimValue(event) {
      this.interimValue = event.target.value;
    },

    move(step) {
      this.suggestions && this.suggestions.move(step);
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
    this.suggestions = this.$refs && this.$refs.suggestions;
  }
});
