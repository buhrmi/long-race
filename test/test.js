var assert = require('assert');
require('..')

let car1 = new Promise(resolve => setTimeout(resolve, 2000, 'Car 1.'));
let car2 = new Promise(resolve => setTimeout(resolve, 4000, 'Car 2.'));
let car3 = new Promise(resolve => setTimeout(resolve, 3000, 'Car 3.'));
let car4 = new Promise(resolve => setTimeout(resolve, 6000, 'Car 4.'));

describe('Promise', function() {
  describe('#properRace()', function() {
    it('should return winners in correct order', function() {
      Promise.properRace([car1, car2, car3, car4], 3).then(winners => {
        expect(winners).to.equal(['Car 1.', 'Car 3.', 'Car 2.'])
      });
    });
  });
});