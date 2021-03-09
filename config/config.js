const dbuser = 'wsuratt';
const dbpassword = 'AVhb9bj2wNXKUi0W';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    `mongodb+srv://${dbuser}:${dbpassword}@cluster0.tbit4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  stripe_connect_test_client_id: 'ca_InqCIQmTd3JEg7vMmMyRCW4kB6MJB6z1',
  stripe_test_secret_key: 'sk_test_51ICEHzLGRfqXh4Hpld1NehfCzPWXU0hDA5IJbjZZZy9x2loglbvDN9xc5HUFQsoI1ZyA0zBPS0JL4g6hGnxoKPxs00Y5iw50V5',
  stripe_test_api_key: 'pk_test_51ICEHzLGRfqXh4HpHutv8YQrw4fUAtDsU3WZmT069HapbryaIV24kQQJ6CVuTACJuIq1WzMTeM9ImFt8bTWL2jfy00sHdFVvyv' 
}

export default config
