Vue.component('search-tag', {
  template: `
    <li class="search-tag">
      <span class="prefix">{{type}}: </span>
      <span @click="click" v-if="!editing">{{value}}</span>
      <span v-if="value && !editing" class="suffix" @click="close">&times;</span>
      <input
        class="search-tag__input"
        v-if="!value || editing"
        type="text"
        ref="input"
        v-model="interimValue"
        @blur="blur"
        @change="update"
        @keydown="update"
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
      interimValue: this.data.value,
      editing: null,
    };
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    submit: function(event) {
      if (event.target.value) {
        this.value = this.interimValue = event.target.value;

      }
    },
    destroy: function (event) {
      console.log('destroy', event, this.interimValue);
      if(!this.interimValue) {
        searchTags.splice(this.index, 1);
      }
    },
    update: function(event) {
      this.interimValue = event.target.value;
    },
    blur: function() {
      this.value = this.interimValue;
      this.destroy();
    },
    click: function(event) {
      if (this.value) {
        this.editing = true;
        this.value = null;
      }
    }
  },
  mounted: function() {
    this.$refs.input && this.$refs.input.focus();
  }
});
