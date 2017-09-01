Vue.component('search-tag', {
  template: `
    <div class="search-tag" v-bind:class="{
      error: hasError,
      editing: editing,
      'show-suggestions': values && editing
    }">
      <span @click="click" class="prefix">{{label}}: </span>
      <span @click="click" class="value" v-if="!editing">{{value}}</span>
      <span @click="destroy(true)" class="suffix" v-if="!editing">&times;</span>
      <div class="search-tag__wrapper">
        <input
          class="search-tag__input"
          ref="input"
          type="text"
          v-if="editing"
          v-model="value"
          v-bind:placeholder="placeholder"
          v-bind:class="{}"
          v-bind:style="inputStyles"
          @keyup="saveFilterValue"
          @blur="blur"
          @keydown="keydown"
          @keydown.tab.prevent="submit($event.target.value)"
          @keyup.delete="destroy()"
          @keyup.enter="submit($event.target.value)"
          @keyup.esc="destroy"
          @keyup.up="move(0, -1)"
          @keyup.down="move(0, 1)"
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
    return Object.assign({},
      {
        editing: !this.data.value,
        interimValue: null,
        filterValue: null,
        values: null,
        type: null,
        placeholder: null,
        anyValue: false,
        size: null
      },
      this.data
    );
  },
  computed: {
    hasError() {
      const result = this.type === 'price' && this.value && !/\d+/.test(this.value);
      return result;
    },

    inputStyles() {
      return this.size ? {width: `${this.size}px`} : {};
    }
  },
  methods: {
    price: price,

    submit(value) {
      if (this.hasError || !this.editing) {
        return false; // early out
      }

      const suggestions = this.$refs && this.$refs.suggestions;

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
      this.value = value && value.trim();
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

    move(x, y) {
      this.$refs && this.$refs.suggestions.move(y);
    },

    checkMulti(event) {
      if ( ([',', '+'].indexOf(event.key) !== -1) && this.multi) {
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
      const suggestions = this.$refs && this.$refs.suggestions;
      const value = this.values && suggestions ? suggestions.currentItem : event.target.value;
      setTimeout(() => this.submit(value), 100);
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
    },

    getFormatOptions(type) {
      switch(this.type) {
        case 'isbn': return {blocks: [3, 1, 5, 3, 1], delimiter: '-'};
        case 'price': return {
          numeral: true,
          numeralDecimalMark: ',',
          delimiter: '.',
          prefix: '€ ',
          numeralDecimalScale: 2
        };
        case 'date': return {
          blocks: [1, 2, 4],
          delimiters: [' ', '.'],
          value: '= '
        };
        default: return null;
      }
    },
  },
  mounted() {
    this.focus();
    this.suggestions = this.$refs && this.$refs.suggestions;
    this.$emit('created');
    const format = this.getFormatOptions(this.type);
    if (format) {
      new Cleave('.search-tag__input', format);
      this.value = format.value || this.value;
    }
  }
});
