<template>
  <div id="main-content">
    <div id="total-count">{{total.toLocaleString()}}</div>
    <button @click="increment(100)">+1</button>
    <boostItems></boostItems>
  </div>
</template>

<script>
  import boostItems from './BoostItems.vue';

  export default {
    data: () => {
      return {
        total: 0,
      }
    },
    components: {
      boostItems
    },
    created: function () {
      // Get data from locale storage
      let dataStart = JSON.parse(localStorage.getItem('saveGame'));
      this.total = dataStart !== null ? dataStart.total : 0;
    },
    methods: {
      increment: function (count) {
        this.total += count;
      }, // this function will be used for looping elements
      loop: function (item) {
        this.total -= parseInt(item.cost);
        setInterval(() => {
          this.increment(item.boost);
        }, 1000);
      },
      startLoop: function (item) {
        setInterval(() => {
          this.increment(item.boost);
        }, 1000 / parseInt(item.count));
      },
    },
  }
</script>

<style>

</style>
