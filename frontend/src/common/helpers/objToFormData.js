export default (data) => {
  const fd = new FormData();
  for (let key of Object.keys(data)) {
    if (data.hasOwnProperty(key)) {
      fd.append(key, data[key]);
    }
  }
  return fd;
}