import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { useBeamStore } from '../../../store/useBeamStore';

export const ForgotPasswordPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEmailSent(true);
    setLoading(false);
    
    // Start resend cooldown
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    
    // Restart cooldown
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
                Check Your Email
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-poppins">
                We've sent a password reset link to:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-6">
                <p className="font-medium text-gray-900 dark:text-white font-poppins">
                  {email}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-poppins">
                Click the link in the email to reset your password. The link will expire in 24 hours.
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={handleResend}
                  variant="outline"
                  className="w-full"
                  disabled={resendCooldown > 0}
                  loading={loading}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
                </Button>
                
                <Button
                  onClick={() => setCurrentPage('login')}
                  variant="ghost"
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-poppins">
                  <strong>Didn't receive the email?</strong> Check your spam folder or try adding noreply@beam.com to your contacts.
                </p>
              </div>
            </motion.div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                Forgot Password?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-poppins">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
                disabled={!email}
              >
                Send Reset Link
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="text-center">
              <Button
                onClick={() => setCurrentPage('login')}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                Security Tips
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 font-poppins">
                <li>• Use a strong, unique password</li>
                <li>• Enable two-factor authentication</li>
                <li>• Don't share your login credentials</li>
                <li>• Log out from shared devices</li>
              </ul>
            </div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};