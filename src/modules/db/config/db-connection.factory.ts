import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export default async function dbConnectionFactory(
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> {
  const host = configService.get('db.host');
  const port = configService.get('db.port');
  const name = configService.get('db.name');
  const username = configService.get('db.username');
  const password = configService.get('db.password');
  let uri = `mongodb://${host}:${port}/${name}`;
  if (username) {
    uri = `mongodb://${username}:${password}@${host}:${port}/${name}`;
  }

  return { uri };
}
