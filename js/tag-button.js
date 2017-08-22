Vue.component('tag-button', {
  template: `
  <div class="tag-button" @click="onClick">{{vm.title}}</div>
  `,
  props: ['initialData'],
  data: function() {
    return {
      vm: Object.assign({}, this.initialData)
    };
  },
  methods: {
    onClick: function() {
      this.$emit('click', this.vm);
    }
  }
});
