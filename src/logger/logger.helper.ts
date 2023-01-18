export function merge(obj1: object, obj2: object, obj3: object = {}): object {
  return Object.assign({}, obj1, obj2, obj3);
}

export function errorToMetadata(error: Error): object {
  if (!error) {
    return {};
  }

  return {
    stackTrace: error.stack,
    errorMessage: error.message,
    errorName: error.name,
  };
}
