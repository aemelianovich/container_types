import { Result } from '../src';

describe('Result', () => {
  const result: Result<number> = new Result<number>(() => 10);

  it('Constructor success create', () => {
    new Result(() => 10).then((value) => expect(value).toBe(10));
  });

  it('Constructor error create', () => {
    new Result(() => {
      throw new Error('My Test Error');
    })
      .then((value) => value * 10)
      .catch((err) => {
        expect(err).toEqual('My Test Error');
      });
  });

  it('Static success method should return new Result container with passed value in success status', () => {
    Result.success(10).then((value) => expect(value).toBe(10));
  });

  it('Static error method should return new Result container with error in error status', () => {
    Result.error('My Test Error').catch((err) =>
      expect(err).toEqual('My Test Error'),
    );
  });

  it('then method as functor should return a new boxed value', () => {
    result.then((val) => val * 3).then((val) => expect(val).toBe(30));
  });

  it('then method as monad should unbox the value from the wrapper, do something and return', () => {
    result
      .then((value) => new Result(() => value * 10))
      .then((value) => expect(value).toBe(100));
  });

  it('catch the error and return a handled content', () => {
    result
      .then((value) => value * 2)
      .then((value) => Result.error(value))
      .catch((err) =>
        expect(() => {
          throw err;
        }).toThrowError('20'),
      );
  });

  it('catch should return data and chain with other functions', () => {
    result
      .then((value) => value * 10)
      .then(() => {
        throw 13;
      })
      .catch((err) => err)
      .then((val) => expect(val).toBe('13'));
  });
});
