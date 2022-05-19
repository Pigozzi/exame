import path from 'path';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  }
  //   production: {
  //     client: 'postgresql',
  //     connection: {
  //       database: 'exame',
  //       user:     'root',
  //       password: 'root123'
  //     },
  //     pool: {
  //       min: 2,
  //       max: 10
  //     },
  //     migrations: {
  //       directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  //     }
  //     useNullAsDefault: true,
  //   }
};
