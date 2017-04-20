const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

const orderBelongsToUser = (order) => (req, res, next) => {
  if (order.user_id === req.user.id || req.user.is_admin) {
    next()
  }
  res.status(403).send('Forbidden')
}
  // Feel free to add more filters here (suggested: something that keeps out non-admins)


// We assume that req.user is an instance of a sequelize user,
// meaning they will have access to isAdmin bool column.
const mustBeAdmin = (req, res, next) => {
  if(!req.user.is_admin) {
    return res.status(403).send(`You can only do this if you're an admin`)
  }
  next()
}

module.exports = {mustBeLoggedIn, forbidden, mustBeAdmin, orderBelongsToUser }

