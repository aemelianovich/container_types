# Container types

## Result Container

Container Result with two states Success and Error. Container should have functors and monados.

```js
import Result from './src';

const result = new Result(() => 10);

const resultSuccess = Result.success(10); // Create container through static method
const resultError = Result.error(10); // Create container through static method

// then - implementation of the functor interface then<R>(cb: (value: T) => Data<R>): Result<R>
// then - implementation of the monadic interface then<R>(cb: (value: T) => Result<R>): Result<R>
// catch - Process an erorr by passing it as parameter of callback function. Returns new Container with undefined
result
  .then((el) => el * 2)
  .then((el) => Result.error(el))
  .catch((err) => console.log(err));
```

## Executor

Imitation of async/await for container Result and Promise based on generator

```js
import Result, { exec } from './src';

exec(function* main() {
  const res = [];
  const result = new Result(() => 10);

  res.push(yield result.then((el) => el * 2));
  res.push(yield Promise.resolve(30));
  res.push(yield Promise.resolve(40));

  console.log(res); // [20,30,40]
});
```
