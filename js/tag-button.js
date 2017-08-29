Vue.component('tag-button', {
  template: `
  <div
    class="tag-button"
    v-bind:class="{
      selected: selected,
      highlight: hasHighlight,
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
        const rest = this.vm.title.split(this.highlight)[1];
        return `<strong>${this.highlight}</strong>${rest}${this.vm.multi ? '<sup>+</sup>': ''}`;
      } else {
        return `<span>${this.vm.title}${this.vm.multi ? '<sup>+</sup>': ''}</span>`;
      }
    },
    hasHighlight() {
      return this.vm.title.indexOf(this.highlight) === 0;
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.vm);
    }
  }
});
