const addUserProps = (users) => {
  let updatedUsers = users.map((user) => {
    user.isChecked = false;
    user.archive = false;
    user.edit = false;
    return user;
  });
  return updatedUsers;
};

const filterBySearch = (searchKey, users) => {
  let keyword = searchKey.toLowerCase();

  let userList = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
  );

  return userList;
};

const DeleteSelectedUsers = (users) => {
  const activeUsersList = users.filter((user) => user.isChecked !== true);
  return activeUsersList;
};

export { addUserProps, filterBySearch, DeleteSelectedUsers };
