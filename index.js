Promise.properRace = function(promises, count = 1, results = []) {
  promises = Array.from(promises);
  if (promises.length < count) {
    return Promise.reject(`At least ${count} promises expected, ${promises.length} given.`);
  }
   
  // There is no way to know which promise is resolved/rejected.
  // So we map it to a new promise to return the index wether it fails or succeeeds.
  let indexPromises = promises.map((p, index) => p.then(() => index, () => {throw index;}));
   
  return Promise.race(indexPromises).then(index => {
    // The promise has resolved, remove it from the list of promises, and add it 
    // to the list of results
    let p = promises.splice(index, 1)[0];
    p.then(e => results.push(e));
    if (count === 1) {
      // The race has finished now, return the results
      return results;
    }
    // Continue the race, but now we expect one less winner because we have found one
    return Promise.properRace(promises, count-1, results);
  }, index => {
    // The promise has rejected, remove it from the list of promises and just 
    // continue the race without changing the count.
    promises.splice(index, 1);
    return Promise.properRace(promises, count, results);
  });
};