import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Users, UserPlus, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { useBeamStore } from '../../../store/useBeamStore';

export const SignUpParentPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    relationship: '',
    connectionMethod: 'create', // 'create' or 'connect'
    studentCode: '',
    childFirstName: '',
    childLastName: '',
    childEmail: '',
    childGrade: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const relationships = ['Parent', 'Guardian', 'Grandparent', 'Tutor', 'Other'];
  const grades = [
    'Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 
    'College/University', 'Graduate School'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentPage('verify-email');
    setLoading(false);
  };

  const canProceedStep1 = formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword;
  const canProceedStep2 = formData.relationship && formData.connectionMethod;
  const canProceedStep3 = formData.connectionMethod === 'connect' 
    ? formData.studentCode 
    : formData.childFirstName && formData.childLastName && formData.childGrade;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
              Parent/Guardian Registration
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
              Step {step} of 3
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    stepNum <= step
                      ? 'bg-accent-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      stepNum < step
                        ? 'bg-accent-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    Your Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    Let's start with your basic details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    icon={<User className="w-5 h-5" />}
                    required
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    icon={<User className="w-5 h-5" />}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  icon={<Mail className="w-5 h-5" />}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a password"
                      icon={<Lock className="w-5 h-5" />}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      icon={<Lock className="w-5 h-5" />}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Relationship & Connection Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LinkIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    Relationship & Connection
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    Tell us about your relationship to the student
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Relationship to Student
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {relationships.map((relationship) => (
                      <button
                        key={relationship}
                        type="button"
                        onClick={() => handleInputChange('relationship', relationship)}
                        className={`p-3 rounded-xl border-2 transition-all font-poppins ${
                          formData.relationship === relationship
                            ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-accent-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {relationship}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    How would you like to connect?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`p-6 cursor-pointer transition-all ${
                        formData.connectionMethod === 'connect'
                          ? 'ring-2 ring-accent-500 bg-accent-50 dark:bg-accent-900/20'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleInputChange('connectionMethod', 'connect')}
                    >
                      <div className="text-center">
                        <LinkIcon className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                          Connect to Existing Student
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                          Use a student code to link to an existing account
                        </p>
                      </div>
                    </Card>

                    <Card
                      className={`p-6 cursor-pointer transition-all ${
                        formData.connectionMethod === 'create'
                          ? 'ring-2 ring-accent-500 bg-accent-50 dark:bg-accent-900/20'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleInputChange('connectionMethod', 'create')}
                    >
                      <div className="text-center">
                        <UserPlus className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                          Add New Student
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                          Create a new student profile to monitor
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Student Information */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    {formData.connectionMethod === 'connect' ? (
                      <LinkIcon className="w-8 h-8 text-white" />
                    ) : (
                      <UserPlus className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    {formData.connectionMethod === 'connect' ? 'Connect to Student' : 'Student Information'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    {formData.connectionMethod === 'connect' 
                      ? 'Enter the student code to link accounts'
                      : 'Provide information about your child/student'
                    }
                  </p>
                </div>

                {formData.connectionMethod === 'connect' ? (
                  <div className="max-w-md mx-auto">
                    <Input
                      label="Student Code"
                      type="text"
                      value={formData.studentCode}
                      onChange={(e) => handleInputChange('studentCode', e.target.value)}
                      placeholder="Enter 6-digit student code"
                      className="text-center text-lg tracking-widest"
                      required
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center font-poppins">
                      Ask your student for their unique 6-digit code found in their account settings
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Student's First Name"
                        type="text"
                        value={formData.childFirstName}
                        onChange={(e) => handleInputChange('childFirstName', e.target.value)}
                        placeholder="Enter first name"
                        icon={<User className="w-5 h-5" />}
                        required
                      />

                      <Input
                        label="Student's Last Name"
                        type="text"
                        value={formData.childLastName}
                        onChange={(e) => handleInputChange('childLastName', e.target.value)}
                        placeholder="Enter last name"
                        icon={<User className="w-5 h-5" />}
                        required
                      />
                    </div>

                    <Input
                      label="Student's Email (Optional)"
                      type="email"
                      value={formData.childEmail}
                      onChange={(e) => handleInputChange('childEmail', e.target.value)}
                      placeholder="Student's email address"
                      icon={<Mail className="w-5 h-5" />}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                        Student's Grade Level
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {grades.map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            onClick={() => handleInputChange('childGrade', grade)}
                            className={`p-3 rounded-xl border-2 transition-all font-poppins text-left ${
                              formData.childGrade === grade
                                ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                                : 'border-gray-200 dark:border-gray-600 hover:border-accent-300 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    I agree to the{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      Terms of Service
                    </a>,{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      Privacy Policy
                    </a>, and{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      Parent/Guardian Guidelines
                    </a>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentPage('login')}
                >
                  Already have an account?
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2)
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!canProceedStep3 || !agreeToTerms}
                >
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};