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
        const marked = this.vm.label.slice(0, this.highlight.length);
        const rest = this.vm.label.slice(this.highlight.length);
        return `<strong>${marked}</strong>${rest}`;
      } else {
        return `<span>${this.vm.label}</span>`;
      }
    },

    hasHighlight() {
      return this.highlight && this.lowercaseValue.indexOf(this.highlight.toLowerCase()) === 0;
    },

    lowercaseValue() {
      return this.vm.label.toLowerCase();
    }
  },

  methods: {
    onClick() {
      this.$emit('click', this.vm);
    }
  }
});
