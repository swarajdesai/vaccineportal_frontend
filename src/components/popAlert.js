import React from 'react'

function PopAlert(props) {
  return (
    <div style={{height: '50px' , visibility:props.alertData.alertDisplay}}>
      {<div className={`alert alert-${props.alertData.severity} alert-dismissible fade show`} role="alert">
        {props.alertData.text} 
    </div>}
    </div>
  )
}

export default PopAlert