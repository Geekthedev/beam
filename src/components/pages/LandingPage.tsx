import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  BookOpen,
  Brain,
  Trophy,
  Users,
  Star,
  ChevronRight,
  Play,
  Check,
  ArrowRight,
  Moon,
  Sun,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { useBeamStore } from '../../store/useBeamStore';
import { mockTestimonials } from '../../data/mockData';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Get personalized explanations, summaries, and practice questions from our advanced AI tutor.',
  },
  {
    icon: Trophy,
    title: 'Gamified Experience',
    description: 'Earn XP, unlock achievements, and compete with friends to stay motivated.',
  },
  {
    icon: BookOpen,
    title: 'Interactive Courses',
    description: 'Engage with hands-on projects, quizzes, and real-world applications.',
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Connect with learners worldwide, share notes, and collaborate on projects.',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '3 courses per month',
      'Basic AI tutor access',
      'Community forums',
      'Mobile app',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'month',
    description: 'For serious learners',
    features: [
      'Unlimited courses',
      'Advanced AI tutor',
      'Certificate generation',
      'Priority support',
      'Offline downloads',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: 'month',
    description: 'For organizations',
    features: [
      'Everything in Pro',
      'Team management',
      'Custom branding',
      'Advanced reporting',
      'SSO integration',
      'Dedicated support',
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: 'How does the AI tutor work?',
    answer: 'Our AI tutor uses advanced natural language processing to understand your questions and provide personalized explanations, examples, and practice problems tailored to your learning style.',
  },
  {
    question: 'Can I access courses offline?',
    answer: 'Yes! Pro and Team subscribers can download course content for offline viewing on our mobile apps.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Absolutely! We offer a 14-day free trial of our Pro plan with no credit card required.',
  },
  {
    question: 'How do certificates work?',
    answer: 'Upon completing a course, you receive a verified digital certificate that you can share on LinkedIn, add to your resume, or showcase in your portfolio.',
  },
];

export const LandingPage: React.FC = () => {
  const { setCurrentPage, theme, setTheme } = useBeamStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white font-josefin">
                Beam
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-poppins">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-poppins">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors font-poppins">
                Reviews
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              
              <Link to="/login">
  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-lg transition-colors duration-300 shadow hover:shadow-md text-xs sm:text-base">
    Sign In
  </Button>
</Link>

<Link to="/register">
  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-lg transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 text-xs sm:text-base">
    Get Started
  </Button>
</Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 font-josefin"
            >
              Illuminate Learning.
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Empower the World.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-poppins"
            >
              Experience the future of education with AI-powered personalization, 
              gamified learning, and a global community of curious minds.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
              <Button
                size="lg"
                onClick={() => setCurrentPage('register')}
                className="text-lg px-8 py-4"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              </Link>
              
              <Link to="/dashboard">
              <Button className='text-lg px-8 py-4 '>
                Explore
              </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white font-poppins">AI Tutor</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      Get instant answers and personalized explanations
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-secondary-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white font-poppins">Achievements</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      Unlock badges and level up your learning journey
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white font-poppins">Community</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      Learn together with millions of curious minds
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-josefin">
              Why Choose Beam?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-poppins">
              We've reimagined online learning from the ground up, combining cutting-edge technology 
              with proven educational principles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full text-center hover:shadow-xl transition-shadow duration-300" hover>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-josefin">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-josefin">
              Loved by Learners Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-poppins">
              Join thousands of satisfied learners who have transformed their careers with Beam.
            </p>
          </div>
          
          <div className="relative">
            <Card className="p-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-poppins">
                  "{mockTestimonials[activeTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <Avatar
                    src={mockTestimonials[activeTestimonial].avatar}
                    alt={mockTestimonials[activeTestimonial].name}
                    size="lg"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white font-poppins">
                      {mockTestimonials[activeTestimonial].name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      {mockTestimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center mt-8 gap-2">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeTestimonial === index ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-josefin">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-poppins">
              Choose the plan that fits your learning goals. Upgrade or downgrade anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-8 relative ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium font-poppins">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white font-poppins">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 font-poppins">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-poppins">
                      {plan.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-poppins">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => setCurrentPage('register')}
                  >
                    Get Started
                  </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-josefin">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">
                      {faq.question}
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-300 font-poppins">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-josefin">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 font-poppins">
            Join millions of learners who are already illuminating their potential with Beam.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
  size="lg"
  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
  onClick={() => setCurrentPage('register')}
>
  Start Your Journey
  <ArrowRight className="w-5 h-5" />
</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-josefin">Beam</span>
              </div>
              <p className="text-gray-400 font-poppins">
                Illuminate Learning. Empower the World.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-josefin">Product</h4>
              <ul className="space-y-2 text-gray-400 font-poppins">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-josefin">Support</h4>
              <ul className="space-y-2 text-gray-400 font-poppins">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-josefin">Company</h4>
              <ul className="space-y-2 text-gray-400 font-poppins">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-poppins">
              © 2025 Beam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
