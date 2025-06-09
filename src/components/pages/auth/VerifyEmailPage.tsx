import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { useBeamStore } from '../../../store/useBeamStore';

export const VerifyEmailPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified'>('pending');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [autoVerifyTimer, setAutoVerifyTimer] = useState(10);

  // Auto-verify after 10 seconds for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoVerifyTimer(prev => {
        if (prev <= 1) {
          setVerificationStatus('verifying');
          setTimeout(() => {
            setVerificationStatus('verified');
          }, 2000);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
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

  const handleContinue = () => {
    setCurrentPage('onboarding');
  };

  const handleManualVerify = () => {
    setVerificationStatus('verifying');
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Status Icon */}
            <div className="mb-6">
              {verificationStatus === 'pending' && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>
              )}
              
              {verificationStatus === 'verifying' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <RefreshCw className="w-8 h-8 text-white" />
                </motion.div>
              )}
              
              {verificationStatus === 'verified' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
                </motion.div>
              )}
            </div>

            {/* Content based on status */}
            {verificationStatus === 'pending' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
                  Verify Your Email
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-poppins">
                  We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    Auto-verifying in <span className="font-bold text-primary-600">{autoVerifyTimer}</span> seconds for demo...
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleManualVerify}
                    className="w-full"
                  >
                    I've Verified My Email
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={handleResend}
                    variant="outline"
                    className="w-full"
                    disabled={resendCooldown > 0}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
                  </Button>
                </div>
              </>
            )}

            {verificationStatus === 'verifying' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
                  Verifying...
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-poppins">
                  Please wait while we verify your email address.
                </p>
              </>
            )}

            {verificationStatus === 'verified' && (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-josefin"
                >
                  Email Verified! 🎉
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-300 mb-6 font-poppins"
                >
                  Great! Your email has been successfully verified. You can now continue setting up your account.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={handleContinue}
                    className="w-full"
                    size="lg"
                  >
                    Continue Setup
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </>
            )}

            {/* Help Section */}
            {verificationStatus === 'pending' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 font-josefin">
                  Didn't receive the email?
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 font-poppins text-left">
                  <li>• Check your spam/junk folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• Add noreply@beam.com to your contacts</li>
                  <li>• Wait a few minutes and try again</li>
                </ul>
              </div>
            )}
          </motion.div>
        </Card>
      </div>
    </div>
  );
};