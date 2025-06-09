import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen, Upload, Award } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { useBeamStore } from '../../../store/useBeamStore';

const subjects = [
  'Mathematics', 'Science', 'English/Literature', 'History', 'Art & Design',
  'Music', 'Technology', 'Languages', 'Business', 'Health', 'Psychology', 'Engineering'
];

const qualifications = [
  'High School Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD/Doctorate',
  'Teaching Certificate', 'Professional Certification', 'Industry Experience'
];

export const SignUpTeacherPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    yearsExperience: '',
    subjects: [] as string[],
    qualifications: [] as string[],
    bio: '',
    linkedIn: '',
    website: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const toggleQualification = (qualification: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.includes(qualification)
        ? prev.qualifications.filter(q => q !== qualification)
        : [...prev.qualifications, qualification]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
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
  const canProceedStep2 = formData.institution && formData.yearsExperience && formData.subjects.length > 0;
  const canProceedStep3 = formData.qualifications.length > 0 && agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
              Teacher Registration
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
                      ? 'bg-secondary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      stepNum < step
                        ? 'bg-secondary-500'
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
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    Basic Information
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

            {/* Step 2: Professional Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    Professional Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    Tell us about your teaching background
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Institution/School"
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    placeholder="Current or previous institution"
                    required
                  />

                  <Input
                    label="Years of Experience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    placeholder="Years teaching"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Subject Areas (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjects.map((subject) => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className={`p-3 rounded-xl border-2 transition-all font-poppins ${
                          formData.subjects.includes(subject)
                            ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-secondary-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                    Bio (Optional)
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell students about yourself and your teaching philosophy..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary-500 focus:ring-0 transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-secondary-400 font-poppins placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="LinkedIn Profile (Optional)"
                    type="url"
                    value={formData.linkedIn}
                    onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />

                  <Input
                    label="Personal Website (Optional)"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Qualifications & Terms */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                    Qualifications
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    Share your educational background and certifications
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Educational Qualifications (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {qualifications.map((qualification) => (
                      <button
                        key={qualification}
                        type="button"
                        onClick={() => toggleQualification(qualification)}
                        className={`p-3 rounded-xl border-2 transition-all font-poppins text-left ${
                          formData.qualifications.includes(qualification)
                            ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-accent-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {qualification}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-poppins">
                    Upload Certificates/Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2 font-poppins">
                      Drag and drop files here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </label>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                          Uploaded Files:
                        </p>
                        {uploadedFiles.map((file, index) => (
                          <p key={index} className="text-sm text-gray-600 dark:text-gray-400 font-poppins">
                            {file}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    I agree to the{' '}
                    <a href="#" className="text-secondary-600 hover:text-secondary-700">
                      Terms of Service
                    </a>,{' '}
                    <a href="#" className="text-secondary-600 hover:text-secondary-700">
                      Privacy Policy
                    </a>, and{' '}
                    <a href="#" className="text-secondary-600 hover:text-secondary-700">
                      Instructor Guidelines
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
                  disabled={!canProceedStep3}
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