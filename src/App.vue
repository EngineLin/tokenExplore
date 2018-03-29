<template lang='pug'>
#app
  router-view
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang='sass'>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 20px

.row 
  display: flex
</style>
