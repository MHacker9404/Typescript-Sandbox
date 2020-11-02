module.exports = {
    environment: 'local',
    server: {
        port: 5000,
    },
    db: {
        host: 'localhost\\sql2019',
        port: 1433,
        username: 'nestjs',
        password: 'nestjs',
        database: 'nestjs-hero',
        synchronize: true,
    },
    jwt: {
        secret: 'this-should-be-really-long',
    },
};
