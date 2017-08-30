Vue.component('search-tag', {
  template: `
    <div class="search-tag" v-bind:class="{error: hasError, editing: editing}">
      <span @click="click" class="prefix">{{label}}: </span>
      <span @click="click" class="value" v-if="!editing">{{price(value, type)}}</span>
      <span @click="destroy(true)" class="suffix" v-if="!editing">&times;</span>
      <div className="wrapper">
        <input
          class="search-tag__input"
          ref="input"
          type="text"
          v-if="editing"
          v-model="value"
          v-bind:placeholder="placeholder"
          @keyup="saveFilterValue"
          @blur="blur"
          @keydown="keydown"
          @keydown.tab.prevent="submit($event.target.value)"
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
            v-bind:filter="filterValue"
            v-bind:startIndex="this.anyValue ? null : 0"
            @submit="submit"
          />
      </div>
    </div>
  `,
  props: ['data'],
  data() {
    return {
      editing: !this.data.value,
      interimValue: null,
      filterValue: null,
      values: null,
      type: null,
      placeholder: null,
      anyValue: false,
      // jshint ignore:start
      ...this.data
      // jshint ignore:end
    };
  },
  computed: {
    hasError() {
      const result = this.type === 'price' && this.value && !/\d+/.test(this.value);
      return result;
    }
  },
  methods: {
    price: price,

    submit(value) {
      if (this.hasError || !this.editing) {
        return false; // early out
      }

      const suggestions = this.$refs && this.$refs.suggestions;
      console.log('submit', value, this.values, suggestions && suggestions.currentItem, this.anyValue);

      if (this.values) {
        if (this.values.indexOf(value) !== -1) {
          this.stopEditing(value);
          return true;
        } else if ( (suggestions && suggestions.currentItem)) {
          this.stopEditing(suggestions.currentItem);
          return true;
        } else if (suggestions && this.anyValue){
          this.stopEditing(value);
          return true;
        } else {
          this.filterValue = null;
          this.value = null;
          suggestions && suggestions.clear();
          return false;
        }
      } else if (value) {
        this.stopEditing(value);
        return true;
      } else {
        this.destroy();
        return false;
      }
    },

    stopEditing(value) {
      this.value = value.trim();
      this.editing = false;
      this.$emit('editingDone', {id: this.id, value: this.value});
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
      this.$refs && this.$refs.suggestions.move(step);
    },

    checkMulti(event) {
      if (event.key === ',' && this.multi) {
        event.stopImmediatePropagation();
        event.preventDefault();
        const val = event.target.value ? event.target.value.split(',')[0] : null;
        if (this.submit(val)) {
          this.$emit('createAnother', {
            label: this.label,
            value: '',
            values: this.values,
            type: this.type,
            placeholder: this.placeholder,
            multi: this.multi
          });
        }
      }
    },

    blur(event) {
      // const value = event.target.value;
      const suggestions = this.$refs && this.$refs.suggestions;
      const value = this.values && suggestions ? suggestions.currentItem : event.target.value;
      setTimeout(() => this.submit(value), 100);
      // this.submit(value);
    },

    click(event) {
      if (this.value) {
        this.editing = true;
        const value = this.value;
        this.value = null;
        setTimeout(() => {
          this.value = value;
          this.focus();
        });
      }
    },

    focus() {
      this.$refs && this.$refs.input && this.$refs.input.focus();
    }
  },
  mounted() {
    this.focus();
    this.suggestions = this.$refs && this.$refs.suggestions;
    this.$emit('created');
  }
});
