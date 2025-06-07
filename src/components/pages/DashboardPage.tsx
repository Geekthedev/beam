import { Link } from 'react-router-dom'; 
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  Play,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useBeamStore } from '../../store/useBeamStore';
import { mockCourses, mockLeaderboard } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  const { user, setCurrentPage } = useBeamStore();

  const recentCourses = mockCourses.slice(0, 3);
  const topLearners = mockLeaderboard.slice(0, 5);

  const stats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'primary' },
    { label: 'Total XP', value: user?.xp.toLocaleString() || '0', icon: Zap, color: 'secondary' },
    { label: 'Learning Streak', value: `${user?.streak || 0} days`, icon: Target, color: 'accent' },
    { label: 'Achievements', value: '8', icon: Trophy, color: 'success' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-josefin">
                Welcome back, {user?.name?.split(' ')[0] || 'Learner'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 font-poppins">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400 font-poppins">Current Level</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 font-josefin">
                  {user?.level || 1}
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">{user?.level || 1}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-josefin">Daily Challenge</h3>
                    <p className="text-primary-100 mb-4 font-poppins">
                      Complete a lesson today to maintain your streak!
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4" />
                      <span className="font-poppins">+50 XP Reward</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl mb-2">🎯</div>
                    <Button variant="secondary" size="sm">
                      Start Challenge
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
                  Continue Learning
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage('courses')}
                  className="text-primary-600"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="overflow-hidden" hover>
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                            <Play className="w-4 h-4" />
                            Continue
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-poppins">
                          {course.instructorName}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: '65%' }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-poppins">65%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Tutor Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white font-josefin">
                        AI Tutor
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                        Get instant help with your questions
                      </p>
                    </div>
                  </div>
                  <Link to="/onboarding">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Ask Question
                  </Button>
                  </Link>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-poppins">
                        "Hi! I'm your AI tutor. I can help explain concepts, create practice questions, 
                        and provide personalized learning recommendations. What would you like to learn about today?"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 font-josefin">
                  Level Progress
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 font-josefin">
                    Level {user?.level || 1}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                    {user?.xp || 0} / {((user?.level || 1) * 1000)} XP
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}
                  />
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage('achievements')}
                  >
                    View Achievements
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white font-josefin">
                    Leaderboard
                  </h3>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="space-y-3">
                  {topLearners.map((learner, index) => (
                    <div
                      key={learner.rank}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        learner.isCurrentUser
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                          : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {learner.rank}
                      </div>
                      <Avatar src={learner.avatar} alt={learner.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate font-poppins">
                          {learner.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
                          {learner.xp.toLocaleString()} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 font-josefin">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('explorer')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Explore Courses
                  </Button>
                  <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('ai-tutor')}
                  >
                    <Brain className="w-4 h-4" />
                    Ask AI Tutor
                  </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('notebook')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Open Notebook
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};