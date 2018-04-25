<template>
  <div>
    <h1>{{total.toLocaleString()}}</h1>
    <button @click="increment">+1</button>
    <button @click="loop">loop</button>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        total: 0,
      }
    },
    methods: {
      increment: function () {
        this.total += 1;
      },
      loop: function () {
        setInterval(() => {
          this.increment();
        }, 1000);
      },
    },
  }
</script>

<style>

</style>
