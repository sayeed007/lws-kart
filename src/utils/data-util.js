export const replaceMongoIdInArray = (array) => {
  const mappedArray = array.map(item => {
    return replaceMongoIdInObject(item);
  });

  return mappedArray;
};

export const replaceMongoIdInArrayDuringFiltering = (array) => {
  const mappedArray = array.map(item => {
    return replaceMongoIdInObjectDuringFiltering(item);
  });

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export const replaceMongoIdInObjectDuringFiltering = (obj) => {
  const { _id, ...updatedObj } = {
    ...obj,
    id: obj._id.toString(),
    category: obj.category.toString(),
    size: obj.size.toString(),
    color: obj.color.toString(),
  };
  return updatedObj;
};

export const calculateNewPrice = (price, discountPercent) => {
  return (price * ((100 - discountPercent) / 100));
};


