import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    state: "",
    gender: "",
    skills: [],
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value)
      });
    }
  };

  // Age calculation from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const age = calculateAge(formData.dob);

    alert(
      `
=========== Registration Details ===========

Name     : ${formData.firstName} ${formData.lastName}
DOB      : ${formData.dob}
Age      : ${age} years
State    : ${formData.state}
Gender   : ${formData.gender}
Skills   : ${formData.skills.join(", ")}
Address  : ${formData.address}

============================================
      `
    );
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          required
        />

        <label>State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          <option value="UP">Uttar Pradesh</option>
          <option value="MH">Maharashtra</option>
          <option value="DL">Delhi</option>
          <option value="HR">Haryana</option>
        </select>

        <label>Gender</label>
        <div className="radio-group">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />{" "}
          Female
        </div>

        <label>Skills</label>
        <div className="checkbox-group">
          <input type="checkbox" value="C++" onChange={handleSkillChange} /> C++
          <input type="checkbox" value="Java" onChange={handleSkillChange} /> Java
          <input type="checkbox" value="React" onChange={handleSkillChange} /> React
        </div>

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;