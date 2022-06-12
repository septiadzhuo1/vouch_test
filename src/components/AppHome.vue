<template>
   <v-app style="max-width:425px; margin:auto; text-align:center">
    <v-container>
      <h1 class="join-room">Join Chatroom</h1>
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
          @click="join"
          class="join-button"
        >
          JOIN
      </v-btn>
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
    async join(){
      var data = {
        name:this.name,
        roomID:this.roomID,
      }
      localStorage.setItem("data", JSON.stringify(data))
      if (this.name.length == 0 && this.roomID.length ==0){
        return false
      } 
      await this.$store.commit('assignData', data)
      await this.$socket.emit('joinRoom', data)
      //this.$router.push('chatroom')
    }
  },
  sockets: {
    connect: function () {
       console.log('socket connected')
    },
    joinRoom(message){
      if (message != "Not Allowed"){

        this.$router.push('chatroom')
      } else {
        alert('this username is exist in the chatroom')
      }
    },
  }
}
</script>

<style>
.join-room{
  margin-bottom:45px;
}
.join-button{
  margin-top:120px
}
</style>