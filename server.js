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
 
    <section style="overflow-x:hidden;padding:10px;width:100vw;height:fit-content;background-color:black;display:flex;flex-direction:column;justify-content:center;algin-items:center;">
    <h1 style="color:green;font-size:3rem;margin:auto;">Successfully Running {Notice Me}</h1>

    <table style="border:5px solid green;width:fit-content;margin:auto;" >
  <thead>
    <tr>
    <th style="color:white;border-bottom:5px solid; font-size:3rem">Routes</th>
    <th style="color:white;border-bottom:5px solid; font-size:3rem">Methods</th>
    </tr>

   </thead>
   <tbody>
     <tr>
     <td class="Link" style="color:white;border-bottom:2px solid white;" ><a href="https://capstone-debate.herokuapp.com/topics" style="color:white;font-size:2rem;">/topics</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     
     <tr>
     <td class="Link" style="color:white;border-bottom:2px solid white;" ><a href="https://capstone-debate.herokuapp.com/topics/2" style="color:white;font-size:2rem;">/topics/:id</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     <tr>
     <td class="Link" style="color:white;border-bottom:2px solid white;" ><a href="https://capstone-debate.herokuapp.com/topics/2" style="color:white;font-size:2rem;">/topics/:id</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Delete</td>
     </tr>
     <tr>
     <td class="Link" style="color:white;border-bottom:2px solid white;" ><a href="https://capstone-debate.herokuapp.com/topics/2" style="color:white;font-size:2rem;">/topics/:id/for_topic or Against_topic</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Put</td>
     </tr>
     <tr>
     <td class="Link" style="color:white;border-bottom:2px solid white;" ><a href="https://capstone-debate.herokuapp.com/topics/2" style="color:white;font-size:2rem;">/topics/:id</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Patch</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/comments" style="color:white;font-size:2rem;">/comments</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/comments" style="color:white;font-size:2rem;">/comments/view</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/comments" style="color:white;font-size:2rem;">/comments/topic/:id</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/comments" style="color:white;font-size:2rem;">/comments</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Post</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/comments/5" style="color:white;font-size:2rem;">/comments/:id</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Delete</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users" style="color:white;font-size:2rem;">/users/register</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Post</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users" style="color:white;font-size:2rem;">/users/login</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Patch</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users" style="color:white;font-size:2rem;">/users/verify</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
     <tr>
     <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users" style="color:white;font-size:2rem;">/users</a></td>
     <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
     </tr>
   <tr>
   <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users/3" style="color:white;font-size:2rem;">/users/:id</a></td>
   <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">GET</td>
   </tr>
   <tr>
   <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users/3" style="color:white;font-size:2rem;">/users/:id</a></td>
   <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">Delete</td>
   </tr>
   <tr>
   <td style="color:white;border-bottom:2px solid white;"><a href="https://capstone-debate.herokuapp.com/users/3" style="color:white;font-size:2rem;">/users/:id</a></td>
   <td class="Link" style="color:white;border-bottom:2px solid white;color:white;font-size:2rem;">PUT</td>
   </tr>
   <tr>
   <td style="color:white;border-bottom:2px solid white;"><a href="https://github.com/LihleGoliath/Capstone_Backend" style="color:white;font-size:2rem;">GitHub-Capstone_Backend</a></td>
 </tr>
   <tr>
   <td style="color:white;border:2px solid green"><a href="https://capstone-debate.herokuapp.com/LihleGoliath" style="color:yellow;font-size:2rem;">WaNt TO SeE</a></td>
 </tr>
     <tr>
     </tr>
  </tbody>
</table>



    

    
   

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



