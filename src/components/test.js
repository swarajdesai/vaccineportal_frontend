import React, { useState } from "react";
import UtilityMethods from "../UtilityMethods";
import "./editable_label_css.css";
function Test({
  label,
  pattern,
  value,
  errorMsg,
  name,
  inpType,
  max,
  setIsUpdated,
  setProfileData,
  profileData,
}) {
  const [inputDisplaySet, setInputDisplay] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tempData, setTempData] = useState(value);
  const toggleDisplay = (e) => {
    console.log(e);
    setInputDisplay(!inputDisplaySet);
  };
  const handleChnage = (e) => {
    console.log(e);
    if (!pattern.test(e.target.value.trim().replaceAll(/\s\s+/g, " "))) {
      
      setShowError(true);
    } else {
      setShowError(false);
      setTempData(e.target.value.trim().replaceAll(/\s\s+/g, " "));
    }
  };
  const updateHandler = () => {
    setProfileData({ ...profileData, [name]: tempData });
    setIsUpdated(true);
    setInputDisplay(false);
  };
  return (
    // <div style={{ display: "flex", flexDirection: "row" }}>
    <>
      <td style={{ width: "25vw" }}>
        <span style={{ marginRight: 10, alignSelf: "center" }}>{label} : </span>
      </td>
      <td style={{ width: "60vw" }}>
        <div style={{ display: inputDisplaySet ? "none" : "block" }}>
          <span className="fw-bolder" style={{ margin: "auto 2px" }}>
            {inpType ==="radio"?UtilityMethods.getGenderString(value):value}
          </span>
          <i
            class="far fa-edit edit_icon"
            id="edit_icon"
            onClick={toggleDisplay}
          ></i>
        </div>
        <div
          class="row g-3 align-items-center"
          style={{ display: inputDisplaySet ? "flex" : "none" }}
        >
          <div class="form-outline col-auto">
            {inpType !=="radio" &&
              <input
                type={inpType}
                id="formTextExample2"
                class="form-control"
                aria-describedby="textExample2"
                style={{
                  border: `${showError ? "4" : "2"}px solid ${
                    showError ? "red" : "black"
                  }`,
                }}
                defaultValue={value}
                onChange={handleChnage}
                name={name}
                max={max ? max : ""}
              />
            }
            
          </div>
          {inpType ==="radio" && 
            <div class="col-auto">
            {/* <div> */}
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name={name}
                id="inlineRadio1"
                value="M"
                onChange={handleChnage}
                checked={tempData==="M"}
              />
              <label class="form-check-label" for="inlineRadio1">
                Male
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name={name}
                id="inlineRadio2"
                value="F"
                onChange={handleChnage}
                checked={tempData==="F"}
              />
              <label class="form-check-label" for="inlineRadio2">
                Female
              </label>
            </div>
             </div>
            }
          <div class="col-auto">
            <button
              class="btn btn-primary"
              disabled={showError}
              onClick={updateHandler}
            >
              Ok
            </button>
            <button class="btn btn-danger" onClick={toggleDisplay}>
              Cancel
            </button>
            <span
              id="textExample2"
              class="form-text"
              style={{
                visibility: showError ? "visible" : "hidden",
                color: "red",
              }}
            >
              {" "}
              {errorMsg}{" "}
            </span>
          </div>
        </div>
      </td>
    </>
    // </div>
  );
}

export default Test;
