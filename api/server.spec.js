const request = require ('supertest');
const server = require('./server.js');

const db = require('../data/dbConfig.js');

describe('server', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    describe('POST /register', () => {
        it('returns 400 if fields not provided', () => {
            const user = { username: 'dummy' };
            return request(server)
            .post('/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(400);
            })
        })
        it('returns 201 if created succesfullyl', () => {
            const user1 = { username: 'jack', email: 'dummy321@dummy.com', password: 'pass'};
            // console.log(user1.username, user1.email, user1.password);
            return request(server)
            .post('/register')
            .send(user1)
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
       
    })
    describe('POST /login', () => {
        it('returns 401 if wrong email or pw', async () => {
            const user =  {username: 'jill', email: 'jill@dummy.com', password: 'pass'};
            //post to register to create the login info
            await request(server)
            .post('/register')
            .send(user)
            // .then(res => console.log(res.body));

            user.password = 'wrong'; //change pw so it's incorrect on login

            return request(server)
            .post('/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
        it('returns 201 on successful login', async() => {
            const user = {username: 'cortana', email: 'cortana@dummy.com', password: 'pass'};

            await request(server)
            .post('/register')
            .send(user)
            // .then(res => console.log(res.body));

            return request (server)
            .post('/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })
    describe('GET users/:id/pins', () => {
        it('should return 404 if id not found', () => {
            const id = 9999;
            return request(server)
            .get('/:id/pins', id)
            .then(res => {
                expect(res.status).toBe(404);
            })
        })
        // it('should return 200 if id found', async () => {
        //     const id = '1'; 
        //     let token;
        //     const user = {username: 'cortana', email: 'cortana@dummy.com', password: 'pass'};
        //     await request(server)
        //     .post('/register')
        //     .send(user)

        //    await request(server)
        //     .post('/login')
        //     .send(user)
        //     .then(res => {
        //         token = res.decoded;
        //     })
            




        //     return request(server)
        //     .get('users/:id/pins')
        //     .send(id, token)
        //     .then(res => {
        //         expect(res.status).toBe(200);
        //     })
        // })
    })
    // describe('GET users/pins returns all pins', () => {
    //     it('should return')
    // })
    describe('Delete user /:id', () => {
        it('should return 404 if user id not found', () => {
            const id = '99999';
            return request(server)
            .delete('/users/:id')
            .send(id)
            .then(res => {
                expect(res.status).toBe(404);
            })
        })
        
    })
})





//npx knex migrate:latest --env testing