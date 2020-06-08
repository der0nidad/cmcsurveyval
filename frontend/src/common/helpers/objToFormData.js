export default (data) => {
  console.log(data)
  const fd = new FormData();
  for (let key of Object.keys(data)) {
    if (data.hasOwnProperty(key)) {
      fd.append(key, JSON.stringify(data[key]));
    }
  }
  return fd;
}