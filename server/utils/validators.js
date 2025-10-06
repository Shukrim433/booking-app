module.exports = {
  isValidFullName: (fullName) => {
    // regex: at least two words, letters (any language), hyphens/apostrophes allowed
    const regex = /^[\p{L}'-]+(?:\s+[\p{L}'-]+)+$/u;
    return regex.test(fullName.trim());
  },
  isValidPassword: (password) => {
    // regex: at least one lowercase letter, at least one uppercase letter, at least one number, at least one special char, minimum 8 characters total
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
    return regex.test(password.trim());
  },
};
