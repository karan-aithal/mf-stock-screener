import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Card, Text, Button, Separator } from '@radix-ui/themes';
import type { AuthPageProps, LoginFormData, FormErrors } from '../types'
import { validateEmail, validatePassword } from '../utils/validation';
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
    <div className='login-page'>
      <button className="back-button" onClick={onBack} type="button">
        <FaArrowLeft />
      </button>

      <Card className="auth-card">
        <div className="header">
          <img className='logo' src='/icons/LOGO_InvestSight.svg' alt='InvestSight'></img>
          <h1 className="title">Welcome Back</h1>
          <Text className="subtitle">Sign in to your account</Text>
        </div>

        <div onSubmit={handleSubmit} className="form">
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
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
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

          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>

          <Button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          // onClick={handleSubmit}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {errors.general && (
            <div className="error-message" role="alert">
              {errors.general}
            </div>
          )}
        </div>

        <div className="divider">
          <Separator color="blue" size="4" className="divider-line" />
          <span className="divider-text">or continue with</span>
        </div>

        <Button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className='google-icon' />
          Sign in with Google
        </Button>

        <div className="auth-switch">
          <Text className="auth-switch-text">
            Don't have an account?
          </Text>
          <button
            type="button"
            className="switch-button"
            onClick={onSwitchToRegister}
          >
            Create Account
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;