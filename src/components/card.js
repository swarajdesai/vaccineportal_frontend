import React from "react";
import './card_css.css'

function Card({vaccine}) {
  const getAgeString = (minAge , maxAge)=>{
        let val="";
        if(minAge<12) val+=`${minAge} Months - `;
        else {
            val += (Math.floor(parseInt(minAge)/12) + " Years");
            if(parseInt(minAge%12) !== 0){
                val +=(parseInt(minAge%12) + " Months")
            }
            val +="-"
        }
        if(maxAge<12) val+=`${maxAge} Months - `;
        else {
            val += (Math.floor(parseInt(maxAge)/12) + " Years");
            if(parseInt(maxAge%12) !== 0){
                val +=(parseInt(maxAge%12) + " Months")
            }
        }
        return val;

  }  
  const getGenderString = (gender) =>{
    if(gender==="") return "All";
    if(gender === "M") return "Male"
    else return "Female"
  }
  return (
    <div className="box" data-vacc={vaccine}>
            <div className="body">
                <div className="imgContainer">
                    <h4 style={{color:"#1189a1"}}>{vaccine.name}</h4>
                    <p>Age </p>
                    <p style={{color:"#1189a1"}}>{getAgeString(vaccine.minAge ,  vaccine.maxAge)}</p>
                    <p>Gender </p>
                    <p style={{color:"#1189a1"}}>{getGenderString(vaccine.gender)}</p>
                </div>
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div>
                        <h3 className="text-black fs-5">{vaccine.name}</h3>
                        {vaccine.eligible ? <p className=" text-black"><button class="btn btn-outline-info" >Book Slot</button></p>:<p style={{fontSize:10,color:"gray"}}>You are not eligible for this vaccine</p>}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Card;
