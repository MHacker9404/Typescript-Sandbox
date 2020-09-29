import express from 'express';
import path from 'path';

const server = express();

server.listen(8080, () => {
    console.log('server is listening');
});
