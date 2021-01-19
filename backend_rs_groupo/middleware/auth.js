/*Au niveau de ce middleware auth.js ici avec mon jsonwebtoken,je viens recuperer mon token lorsque je me connecte 
dans le header autorization, je le decode .
je verifie que le token qui à été attribué lors de ma connexion soit le meme que lorsque je supprime ou que je modifie
et qui me permet tout simplement de verifier et de valider la requette la!
si ce n'est pas bon en comparant les deux token alors 'user id non valable' et si c'est bon alors on continue
*/
const jwt = require('jsonwebtoken'); // Token de protection

module.exports = (req, res, next) => {
  console.error('erre')
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log('TOKEN', decodeToken);
    const { dataValues, id } = decodeToken;
    if (req.body.dataValues && req.body.dataValues !== dataValues) {
      // eslint-disable-next-line no-throw-literal
      throw 'User ID non valable!';
    } else {
      // eslint-disable-next-line no-param-reassign
      req.user_id = id;
      next();
    }
  } catch (error) {
    // eslint-disable-next-line no-bitwise
    res.status(401).json({ error: error | 'Requete non authentifiée' });
  }
};



