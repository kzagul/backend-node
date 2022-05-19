const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser"); 

require('dotenv').config();



const app = express();

var corsOptions = {
  // origin: "http://localhost:8081"
  origin:  "https://kzagul-itrvb-frontend.herokuapp.com"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

//url links
app.use(cors())
app.use(express.json())

const directorRouter = require('./app/routes/director.routes')
const locateRouter = require('./app/routes/locate.routes')
const contactsRouter = require('./app/routes/contacts.routes')
const trainerRouter = require('./app/routes/trainer.routes')
const sportObjectRouter = require('./app/routes/sportobject.routes')
const sportInstitutionRouter = require('./app/routes/sportinstitution.routes')


app.use('/api', directorRouter)
app.use('/api', locateRouter)
app.use('/api', contactsRouter)
app.use('/api', trainerRouter)
app.use('/api', sportObjectRouter)
app.use('/api', sportInstitutionRouter)




app.get("/", (req, res) => {
  res.json({ message: "SPORT node.js application by K.Zagul" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}