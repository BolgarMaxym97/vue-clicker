<template>
  <div class="boost-items">
    <div class="boost-item" v-for="(item, index) in boostItems" v-if="index == 0 || boostItems[index - 1].count !== 0">
      <div class="row">
        <div class="col-md-8">
          <span class="item-name"><img
            :src="'/src/assets/svg/items/'+item.icon+'.svg'">&nbsp;<b>{{item.name}}</b></span>
          <span class="item-count"> | Куплено:  <b title="Количество" style="cursor: pointer;">{{item.count}}</b></span>
          <div class="childrens">
            <div class="child" v-for="(child, childIndex) in item.childrens">
              <!--v-if="childIndex == 0 || item.childrens[childIndex - 1].count !== 0"-->
              <span class="child-item " :title="child.name + ' - улучшает ' + item.name + ' в ' + child.boost + ' раза'"
                    v-bind:class="{ deactive: !child.isActive }">
                <img :src="'/src/assets/svg/items/'+child.icon+'.svg'" :class="child.icon"
                     @click="boost4boost(item, child)"></span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <button class="item-boost-btn" @click="boost(item)" :disabled="parseInt(total) < parseInt(item.cost)">
            <i class="fas fa-money-bill-alt"><b> &nbsp;{{parseInt(item.cost).toLocaleString()}}</b></i>
            =>
            <span class="item-boost"><i class="fas fa-plus-square"
                                        :title="item.boost.toLocaleString() + ' нажатий в секунду'"
                                        style="cursor: pointer;"></i></span>
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
            totalAchivments: this.totalAchivments,
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
      totalAchivments: function () {
        // `this` указывает на экземпляр vm
        return this.$parent.totalAchivments
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
      },
      boost4boost: function (parent, item) {
        item.isActive = false;
        parent.boost *= item.boost;
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

  .childrens {
    margin-top: 5px;
  }

  .childrens .child-item {
    cursor: pointer;
  }

  .child {
    display: inline-block;
  }

  .childrens .child-item:hover {
    background-color: #c1c1c1;
  }

  .childrens {
    margin-top: 1em;
  }

  .childrens .child-item {
    padding: 10px 5px;
    border: 1px solid #000;
    margin: 3px;
  }

  .child-item img {
    width: 2em;
  }

  .deactive {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: #757575;
    background-color: #c1c1c1;
  }

  .item-name img {
    width: 3em;
    cursor: pointer;
  }
</style>
