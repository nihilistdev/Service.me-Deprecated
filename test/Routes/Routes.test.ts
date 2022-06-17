import request from "supertest";
import express from "express";
import router from '../../src/routes';

const app = express();
app.use('/', router);

describe('Bad routes', () => {
    test('No version in route -> 404', async() => {
        const res = await request(app).post('/');
        expect(res.statusCode).toBe(404);
    })

    test('Good route with wrong METHOD -> 404', async() => {
        const res = await request(app).get('/v1/customer/create');
        expect(res.statusCode).toBe(404);
    })

    test('Route does not exist -> 404', async() =>{
        const res = await request(app).get('/v1/customer/test');
        expect(res.statusCode).toBe(404);
    })

    test('Route with correct metohd throws error -> 500', async() => {
        const res = await request(app).post('/v1/customer/create').send({});
        expect(res.statusCode).toBe(500);
    })
})
