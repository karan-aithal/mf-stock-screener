import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import type { AuthPageProps, LoginFormData, FormErrors } from '../types'
import { validateEmail, validatePassword } from '../utils/validation';
import { Form } from '@base-ui-components/react';
import { Field } from '@base-ui-components/react/field';
import { Separator } from '@base-ui-components/react/separator';
import { Input } from '@base-ui-components/react/input';
//import '../styles/LoginPage.scss';
// import '../styles/_components.scss';


const LoginPage: React.FC<AuthPageProps> = ({ onSwitchToRegister, onBack }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // Update the form data. This must happen on every key press.
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // This is the key change: When a user starts typing, we clear the error for that field.
    // The error will be re-validated on blur. This prevents errors from appearing mid-word.
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // form submission validation and on-blur validation logic
  const validateForm = (fieldToValidate?: string): boolean => {
    const newErrors: FormErrors = {};

    // Email validation logic
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation logic
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // If a specific field is provided, update only that error
    if (fieldToValidate) {
      const fieldError = newErrors[fieldToValidate] || '';
      setErrors(prev => ({
        ...prev,
        [fieldToValidate]: fieldError
      }));
    } else {
      // Otherwise, update all errors for form submission
      setErrors(newErrors);
    }

    // Return true if there are no errors in the entire form
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt:', formData);
      alert('Login successful! (Demo)');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = (): void => {
    console.log('Google login initiated');
    alert('Google OAuth integration would go here');
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  const handleForgotPassword = (): void => {
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <div className="login-page">
      <button className="back-button" onClick={onBack} type="button">
        <FaArrowLeft />
      </button>

      <div className="auth-card">
        <div className="header">
          <img className='logo' src='/icons/LOGO_InvestSight.svg' alt='InvestSight'></img>
          <h1 className="title">Welcome Back</h1>
          <h3 className="subtitle">Sign in to your account</h3>
        </div>


        <Form onSubmit={handleSubmit} errors={errors}
          className="form">


          <Field.Root className="input-group">
            <Field.Label htmlFor="email" className="input-label">Email</Field.Label>
            <Field.Control
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateForm('email')}
              placeholder="Enter your email address"
              className="form-input"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="error-message" role="alert">
                {errors.email}
              </div>
            )}
          </Field.Root>

          <Field.Root className="input-group">
            <Field.Label htmlFor="password" className="input-label">Password</Field.Label>
            <Field.Control
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => validateForm('password')}
              placeholder="Enter your password"
              className="form-input"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <div id="password-error" className="error-message" role="alert">
                {errors.password}
              </div>
            )}
          </Field.Root>
          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          // onClick={handleSubmit}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {errors.general && (
            <div className="error-message" role="alert">
              {errors.general}
            </div>
          )}


          <div className="divider">
            <Separator className="divider-line" />
            <span className="divider-text">or continue with</span>
          </div>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="google-icon" />
            Sign in with Google
          </button>

          <div className="auth-switch">
            <h3 className="auth-switch-text">
              Don't have an account?
            </h3>
            <button
              type="button"
              className="switch-button"
              onClick={onSwitchToRegister}
            >
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
