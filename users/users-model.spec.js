const db = require('../data/dbConfig.js');

const Users = require('./users-model.js');

describe('users model tests', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add(user)', () => {
        it('should insert a new user into user db', async () => {
            await Users.add({ username: 'Shax', email: 'thisisamazing@shax.com', password: 'seventhcolumn' });

            const users = await db('users');
            expect(users).toHaveLength(1);
        });
    })
    describe('findById(id)', () => {
        it('should find users by the user id', async () => {
            const id = 1
            await Users.add({ username: 'Shax', email: 'thisisamazing@shax.com', password: 'seventhcolumn' });
            const found = await Users.findById(id);
            
            expect(found).toHaveProperty('username', 'Shax');
            expect(found).not.toHaveProperty('email', 'cayde6@rip.com');

        });
    })
    describe('findBy(filter)', () => {
        it('should return users based on filter', async () => {
            const username = 'Shax';
            const email = 'cayde6@rip.com';
            await Users.add({ username: 'Shax', email: 'thisisamazing@shax.com', password: 'seventhcolumn' });
           const result = await Users.findBy({ username });
           const result2 = await Users.findBy({ email });
           expect(result).toMatchObject([{ username: 'Shax', email: 'thisisamazing@shax.com', password: 'seventhcolumn' }]);
           expect(result2).not.toMatchObject([{ username: 'Shax', email: 'thisisamazing@shax.com', password: 'seventhcolumn' }]);
        });
    })
    describe('addPin(pin)', () => {
        it('should add new pin', async () => {
            const newPin = {'title': 'NewPin', 'Link': '', 'category': 'Destiny', 'author': 'Zavala'};
            const result = await Users.addPin(newPin);
            expect(result).toHaveLength(1);
        })
    })
    // describe('pinToProfile(newPin)', () => {
    //     it('should add article to user profile', async () => {

    //     })
    // })
    // describe('findUserPins(id)', () => {
    //     it('should return pins that have matching user id', async () => {
            
    //     })
    // })
})