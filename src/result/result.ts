type Data<T> = T | Result<T>;
type Status = 'pending' | 'success' | 'error';

class Result<T> {
  static success<T>(data: T): Result<T> {
    return new Result(() => data);
  }

  static error(data: unknown): Result<null> {
    return new Result(() => {
      throw data;
    });
  }

  #value?: T;
  #error?: Error;
  #status: Status = 'pending';

  constructor(fn: () => Data<T>) {
    try {
      const res = fn();
      if (res instanceof Result) {
        return res;
      } else {
        this.#value = res;
      }
      this.#status = 'success';
    } catch (err) {
      this.#error = err instanceof Error ? err : new Error(String(err));
      this.#status = 'error';
    }
  }

  catch<R>(cb: (err: Error) => Data<R>): Result<T | R> {
    return new Result<T | R>(() => {
      if (this.#status === 'error') {
        return cb(this.#error!);
      }
      return this.#value!;
    });
  }

  // Make it thenable object to be able to work with Promise container
  then<R>(cb: (value: T) => Data<R> | Result<R>): Result<R> {
    return new Result(() => {
      if (this.#status === 'error') {
        throw this.#error;
      }
      return cb(this.#value!);
    });
  }
}

export default Result;
