import { parseCommaStringToArray } from '../parse';

describe('parseCommaStringToArray', () => {
  it('should split a comma-separated string into an array', () => {
    expect(parseCommaStringToArray('apple,banana,orange')).toEqual([
      'apple',
      'banana',
      'orange',
    ]);
  });

  it('should trim whitespace around items', () => {
    expect(parseCommaStringToArray(' apple , banana , orange ')).toEqual([
      'apple',
      'banana',
      'orange',
    ]);
  });

  it('should filter out empty strings', () => {
    expect(parseCommaStringToArray('apple,,banana, ,orange,')).toEqual([
      'apple',
      'banana',
      'orange',
    ]);
  });

  it('should return an empty array when input is an empty string', () => {
    expect(parseCommaStringToArray('')).toEqual([]);
  });

  it('should handle single item without commas', () => {
    expect(parseCommaStringToArray('apple')).toEqual(['apple']);
  });

  it('should handle input with only commas and spaces', () => {
    expect(parseCommaStringToArray(' , , , ')).toEqual([]);
  });
});
