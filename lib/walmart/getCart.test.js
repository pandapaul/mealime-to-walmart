const getCart = require('./getCart')
const test = require('ava')

test('should be able to get a cart object that has an id', async t => {
  const cart = await getCart()
  t.assert(cart && cart.id)
})
