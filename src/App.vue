<template>
 <div>
   <router-view></router-view>
 </div>
</template>

<script>
//import io from "socket.io-client"
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.v-text-field--outlined >>> fieldset {
  border-color: #f6f6f6;
}

.v-application .primary-text {
  color:#f6f6f6;
}

.v-btn {
  width: 100%;
}

.v-btn .v-btn__content {
  color:white;
}
</style>
