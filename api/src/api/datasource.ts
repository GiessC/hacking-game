import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/**/*.entity.ts'],
});

AppDataSource.initialize();
export default AppDataSource;
