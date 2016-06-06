import expect from 'expect';
import Student from './student';

describe('Student', function () {
    describe('constructor', function () {
        it('should set the name', function () {
            const expectedName = new Student('Yo Yo').name;
            expect(expectedName).toBe('Yo Yo');
        });
    });
});