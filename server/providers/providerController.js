var Provider = require('./providerModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

// Promisify a few mongoose methods with the `q` promise library
var createProvider = Q.nbind(Provider.create, Provider);
var findProvider = Q.nbind(Provider.findOne, Provider);

module.exports = {

  signinAsServiceProvider: function (req, res, next) {
    var username = req.body.providerName;
    var password = req.body.password;

    findProvider({username: username})
      .then(function (provider) {
        if (!provider) {
          next(new Error('provider does not exist'));
        } else {
          return provider.comparePasswords(password)
            .then(function (foundprovider) {
              if (foundprovider) {
                var token = jwt.encode(provider, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No provider'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },
  signupAsProvider: function (req, res, next) {
    var username = req.body.providerName;
    var password = req.body.password;
    var fullName = req.body.fullName;
    var serviceType = req.body.serviceType;
    var price = req.body.price;
    var phoneNumber = req.body.phoneNumber;
    var address = req.body.address;
    var center = req.body.center;
    var radius = req.body.area;
    console.log(center, radius)


    // check to see if user already exists
    findProvider({username: username})
      .then(function (provider) {
        if (provider) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          return createProvider({
            username: username,
            password: password,
            fullName: fullName,
            serviceType: serviceType,
            price: price,
            phoneNumber: phoneNumber,
            address: address,
            center: center,
            radius: radius
          });
        }
      })
      .then(function (provider) {
        // create token to send back for auth
        var token = jwt.encode(provider, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

    checkAuthProvider: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var provider = jwt.decode(token, 'secret');
      findProvider({username: provider.username})
        .then(function (foundProvider) {
          if (foundProvider) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
