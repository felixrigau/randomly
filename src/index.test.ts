import { printUserName } from './index';

describe('printUserName', () => {
  test('should return the user name', () => {
    expect(printUserName({ name: 'felix' })).toBe('felix');
  });
});
