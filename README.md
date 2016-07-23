<<<<<<< HEAD
# green-services
=======
# green-services
​
To run this application for users:
npm install to install all dependances in package.json file.
creating directory for database in terminal or CMD (windows) using mkdir command.
running mongod --dbpath "database directory which created in the previous step"
npm start it will start the listening on localhost port 8000.
​
To run this application for developers:
​
we used (mean) in our programming so mongoose database and express as server, angular for front end 
so our application contain verious schemas 
​
Schemas:
​
1. order schema which include the whole orders issued from verious users.
2. User schema which has full information about each user signed up in our website.
3. service provider schema which include information about special kind of users those users who presents the services.
​
Database Connection:
​
inside the server.js file inside the server folder we are creating the connection with database.
​
Note: each schema which are mentioned above has two folder with two files one for creating the schema "model" and the other for creating the functions which deal with the schema "controller".
​
Server:
​
the server done using express so you can find the configuration for the server inside the route file which is inside the server folder and the listening inside the server file it is listening on port 8000.
​
each server route issues a specific function from database functions inside the controllers.
​
Front end:
​
each view has its own html file and controller we have signin view and the user view and service provider view.
​
app file:
​
each view above must asign to an appropriate controller so app.js file has the routeProvider feature which assign a controller for each view.

Map documentation:

1. when the user or the service provider sign up the function:
    navigator.geolocation.getCurrentPosition()
    will take the position of the user from the user device location .
2. mapOptions: this is the configuration of the main map.
3. Then create the map with this mapOptions.
4. serProvCircle: to create service provider circle on the map based on the location and radius of the service provider. 
5. marker: create the dots on the main map by taking users coordinates from the user order.
6. infoWindow: to display details of the order in the marker once the user click on the order or on the marker itself on the map.
7. userInSerProArea function calculate if the new user's location inside one service provider if so return the name of the service provider.
>>>>>>> 3e315baf292e37126d0b1db9db9ba666433e6680
