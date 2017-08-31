Vue.component('tag-button', {
  template: `
  <div
    class="tag-button"
    v-bind:class="{
      selected: selected,
      highlight: doFilter && hasHighlight,
      low: doFilter && !hasHighlight
    }"
    @click="onClick"
    v-html="htmlText">
  </div>
  `,
  props: ['initialData', 'highlight', 'selected', 'doFilter'],
  data() {
    return {
      vm: Object.assign({}, this.initialData),
    };
  },
  computed: {
    htmlText() {
      if (this.highlight && this.hasHighlight) {
        const rest = this.vm.label.split(this.highlight)[1];
        return `<strong>${this.highlight}</strong>${rest}`;
      } else {
        return `<span>${this.vm.label}</span>`;
      }
    },
    hasHighlight() {
      return this.highlight && this.vm.label.indexOf(this.highlight) === 0;
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.vm);
    }
  }
});
