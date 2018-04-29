import Vue from 'vue'
import VTooltip from 'v-tooltip'
import App from './App.vue'

Vue.use(VTooltip);

Date.prototype.today = function () {
  return ((this.getDate() < 10)?"0":"") + this.getDate() +"."+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"."+ this.getFullYear();
};

// For the time now
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

new Vue({
  el: '#app',
  render: h => h(App),
});
