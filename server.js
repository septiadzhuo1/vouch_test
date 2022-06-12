const mongo = require('mongodb').MongoClient;
const client =require('socket.io')(4001, {
    cors: {
      origin: "*",
    }
  });
const url = "mongodb://localhost:27017/";
const moment = require('moment');

mongo.connect(url, (err, db) => {
    if(err){
        throw err;
    }
    var dbo = db.db("vouch_test");
    console.log('MongoDB connected...');

    client.on('connection', (socket)=> {
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
                        client.to(data.roomID).emit('joinRoom', 'Allowed');
                    })
                } else {
                    client.to(data.roomID).emit('joinRoom', 'Not Allowed');
                }
            })
        })
        socket.on('message', (data) => {
            console.log(data)
            client.to(data.roomID).emit('message', data)
        })
        socket.on('leaveRoom', (data) => {
            console.log('leave room', data)
            participants.deleteOne({name:data.user, roomID:data.roomID}, (err, result)=> {
                if (err) throw err;
                console.log("1 data deleted");
            })
            client.to(data.roomID).emit('leaveRoom', 'disconnected')
        })
    });
})