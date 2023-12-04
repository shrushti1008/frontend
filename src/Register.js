import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [goshalaName, setGoshalaName] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [district, setDistrict] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [atgNo, setAtgNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = async () => {
    console.warn(
      goshalaName,
      establishmentDate,
      district,
      applicantName,
      atgNo,
      mobileNumber,
      email,
      password
    );
    try {
      let result = await fetch("http://localhost:8000/registeration", {
        method: "post",
        body: JSON.stringify({
          goshalaName,
          establishmentDate,
          district,
          applicantName,
          atgNo,
          mobileNumber,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      localStorage.setItem("user",JSON.stringify(result));
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleSubmission =async () => {
    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validation for phone number (assuming 10 digits are required)
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const validatePassword = (password) => {
      // Example validation rules (you can adjust these based on your requirements)
      if (password.length < 8) {
        return "Password must be at least 8 characters long.";
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      }

      // Check for at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
      }

      // Check for at least one digit
      if (!/\d/.test(password)) {
        return "Password must contain at least one digit.";
      }

      // Check for at least one special symbol
      const specialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialSymbolRegex.test(password)) {
        return "Password must contain at least one special symbol.";
      }

      // No error if validation passes
      return "";
    };
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      alert(passwordValidationError);
      return;
    }

    await collectData();
    console.log("Form submitted!");
    console.log("Goshala Name:", goshalaName);
    console.log("Establishment Date:", establishmentDate);
    console.log("District:", district);
    console.log("Applicant Name:", applicantName);
    console.log("ATG no. :", atgNo);
    console.log("Mobile Number:", mobileNumber);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your form submission logic here

  };

  return (
    <div className="container">
      <h1>Register</h1>
      <label>
        Goshala Name:
        <input
          type="text"
          name="goshalaName"
          value={goshalaName}
          onChange={(e) => setGoshalaName(e.target.value)}
        />
      </label>
      <label>
        Establishment Date:
        <input
          type="text"
          name="establishmentDate"
          value={establishmentDate}
          onChange={(e) => setEstablishmentDate(e.target.value)}
        />
      </label>
      <label>
        District:
        <input
          type="text"
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </label>
      <label>
        Applicant Name:
        <input
          type="text"
          name="applicantName"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />
      </label>
      <label>
        ATG Number:
        <input
          type="text"
          name="atgNO"
          value={atgNo}
          onChange={(e) => setAtgNo(e.target.value)}
        />
      </label>
      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
};

export default Register;
