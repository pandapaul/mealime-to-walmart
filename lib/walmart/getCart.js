const rp = require('request-promise')

const getCart = async () => {
  const res = await rp.get('https://grocery.walmart.com/v4/api/session?order=v4').json()
  return res && res.cart && res.cart.cart
}
module.exports = getCart
