import { Result, exec } from '../src';

describe('exec', () => {
  it('Exec should await and get all values', () => {
    exec(function* main() {
      const result = new Result(() => 10);

      expect(yield result.then((el) => el * 2)).toBe(20);
      expect(yield Promise.resolve(10)).toBe(10);
      expect(yield Promise.resolve(30)).toBe(30);
    });
  });
});
