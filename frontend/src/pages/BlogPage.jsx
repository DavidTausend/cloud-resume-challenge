import React from "react";
import "css/pages/home.css";
import david_tausend from "images/david-tausend.webp";

export default function HomePage() {
  return (
    <>
      <div className="profile_picture">
        <img src={david_tausend} alt="David Tausend" />
      </div>
    </>
  );
}