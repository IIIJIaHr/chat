'use strict'
var chatSocket = function(server, UserModel) {
    var io = require('socket.io').listen(server);
    var sockets = [];
    // server.listen(3001);
    io.on('connection', function(socket) {
        sockets.push(socket.id.slice(0));
        socket.on('newUser', function(data) {
            let newUser = new UserModel({ socketId: socket.id, name: data.name });
            newUser.save();
            socket.broadcast.emit('new user', {});
            // console.log(data);
            // UserModel.find({id: '11'}, (err, users) => console.log(users));
        });

        socket.on('new message', function(data) {
            if (data.receivers.length === 0) {
                socket.emit('new message', {
                    name: 'me',
                    text: data.text,
                    image: data.image
                });
                socket.broadcast.emit('new message', {
                    name: data.name,
                    text: data.text,
                    image: data.image
                });
            } else {
                for (let sk of data.receivers) {
                    socket.to(sk).emit('new message', {
                        name: data.name,
                        text: data.text,
                        image: data.image
                    });
                }
            }
        });

        socket.on('check name', function (data) {
            var result = UserModel.findOne({ name: data.name }, function (err, user) {
                if(user){
                    socket.emit('check name', { name: data.name, isExist: true });
                } else {
                    socket.emit('check name', { name: data.name, isExist: false });
                }
            });
        })

        socket.on('disconnect', function () {
            console.log('disconnect');
            UserModel.remove({'socketId': socket.id}, function (err) {
                console.log(err);
            });
            socket.broadcast.emit('user leave');
        });

        socket.on('new id', function (data) {
                
        });
        console.log("connecting");
    });
};

module.exports = chatSocket;
