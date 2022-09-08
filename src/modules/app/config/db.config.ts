import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  protocol: process.env.DB_PROTOCOL,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}));
