// Input validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true };
};

export const validateTrade = (tradeData) => {
  const errors = [];

  // Validate ticker
  if (!tradeData.ticker || typeof tradeData.ticker !== 'string' || tradeData.ticker.trim().length === 0) {
    errors.push("Ticker is required");
  } else if (tradeData.ticker.trim().length > 10) {
    errors.push("Ticker must be 10 characters or less");
  }

  // Validate optionType
  if (!['Call', 'Put', 'call', 'put'].includes(tradeData.optionType)) {
    errors.push("Option type must be 'Call' or 'Put'");
  }

  // Validate strike
  if (!tradeData.strike || typeof tradeData.strike !== 'number' || tradeData.strike <= 0) {
    errors.push("Strike price must be a positive number");
  }

  // Validate expiration
  if (!tradeData.expiration) {
    errors.push("Expiration date is required");
  } else {
    const expirationDate = new Date(tradeData.expiration);
    if (isNaN(expirationDate.getTime())) {
      errors.push("Invalid expiration date");
    }
  }

  // Validate entryPrice
  if (!tradeData.entryPrice || typeof tradeData.entryPrice !== 'number' || tradeData.entryPrice < 0) {
    errors.push("Entry price must be a non-negative number");
  }

  // Validate exitPrice
  if (!tradeData.exitPrice || typeof tradeData.exitPrice !== 'number' || tradeData.exitPrice < 0) {
    errors.push("Exit price must be a non-negative number");
  }

  // Validate quantity
  if (!tradeData.quantity || typeof tradeData.quantity !== 'number' || tradeData.quantity < 1) {
    errors.push("Quantity must be at least 1");
  }

  // Validate tradeType if provided
  if (tradeData.tradeType && !['Day', 'Swing', 'Scalp', 'Other'].includes(tradeData.tradeType)) {
    errors.push("Invalid trade type");
  }

  // Validate notes if provided (prevent excessively long notes)
  if (tradeData.notes && tradeData.notes.length > 1000) {
    errors.push("Notes must be 1000 characters or less");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  // Remove any potentially harmful characters
  return str.trim().replace(/[<>]/g, '');
};
