<template>
   <v-app style="max-width:425px; margin:auto; text-align:center">
    <v-container>
      <h1>Join Chatroom</h1>
      <v-form @submit="join">
        <v-text-field
          label="Username"
          solo
          flat 
          color="#BDBDBD"
          background-color="#F6F6F6"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          label="RoomID"
          solo
          flat 
          color="#BDBDBD"
          background-color="#F6F6F6"
          v-model="roomID"
          required
        ></v-text-field>
        <v-btn
          color="#5DB075"
          rounded
          type="submit"
        >
          JOIN
      </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
export default {
 data() {
    return {
      name:"",
      roomID:"",
    }
  },
  methods:{
    async join(e){
      var data = {
        name:this.name,
        roomID:this.roomID,
      }
       e.preventDefault();
      await this.$store.commit('assignData', data)
      await this.$socket.emit('joinRoom', data)
      this.$router.push('chatroom')
    }
  },
  sockets: {
    connect: function () {
       console.log('socket connected')
    }
  }
}
</script>

<style>

</style>