
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://septiadi:septiadi11@cluster0.84nyz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const clientIO =require('socket.io')(process.env.PORT || 8880, {
    cors: {
      origin: "*",
    }
  });
const moment = require('moment');
client.connect(err => {
    console.log('MongoDB connected...');

    //const participants = client.db("vouch_test").collection("participants");

    clientIO.on('connection', (socket)=> {
        const participants = client.db("vouch_test").collection("participants");
        const chats = client.db("vouch_test").collection("chats");
        
        socket.on('joinRoom', (data) => {
            socket.join(data.roomID)
            console.log(data.roomID)
            participants.findOne({name:data.name, roomID:data.roomID}, (err, result)=> {
                if (err) throw err

                data.joinedDate = moment().toISOString();
                data.user_session = socket.id; 
                if (result == null){
                    participants.insertOne(data, (err, result)=> {
                        if (err) throw err;
                        console.log("1 data inserted");
                        clientIO.to(data.roomID).emit('joinRoom', 'Allowed');
                    })
                } else {
                    clientIO.to(data.roomID).emit('joinRoom', 'Not Allowed');
                }
            })
        })
        socket.on('message', (data) => {
            clientIO.to(data.roomID).emit('message', data);
            chats.insert({name: data.name, message: data.message, roomID:data.roomID, dateMessage:moment().toISOString()}, function(err, result){
            })
        })
        socket.on('getChats', (data)=>{
            socket.join(data.roomID)
            var query = { roomID:data.roomID}
                chats.find(query).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    clientIO.emit('getChats', result, data.roomID)
                });
        })
        socket.on('leaveRoom', (data) => {
            participants.deleteOne({name:data.name, roomID:data.roomID}, (err, result)=> {
                if (err) throw err;
                console.log("1 data deleted");
            })
            const status = {
                status:'disconnected',
                name:data.name,
                roomID:data.roomID
            }
            clientIO.to(data.roomID).emit('leaveRoom', status)
        })
    });
});
