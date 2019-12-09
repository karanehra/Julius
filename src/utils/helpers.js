export const isAppLoading = state => {
  return false;
};

export const getUUID = length => {
  let choices = "abcdefghijklmnopqrstuvwxyz0987654321".split("");
  let uuid = "";
  while (length) {
    uuid += choices[Math.floor(Math.random() * choices.length)];
    length--;
  }
  return uuid;
};
