import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';

import type { AuthPageProps, RegisterFormData, FormErrors } from '../types'
import { validateEmail, validatePassword , validateName} from '../utils/validation';

import { Form } from '@base-ui-components/react';
import { Field } from '@base-ui-components/react/field';
import { Separator } from '@base-ui-components/react/separator';




// Register Component with TypeScript
const RegisterPage: React.FC<AuthPageProps> = ({ onSwitchToLogin, onBack }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!validateName(formData.fullName)) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration attempt:', formData);
      alert('Registration successful! (Demo)');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = (): void => {
    console.log('Google registration initiated');
    alert('Google OAuth integration would go here');
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <div className="register-page">
      <button className="back-button" onClick={onBack} type="button">
        <FaArrowLeft />
      </button>
      
      <Form className="auth-card">
        <div className="header">
          <h1 className="title">Create Account</h1>
          <h3 className="subtitle">Sign up to get started</h3>
        </div>

        <div onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="fullName" className="input-label">Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
                autoComplete="name"
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
            </div>
            {errors.fullName && (
              <div id="fullName-error" className="error-message" role="alert">
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="form-input"
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <div id="email-error" className="error-message" role="alert">
                {errors.email}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className="form-input"
                autoComplete="new-password"
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <div id="password-error" className="error-message" role="alert">
                {errors.password}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="form-input"
                autoComplete="new-password"
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div id="confirmPassword-error" className="error-message" role="alert">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="primary-button"
            disabled={isLoading}
            //onClick={handleSubmit}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {errors.general && (
            <div className="error-message" role="alert">
              {errors.general}
            </div>
          )}
        </div>

        <div className="divider">
          <Separator className="divider-line" />
          <span className="divider-text">or continue with</span>
        </div>

        <button 
          type="button" 
          className="google-button"
          onClick={handleGoogleRegister}
        >
          <FaGoogle />
          Sign up with Google
        </button>

        <div className="auth-switch">
          <h3 className="auth-switch-text">
            Already have an account?
          </h3>
          <button 
            type="button" 
            className="switch-button"
            onClick={onSwitchToLogin}
          >
            Sign In
          </button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;