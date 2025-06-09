import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Key } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { useBeamStore } from '../../../store/useBeamStore';

export const SignUpAdminPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accessCode: '',
    department: '',
    employeeId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessCodeValid, setAccessCodeValid] = useState<boolean | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate access code (mock validation)
    if (field === 'accessCode') {
      if (value.length === 8) {
        // Mock validation - in real app, this would be an API call
        setAccessCodeValid(value === 'ADMIN123');
      } else {
        setAccessCodeValid(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms || !accessCodeValid) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentPage('verify-email');
    setLoading(false);
  };

  const canSubmit = formData.firstName && formData.lastName && formData.email && 
                   formData.password && formData.confirmPassword && formData.department && 
                   formData.employeeId && accessCodeValid && agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                Admin Registration
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-poppins">
                Invite-only registration for platform administrators
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Access Code */}
              <div>
                <Input
                  label="Access Code"
                  type="text"
                  value={formData.accessCode}
                  onChange={(e) => handleInputChange('accessCode', e.target.value.toUpperCase())}
                  placeholder="Enter 8-character access code"
                  icon={<Key className="w-5 h-5" />}
                  className={`${
                    accessCodeValid === true ? 'border-success-500 focus:border-success-500' :
                    accessCodeValid === false ? 'border-danger-500 focus:border-danger-500' : ''
                  }`}
                  required
                />
                {accessCodeValid === false && (
                  <p className="text-sm text-danger-600 dark:text-danger-400 mt-1 font-poppins">
                    Invalid access code. Please contact your administrator.
                  </p>
                )}
                {accessCodeValid === true && (
                  <p className="text-sm text-success-600 dark:text-success-400 mt-1 font-poppins">
                    Access code verified ✓
                  </p>
                )}
              </div>

              {/* Basic Information */}
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
                placeholder="Enter your work email"
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Department"
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., IT, Education, Operations"
                  required
                />

                <Input
                  label="Employee ID"
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="Your employee ID"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a secure password"
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

              {/* Admin Guidelines */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                  Administrator Responsibilities
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 font-poppins">
                  <li>• Maintain platform security and user safety</li>
                  <li>• Review and moderate content appropriately</li>
                  <li>• Handle user reports and disputes professionally</li>
                  <li>• Protect user privacy and data confidentiality</li>
                  <li>• Follow all company policies and procedures</li>
                </ul>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-300 font-poppins">
                  I agree to the{' '}
                  <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                    Terms of Service
                  </a>,{' '}
                  <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                    Privacy Policy
                  </a>, and{' '}
                  <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                    Administrator Code of Conduct
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800"
                size="lg"
                loading={loading}
                disabled={!canSubmit}
              >
                Create Admin Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 font-poppins">
                Need an access code?{' '}
                <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-medium">
                  Contact IT Support
                </a>
              </p>
            </div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};