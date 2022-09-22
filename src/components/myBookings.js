import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import AuthenticationService from '../AuthenticationService';
import Certificate from './Certificate';
import { PDFDownloadLink } from "@react-pdf/renderer";

function MyBookings(props) {
    const history = useHistory();
    const [bookings , setBookings] = useState([]);
    const fetchBookings = async () => {
        const response = await fetch(
          `http://localhost:9595/vaccine/getMyBookings`,
          {
            method: "GET",
            headers: AuthenticationService.getHeaders(),
          }
        );
        const json = await response.json();
        if (response.ok) {
            
            setBookings(json);
        } else if (json.status === 401) {
          props.setAlert("visible", "Please Login", "error");
          history.push("/");
        }
      };
    const cancelBooking = async (id,hospital,vaccine) =>{
        const response = await fetch(
            `http://localhost:9595/vaccine/cancelBooking`,
            {
              method: "PUT",
              headers: AuthenticationService.getHeaders(),
              body: JSON.stringify({
                    id:id,
                    hospital:hospital,
                    vaccine:vaccine
              })
            }
          );
          const json = await response.json();
          if (response.ok) {
            props.setAlert("visible", json.message, "success");
            setRerender(!rerender);
          } else if (json.status === 401) {
            props.setAlert("visible", "Please Login", "error");
            history.push("/");
          }
          else{
            props.setAlert("visible", json.message, "error");
          }
    }
      const [rerender, setRerender] = useState(false);
  useEffect(() => {
    console.log("props",props);
    fetchBookings();
  }, [rerender]);
  return (
    <>
    <h4>My Bookings</h4>
    <table class="table" style={{textAlign:"left",width:"fit-content",margin:"auto"}}>
  
  <tbody>
    {bookings.map(b => 
            <tr>
                <th scope="row">Id : <span class="fw-bolder">{b.id}</span></th>
                <td>Hospital : <span class="fw-bolder">{b.hospital.name}</span></td>
                <td>Vaccine : <span class="fw-bolder">{b.vaccine.name}</span></td>
                <td>Date : <span class="fw-bolder">{b.date}</span></td>
                <td>Status : <span class={`fw-bolder text-${b.status === "BOOKED" ? "warning":b.status === "CANCELLED" ?"danger":"success"}`}>{b.status}</span></td>
                <td>{b.status==="BOOKED" && <button class="btn btn-danger" onClick={() => cancelBooking(b.id,b.hospital , b.vaccine)}>Cancel</button>}
                    {b.status==="COMPLETED" && 
                      <PDFDownloadLink document={<Certificate booking={b}/>} fileName={`${b.user.name}_${b.id}`}>
                        {({ loading }) =>
                        loading ? (
                          <button>Loading Document...</button>
                        ) : (
                          <button class="btn btn-success">Download</button>
                        )
                      }
                    </PDFDownloadLink>
                    
                    
                    }
                </td>
            </tr>
    )}
  </tbody>
</table>
    </>
  )
}

export default MyBookings