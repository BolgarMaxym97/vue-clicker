<template>
  <div>
    <h1>{{total.toLocaleString()}}</h1>
    <button @click="increment(1)">+1</button>
    <button @click="loop(1)">loop</button>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        total: 0,
      }
    },
    created: function () {
      let dataStart = JSON.parse(localStorage.getItem('saveGame'));
      this.total = dataStart !== null ? dataStart.total : 0;

      // on close or refresh saveData
      let dataSave = this.$data;
      window.onbeforeunload = (e) => {
        e.preventDefault();
        localStorage.setItem('saveGame', JSON.stringify(dataSave));
      };
    },
    methods: {
      increment: function (count) {
        this.total += count;
      },
      loop: function (count) {
        setInterval(() => {
          this.increment(count);
        }, 1000);
      },
    },
  }
</script>

<style>

</style>
