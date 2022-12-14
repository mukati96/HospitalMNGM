export function RemoveEmptyKeys(obj: any): any {
  for (const propName in obj) {
    if (typeof obj[propName] === 'object') {
      RemoveEmptyKeys(obj[propName]);
    }
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === ''
      || (typeof obj[propName] === 'object' && Object.keys(obj[propName]).length <= 0)) {
      delete obj[propName];
    }

  }
  return obj
}
