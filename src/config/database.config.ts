import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  db_url: process.env.DATABASE_URL,
  synchronie: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));
