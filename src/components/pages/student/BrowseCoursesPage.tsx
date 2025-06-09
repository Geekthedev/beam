import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Play,
  Heart,
  ChevronDown,
  Zap,
  Award
} from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useBeamStore } from '../../../store/useBeamStore';

const categories = [
  'All', 'Programming', 'Data Science', 'Design', 'Business', 
  'Mathematics', 'Science', 'Languages', 'Arts', 'Health'
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Newest', 'Highest Rated', 'Price: Low to High', 'Free First'];

const mockCourses = [
  {
    id: '1',
    title: 'Complete Python Programming',
    description: 'Master Python from basics to advanced concepts with hands-on projects and real-world applications.',
    instructor: 'Dr. Sarah Johnson',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Programming',
    level: 'beginner',
    duration: '40 hours',
    price: 0,
    rating: 4.9,
    studentsCount: 15420,
    xpReward: 800,
    tags: ['Python', 'Programming', 'Beginner-Friendly'],
    featured: true
  },
  {
    id: '2',
    title: 'Advanced React Development',
    description: 'Build modern web applications with React, Redux, and advanced patterns used by top companies.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Programming',
    level: 'advanced',
    duration: '35 hours',
    price: 89,
    rating: 4.8,
    studentsCount: 8930,
    xpReward: 1000,
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and machine learning with Python and popular libraries.',
    instructor: 'Dr. Emily Rodriguez',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Data Science',
    level: 'intermediate',
    duration: '50 hours',
    price: 129,
    rating: 4.7,
    studentsCount: 12340,
    xpReward: 1200,
    tags: ['Python', 'Data Analysis', 'Machine Learning']
  },
  {
    id: '4',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and experiences with modern design principles and tools.',
    instructor: 'Alex Thompson',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Design',
    level: 'intermediate',
    duration: '30 hours',
    price: 79,
    rating: 4.6,
    studentsCount: 6780,
    xpReward: 700,
    tags: ['UI Design', 'UX Research', 'Figma']
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    description: 'Master modern marketing techniques, social media strategies, and data-driven campaigns.',
    instructor: 'Lisa Wang',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Business',
    level: 'beginner',
    duration: '25 hours',
    price: 0,
    rating: 4.5,
    studentsCount: 9560,
    xpReward: 600,
    tags: ['Marketing', 'SEO', 'Social Media'],
    featured: true
  },
  {
    id: '6',
    title: 'Calculus for Engineers',
    description: 'Comprehensive calculus course designed specifically for engineering students and professionals.',
    instructor: 'Prof. David Kumar',
    thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    category: 'Mathematics',
    level: 'intermediate',
    duration: '45 hours',
    price: 99,
    rating: 4.8,
    studentsCount: 4320,
    xpReward: 900,
    tags: ['Calculus', 'Mathematics', 'Engineering']
  }
];

export const BrowseCoursesPage: React.FC = () => {
  const { setCurrentPage } = useBeamStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [likedCourses, setLikedCourses] = useState<string[]>([]);

  const toggleLike = (courseId: string) => {
    setLikedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const featuredCourses = filteredCourses.filter(course => course.featured);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-josefin">
            Browse Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-poppins">
            Discover your next learning adventure from our curated collection
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-poppins"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-poppins"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-poppins"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                      Price Range
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-poppins">
                      <option>Any Price</option>
                      <option>Free</option>
                      <option>$0 - $50</option>
                      <option>$50 - $100</option>
                      <option>$100+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                      Duration
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-poppins">
                      <option>Any Duration</option>
                      <option>0-10 hours</option>
                      <option>10-30 hours</option>
                      <option>30-50 hours</option>
                      <option>50+ hours</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Featured Courses */}
        {featuredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-josefin">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden group relative" hover>
                    {/* Featured Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold font-poppins">
                        FEATURED
                      </span>
                    </div>

                    {/* Course Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                        >
                          <Play className="w-4 h-4" />
                          Preview
                        </Button>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={() => toggleLike(course.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white/30"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedCourses.includes(course.id)
                              ? 'text-red-500 fill-current'
                              : 'text-white'
                          }`}
                        />
                      </button>

                      {/* Level Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium font-poppins ${
                          course.level === 'beginner' ? 'bg-green-500 text-white' :
                          course.level === 'intermediate' ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 font-poppins">
                          {course.title}
                        </h3>
                        <div className="text-right ml-2">
                          <div className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-poppins">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-poppins">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-poppins">{course.studentsCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          <span className="font-poppins">{course.xpReward} XP</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                            {course.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                          {course.instructor}
                        </span>
                      </div>

                      <Button className="w-full">
                        <BookOpen className="w-4 h-4" />
                        Enroll Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-josefin">
              All Courses ({filteredCourses.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden group" hover>
                  {/* Course Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                      >
                        <Play className="w-4 h-4" />
                        Preview
                      </Button>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(course.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white/30"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedCourses.includes(course.id)
                            ? 'text-red-500 fill-current'
                            : 'text-white'
                        }`}
                      />
                    </button>

                    {/* Level Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium font-poppins ${
                        course.level === 'beginner' ? 'bg-green-500 text-white' :
                        course.level === 'intermediate' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>

                    {/* Free Badge */}
                    {course.price === 0 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-bold font-poppins">
                          FREE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 font-poppins">
                        {course.title}
                      </h3>
                      <div className="text-right ml-2">
                        <div className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-poppins">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-poppins">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-poppins">{course.studentsCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        <span className="font-poppins">{course.xpReward} XP</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-poppins">
                        {course.instructor}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <BookOpen className="w-4 h-4" />
                        Enroll
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Courses
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};