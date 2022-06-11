<template>
  <v-app style="max-width:425px;">
      <v-container>
        <h2 style="text-align:center">{{roomID}}</h2>
        <div>exit</div>
        <div class="chat-history">
            <div class="chat-messages">
                1sadasasdsadsadasdasd
            </div>
            <div class="chat-messages">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis. 
            </div>
            <div class="chat-messages from-me">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringi
                lla quam eu faci lisis mollis.
                asdasdasdasdasd
                asdasdasdasdsad
                asdasdad 
            </div>
             <div class="chat-messages">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringi
                lla quam eu faci lisis mollis.
                asdasdasdasdasd
                asdasdasdasdsad
                asdasdad 
            </div>
            <div class="chat-messages from-me">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringi
                asdasdasdasdasd
                asdasdad 
            </div>
            <div class="chat-messages from-me">
                1sadas
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
            class="input-message"
        >
            <template v-slot:append>
                <v-btn
                color="#5DB075"
                fab
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
        }
    },
    sockets:{
        joinRoom(message){
            console.log(message)
            this.messages.push(message)
        }
    },
    computed:{
        roomID(){
            console.log(this.$store.state.store)
            return this.$store.state.store.RoomID
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
        margin-top: 30px;
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
        width:94%;
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
</style>