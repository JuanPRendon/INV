import { useState } from "react";
import axios from "axios";

export default function Materiales(){
  const [file,setFile] = useState()
  const Submit = () =>{
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response =axios.post('http://localhost:4000/materiales', formData);
  
      if (response.status === 200) {
        alert('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }

  return(
    <div>
      <input type="file" name="materiales" onChange={(e) => setFile(e.target.files[0])}/>
      <input type="submit" value="Submit" onClick={Submit}/>
    </div>
  )
}