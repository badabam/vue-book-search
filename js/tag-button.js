Vue.component('tag-button', {
  template: `
  <div class="tag-button" v-bind:class="{selected: selected}" @click="onClick" v-html="htmlText"></div>
  `,
  props: ['initialData', 'highlight', 'selected'],
  data: function() {
    return {
      vm: Object.assign({}, this.initialData)
    };
  },
  computed: {
    htmlText: function () {
      if (this.highlight) {
        const rest = this.vm.title.split(this.highlight)[1];
        return `<strong>${this.highlight}</strong>${rest}`;
      } else {
        return this.vm.title;
      }
    }
  },
  methods: {
    onClick: function() {
      this.$emit('click', this.vm);
    }
  }
});
