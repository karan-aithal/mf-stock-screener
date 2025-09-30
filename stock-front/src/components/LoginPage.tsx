import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";

import type { AuthPageProps, LoginFormData, FormErrors } from '../types'
import { validateEmail, validatePassword } from '../utils/validation';
import { Form } from '@base-ui-components/react';
import { Field } from '@base-ui-components/react/field';
import { Separator } from '@base-ui-components/react/separator';

import { AuthContext } from "../contexts/AuthContext";

import { Input } from '@base-ui-components/react/input';
import DarkVeil from "./DarkVeil";




const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string | string[] }>({});
  const [formErrors, setFormErrors] = useState<{ general?: string | string[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-level error for this input
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = (field?: string): boolean => {
    const errors: { [key: string]: string | string[] } = {};

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(formData.email)) errors.email = "Invalid email";

    if (!formData.password) errors.password = "Password is required";
    else if (!validatePassword(formData.password)) errors.password = "Password must be at least 6 characters";

    if (field) {
      setFieldErrors(prev => ({ ...prev, [field]: errors[field] || "" }));
    } else {
      setFieldErrors(errors);
    }

    return Object.keys(errors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setFormErrors({}); // reset form-level errors

    try {
      await login(formData.email, formData.password);
      // Success → clear all errors
      setFieldErrors({});
      setFormErrors({});
    } catch (err: any) {
      // Form-level error (server response)
      setFormErrors({ general: err?.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleForgotPassword = () => alert("Forgot password functionality would go here");

  const handleGoogleLogin = () => alert("Google OAuth integration would go here");

  return (
    <div className="app">
     
      <div className="auth-container">
        <div className="login-page">
          <button className="back-button" type="button" onClick={() => window.history.back()}>
            <FaArrowLeft />
          </button>

          <div className="auth-card">
            <div className="header">
              <img className="logo" src="/icons/LOGO_InvestSight.svg" alt="InvestSight" />
              <h1 className="title">Welcome Back</h1>
              <h3 className="subtitle">Sign in to your account</h3>
            </div>

            <Form onSubmit={handleSubmit} errors={fieldErrors} className="form">
              {/* Form-level error */}
              {formErrors?.general && (
                <div className="error-message form-error" role="alert">
                  {formErrors.general}
                </div>
              )}

              {/* Email field */}
              <Field.Root className="input-group">
                <Field.Label htmlFor="email" className="input-label">Email</Field.Label>
                <Field.Control
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => validateForm("email")}
                  placeholder="Enter your email"
                  className="form-input"
                  aria-describedby={fieldErrors?.email ? "email-error" : undefined}
                />
                {fieldErrors?.email && (
                  <div id="email-error" className="error-message" role="alert">{fieldErrors.email}</div>
                )}
              </Field.Root>

              {/* Password field */}
              <Field.Root className="input-group">
                <Field.Label htmlFor="password" className="input-label">Password</Field.Label>
                {/* <div className="password-wrapper"> */}
                  <Field.Control
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={() => validateForm("password")}
                    placeholder="Enter your password"
                    className="form-input"
                    aria-describedby={fieldErrors?.password ? "password-error" : undefined}
                  />
                  <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ?<FaRegEyeSlash />  : <FaRegEye />}
                  </button>
                {/* </div> */}
                {fieldErrors?.password && (
                  <div id="password-error" className="error-message" role="alert">{fieldErrors.password}</div>
                )}
              </Field.Root>

              <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                Forgot your password?
              </button>

              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="divider">
                <Separator className="divider-line" />
                <span className="divider-text">or continue with</span>
              </div>

              <button type="button" className="google-button" onClick={handleGoogleLogin}>
                <FcGoogle className="google-icon" /> Sign in with Google
              </button>

              <div className="auth-switch">
                <h3 className="auth-switch-text">Don't have an account?</h3>
                <a href="/register" className="switch-button">Create Account</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


