import React from "react";
import "./UserDetailsRow.css";

const UserDetailsRow = ({ user, selectUser, getEditUser, deleteUser }) => {
  const id = user.id;

  const handleEditButton = () => {
    getEditUser(user);
  };

  const handleDeleteButton = (event, userId = id) => {
    if (window.confirm("Are you sure you want to delete this user ?"))
      deleteUser(userId);
  };

  const handleUserCheckBox = (event, userId = id) => {
    selectUser(userId);
  };
  return (
    <>
      <tr className={user.isChecked ? "table-active" : ""}>
        <td>
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleUserCheckBox}
            checked={user.isChecked}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <button
            className="icon-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleEditButton}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="icon-button" onClick={handleDeleteButton}>
            <i className="bi bi-archive delete-icon" color="text-danger"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserDetailsRow;
