const bcrypt = require('bcryptjs');

//awalan contoh pake 2 user
const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) }
];

let nextId = users.length + 1;

module.exports = {
  findByUsername: (username) => {
    return users.find(user => user.username === username);
  },
  findById: (id) => {
    return users.find(user => user.id === id);
  },
  addUser: (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
      }
      const hashedPassword = bcrypt.hashSync(password, 10); 
      const newUser = { username, password: hashedPassword };
      users.push(newUser);
      return { username, password: hashedPassword };
  }
};