import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState(new FormData());

  const handleFileChange = async (e) => {
    formData.append("image", e.target.files[0]);
    formData.append("name", "aadhar");
    console.log(formData, "formData");
    try {
      const response = await axios.post(
        "https://fileserver-21t2.onrender.com/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error sending FormData:", error);
    }
  };

  // const handleSubmit = async () => {};

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
}

export default App;
