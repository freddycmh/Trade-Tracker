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

  // Validate strike (convert to number if string)
  const strike = Number(tradeData.strike);
  if (tradeData.strike === undefined || tradeData.strike === null || tradeData.strike === '' || isNaN(strike) || strike <= 0) {
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

  // Validate entryPrice (convert to number if string)
  const entryPrice = Number(tradeData.entryPrice);
  if (tradeData.entryPrice === undefined || tradeData.entryPrice === null || tradeData.entryPrice === '' || isNaN(entryPrice) || entryPrice < 0) {
    errors.push("Entry price must be a non-negative number");
  }

  // Validate exitPrice (convert to number if string)
  const exitPrice = Number(tradeData.exitPrice);
  if (tradeData.exitPrice === undefined || tradeData.exitPrice === null || tradeData.exitPrice === '' || isNaN(exitPrice) || exitPrice < 0) {
    errors.push("Exit price must be a non-negative number");
  }

  // Validate quantity (convert to number if string)
  const quantity = Number(tradeData.quantity);
  if (tradeData.quantity === undefined || tradeData.quantity === null || tradeData.quantity === '' || isNaN(quantity) || quantity < 1) {
    errors.push("Quantity must be a positive whole number");
  }

  // Validate tradeType (required)
  if (!tradeData.tradeType) {
    errors.push("Trade type is required");
  } else if (!['Day', 'Swing', 'Scalp', 'Other'].includes(tradeData.tradeType)) {
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
