
import React from "react";
// import { FormSubmittion } from "../feedback/page";
import { Table } from '@mantine/core';
interface FormSubmittion {
  fullName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  address: string;
  feedback: string;
  satisfaction: string;
  rating: number;
  location: string;
  typeofincident: string;
  policestation: string;
  feedbacktype: string;
}

const ContactUs = async () => {
  const res = await fetch("https://feedback-hub-nine.vercel.app/api/feedback");
  
  
  const data:FormSubmittion[] = await res.json();
  console.log(data);
  return <div className="pt-16">

    {/* create a table for recienved data */}
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <thead>
        <tr>
          <th>fullName</th>
          <th>email</th>
          <th>Phone Number</th>
          <th>age</th>
          <th>Address</th>
          <th>Gender</th>
          <th>Feedback</th>
          <th>Satisfaction</th>
          <th>Rating</th>
          <th>Location</th>
          <th>typeofincident</th>
          <th>policestation</th>
          <th>feedbacktype</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.age}</td>
            <td>{item.address}</td>
            <td>{item.gender}</td>
            <td>{item.feedback}</td>
            <td>{item.satisfaction}</td>
            <td>{item.rating}</td>
            <td>{item.location}</td>
            <td>{item.typeofincident}</td>
            <td>{item.policestation}</td>
            <td>{item.feedbacktype}</td>
          </tr>
        ))}
      </tbody>
      
      </Table>

  </div>

};


export default ContactUs;

