export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const isValidPassword = (password) => {
  // At least 8 chars, 1 letter, 1 number
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password)
}