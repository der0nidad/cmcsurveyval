export default (data) => {
  const fd = new FormData();
  for (key in data) {
    if (data.hasOwnProperty(key)) {
      fd.append(key, data.key);
    }
  }
  return fd;
}