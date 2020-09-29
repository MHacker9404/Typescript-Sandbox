import 'core-js';
import 'regenerator-runtime';
import express from 'express';
import path from 'path';

const server = express();
server.listen(8080, () => {
    console.info('server is listening');
});
