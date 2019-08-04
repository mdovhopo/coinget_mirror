export const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const isElementVisible = (el) => {
  const {offsetTop, offsetHeight} = el;
  const {pageYOffset} = window;
  return offsetTop < innerHeight + pageYOffset &&
    offsetTop + offsetHeight > pageYOffset
};
