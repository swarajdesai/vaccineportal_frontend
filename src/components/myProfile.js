import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";
import ChangePasswordModal from "./ChangePasswordModal";
import Test from "./test";

function MyProfile(props) {
  const history = useHistory();
  const [fetched, setFetched] = useState(false);
  const [showModal , setShowModal]=useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  });
  const [isUpdated , setIsUpdated] = useState(false);
  const fetchProfile = async () => {
    const response = await fetch(`http://localhost:9595/auth/profile`, {
      method: "GET",
      headers: AuthenticationService.getHeaders(),
    });
    const json = await response.json();
    if (response.ok) {
      console.log("json", json);
      setProfileData({
        name: json.name,
        email: json.email,
        phoneNumber: json.phoneNumber,
        birthDate: json.birthDate,
        gender: json.gender,
      });
      setOriginalData({
        name: json.name,
        email: json.email,
        phoneNumber: json.phoneNumber,
        birthDate: json.birthDate,
        gender: json.gender,
      });
      setFetched(true);
    } else if (json.status === 401) {
      props.setAlert("visible", "Please Login", "danger");
      history.push("/");
    }
  };
  const updateData = async (vaccineData, hospitalData , dateData) => {
    const response = await fetch(
      `http://localhost:9595/auth/updateProfile`,
      {
        method: "POST",
        headers: AuthenticationService.getHeaders(),
        body: JSON.stringify(profileData)
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      props.setAlert("visible", "Profile Updated succesfully", "success");
      setProfileData(json);
      setIsUpdated(false);
    } else if (json.status === 401) {
      props.setAlert("visible", "Please Login", "danger");
      history.push("/");

    }
    else if (response.status === 500) {
      console.log(json);
      props.setAlert("visible", json.message, "danger");
      // history.push("/");
    }
    else{
      console.log(json);
      props.setAlert("visible", "Something went Wrong", "danger");
      setIsUpdated(false);
    }
  };
  
  const cancelUpdate = (e) =>{
      setIsUpdated(false);
      setProfileData(originalData);
  }
  useEffect(() => {
    fetchProfile();
    console.log("profile", profileData);
  }, []);
  return (
    <>
    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Reset password</button>
      {fetched && (
        <table class="table" style={{width:"80vw",margin: "auto"}}>
        <tr style={{borderBottom: "1px solid gray",height:"100px"}}>
          <Test
            inpType="text"
            name={"name"}
            label={"Name"}
            pattern={/^([a-zA-Z][a-zA-Z ]*){3,}$/}
            value={profileData.name}
            errorMsg={"Enter atleast 3 alphabets in name"}
            setIsUpdated={setIsUpdated}
            setProfileData={setProfileData}
            profileData={profileData}
          />
          </tr>
          <tr style={{borderBottom: "1px solid gray",height:"100px"}}>
          <td style={{width:"25vw"}}>
            <span style={{ marginRight: 10 , alignSelf:"center" }}>{"Email"} : </span>
          </td>
          <td style={{width:"60vw"}}>
            <div style={{display:"block"}}>
              <span className="fw-bolder" style={{ margin: "auto 2px" ,}}>
                  {profileData.email}
              </span>
        
          </div>
          </td>
          </tr>
          <tr style={{borderBottom: "1px solid gray",height:"100px"}}>
          <Test
            inpType="number"
            name={"phoneNumber"}
            label={"Phone Number"}
            pattern={/^[1-9]([0-9]{9})$/}
            value={profileData.phoneNumber}
            errorMsg={"Please Enter valid 10 digit Phone number"}
            setIsUpdated={setIsUpdated}
            setProfileData={setProfileData}
            profileData={profileData}
          />
          </tr>
          <tr style={{borderBottom: "1px solid gray",height:"100px"}}>
          <Test
            inpType="date"
            name={"birthDate"}
            label={"Birth Date"}
            pattern={/^[0-9]*-[0-9]*-[0-9]*$/}
            value={profileData.birthDate}
            errorMsg={"Enter birthdate"}
            max={new Date().toISOString().split("T")[0]}
            setIsUpdated={setIsUpdated}
            setProfileData={setProfileData}
            profileData={profileData}
          />
          </tr>
          <tr>
            <Test
            inpType="radio"
            name={"gender"}
            label={"Gender"}
            pattern={/^M|F$/}
            value={profileData.gender}
            errorMsg={"Choose Gender"}
            setIsUpdated={setIsUpdated}
            setProfileData={setProfileData}
            profileData={profileData}
          />
          </tr> 
          </table>
          
      )}
      { isUpdated && 
      <div style={{marginTop:"10px"}}>
            <button class="btn btn-primary" onClick={updateData}>Update Data</button>
            <button class="btn btn-danger" onClick={cancelUpdate}>Cancel</button>
      </div>
      }
      {showModal && <ChangePasswordModal setModal={setShowModal} setAlert={props.setAlert}/>}

    </>
  );
}

export default MyProfile;
