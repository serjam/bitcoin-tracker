<template>
  <div id="app">
      <h1>tango</h1>
    <!-- <img src="./assets/logo.png"> -->
    <HelloWorld/>
    <tango/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import tango from './components/tango'

export default {
  name: 'App',
  components: {
    HelloWorld,
    tango
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
