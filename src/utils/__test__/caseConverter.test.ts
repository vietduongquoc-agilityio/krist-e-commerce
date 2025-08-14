// stringCaseUtils.test.ts
import {
  camelToSnake,
  snakeToCamel,
  keysToSnake,
  keysToCamel,
} from '../caseConverter';

describe('camelToSnake', () => {
  it('should convert camelCase to snake_case', () => {
    expect(camelToSnake('camelCaseString')).toBe('camel_case_string');
    expect(camelToSnake('simpleTest')).toBe('simple_test');
    expect(camelToSnake('already_snake')).toBe('already_snake');
  });

  it('should handle strings starting with uppercase letter', () => {
    expect(camelToSnake('CamelCase')).toBe('_camel_case');
  });

  it('should handle empty string', () => {
    expect(camelToSnake('')).toBe('');
  });
});

describe('snakeToCamel', () => {
  it('should convert snake_case to camelCase', () => {
    expect(snakeToCamel('snake_case_string')).toBe('snakeCaseString');
    expect(snakeToCamel('simple_test')).toBe('simpleTest');
  });

  it('should handle no underscores', () => {
    expect(snakeToCamel('nounderscore')).toBe('nounderscore');
  });

  it('should handle leading underscores', () => {
    expect(snakeToCamel('_leading_underscore')).toBe('LeadingUnderscore');
  });
});

describe('keysToSnake', () => {
  it('should convert object keys to snake_case recursively', () => {
    const input = {
      camelCaseKey: 1,
      nestedObject: {
        anotherKey: 2,
      },
      arrayData: [{ deepKey: 3 }, { deepKeyTwo: 4 }],
    };

    const expected = {
      camel_case_key: 1,
      nested_object: {
        another_key: 2,
      },
      array_data: [{ deep_key: 3 }, { deep_key_two: 4 }],
    };

    expect(keysToSnake(input)).toEqual(expected);
  });

  it('should handle special case like usersPermissionsUser', () => {
    const input = { usersPermissionsUser: 'test' };
    const expected = { users_permissions_user: 'test' };
    expect(keysToSnake(input)).toEqual(expected);
  });

  it('should return primitives as is', () => {
    expect(keysToSnake('string')).toBe('string');
    expect(keysToSnake(123)).toBe(123);
    expect(keysToSnake(null)).toBeNull();
  });
});

describe('keysToCamel', () => {
  it('should convert object keys to camelCase recursively', () => {
    const input = {
      snake_case_key: 1,
      nested_object: {
        another_key: 2,
      },
      array_data: [{ deep_key: 3 }, { deep_key_two: 4 }],
    };

    const expected = {
      snakeCaseKey: 1,
      nestedObject: {
        anotherKey: 2,
      },
      arrayData: [{ deepKey: 3 }, { deepKeyTwo: 4 }],
    };

    expect(keysToCamel(input)).toEqual(expected);
  });

  it('should handle primitives as is', () => {
    expect(keysToCamel('string')).toBe('string');
    expect(keysToCamel(123)).toBe(123);
    expect(keysToCamel(null)).toBeNull();
  });
});
