<template>
  <div id="main-content">
    <div id="total-count">{{total.toLocaleString()}}</div>
    <button @click="increment(clickBoostItem)">+1</button>
    <button @click="clickBoost" :disabled="parseInt(total) < parseInt(clickBoostCost)">clickBoost {{clickBoostItem * 2}}
      cost {{clickBoostCost}}
    </button>
    <boostItems></boostItems>
  </div>
</template>

<script>
  import boostItems from './BoostItems.vue';

  export default {
    data: () => {
      return {
        total: 0,
        clickBoostItem: 1,
        clickBoostCost: 50,
      }
    },
    components: {
      boostItems
    },
    created: function () {
      // Get data from locale storage
      let dataStart = JSON.parse(localStorage.getItem('saveGame'));
      this.total = dataStart !== null ? dataStart.total : 0;
      this.clickBoostItem = dataStart !== null ? dataStart.clickBoostItem : 1;
      this.clickBoostCost = dataStart !== null ? dataStart.clickBoostCost : 50;
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
      clickBoost: function () {
        this.total -= this.clickBoostCost;
        this.clickBoostItem *= 2;
        this.clickBoostCost *= 2;
      },
    },
  }
</script>

<style>

</style>
