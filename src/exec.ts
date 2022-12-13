import type Result from './result';

/* eslint-disable @typescript-eslint/no-explicit-any */
function exec<T extends Result<any> | Promise<any>>(
  fn: () => Generator<T>,
): Promise<any> {
  const iterate = (gen: Generator<T>, value?: any) => {
    const res = gen.next(value);
    const container: T = res.value;

    if (res.done) {
      return Promise.resolve(container);
    }

    return Promise.resolve(container)
      .then((val) => {
        iterate(gen, val);
      })
      .catch((err) => {
        iterate(gen, err);
      });
  };

  return iterate(fn());
}

export default exec;
