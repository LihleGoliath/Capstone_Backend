const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally




const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 8080); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Don't let local development give errors

const usersRoute = require("./routes/Users");
const commentsRoute = require("./routes/Comments");
const topicsRoute = require("./routes/Topics");





app.get("/", (req, res) => {
    res.send(` 
    <section style="width:100vw;height:100vh;background-color:black;display:flex;justify-content:center;align-items:center;">
    <h1 style="color:green;font-size:3rem;">Successfully Running {Notice Me}</h1>
    </section>
    `)

    res.json({ msg: "Welcome" });
});

app.use("/users",usersRoute);
app.use("/comments",commentsRoute);
app.use("/topics",topicsRoute);



app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});



