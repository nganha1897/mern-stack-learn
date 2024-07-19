let express = require("express");
const jwt = require("jsonwebtoken");
let UserRouter = express.Router({}); //
let UserModel = require("../models/UserModel");

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

UserRouter.post("/api/signup", (req, res) => {
  console.log(req.body);
  UserModel.findOne({ username: req.body.username })
    .then((existingUser) => {
      if (existingUser) {
        console.log("Username already exists", existingUser);
        res.send("Username already exists!");
      } else {
        let newUser = new UserModel(req.body);
        newUser
          .save()
          .then((newUser) => {
            console.log("sign up success", newUser);
            res.send({ user : {_id: newUser._id, username: newUser.username, email: newUser.email }});
          })
          .catch((err1) => {
            console.log("err signup", err1);
            res.send("error while sign up");
          });
      }
    })
    .catch((err2) => {
      console.log("err signup", err2);
      res.send("Error while signing up!");
    });
});

UserRouter.post("/api/signin", (req, res) => {
  UserModel.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        if (user.password != req.body.password) {
          console.log("Wrong Password");
          res.send("Wrong Password!");
        } else {
          const token = generateToken(user);
          res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
          });
          res.send({ message: "Signin successful!" , user : {_id: user._id, username: user.username, email: user.email}});
        }
      } else {
        console.log("User Not Found");
        res.send("User Not Found!");
      }
    })
    .catch((err2) => {
      console.log("err signin", err2);
      res.send("Error while signing in!");
    });
});

UserRouter.get("/api/users", (req, res) => {
  UserModel.find()
    .then((allUsers) => {
      res.send(allUsers);
    })
    .catch(() => {
      res.send("Error while fetching all users");
    });
});

const authenticateJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject('Unauthorized');
      } else {
        resolve(decoded); 
      }
    });
  });
};

UserRouter.get('/api/profile', async (req, res) => {
  try {
    const { cookie } = req.headers;

    if (cookie == undefined) 
      return res.status(401).json({ error: 'Unauthorized' });

    const token = cookie.split("authToken=")[1].split(";")[0];
    const decoded = await authenticateJWT(token); 

    const user = { _id: decoded.id, username: decoded.username, email: decoded.email };

    res.send({ user });
  } catch (error) {
    console.error('Error while authenticating:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

UserRouter.get('/api/signout', (req, res) => {
  res.clearCookie('authToken', { httpOnly: true });
  res.json({ message: 'Signed out successfully' });
});

module.exports = UserRouter;
