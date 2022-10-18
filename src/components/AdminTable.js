import React, { forwardRef, useEffect } from "react";
import "./AdminTable.css";
import UserDetailsRow from "./UserDetailsRow";

const AdminTable = forwardRef(
  (
    {
      currentPage,
      usersInPage,
      selectAllUsersInPage,
      selectUser,
      getEditUser,
      deleteUser,
    },
    ref
  ) => {
    const handleHeaderCheckBox = (event) => {
      selectAllUsersInPage(event, usersInPage);
    };

    useEffect(() => {
      ref.current.checked = false;
    }, [currentPage]);

    return (
      <div className="table-responsive mb-2">
        <table className="table table-hover">
          <thead className="table-dark" align={"center"}>
            <tr>
              <th scope="col">
                <input
                  type={"checkbox"}
                  className="checkbox"
                  name="Select All"
                  onChange={handleHeaderCheckBox}
                  ref={ref}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody align={"center"} className="align-middle">
            {usersInPage.length !== 0
              ? usersInPage.map((user) => (
                  <UserDetailsRow
                    key={user.id}
                    user={user}
                    selectUser={selectUser}
                    getEditUser={getEditUser}
                    deleteUser={deleteUser}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
);

export default AdminTable;
