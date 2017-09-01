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
  props: ['items', 'filter', 'startIndex'],

  data() {
    return {
      currentIndex: this.startIndex,
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
    move(y) {
      if (y == null) {
       this.currentIndex = null;
       return;
      }

      if (this.currentIndex == null) {
        this.currentIndex = 0;
        return;
      }

      const newPosition = this.currentIndex + y;
      if (newPosition >= 0 && newPosition <= this.currentItems.length - 1) {
        this.currentIndex = newPosition;
      } else {
        this.currentIndex = null;
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
      console.log('click', this.currentItem);
    }
  }
});
