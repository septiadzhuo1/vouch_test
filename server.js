
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://septiadi:septiadi11@cluster0.84nyz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const clientIO =require('socket.io')(8880, {
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
            console.log(data)
            participants.findOne({name:data.name, roomID:data.roomID}, (err, result)=> {
                if (err) throw err
                console.log(moment(new Date()).format("DD/MM/YYYY HH:mm:ss "))
                data.joinedDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss ");
                data.user_session = socket.id; 
                console.log(result, data)
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
            chats.insert({user: data.user, message: data.message, roomID:data.roomID, dateMessage:moment(new Date()).format("DD/MM/YYYY HH:mm:ss ")}, function(err, result){
                console.log(result)
            })
        })
        socket.on('getChats', (data)=>{
            var query = {user:data.name, roomID:data.roomID}
            socket.join(data.roomID)
            chats.find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result)
                clientIO.emit('getChats', result)
            });
            
        })
        socket.on('leaveRoom', (data) => {
            console.log('leave room', data)
            participants.deleteOne({user:data.user, roomID:data.roomID}, (err, result)=> {
                if (err) throw err;
                console.log("1 data deleted");
            })
            clientIO.to(data.roomID).emit('leaveRoom', 'disconnected')
        })
    });
});
/*
mongo.connect(url, (err, db) => {
    if(err){
        throw err;
    }
    var dbo = db.db("vouch_test");
    console.log('MongoDB connected...');

    clientIO.on('connection', (socket)=> {
        var participants = dbo.collection("participants");
        
        socket.on('joinRoom', (data) => {
            socket.join(data.roomID)
            console.log(data)
            participants.findOne({name:data.name, roomID:data.roomID}, (err, result)=> {
                if (err) throw err
                console.log(moment(new Date()).format("DD/MM/YYYY HH:mm:ss "))
                data.joinedDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss ");
                data.user_session = socket.id; 
                console.log(result, data)
                if (result == null){
                    participants.insertOne(data, (err, result)=> {
                        if (err) throw err;
                        console.log("1 data inserted");
                        clientIO.to(data.roomID).emit('joinRoom', 'Allowed');
                    })
                } else {
                    client.to(data.roomID).emit('joinRoom', 'Not Allowed');
                }
            })
        })
        socket.on('message', (data) => {
            console.log(data)
            clientIO.to(data.roomID).emit('message', data)
        })
        socket.on('leaveRoom', (data) => {
            console.log('leave room', data)
            participants.deleteOne({name:data.user, roomID:data.roomID}, (err, result)=> {
                if (err) throw err;
                console.log("1 data deleted");
            })
            clientIO.to(data.roomID).emit('leaveRoom', 'disconnected')
        })
    });
})*/