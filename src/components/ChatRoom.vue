<template>
  <v-app style="max-width:425px; margin:auto">
      <v-container>
        <h2 style="text-align:center">{{roomID}}</h2>
        <div>exit</div>
        <div class="chat-history">
            <div class="chats" v-for="(message) of messages" v-bind:key="message.message">
                <div class="foreign-user" v-if="user != message.user" >
                    {{message.user}}
                </div>
                <div class="chat-messages" :class="{'from-me':message.user == user}">
                    {{message.message}}
                </div>
            </div>
            
        </div>
        <v-textarea 
            placeholder="Message here..."
            filled
            auto-grow
            rounded
            dense
            rows="1"
            row-height="15"
            v-model="message"
            class="input-message"
        >
            <template v-slot:append>
                <v-btn
                color="#5DB075"
                fab
                @click="submitChat"
                >
                <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
            </template>
        </v-textarea>
      </v-container>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
            messages:[],
            message:""
        }
    },
    sockets:{
        joinRoom(message){
            console.log(message)
        },
        message(message){
            console.log(message)
            this.messages.push(message);
            console.log(this.messages)
        }
    },
    computed:{
        roomID(){
            return this.$store.state.store.RoomID;
        },
        user(){
            return this.$store.state.store.name;
        }
    },
    methods: {
        submitChat(){
            var data = {
                message:this.message,
                user:this.$store.state.store.name,
                roomID:this.$store.state.store.RoomID,
            }
            this.message = "";
            this.$socket.emit('message', data)
        }
    },
    mounted(){
        const currentUsername = this.$store.state.store.name;
        const roomID = this.$store.state.store.RoomID;
        if (roomID == "" & currentUsername == "") {
            this.$router.push('/')
        }
    }
}
</script>

<style>
    .chat-history .chat-messages{
        background:#F6F6F6;
        padding:10px;
        border-radius: 10px 10px 10px 0px;
        position: relative;
        max-width:250px;
        margin-left: 10px;
    }
    .chat-history{
        margin-bottom: 90px;
    }
    .chat-history .chat-messages::after{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: 0px;
        right: auto;
        top: 100%; 
        bottom: auto;
        border-bottom: 20px solid transparent;
        border-left: 20px solid #F6F6F6;
    }
    .from-me{
        background: #5DB075 !important;
        color:#ffffff;
        border-radius: 10px 10px 0px 10px !important;
        margin-left: auto !important;
        margin-right: 10px;
        margin-top: 30px;
    }

    .from-me::after{
        border-bottom: 20px solid transparent;
        border-right: 20px solid #5DB075 !important;
        left: auto !important;
        right: 0px !important;
        border-left:0 !important;
    }
    .v-btn--fab{
        width:34px !important;
        height:34px !important;
    }
    .v-input__append-inner{
        margin:3px 0px 0px 0px !important;
    }
    .input-message{
        position: fixed !important;
        bottom: 5px;
        width:390px;
    }
    .v-input__slot {
        background: #F6F6F6 !important;
    }
    .v-btn--is-elevated.v-btn--fab{
        box-shadow: none !important;
    }
    .v-text-field--rounded>.v-input__control>.v-input__slot{
        padding: 0 10px 0px 20px !important;
    }
    .foreign-user {
        margin-left: 15px;
    }
    .chats {
        margin-top: 30px;
    }
</style>