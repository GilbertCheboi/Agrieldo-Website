import React from "react";

const MyFarm = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Live CCTV Footage</h2>
      <iframe
        src="http://YOUR_HIKVISION_CAMERA_IP/Streaming/Channels/101/preview"
        width="80%"
        height="500"
        style={{ borderRadius: "10px", border: "2px solid #333" }}
        allowFullScreen
        title="CCTV Footage"
      ></iframe>
    </div>
  );
};

export default MyFarm;
