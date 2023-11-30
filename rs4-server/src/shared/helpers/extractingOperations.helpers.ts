export function removeUndefinedAndEmptyObjects(obj: any) {
  const cleanedObject: any = {};

  for (const key in obj) {
    const value = obj[key];

    if (value !== undefined) {
      if (typeof value === 'object' && value !== null) {
        const cleanedValue = removeUndefinedAndEmptyObjects(value);
        if (!isEmptyObject(cleanedValue)) {
          cleanedObject[key] = cleanedValue;
        }
      } else {
        cleanedObject[key] = value;
      }
    }
  }

  return cleanedObject;
}

function isEmptyObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
