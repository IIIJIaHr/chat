var users = function(app, UserModel) {
  app.get('/api/users', function(req, res) {
    return UserModel.find(function(err, users) {
      if (!err) {
        return res.send(users);
      } else {
        return console.error(err);
      }
    });
  });

  app.get('/api/users/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, user) {
      if (!err) {
        return res.send(user);
      } else {
        return console.log(err);
      }
    });
  });

// add
  app.post('/api/users', function(req, res) {
    var newUser = new UserModel({
      author: req.body.author,
      text: req.body.text
    });
    console.log('lala');
    newUser.save(function(err) {
      if (!err) {
        return console.log('created');
      } else {
        return console.error(err);
      }
    });
    console.log('lala2');
    return res.send(newUser);
  });

// update
  app.put('/api/users/:id', function(req, res) {
    console.log('Updating user ' + req.body.author);
    return UserModel.findById(req.params.id, function(err, user) {
      user.author = req.body.author;
      user.text = req.body.text;

      return user.save(function(err) {
        if (!err) {
          console.log('user updated');
        } else {
          console.log(err);
        }
        return res.send(user);
      });
    });
  });

// delete
  app.delete('/api/users/:id', function(req, res) {
    console.log('Deleting user with id: ' + req.params.id);
    return UserModel.findById(req.params.id, function(err, user) {
      return user.remove(function(err) {
        if (!err) {
          console.log('user removed');
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  });
};

module.exports = users;
