import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addUserProps,
  filterBySearch,
  DeleteSelectedUsers,
} from "./utilities/helperFunctions";
import AdminTable from "./components/AdminTable";
import PageIndex from "./components/PageIndex";
import TableFeatures from "./components/TableFeatures";
import EditUserForm from "./components/EditUserForm";

const config = {
  endpoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
  itemsPerPage: 10,
};

const App = () => {
  //initialise required states and ref
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(config.itemsPerPage);
  const [editUser, setEditUser] = useState({ name: "", email: "", role: "" });
  const [update, setUpdate] = useState(false);
  const checkAll = useRef(null);

  //initialise users
  const getUsers = async () => {
    try {
      const response = await axios.get(`${config.endpoint}`);
      const users = addUserProps(response.data);
      setUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Search Users
  const performSearch = (searchKey, usersList = users) => {
    if (!searchKey) {
      setFilteredUsers(usersList);
      return;
    }

    let searchUsers = filterBySearch(searchKey, usersList);
    setFilteredUsers(searchUsers);
    setCurrentPage(1);
  };

  //CheckBox Operations
  const selectAllUsersInPage = (
    event,
    usersInPage,
    updateUsers = filteredUsers
  ) => {
    usersInPage.forEach((user) => {
      const userId = user.id;
      const index = updateUsers.findIndex((user) => user.id === userId);
      updateUsers[index].isChecked = event.target.checked;
    });

    setFilteredUsers(updateUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectUser = (id, updateFilteredUsers = filteredUsers) => {
    const index = updateFilteredUsers.findIndex((user) => user.id === id);
    updateFilteredUsers[index].isChecked = !updateFilteredUsers[index]
      .isChecked;

    setFilteredUsers(updateFilteredUsers);
    checkAll.current.checked = false;
    setUpdate((prevState) => !prevState);
  };

  //Update Operations
  const getEditUser = (user) => {
    setEditUser(user);
    setUpdate((prevState) => !prevState);
  };

  const updateUserDetails = (savedUser, updateUsers = filteredUsers) => {
    const index = updateUsers.findIndex((user) => user.id === savedUser.id);
    updateUsers[index] = { ...savedUser };

    setFilteredUsers(updateUsers);
    setUsers(updateUsers);
    setUpdate((prevState) => !prevState);
  };

  //Delete Operations
  const deleteUser = (id, updateUsers = filteredUsers) => {
    const activeFilteredUsersList = updateUsers.filter(
      (user) => user.id !== id
    );
    const activeUsersList = users.filter((user) => user.id !== id);

    toast.info("User has been deleted", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      theme: "dark",
    });

    setUsers(activeUsersList);
    setFilteredUsers(activeFilteredUsersList);
    setUpdate((prevState) => !prevState);
  };

  const deleteCheckedUsers = () => {
    const deleteUsersId = filteredUsers
      .filter((user) => user.isChecked)
      .map((user) => user.id);
    const activeFilteredUsersList = DeleteSelectedUsers(filteredUsers);
    const activeUserList = users.filter(
      (user) => !deleteUsersId.includes(user.id)
    );

    if (filteredUsers.length === activeFilteredUsersList.length) {
      toast.info("Please select users to delete", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
    } else {
      toast.info("Selected Users have been deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });

      setFilteredUsers(activeFilteredUsersList);
      setUsers(activeUserList);
      setUpdate((prevState) => !prevState);
    }
  };

  // Users to display on current page
  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;
  let usersInPage = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    checkAll.current.checked = false;
  }, [filteredUsers]);

  return (
    <>
      <header className="mb-5">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand h1">Admin UI</span>
          </div>
        </nav>
      </header>
      <div className="container">
        <TableFeatures
          performSearch={performSearch}
          deleteCheckedUsers={deleteCheckedUsers}
        />
        <AdminTable
          currentPage={currentPage}
          usersInPage={usersInPage}
          selectAllUsersInPage={selectAllUsersInPage}
          selectUser={selectUser}
          getEditUser={getEditUser}
          deleteUser={deleteUser}
          ref={checkAll}
        />
        <EditUserForm user={editUser} updateUserDetails={updateUserDetails} />
        <PageIndex
          totalFilteredUsers={filteredUsers.length}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
