import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, GraduationCap, Clock, Target, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useBeamStore } from '../../store/useBeamStore';

const steps = [
  { id: 'welcome', title: 'Welcome', icon: '👋' },
  { id: 'role', title: 'Role', icon: '🎯' },
  { id: 'interests', title: 'Interests', icon: '💡' },
  { id: 'level', title: 'Skill Level', icon: '📊' },
  { id: 'commitment', title: 'Time', icon: '⏰' },
];

const interests = [
  'Web Development', 'Data Science', 'Mobile Development', 'UI/UX Design',
  'Machine Learning', 'Blockchain', 'Digital Marketing', 'Photography',
  'Business', 'Languages', 'Music', 'Art & Design'
];

const skillLevels = [
  { id: 'beginner', title: 'Beginner', description: 'Just starting out', icon: '🌱' },
  { id: 'intermediate', title: 'Intermediate', description: 'Some experience', icon: '🌿' },
  { id: 'advanced', title: 'Advanced', description: 'Experienced learner', icon: '🌳' },
];

const timeCommitments = [
  { id: 'casual', title: '1-2 hours/week', description: 'Casual learning', icon: '🚶' },
  { id: 'regular', title: '3-5 hours/week', description: 'Regular practice', icon: '🏃' },
  { id: 'intensive', title: '6+ hours/week', description: 'Intensive study', icon: '🏃‍♂️' },
];

export const OnboardingPage: React.FC = () => {
  const { setCurrentPage, setUser, mockUser } = useBeamStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    interests: [] as string[],
    skillLevel: '',
    timeCommitment: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setUser(mockUser);
      setCurrentPage('dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return true;
      case 'role':
        return formData.role !== '';
      case 'interests':
        return formData.interests.length > 0;
      case 'level':
        return formData.skillLevel !== '';
      case 'commitment':
        return formData.timeCommitment !== '';
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
              Welcome to Beam!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-poppins">
              Let's personalize your learning experience. This will only take a few minutes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-gray-900 dark:text-white font-poppins">Personalized</div>
                <div className="text-gray-600 dark:text-gray-300 font-poppins">Tailored to your goals</div>
              </div>
              <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-semibold text-gray-900 dark:text-white font-poppins">AI-Powered</div>
                <div className="text-gray-600 dark:text-gray-300 font-poppins">Smart recommendations</div>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-gray-900 dark:text-white font-poppins">Gamified</div>
                <div className="text-gray-600 dark:text-gray-300 font-poppins">Engaging experience</div>
              </div>
            </div>
          </motion.div>
        );

      case 'role':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
              What's your role?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-poppins">
              This helps us customize your experience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  formData.role === 'learner'
                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'learner' }))}
              >
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                  Learner
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-poppins">
                  I want to learn new skills and advance my knowledge
                </p>
              </Card>
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  formData.role === 'instructor'
                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'instructor' }))}
              >
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                  Instructor
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-poppins">
                  I want to create courses and teach others
                </p>
              </Card>
            </div>
          </motion.div>
        );

      case 'interests':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
              What interests you?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-poppins">
              Select topics you'd like to explore (choose at least one)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-xl border-2 transition-all font-poppins ${
                    formData.interests.includes(interest)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'level':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
              What's your skill level?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-poppins">
              This helps us recommend the right courses for you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillLevels.map((level) => (
                <Card
                  key={level.id}
                  className={`p-6 cursor-pointer transition-all ${
                    formData.skillLevel === level.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, skillLevel: level.id }))}
                >
                  <div className="text-4xl mb-4">{level.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                    {level.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    {level.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      case 'commitment':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-josefin">
              How much time can you commit?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-poppins">
              We'll suggest a learning schedule that fits your lifestyle
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {timeCommitments.map((commitment) => (
                <Card
                  key={commitment.id}
                  className={`p-6 cursor-pointer transition-all ${
                    formData.timeCommitment === commitment.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, timeCommitment: commitment.id }))}
                >
                  <div className="text-4xl mb-4">{commitment.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-josefin">
                    {commitment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-poppins">
                    {commitment.description}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white font-josefin">Beam</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index <= currentStep
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      index < currentStep
                        ? 'bg-primary-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="ml-auto"
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};