import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";

function ChangePasswordModal({ setModal ,setAlert}) {
  const [data, setData] = useState({ prevPassword: "", newPassword: "" });
  const [isValid ,setIsValid]=useState(false);
  const history = useHistory();
  const handleChange = (e) => {
    if (e.target.name === "newPassword") {
        console.log(/^[a-zA-Z0-9!@#$]{8,}$/.test(e.target.value));
      if (!/^[a-zA-Z0-9!@#$]{8,}$/.test(e.target.value)) {
            setIsValid(false);
      }
      else{
        setIsValid(true);
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);
    const response = await fetch(
        `http://localhost:9595/auth/changePassword`,
        {
          method: "POST",
          headers: AuthenticationService.getHeaders(),
          body: JSON.stringify(data)
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        setAlert("visible", "Password Updated succesfully", "success");
      } else if (json.status === 401) {
        setAlert("visible", "Please Login", "danger");
        history.push("/");
      }
      else if (response.status === 500) {
        console.log(json);
        setAlert("visible", json.message, "danger");
        // history.push("/");
      }
      else{
        console.log(json);
        setAlert("visible", "Something went Wrong", "danger");
       
      }

  };
  return (
    <div
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
      class="modal show fade"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title" id="staticBackdropLabel">
              Change Password
            </h5>
            <button
              type="button"
              class="btn-close"
              onClick={() => {
                setModal(false);
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="modal-body mb-2" style={{height:"fit-content"}}>
              <div class="mb-2">
                <label htmlFor="prevPassword" class="col-form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="prevPassword"
                  name="prevPassword"
                  required
                  onChange={handleChange}
                />
              </div>
              <div class="mb-2">
                <label class="col-form-label" for="newPassword">
                  New Password
                </label>
                <div class="form-outline">
                  {/* <label class="col-form-label" for="newPassword">New Password</label> */}
                  <i class={`fas ${isValid ? "fa-check-circle":"fa-times-circle"} trailing`} style={{color: isValid ? "green":"red"}}></i>
                  <input
                    type="password"
                    style={{ border: "1px solid #bdbdbd" }}
                    name="newPassword"
                    id="newPassword"
                    class="form-control form-icon-trailing"
                    onChange={handleChange}
                  />
                  <div class="form-helper">
                    Enter password with minimum 8 length a-z A-Z 0-9 !@#$
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" disabled={!isValid}>
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
