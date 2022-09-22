class UtilityMethods {
     getAgeString(minAge , maxAge){
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
  getGenderString (gender) {
    if(gender==="") return "All";
    if(gender === "M") return "Male"
    else return "Female"
  }
   calculateAge(birthday) { 
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log("Age is ",birthday,Math.abs(ageDate.getUTCFullYear() - 1970))
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
}
export default new UtilityMethods();