var messages = function(app, MessageModel) {
  app.get('/api/messages', function(req, res) {
    return MessageModel.find(function(err, messages) {
      if (!err) {
        console.log(messages);
        return res.send(messages);
      } else {
        return console.error(err);
      }
    });
  });

  app.get('/api/messages/:id', function(req, res) {
    return MessageModel.findById(req.params.id, function(err, message) {
      if (!err) {
        return res.send(message);
      } else {
        return console.log(err);
      }
    });
  });

// add
  app.post('/api/messages', function(req, res) {
    var newMessage = new MessageModel({
      author: req.body.author,
      text: req.body.text
    });
    console.log('lala');
    newMessage.save(function(err) {
      if (!err) {
        return console.log('created');
      } else {
        return console.error(err);
      }
    });
    console.log('lala2');
    return res.send(newMessage);
  });

// update
  app.put('/api/messages/:id', function(req, res) {
    console.log('Updating message ' + req.body.author);
    return MessageModel.findById(req.params.id, function(err, message) {
      message.author = req.body.author;
      message.text = req.body.text;

      return message.save(function(err) {
        if (!err) {
          console.log('message updated');
        } else {
          console.log(err);
        }
        return res.send(message);
      });
    });
  });

// delete
  app.delete('/api/messages/:id', function(req, res) {
    console.log('Deleting message with id: ' + req.params.id);
    return MessageModel.findById(req.params.id, function(err, message) {
      return message.remove(function(err) {
        if (!err) {
          console.log('message removed');
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  });
};

module.exports = messages;
