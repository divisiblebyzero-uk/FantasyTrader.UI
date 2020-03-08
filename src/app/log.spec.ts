import { Log, LogLevel } from './log';

describe('Log', () => {
  it('should create an instance', () => {
    expect(new Log('Testing', LogLevel.Info)).toBeTruthy();
  });
});
