import React, { useState } from "react";
import { render } from "react-dom";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";
import ModalComp from "./modalComp";

function Bookhospital({ hospital ,vaccine, setAlert,setRerender,rerender}) {
  const dataStyle = { color: "#1189a1", fontSize: "20px" };
  const [modal,setModal]=useState({"show":false,"data":null});
  const labelStyle = { fontSize: "20px" };
  const history = useHistory();
  

  const showModal = () =>{
    setModal({"show":true,"data":{"hospital" :hospital , "vaccine":vaccine }})
  }
  const bookVaccine = async (vaccineData, hospitalData , dateData) => {
    setModal({"show":false,"data":null})
    const response = await fetch(
      `http://localhost:9595/vaccine/book`,
      {
        method: "POST",
        headers: AuthenticationService.getHeaders(),
        body: JSON.stringify({
          vaccine:vaccineData , 
          hospital:hospitalData,
          date:dateData
        })
      }
    );
    const json = await response.json();
    if (response.ok) {
      setAlert("visible", json.message, "success");
      setRerender(!rerender);
    } else if (json.status === 401) {
      setAlert("visible", "Please Login", "error");
      history.push("/");
    }
    else if (json.status === 500) {
      setAlert("visible", json.message, "error");
      history.push("/");
    }
    else{
      console.log(json);
      setAlert("visible", "Something went Wrong", "error");
    }
  };
  return (
    <>
    <div class="accordion-item my-1">
      <h2 class="accordion-header" id={`flush-heading${hospital.id}`}>
        <button
          class="accordion-button collapsed"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target={`#flush-collapse${hospital.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${hospital.id}`}
          style={{backgroundColor: "#d7d3ca"}}
        >
          {hospital.name}{" "}
          <sub style={{ margin: "0 10px" }}> Click to proceed with booking</sub>
        </button>
      </h2>
      <div
        id={`flush-collapse${hospital.id}`}
        class="accordion-collapse collapse"
        aria-labelledby={`flush-heading${hospital.id}`}
        data-mdb-parent="#accordionFlushExample"
      >
        <div class="accordion-body" style={{width:"100%"}}>
          <div class="d-flex flex-wrap justify-content-between">
            <div>
              <span class="fw-bolder" style={labelStyle}>
                Name :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
                {hospital.name}
              </span>
            </div>
            <div>
              <span class="fw-bolder" style={labelStyle}>
                Doses available :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
              {hospital.quantity}
              </span>
            </div>
            <div>
              <span class="fw-bolder" style={labelStyle}>
                Address :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
              {hospital.address}
              </span>
            </div>
            <div>
              <span class="fw-bolder" style={labelStyle}>
                Phone Number :{" "}
              </span>
              <span class="fw-bold" style={dataStyle}>
              {hospital.phoneNumber}
              </span>
            </div>
          </div>
          <div class="my-3">
          <button class="btn btn-outline-info"  onClick={showModal}>Book Slot</button>
          </div>
        </div>
      </div>
    </div>
      {modal.show && modal.data && <ModalComp data={modal.data} setModal={setModal} bookVaccine={bookVaccine}/> }
    </>
  );
}

export default Bookhospital;
