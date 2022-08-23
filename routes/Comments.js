const express = require("express");
const router = express.Router();
const con = require("../db/connect");
const middleware = require("../middleware/auth");


router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM comments", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get("/", (req, res) => {
    const {
        topic_id
    }=req.body
    try {
        con.query(`SELECT * FROM comments WHERE topic_id = "${topic_id}"`, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post("/",middleware,(req,res) => {
 
    try {
        con.query(`SELECT * FROM Topics WHERE topic_id = "${req.body.topic_id}" `, (err, result) => {
            if (err) throw err.message;
            if(result === 0){
                res.send("This topic does not exist!!!")
            }else{
                const comment = {
                    comment:req.body.comment,
                    user_id:req.body.user_id,
                    date:req.body.date,
                    topic_id:req.body.topic_id
                  } 
                  try {
                    let sql = "INSERT INTO comments SET ?"
                    con.query(sql, comment
                      , (err, result) => {
                        if (err) throw err.message;
                        res.send(result)})
                  } catch (error) {
                      console.log(error);
                      res.status(400).send(error)
                  }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete("/:id",(req, res) => {
    // if (user.user_type === "admin") {
        try {
            con.query(`SELECT * FROM comments WHERE comment_id = "${req.params.id}"`, (err, result) => {
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

module.exports = router;