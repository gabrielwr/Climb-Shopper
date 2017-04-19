const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
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

module.exports = {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin}
