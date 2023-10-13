const request = require('supertest');
const app = require('../app');
const db = require('../db/index');
const data = require('../db/data/leaderboard');
const seed = require('../db/seed');

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('leaderboard', () => {
    describe('GET', () => {
        test('status: 200 responds with an array of leaderboard objects', () => {
            return request(app).get('/api/leaderboard').expect(200).then(({body}) => {
                expect(body.leaderboard).toHaveLength(10);
                body.leaderboard.forEach((entry) => {
                    expect(entry.leaderboard_id).toEqual(expect.any(Number));
                    expect(entry.name).toEqual(expect.any(String));
                    expect(entry.score).toEqual(expect.any(Number));
                });
            });
        });
        test('should be in descending order by score', () => {
            return request(app).get('/api/leaderboard').then(({body}) => {
                expect(body.leaderboard).toBeSortedBy('score', {descending: true});
            });
        });
    });
    describe('POST', () => {
        test('status: 201 responds with the posted entry', () => {
            const newEntry = {
                name: 'Niamh',
                score: 5000,
            };
            return request(app).post('/api/leaderboard').send(newEntry).expect(201).then(({body}) => {
                expect(body.leaderboard).toMatchObject({
                    leaderboard_id: expect.any(Number),
                    name: 'Niamh',
                    score: 5000
                });
            });
        });
        test('should remove the lowest score from the leaderboard', () => {
            const newEntry = {
                name: 'Niamh',
                score: 5000,
            };
            return request(app).post('/api/leaderboard').send(newEntry).expect(201).then(() => {
                return request(app).get('/api/leaderboard').expect(200).then(({body}) => {
                    expect(body.leaderboard).toHaveLength(10);
                });
            });
        });
        test('status: 400 for malformed input', () => {
            const newEntry = {};
            return request(app).post('/api/leaderboard').send(newEntry).expect(400).then(({body}) => {
                expect(body.msg).toBe('bad request');
            });
        });
    });
});