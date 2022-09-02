const express = require("express");
const router = express.Router();
const con = require("../db/connect");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require("../middleware/auth");


router.get("/",(req, res) => {
    // if (user.user_type === "admin") {
        
        try {
            con.query("SELECT * FROM users", (err, result) => {
                if (err)  console.log(err);
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

// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
    try {
      let sql = "INSERT INTO users SET ?";
      const {
        Username,
        email,
        password,
        user_type,
        user_image
      } = req.body;
  
      // The start of hashing / encryption
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      let user = {
        Username,
        email,
        // We sending the hash value to be stored within the table
        password:hash,
        user_type,
        user_image:req.body.user_image
      };
      con.query(sql, user, (err, result) => {
        if (err)  console.log(err);
        console.log(result);
        res.send(`User ${(user.Username, user.email)} created successfully`);
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  
  // Login
  // The Route where Decryption happens
  router.post("/login", (req, res) => {
    try {
      let sql = "SELECT * FROM users WHERE ?";
      let user = {
        email: req.body.email,
      };
      con.query(sql, user, async (err, result) => {
        if (err)  console.log(err);
        if (result.length === 0) {
          res.send("Email not found please register");
        } else {
          const isMatch = await bcrypt.compare(
            req.body.password,
            result[0].password
          );
          if (!isMatch) {
            res.send("Password incorrect");
          } else {
            // The information the should be stored inside token
            const payload = {
              user: {
                user_id: result[0].user_id,
                Username: result[0].Username,
                email: result[0].email,
                user_type: result[0].user_type,
                user_image:result[0].user_image
              },
            };
            // Creating a token and setting expiry date
            jwt.sign(
              payload,
              process.env.jwtSecret,
              {
                expiresIn: "365d",
              },
              (err, token) => {
                if (err)  console.log(err);
                res.json({ token });
              }
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
});

// Verify
router.get("/verify", (req, res) => {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({
          msg: "Unauthorized Access!",
        });
      } else {
        res.status(200);
        res.send(decodedToken);
      }
    });
  });


  router.get("/:id",middleware,(req, res) => {
    if (req.user.user_type === "admin") {
        
        try {
            con.query(`SELECT * FROM users WHERE user_id = "${req.params.id}"`, (err, result) => {
                if (err)  console.log(err);
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


router.delete("/:id",middleware,(req, res) => {
    if (req.user.user_type === 'admin') {
        try {
            con.query(`DELETE FROM users WHERE user_id = "${req.params.id}"`, (err, result) => {
                if (err)  console.log(err);
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

router.patch("/:id",(req, res) => {
  const user={
    Username:req.body.Username,
    user_image:req.body.user_image
  }
      try {
          con.query(`UPDATE users SET ? WHERE user_id ="${req.params.id}"`,user, (err, result) => {
              if (err)  console.log(err);
              res.send(result);
          });
      } catch (error) {
          console.log(error);
          res.status(400).send(error)
      }

});


module.exports = router;


