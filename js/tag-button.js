Vue.component('tag-button', {
  template: `
  <div class="tag-button" @click="onClick" v-html="vm.title"></div>
  `,
  props: ['initialData', 'highlight'],
  data: function() {
    return {
      vm: Object.assign({}, this.initialData),
    };
  },
  calculated: {
    htmlText: function () {
      return `${vm.title}`;
    }
  },
  methods: {
    onClick: function() {
      this.$emit('click', this.vm);
    }
  }
});
