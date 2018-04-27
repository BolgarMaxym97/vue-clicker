<template>
  <div id="main-content">
    <div id="header">
      <div class="row" style="min-height: 10em;">
        <div class="col-md-4">
          <div class="main-title">
            Clicker
          </div>
        </div>
        <div class="col-md-4 text-center justify-content-center align-self-center">
          <div class="info">
            <p><i>Текущее улучшение на клик - </i><b>{{currentClickBoost.toLocaleString()}}</b></p>
            <p><i>Текущее улучшение на клик в секунду - </i><b>{{totalBoostPerSecond.toLocaleString()}}</b></p>
          </div>
        </div>
        <div class="col-md-4">
          <div id="main-block">
            <div id="total-count">{{total.toLocaleString()}}</div>
            <button title="+1" class="btn btn-2 btn-2a" @click="increment(clickBoostItem)">$</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="boost-block">
            <div class="header">
              <div class="row">
                <div class="col-md-6">
                  <div class="title-boost">
                    Улучшения
                  </div>
                </div>
                <div class="col-md-6">
                  <button class="boost-btn-main" @click="clickBoost"
                          :disabled="parseInt(total) < parseInt(clickBoostCost)"><i class="fas fa-mouse-pointer"></i> -
                    {{clickBoostCost.toLocaleString()}} $
                  </button>
                </div>
              </div>
            </div>
            <div class="boost-items">
              <boostItems></boostItems>
            </div>
          </div>
        </div>
        <div class="col-md-6" style="overflow: hidden;">
          <div class="info-window">
            <div class="info-window-content">
              <div v-for="(msg, index) in messages">{{msg}}</div>
              <span class="bootom-align">
              > <span class="flash">__</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        messages: [],
      }
    },
    components: {
      boostItems,
    },
    created: function () {
      // Get data from locale storage
      let dataStart = JSON.parse(localStorage.getItem('saveGame'));
      this.total = dataStart !== null ? dataStart.total : 0;
      this.clickBoostItem = dataStart !== null ? dataStart.clickBoostItem : 1;
      this.clickBoostCost = dataStart !== null ? dataStart.clickBoostCost : 50;
      this.currentClickBoost = dataStart !== null ? dataStart.currentClickBoost : 0;
      this.totalBoostPerSecond = dataStart !== null ? dataStart.totalBoostPerSecond : 0;
      this.messages = dataStart !== null ? dataStart.messages : [];
      if (!dataStart.messages) {
        this.messages = [];
      }
    },
    methods: {
      increment: function (count) {
        this.total += count;
      }, // this function will be used for looping elements
      loop: function (item) {
        let newDate = new Date();
        this.messages.push(newDate.today() + ' ' + newDate.timeNow() + ' Куплено улучшение на клик в секунду - ' + item.name)
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
        let newDate = new Date();
        this.messages.push(newDate.today() + ' ' + newDate.timeNow() + ' Клик увеличен на  - ' + this.clickBoostItem + ' единиц');
        this.currentClickBoost += this.clickBoostItem;
        this.total -= this.clickBoostCost;
        this.clickBoostItem *= this.clickBoostItem % 2 === 0 ? 1.5 : 2;
        this.clickBoostCost *= 4;
      },
    },
  }
</script>

<style>
  #header {
    min-height: 10em;
    background-color: #000000;
    color: #fff;
    position: relative;
    margin-bottom: 5em;
  }

  .info-window .info-window-content {
    bottom: 1em;
    left: 3em;
    position: absolute;
  }

  #header #main-block {
    position: absolute;
    top: 30%;
    right: 2em;
  }

  .flash {
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  #total-count {
    display: inline-block;
    font-size: 36px;
    line-height: 36px;
  }

  .btn-2 {
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    margin: 0 1em 1em 1em;
    padding: 0.5em 1em;
    font-size: 20px;
  }

  .btn-2:hover {
    background-color: #828282;
    color: #000;
    font-weight: bold;
    border: 2px solid #fff
  }

  .btn-2:active {
    margin: 0.1em 1em 1em 1em;
  }

  .info {
    border: solid 1px #fff;
    padding: 2em;
  }

  .info-window {
    min-height: 30em;
    background-color: #adadad;
    border: double 6px #000;
    padding: 1em;
  }

  .boost-items {
    overflow: auto;
    max-height: 22em;
  }

  .boost-block .header {
    border: 1px solid #000;
    padding: 2em;
  }

  .boost-btn-main {
    float: right;
  }

  .boost-block {
    border: 1px solid #000;
  }

  .title-boost {
    font-size: 24px;
    font-weight: bold;
  }

  .main-title {
    font-size: 80px;
    top: 10%;
    position: relative;
    left: 1em;
  }
</style>
