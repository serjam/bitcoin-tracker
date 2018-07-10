<template>
    <span>yo big brass {{object}}</span>
</template>



<script>
export default {
  object: 'tango',
  data () {
    return {
      object: 'donkadonk'
      
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: aquamarine;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
