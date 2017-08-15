# Promise.longRace()

    Promise.longRace(
      Iterable<any>|Promise<Iterable<any>> input,
      [int numWinners = 1],
      [Array results = []]
    ) -> Promise

Similar to [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race), but will not reject as long as there is a chance that at least `numWinners` will sucessfully resolve.

## Example

The following code

```js
let car1 = new Promise((r, reject) => setTimeout(reject, 2000, 'Car 1.'));
let car2 = new Promise(resolve => setTimeout(resolve, 4000, 'Car 2.'));
let car3 = new Promise(resolve => setTimeout(resolve, 3000, 'Car 3.'));
let car4 = new Promise(resolve => setTimeout(resolve, 6000, 'Car 4.'));
 
Promise.properRace([car1, car2, car3, car4], 3).then(winners => {
  console.log('Race ended');
  console.log('Gold medal:', winners[0]);
  console.log('Silver medal:', winners[1]);
  console.log('Bronze medal:', winners[2]);
});
```

will output:

```
Race ended
Gold medal: Car 3.
Silver medal: Car 2.
Bronze medal: Car 4.
```

## Credits

https://www.jcore.com/2016/12/18/promise-me-you-wont-use-promise-race/