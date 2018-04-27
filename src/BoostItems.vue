<template>
  <div class="boost-items">
    <div class="boost-item" v-for="(item, index) in boostItems" v-if="index == 0 || boostItems[index - 1].count !== 0">
      <div class="row">
        <div class="col-md-8">
          <span class="item-name"><i :class="item.icon"></i>&nbsp;<b>{{item.name}}</b></span>
          <span class="item-count"> | Куплено:  <b title="Количество" style="cursor: pointer;">{{item.count}}</b></span>
        </div>
        <div class="col-md-4">
          <button class="item-boost-btn" @click="boost(item)" :disabled="parseInt(total) < parseInt(item.cost)">
            <i class="fas fa-money-bill-alt"><b> &nbsp;{{parseInt(item.cost).toLocaleString()}}</b></i>
            =>
            <span class="item-boost"><i class="fas fa-plus-square" :title="item.boost.toLocaleString() + ' нажатий в секунду'" style="cursor: pointer;"></i></span>
          </button>
        </div>
      </div>
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
            messages: this.messages,
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
      messages: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.messages
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
  .boost-item {
    border: solid 1px #000;
    padding: 0.5em;
    margin: 0.5em;
  }

  .item-boost-btn {
    float: right;
  }
</style>
