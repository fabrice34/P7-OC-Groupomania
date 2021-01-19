const bcrypt = require('bcrypt'); // Plugin de hash pour la sécurité des password
const jwt = require('jsonwebtoken'); // Token de protection
const rateLimit = require('express-rate-limit'); // Protection contre le brute-force
const User = require('../models/User'); // Chemin d'accès au modèle USER



/* au niveau du middleware signup on utilisera bcrypt qui va nous permettre de hacher
 (augmente ne niveau de protection),de proteger le mdp lors de l'inscription sur le site de l'utilisation,
 on creer l'user et on le sauvegarde */
exports.signup = (req, res, next) => { //inscription ok
  console.error("console from signup", req.body);
  let imagePath = '';
  if (req.file) {
    imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    imagePath = null;
  }

  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    image_URL: imagePath,
    isAdmin: 0,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {  //Algoryhtme de hashage du mot de passe(on hash le mdp et on le sale 10fois )
          userData.password = hash;  //Le hash est sauvegardé dans la base et non le mot de passe en clair
          User.create(userData)  //creer le nouveau user
            .then((userCreated) => {
              res.json({ status: `${userCreated.email} enregistré!` });
            })
            .catch((errCreate) => {
              res.send(`error: ${errCreate}`);
            });
        });
      } else {
        res.json({ error: `${req.body.email} existe déjà!` });
      }
    })
    .catch((errGlo) => {
      res.send(`error: ${errGlo}`);
    });
};


/* au niveau du middleware login on vient chercher par rapport à l'adresse email:
avec la fonction user.findone() dans le cas ou il n'a pas d'utilisateur enregistré 
avec celui la => "utilisateur non trouvé"
mais s'il est bon, bcrypte va compararer les 2 mdp et que si la comparaison des hashs sont valide 
alors on nous retournerra un user.id et un token ( on retrouvera se token sur la protection des routes)
 */
exports.login = (req, res, next) => {  //connexion ok
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
      }
      bcrypt.compare(req.body.password, user.password) //Comparaison des hashs pour voir si le mot de passe est valide
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
          }
          res.status(200).json({
            token: jwt.sign(
              { id: user.id }, process.env.SECRET_KEY,
              { expiresIn: '24h' },
            ),
            userId: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image_URL: user.image_URL,
            isAdmin: user.isAdmin,
            
          });
          console.log(`${user.email} s'est connecté`);
        });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// suppression d'un utilisateur
exports.deleteAccount = (req, res, next) => { //suppression??
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: 'Votre compte a été supprimé.' });
      } else {
        res.send({ message: num });
      }
    });
};

//recuperation d'un utilisateur specifique
exports.userInfo = (req, res, next) => {  
  User.findOne({
    where: {
      email: req.params.email,
    },
  })
    .then((user) => {
      if (user) {
        const userInfo = {
          userId: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          image_URL: user.image_URL,
          isAdmin: user.isAdmin,
        };
        res.status(200).json(userInfo);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

 //recuperation de tous les utilisateurs
exports.usersInfo = (req, res, next) => { 
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ error }));
};

//modification info de l'utilisateur
exports.changeInfo = (req, res, next) => {  
  let userObject = req.body;
  User.update( userObject , {
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json(userObject))
    .catch((error) => res.status(400).json({ error }));
};

// pour bloquer la connexion aprés trop de tentative de connexion  
exports.rateLimit = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3, // limiter chaque IP à 3 demandes par fenêtreMs
});
