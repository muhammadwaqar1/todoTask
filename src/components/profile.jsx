import React from "react";
import profileImage from "../assets/images/profile.jpg";
function Profile() {
  return (
    <div>
      <img
        src={profileImage}
        alt="sdf"
        className="rounded-full w-20 h-20 border-gray-200 border-4 "
      />
    </div>
  );
}

export default Profile;
