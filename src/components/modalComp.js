import React, { useState } from "react";

function ModalComp({ data, setModal ,bookVaccine}) {
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 5);
  const [slotDate , setSlotDate]=useState(new Date().toISOString().split("T")[0]);
  const handleSubmit = (e) =>{
    console.log(data , slotDate);
    e.preventDefault();
    bookVaccine(data.vaccine , data.hospital , slotDate);
  }
  return (
    <div
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
      class="modal show fade"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Book the Slot
            </h5>
            <button
              type="button"
              class="btn-close"
              onClick={() => {
                setModal({ show: false, data: null });
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="modal-body">
              <div class="mb-1">
                <label htmlFor="hospital" class="col-form-label">
                  Hospital
                </label>
                <input
                  type="text"
                  disabled
                  value={data.hospital.name}
                  class="form-control"
                  id="hospital"
                />
              </div>
              <div class="mb-1">
                <label htmlFor="vaccine" class="col-form-label">
                  Vaccine
                </label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  value={data.vaccine.name}
                  id="vaccine"
                ></input>
              </div>
              <div class="mb-1">
                <label htmlFor="vaccine" class="col-form-label">
                  Date
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  class="form-control"
                  min={new Date().toISOString().split("T")[0]}
                  max={maxDate.toISOString().split("T")[0]}
                  id="vaccine"
                  onChange={(e)=>{setSlotDate(e.target.value)}}
                ></input>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => {
                  setModal({ show: false, data: null });
                }}
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalComp;
