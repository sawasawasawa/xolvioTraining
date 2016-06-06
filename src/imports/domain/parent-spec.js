import expect from 'expect';
import Parent from './parent';

describe('Parent', function () {
    describe('constructor', function () {
        it('should set the email', function () {
            const expectedEmail = new Parent('theEmail@somewhere.com').email;
            expect(expectedEmail).toBe('theEmail@somewhere.com');
        });
    });
});