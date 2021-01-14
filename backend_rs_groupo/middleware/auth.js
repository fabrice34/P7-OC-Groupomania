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



