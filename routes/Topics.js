const express = require("express");
const router = express.Router();
const con = require("../db/connect");
const middleware = require("../middleware/auth");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM Topics", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get("/:id",(req, res) => {
    // if (user.user_type === "admin") {
        
        try {
            con.query(`SELECT * FROM Topics WHERE topic_id = "${req.params.id}"`, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    // } else {
    //     res.send("Access Denied");
    // }
});


router.delete("/:id",middleware,(req, res) => {
    if (user.user_type === "admin") {
        try {
            con.query(`SELECT * FROM Topics WHERE topic_id = "${req.params.id}"`, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    } else {
        res.send("Access Denied");
    }
});

router.post("/",(req,res) => {
    if(req.user.user_type === "admin" ){
        const topic = {
          Topic:req.body.Topic,
          topic_answers:req.body.topic_answers,
          date:req.body.date
        } 
        try {
          let sql = "INSERT INTO Topics SET ?"
          con.query(sql, topic
            , (err, result) => {
              if (err) throw err.message;
              res.send(result)})
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }else{
        res.send("Not ALLOWED")
    }
});


router.patch("/:id",(req,res) => {
    // if(req.user.user_type === "admin" ){
        const topic = {
            Topic:req.body.Topic,
            topic_answers:req.body.topic_answers,
            date:req.body.date
          } 

try {    
    con.query(`UPDATE Topics SET ? WHERE topic_id ="${req.params.id}"`,topic, (err, result) => {
        if (err) throw err.message;
        res.send(result);
    });
} catch (error) {
  console.log(error);
  res.status(400).send(error)
}
// }else{
//     res.send("Not ALLOWED")
// }
});



module.exports = router;