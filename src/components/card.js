import React from "react";
import { useHistory } from "react-router-dom";
import UtilityMethods from "../UtilityMethods";
import './card_css.css'

function Card({vaccine}) {
    const history = useHistory();
  
  return (
    <div className="box" data-vacc={vaccine}>
            <div className="body">
                <div className="imgContainer">
                    <h4 style={{color:"#1189a1"}}>{vaccine.name}</h4>
                    <span>Age </span><br/>
                    <span style={{color:"#1189a1"}}>{UtilityMethods.getAgeString(vaccine.minAge ,  vaccine.maxAge)}</span><br/>
                    <span>Gender </span><br/>
                    <span style={{color:"#1189a1"}}>{UtilityMethods.getGenderString(vaccine.gender)}</span><br/>
                    <span>Disease </span><br/>
                    <span style={{color:"#1189a1"}}>{vaccine.disease}</span><br/>
                </div>
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div>
                        <h3 className="text-black fs-5">{vaccine.name}</h3>
                        {vaccine.eligible ? <button class="btn btn-outline-info" onClick={() =>history.push(`/hospitals/${vaccine.id}`)}>Book Slot</button>:<p style={{fontSize:10,color:"gray"}}>You are not eligible for this vaccine</p>}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Card;
