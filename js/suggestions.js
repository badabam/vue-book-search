Vue.component('suggestions', {
  template: `
  <section class="suggestions">
    <div
      class="suggestions__item"
      v-for="(item, index) in currentItems"
      @click="click(index)"
      v-bind:class="{selected: currentIndex === index}"
    >{{item}}</div>
  </section>
  `,
  props: ['items', 'filter'],

  data() {
    return {
      items: null,
      currentIndex: 0
    };
  },

  created() {
    this.items.sort();
  },

  computed: {
    currentItem() {
      return this.currentItems[this.currentIndex];
    },

    currentItems() {
      return this.filter ? this.items.filter(x => x.indexOf(this.filter) === 0) : this.items;
    }
  },

  methods: {
    move(step) {
      if (step == null) return this.currentIndex = null;
      const newPosition = this.currentIndex + step;
      if (newPosition >= 0 && newPosition <= this.currentItems.length -1) {
        this.currentIndex = newPosition;
      }
    },

    submit() {
      if(!this.currentItem) {
        return;
      }
      this.$emit('submit', this.currentItem);
    },

    clear() {
      this.currentIndex = 0;
    },

    click(index) {
      this.currentIndex = index;
      this.submit();
    }
  }
});
