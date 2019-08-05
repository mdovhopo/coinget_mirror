export const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const isElementVisible = (el) => {
  if (!el || 1 !== el.nodeType) {
    return false;
  }
  const html = document.documentElement;
  const r = el.getBoundingClientRect();

  const clHeight = html.clientHeight;

  return (!!r
    && r.bottom >= 0
    && r.right >= 0
    && r.top <= clHeight
    && r.left <= html.clientWidth
  );
};
