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
  Zap,
  Calendar,
  Award
} from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Avatar } from '../../ui/Avatar';
import { useBeamStore } from '../../../store/useBeamStore';

export const StudentDashboardPage: React.FC = () => {
  const { user, setCurrentPage } = useBeamStore();

  const stats = [
    { label: 'Courses Enrolled', value: '8', icon: BookOpen, color: 'primary' },
    { label: 'Courses Completed', value: '3', icon: Trophy, color: 'success' },
    { label: 'Total XP', value: user?.xp.toLocaleString() || '0', icon: Zap, color: 'secondary' },
    { label: 'Learning Streak', value: `${user?.streak || 0} days`, icon: Target, color: 'accent' },
  ];

  const recentCourses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      instructor: 'Sarah Johnson',
      progress: 75,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      nextLesson: 'Custom Hooks Deep Dive'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Michael Chen',
      progress: 45,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      nextLesson: 'Binary Trees'
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emma Wilson',
      progress: 90,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      nextLesson: 'Final Project Review'
    }
  ];

  const upcomingAssignments = [
    { title: 'React Component Assignment', course: 'Advanced React', dueDate: 'Tomorrow', priority: 'high' },
    { title: 'Algorithm Analysis Quiz', course: 'Data Structures', dueDate: 'Dec 28', priority: 'medium' },
    { title: 'Design Portfolio Review', course: 'UI/UX Design', dueDate: 'Dec 30', priority: 'low' }
  ];

  const achievements = [
    { title: 'First Course Complete', icon: '🎯', unlocked: true },
    { title: 'Week Warrior', icon: '🔥', unlocked: true },
    { title: 'Quiz Master', icon: '🧠', unlocked: false },
    { title: 'Social Learner', icon: '👥', unlocked: false }
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
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
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
                  onClick={() => setCurrentPage('my-courses')}
                  className="text-primary-600"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="p-6" hover>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-poppins">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-poppins">
                            by {course.instructor}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-poppins">
                            Next: {course.nextLesson}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm">
                          <Play className="w-4 h-4" />
                          Continue
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
                  Upcoming Assignments
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage('assignments')}
                  className="text-primary-600"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment, index) => (
                  <Card key={index} className="p-4" hover>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          assignment.priority === 'high' ? 'bg-danger-500' :
                          assignment.priority === 'medium' ? 'bg-warning-500' :
                          'bg-success-500'
                        }`} />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white font-poppins">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                            {assignment.course}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white font-poppins">
                          Due {assignment.dueDate}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
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

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white font-josefin">
                    Achievements
                  </h3>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-yellow-50 dark:bg-yellow-900/20'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          achievement.unlocked 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        } font-poppins`}>
                          {achievement.title}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="w-4 h-4 text-success-500" />
                      )}
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
                    onClick={() => setCurrentPage('browse-courses')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse Courses
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('ai-tutor')}
                  >
                    <Brain className="w-4 h-4" />
                    Ask AI Tutor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('notebook')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Open Notebook
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('calendar')}
                  >
                    <Calendar className="w-4 h-4" />
                    View Calendar
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