// Update with your config settings.

module.exports = {
    development: {
      client: 'sqlite3',
      connection: { filename: './data/users.db3' }, // change this if you want a different name for the database
      useNullAsDefault: true, // used to avoid warning on console
      migrations: {
        directory: './data/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './data/seeds' },
    pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
        },
      },
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './data/test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
  };
  