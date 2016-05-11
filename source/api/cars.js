var cars = function(app, CarModel) {
  app.get('/api/cars', function(req, res) {
    return CarModel.find(function(err, cars) {
      if (!err) {
        return res.send(cars);
      } else {
        return console.error(err);
      }
    });
  });

  app.get('/api/cars/:id', function(req, res) {
    return CarModel.findById(req.params.id, function(err, car) {
      if (!err) {
        return res.send(car);
      } else {
        return console.log(err);
      }
    });
  });

  app.post('/api/cars', function(req, res) {
    var newCar = new CarModel({
      model: req.body.model,
      mark: req.body.mark
    });
    console.log('lala');
    newCar.save(function(err) {
      if (!err) {
        return console.log('created');
      } else {
        return console.error(err);
      }
    });
    console.log('lala2');
    return res.send(newCar);
  });

  app.put('/api/cars/:id', function(req, res) {
    console.log('Updating car ' + req.body.title);
    return CarModel.findById(req.params.id, function(err, car) {
      car.title = req.body.title;
      car.author = req.body.author;
      car.releaseDate = req.body.releaseDate;
      car.keywords = req.body.keywords;

      return car.save(function(err) {
        if (!err) {
          console.log('car updated');
        } else {
          console.log(err);
        }
        return res.send(car);
      });
    });
  });

  //Delete a car
  app.delete('/api/cars/:id', function(req, res) {
    console.log('Deleting car with id: ' + req.params.id);
    return CarModel.findById(req.params.id, function(err, car) {
      return car.remove(function(err) {
        if (!err) {
          console.log('car removed');
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  });
};

module.exports = cars;
