<template>
  <div id="main-content">
    <div id="total-count">{{total.toLocaleString()}}</div>
    <button @click="increment(clickBoostItem)">+1</button>
    <button @click="clickBoost" :disabled="parseInt(total) < parseInt(clickBoostCost)">Увеличить на {{clickBoostItem}} -
      стоимость {{clickBoostCost}}
    </button>
    <p>Текущий буст на клик {{currentClickBoost}}</p>
    <p>Текущий буст в секунду {{totalBoostPerSecond}}</p>
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
        currentClickBoost: 0,
        totalBoostPerSecond: 0,
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
      this.currentClickBoost = dataStart !== null ? dataStart.currentClickBoost : 0;
      this.totalBoostPerSecond = dataStart !== null ? dataStart.totalBoostPerSecond : 0;
    },
    methods: {
      increment: function (count) {
        this.total += count;
      }, // this function will be used for looping elements
      loop: function (item) {
        this.total -= parseInt(item.cost);
        this.totalBoostPerSecond += parseInt(item.boost);
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
        this.currentClickBoost += this.clickBoostItem;
        this.total -= this.clickBoostCost;
        this.clickBoostItem *= this.clickBoostItem % 2 === 0 ? 1.5 : 2;
        this.clickBoostCost *= 2;
      },
    },
  }
</script>

<style>

</style>
