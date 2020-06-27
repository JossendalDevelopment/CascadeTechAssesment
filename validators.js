const formatPhoneNumber = phoneNumberString => {
  // ensure string and remove non digits
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  // match against groups of 3, 3, and 4
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return parseInt(`${match[1]}${match[2]}${match[3]}`);
  }
  return null
}

module.exports = {
  formatPhoneNumber
}