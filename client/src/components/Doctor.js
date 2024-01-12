import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Telefon Numarası : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Adres : </b>
        {doctor.address}
      </p>
      <p>
        <b>Ücret : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Çalışma Saatleri : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
