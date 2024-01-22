const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});
//for large entity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
//Routes

const attestationRoute = require ("./app/routes/attestation.routes")
const calendarRoute = require ("./app/routes/calendar.routes")
const courseRoute = require ("./app/routes/course.routes")
const formulaireStageRoute = require ("./app/routes/formulaireStage.routes")
const noteRoute = require ("./app/routes/note.routes")
app.use("/attestation",attestationRoute)
app.use("/calendar",calendarRoute)
app.use("/course",courseRoute)
app.use("/formulaireStage",formulaireStageRoute)
app.use("/note",noteRoute)




app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Compus application." });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://localhost:27017/Compus`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });






//   function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "etudiant"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'etudiant' to roles collection");
//         });
  
//         new Role({
//           name: "modScolarite"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'scolarite' to roles collection");
//         });

//         new Role({
//             name: "prof"
//           }).save(err => {
//             if (err) {
//               console.log("error", err);
//             }
    
//             console.log("added 'prof' to roles collection");
//           });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }


  ///roles

async function initial() {
    try {
        let count = await Role.estimatedDocumentCount();
        if (count === 0) {
            await addRole("etudiant");
            await addRole("modScolarite");
            await addRole("prof");
            await addRole("admin");
        }
    } catch (err) {
        console.error("Initial role setup error: ", err);
    }
}

async function addRole(roleName) {
    try {
        const role = new Role({ name: roleName });
        await role.save();
        console.log(`added '${roleName}' to roles collection`);
    } catch (err) {
        console.error(`Error adding role ${roleName}: `, err);
    }
}
