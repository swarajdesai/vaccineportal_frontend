import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";
import UtilityMethods from "../UtilityMethods";
import Bookhospital from "./bookhospital";

function Hospitals(props) {
  const [hospitals, setHospitals] = useState([]);
  const [vaccine, setVaccine] = useState(null);
  const vaccineId = props.match.params.id;
  const history = useHistory();
  const fetchHospitals = async () => {
    const response = await fetch(
      `http://localhost:9595/vaccine/getInfo/${vaccineId}`,
      {
        method: "GET",
        headers: AuthenticationService.getHeaders(),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json.hospitals);
      json.hospitals.forEach((element) => {
        element.quantity = json.quantities[element.id];
      });
      setHospitals(json.hospitals);
      setVaccine(json.vaccineDTO);
    } else if (json.status === 401) {
      props.setAlert("visible", "Please Login", "error");
      history.push("/");
    }
  };
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    console.log("props",props);
    if (/^[0-9]+$/.test(vaccineId) === false) {
      history.push("/error");
    }
    fetchHospitals();
  }, [rerender]);
  const dataStyle = { color: "#1189a1", fontSize: "20px" };
  const labelStyle = { fontSize: "20px" };
  return (
    <>
      {vaccine && (
        <div class="border border-2 rounded-5 p-2">
          <h4>Vaccine Information</h4>
          <div class="d-flex flex-wrap justify-content-around ">
            <div style={{minWidth:"300px",textAlign:"left"}}>
              <span class="fw-bolder" style={labelStyle}>
                Name :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
                {vaccine.name}
              </span>
            </div>
            <div style={{minWidth:"300px",textAlign:"left"}}>
              <span class="fw-bolder" style={labelStyle}>
                Age :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
                {UtilityMethods.getAgeString(vaccine.minAge, vaccine.maxAge)}
              </span>
            </div>
          </div>
          <div class="d-flex flex-wrap justify-content-around ">
          <div style={{minWidth:"300px",textAlign:"left"}}>
              <span class="fw-bolder" style={labelStyle}>
                Gender :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
              {UtilityMethods.getGenderString(vaccine.gender)}
              </span>
            </div>
            <div style={{minWidth:"300px",textAlign:"left"}}>
              <span class="fw-bolder" style={labelStyle}>
                Disease :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
                {vaccine.disease}
              </span>
            </div>
          </div>
        </div>
      )}
      {hospitals && hospitals.length==0 && <h4>No Hospitals for this Vaccine Found</h4>}
      <div class="accordion accordion-flush my-3" id="accordionFlushExample">
        {hospitals && hospitals.map((h) => <Bookhospital key={h.id} setAlert={props.setAlert} hospital={h} vaccine={vaccine} setRerender={setRerender}  rerender={rerender}/>)}
      </div>
    </>
  );
}

export default Hospitals;
