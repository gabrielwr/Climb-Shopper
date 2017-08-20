`use strict`

export default price => {
  price = price ? (price / 100) : 0
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
