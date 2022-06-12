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
        // Handle input events
        
        socket.on('joinRoom', (data) => {
            socket.join(data.roomID)

            /*
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
                    })
                } else {
                    console.log('this useer is in the chatroom')
                }
            })*/
            console.log(data.roomID)
            client.to(data.roomID).emit('joinRoom', data.roomID);

        })
        socket.on('message', (data) => {
            client.to(data.roomID).emit('message', data)
        })
    });
})