const createdUsers = [];

export function registerCreatedUser(email, password) {
  createdUsers.push({ email, password });
}

export function getCreatedUsers() {
  return [...createdUsers];
}

export function clearCreatedUsers() {
  createdUsers.length = 0;
}
