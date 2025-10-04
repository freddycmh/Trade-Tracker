import rateLimit from "express-rate-limit";

// Rate limiter for auth routes to prevent brute force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs (more reasonable for development)
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: 'draft-7', // Use draft-7 standard
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting in test environment
  skip: (req) => process.env.NODE_ENV === 'test',
});
