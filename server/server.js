
//Set dependencies by stating them in const
const express = require('express');
const cors = require('cors');
const app = express();




//Set up routes
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config"); //Connect to database
require("./routes/note.routes")(app); //Import routes and pass (app)


app.listen(8000, () => {
    console.log("~~ You Are Now Listening to Port ***8000*** The App. The Dojo's Premier App Station!")
    console.log("~~ Get Your Backend Moving With Port 8000 The App!")
})