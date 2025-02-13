export const environment = {
  production: true,
  port: process.env.PORT || 4242,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  stripeKey: process.env.STRIPE_SECRET_KEY
};