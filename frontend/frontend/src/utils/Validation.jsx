
// Validates user input during signup
export const validateSignup = ({ username, email, password }) => {
    const errors = [];
  
    if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) {
      errors.push("Username must be at least 4 characters and only contain letters, numbers, or underscores.");
    }
  
    if (!email.includes("@")) {
      errors.push("Invalid email format.");
    }
  
    // Email domain check
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const emailDomain = email.split("@")[1];
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      errors.push("Email must end in @gmail.com, @yahoo.com, or @outlook.com.");
    }
  
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain an uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain a lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain a digit.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain a special character (!@#$%^&*).");
    }
  
    return errors;
  };
  
  export const validateLogin = ({ username, password }) => {
    const errors = [];
  
    if (!username || username.length < 4) {
      errors.push("Username must be at least 4 characters.");
    }
  
    if (!password) {
      errors.push("Password is required.");
    }
  
    return errors;
  };
  