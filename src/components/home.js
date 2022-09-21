import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../AuthenticationService";
import Card from "./card";

function Home(props) {
    const [allVaccines , setAllVaccines]=useState([]);
    const [elVaccines , setElVaccines]=useState([]);
    
    const history=useHistory();
    const fetchVaccines = async ()=>{
    const response = await fetch("http://localhost:9595/vaccine/getAll", {
      method: "GET",
      headers:AuthenticationService.getHeaders()
    });
    const json = await response.json();
    if (response.ok) {
        console.log(json);
        
        setAllVaccines(json);
    } else if(json.status===401){
      props.setAlert("visible","Please Login","error");
      // history.push('/');
    }
    }

    const fetchEligible = async ()=>{
        const response = await fetch("http://localhost:9595/vaccine/eligibleVaccines", {
          method: "GET",
          headers: AuthenticationService.getHeaders()
        });
        const json = await response.json();
        if (response.ok) {
            console.log(json);
            setElVaccines(json);
        } else if(json.status===401){
          console.log(json , response);
          props.setAlert("visible","Please Login","error");
          history.push('/');
        }
        }
    useEffect(() => {
        fetchVaccines();
        fetchEligible();
      }, []);
  return (
    <div style={{width:"100vw"}}>
      <ul style={{backgroundColor:"#f3efef"}} className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="ex3-tab-1"
            data-mdb-toggle="tab"
            href="#ex3-tabs-1"
            role="tab"
            aria-controls="ex3-tabs-1"
            aria-selected="true"
          >
            All Vaccines
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="ex3-tab-2"
            data-mdb-toggle="tab"
            href="#ex3-tabs-2"
            role="tab"
            aria-controls="ex3-tabs-2"
            aria-selected="false"
          >
            Eligible Vaccines
          </a>
        </li>
        
      </ul>

      <div className="tab-content" id="ex2-content">
        <div
          className="tab-pane fade show active container d-flex align-items-center justify-content-center flex-wrap"
          id="ex3-tabs-1"
          role="tabpanel"
          aria-labelledby="ex3-tab-1"
        >
          {allVaccines && allVaccines.map(v => <Card key={v.id}  vaccine={v}/>)}
        </div>
        <div
          className="tab-pane fade container d-flex align-items-center justify-content-center flex-wrap"
          id="ex3-tabs-2"
          role="tabpanel"
          aria-labelledby="ex3-tab-2"
        >
           {elVaccines && elVaccines.map(v => <Card key={v.id}  vaccine={v}/>)}
        </div>
        
      </div>
      {/* <div className="container d-flex align-items-center justify-content-center flex-wrap">
            <Card vaccine={1}/>
            <Card vaccine={2}/>
            <Card vaccine={3}/>
            <Card vaccine={4}/>
            <Card vaccine={5}/>
    </div> */}
    </div>
  );
}

export default Home;
