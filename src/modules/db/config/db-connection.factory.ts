import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

const buildURI = ({ protocol, username, password, hostname, port, name }) => {
  let uri = `${protocol}://`;
  if (username) {
    uri += `${username}:${password}@`;
  }

  uri += hostname;
  if (port > 0) {
    uri += `:${port}`;
  }

  uri += `/${name}`;
  return uri;
};

export default async function dbConnectionFactory(
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> {
  const protocol = configService.get('db.protocol');
  const username = configService.get('db.username');
  const password = configService.get('db.password');
  const hostname = configService.get('db.hostname');
  const port = configService.get('db.port');
  const name = configService.get('db.name');

  const uri = buildURI({ protocol, username, password, hostname, port, name });
  return { uri };
}
