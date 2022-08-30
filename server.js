const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally




const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 8081); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Don't let local development give errors

const usersRoute = require("./routes/Users");
const commentsRoute = require("./routes/Comments");
const topicsRoute = require("./routes/Topics");




app.get("/", (req, res) => {
    
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(` 
    <section style="width:100vw;height:100vh;background-color:black;display:flex;flex-direction:column;justify-content:center;algin-items:center;">
    <table style="border:5px solid white;width:fit-content;margin:auto;" >
  <thead>
    <tr>
    <th style="color:white;border:5px solid">Routes</th>
    </tr>
   </thead>
   <tbody>
     <tr>
     <td style="color:white;border:5px solid"><a href="https://capstone-debate.herokuapp.com/topics" style="color:red;">/topics</a></td>
     </tr>
     <tr>
     <td style="color:white;border:5px solid"><a href="https://capstone-debate.herokuapp.com/comments">/comments</a></td>
     </tr>
     <tr>
     <td style="color:white;border:5px solid"><a href="https://github.com/LihleGoliath/Capstone_Backend" >GitHub-Capstone_Backend</a></td>
     </tr>
     <tr>
     <td style="color:white;border:5px solid"><a href="https://capstone-debate.herokuapp.com/users" style="color:green;">/users</a></td>
   </tr>
   <tr>
   <td style="color:white;border:5px solid"><a href="https://capstone-debate.herokuapp.com/LihleGoliath" style="color:yellow;">WaNt TO SeE</a></td>
 </tr>
     <tr>
     </tr>
  </tbody>
</table>


    

    
   

    <h1 style="color:green;font-size:3rem;margin:auto;">Successfully Running {Notice Me}</h1>
    </section>
    `)

});

app.get("/LihleGoliath", (req, res) => {
    res.send(`
    <section style="width:100vw;height:100vh;background-image: url(${"https://i.postimg.cc/RFY6mdkY/glitch-gc12fec9ea-1920.jpg"});background-size:cover;display:flex;justify-content:center;align-items:center;">
        <h1 style="color:white;font-size:3rem;border:2px solid white;background-color:black;">Yoh How are U DoInG? U BeEn HaCkEd </h1>
    </section>
    `)
});

app.use("/users",usersRoute);
app.use("/comments",commentsRoute);
app.use("/topics",topicsRoute);



app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});



