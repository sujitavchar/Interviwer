import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import SideImg from "../../assets/register_form_image.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    collegeName: "",
    companyName: "",
    mobileNo: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be below 5MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ Use a different variable for FormData
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("collegeName", formData.collegeName);
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("mobileNo", formData.mobileNo);

    if (formData.profileImage) {
      formDataToSend.append("profileImg", formData.profileImage); // ✅ Ensure multer field name is correct
    }

    console.log("FormData before sending:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://interviwer-production.up.railway.app/api/v1/users/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration Successful:", response.data);
      alert("Registration Successful!");
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return loading ? (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  ) : (
    <div className="register-page">
      <div className="register-form-container">
        <h2>Create an Account</h2>
        <p>Fill in your details to continue</p>

        <form onSubmit={handleSubmit} className="register-form">
          <label>Full Name *</label>
          <input type="text" name="fullName" value={formData.fullName} placeholder="John Doe" required onChange={handleChange} />

          <label>Email *</label>
          <input type="email" name="email" value={formData.email} placeholder="xyz@gmail.com" required onChange={handleChange} />

          <label>Password *</label>
          <input type="password" name="password" value={formData.password} placeholder="**********" required onChange={handleChange} />

          <label>College Name *</label>
          <input type="text" name="collegeName" value={formData.collegeName} placeholder="MIT" required onChange={handleChange} />

          <label>Company Name *</label>
          <input type="text" name="companyName" value={formData.companyName || ""} placeholder="Google" required onChange={handleChange} />

          <label>Mobile Number *</label>
          <input type="tel" name="mobileNo" value={formData.mobileNo} placeholder="9012321324" required onChange={handleChange} />

          <label>Profile Image (Max 5MB)</label>
          <input type="file" accept="image/*" name="profileImg" onChange={handleFileChange} />

          <p className="terms">
            By clicking Sign up, you agree to our <a href="xyz">Terms and Conditions</a> and <a href="xyz">Privacy Policy</a>.
          </p>

          <button type="submit" className="btn signup">{isSubmitting ? "Registering..." : "Sign Up"}</button>

          <p className="login-redirect">
            Already registered? <a href="/login">Login</a>
          </p>


        </form>
      </div>

      <div className="register-image">
        <img src={SideImg} alt="register" />
      </div>
    </div>
  );
};

export default Register;
