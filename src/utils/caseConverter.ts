// Convert camelCase string to snake_case
export const camelToSnake = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// Convert snake_case string to camelCase
export const snakeToCamel = (str: string): string =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * Convert all keys of an object from camelCase to snake_case recursively.
 * Special handling for keys like 'usersPermissionsUser' -> 'users_permissions_user'.
 */
export function keysToSnake<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnake);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      // Convert key
      const snakeKey = camelToSnake(key);
      // Recursively apply to value
      acc[snakeKey] = keysToSnake(value);
      return acc;
    }, {} as any);
  }
  return obj;
}

/**
 * Convert all keys of an object from snake_case to camelCase recursively.
 */
export function keysToCamel<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamel);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = keysToCamel(value);
      return acc;
    }, {} as any);
  }
  return obj;
}
