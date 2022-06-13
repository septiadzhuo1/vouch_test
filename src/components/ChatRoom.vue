<template>
  <v-app style="max-width:425px; margin:auto">
      <v-container> 
        <div style="position:relative">
            <h2 style="text-align:center"  >{{roomID}}</h2>
            <div class="exit" @click="exit">
                <button>
                    Exit
                </button>
            </div>
        </div>
        <div class="chat-history">
            <div class="chats" v-for="(message, index) of messages" v-bind:key="index">
                <div class="foreign-user" v-if="user != message.name" >
                    {{message.name}}
                </div>
                <div class="chat-messages" :class="{'from-me':message.name == user}">
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
            <template v-slot:append >
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
            message:"",
            isHidden:true
        }
    },
    sockets:{
        message(message){
            this.messages.push(message);
           window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight); 
        },
        leaveRoom(message){
            if (message.status == 'disconnected'){
                console.log(this.$store.state.store.RoomID, message.roomID)
                console.log(this.$store.state.store.RoomID, message.roomID)
                if(this.$store.state.store.RoomID == message.roomID && this.$store.state.store.name == message.name){
                    sessionStorage.removeItem("data");
                    this.$store.commit('emptyData')
                    this.$router.push('/')
                }
            }
        },
        connect() {
            console.log('socket connected')
        },
        getChats(message){
            if(message[1] == this.$store.state.store.RoomID){
                this.messages = message[0]
            }
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
            if (this.message.length == 0){
                return false;
            }
            
            var data = {
                message:this.message,
                name:this.$store.state.store.name,
                roomID:this.$store.state.store.RoomID,
            }
            this.message = "";
            this.$socket.emit('message', data)
        },
        exit(){
            var data = {
                name:this.$store.state.store.name,
                roomID:this.$store.state.store.RoomID,
            }
            this.message = "";
            this.$socket.emit('leaveRoom', data)
        }
    },
    async mounted(){

        if (sessionStorage.getItem("data")){
            var data =JSON.parse(sessionStorage.getItem("data"));
            await this.$store.commit('assignData', data)
            await this.$socket.emit('getChats', data)

        }

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
        padding:15px;
        border-radius: 10px 10px 10px 0px;
        position: relative;
        max-width:250px;
        margin-left: 10px;
        word-wrap: break-word;
        margin-right: auto;
        white-space: break-spaces;
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
        margin-right: 10px !important;
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
        margin-top: 35px;
        display: flex;
        flex-direction: column;
    }
    .exit{
        font-size:16px;
        color:#5DB075;
        position: absolute;
        top: 10px;
        font-weight: 700;
        user-select: none;
        padding:10px;
    }
    .exit:hover{
        cursor: pointer;
    }
    h2{
        font-size: 36px;
    }
</style>