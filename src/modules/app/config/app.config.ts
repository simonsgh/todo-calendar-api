import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.APP_ENVIRONMENT,
  port: process.env.APP_PORT,
}));
