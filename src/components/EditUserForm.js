import React, { useEffect, useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";

const EditUserForm = ({ user, updateUserDetails }) => {
  const [userDetails, setUserDetails] = useState({
    userName: user.name,
    userEmail: user.email,
    userRole: user.role,
  });
  const [disableSave, setDisableSave] = useState(false);

  const handleFieldChanges = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setUserDetails({ ...userDetails, [fieldName]: fieldValue });
  };

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "colored",
      className: "success-toast",
    });
  };

  const notifyWarning = (msg) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "colored",
    });
  };

  const handleSaveButton = () => {
    if (validateUserDetails(userDetails)) {
      let userObj = {
        ...user,
        name: userDetails.userName,
        email: userDetails.userEmail,
        role: userDetails.userRole,
      };
      updateUserDetails(userObj);
      notifySuccess("User has been updated ! Close the Window");
      setDisableSave(true);
    }
  };

  const validateUserDetails = (userData) => {
    if (userData.userName === "") {
      notifyWarning("Name is a required field !");
      return false;
    } else if (userData.userEmail === "") {
      notifyWarning("Email is a required field !");
      return false;
    } else if (!validator.isEmail(userData.userEmail)) {
      notifyWarning("Enter a valid email !");
      return false;
    }

    return true;
  };

  useEffect(() => {
    setUserDetails({
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
    });
    setDisableSave(false);
  }, [user]);

  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit User Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column align-items-start mb-3">
              <label htmlFor="inputName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="userName"
                value={userDetails.userName}
                onChange={handleFieldChanges}
                disabled={disableSave}
              />
            </div>
            <div className="d-flex flex-column align-items-start mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="userEmail"
                placeholder="name@example.com"
                value={userDetails.userEmail}
                onChange={handleFieldChanges}
                disabled={disableSave}
              />
            </div>
            <div className="d-flex flex-column align-items-start mb-3">
              <label htmlFor="inputRole" className="form-label">
                Role:
              </label>
              <select
                className="form-select"
                id="inputRole"
                name="userRole"
                value={userDetails.userRole}
                onChange={handleFieldChanges}
                disabled={disableSave}
              >
                <option name="userRole" value="admin">
                  admin
                </option>
                <option name="userRole" value="member">
                  member
                </option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleSaveButton}
              disabled={disableSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
