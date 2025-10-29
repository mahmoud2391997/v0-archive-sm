import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
  req.user = { role: "Employee" }
  next()
}

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    next()
  }
}
