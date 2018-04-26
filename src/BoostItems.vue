<template>
  <div class="boost-items">
    <div class="boost-item" v-for="(item, index) in boostItems" v-if="index == 0 || boostItems[index - 1].count !== 0">
      <span class="item-name">Имя: <b>{{item.name}}</b></span>
      <span class="item-count">Количество: <b>{{item.count}}</b></span>
      <span class="item-cost">Стоимость: <b>{{parseInt(item.cost).toLocaleString()}}</b></span>
      <span class="item-boost">Кликов в секунду: <b>{{item.boost.toLocaleString()}}</b></span>
      <button class="item-boost-btn" @click="boost(item)" :disabled="parseInt(total) < parseInt(item.cost)">Купить
      </button>
      <span></span>
    </div>
  </div>
</template>

<script>
  import boostItems from './assets/json/boostItems.json'

  export default {
    data() {
      return {
        boostItems: {},
      }
    },
    created: function () {
      let dataStart = JSON.parse(localStorage.getItem('saveBoost'));
      this.boostItems = dataStart !== null ? dataStart : boostItems;
      if (dataStart !== null) {
        for (let i in dataStart) {
          if (dataStart[i].count !== 0) {
            this.startBoost(dataStart[i]);
          } else {
            continue;
          }
        }
      }
      // on close or refresh saveData
      let dataSave = this.$data.boostItems;
      window.onbeforeunload = (e) => {
        e.preventDefault();
        localStorage.setItem('saveBoost', JSON.stringify(dataSave));
        localStorage.setItem('saveGame', JSON.stringify(
          {
            total: this.total,
            clickBoostItem: this.clickBoostItem,
            clickBoostCost: this.clickBoostCost,
            currentClickBoost: this.currentClickBoost,
            totalBoostPerSecond: this.totalBoostPerSecond,
          }));
      };
    },
    computed: {
      total: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.total
      },
      clickBoostItem: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.clickBoostItem
      },
      clickBoostCost: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.clickBoostCost
      },
      currentClickBoost: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.currentClickBoost
      },
      totalBoostPerSecond: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.totalBoostPerSecond
      },
    },
    methods: {
      boost: function (item) {
        this.$parent.loop(item);
        item.cost += parseInt(item.cost) * 0.05;
        item.count++;
      },
      startBoost: function (item) {
        this.$parent.startLoop(item);
      }
    },
  }
</script>

<style>

</style>
