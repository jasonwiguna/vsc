import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import entities from 'src/modules/entities/index';
import { CreateTables1686219818833 } from 'src/migrations/1686219818833-CreateTables';
import { CreateTableAuthentication1690479228870 } from 'src/migrations/1690479228870-CreateTableAuthentication';
import { AddPerpetualPrice1691828853404 } from './migrations/1691828853404-AddPerpetualPrice';
import { AddActive1692983750912 } from './migrations/1692983750912-AddActive';
import { CreateTableApplication1696689348692 } from './migrations/1696689348692-CreateTableApplication';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities,
  migrations: [
    CreateTables1686219818833,
    CreateTableAuthentication1690479228870,
    AddPerpetualPrice1691828853404,
    AddActive1692983750912,
    CreateTableApplication1696689348692,
  ],
});
