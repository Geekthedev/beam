import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'instructor';
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  enrolledCourses: string[];
  createdCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorName: string;
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  rating: number;
  studentsCount: number;
  xpReward: number;
  lessons: Lesson[];
  tags: string[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'markdown' | 'quiz' | 'code';
  duration: string;
  content: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

interface BeamStore {
  // Theme
  theme: 'light' | 'dark';
  colorScheme: 'blue' | 'purple' | 'green' | 'orange';
  
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  mockUser: User;
  
  // Navigation
  currentPage: string;
  sidebarOpen: boolean;
  
  // Courses
  courses: Course[];
  selectedCourse: Course | null;
  
  // AI Chat
  chatMessages: ChatMessage[];
  isAITyping: boolean;
  
  // Achievements
  achievements: Achievement[];
  showAchievementModal: boolean;
  newAchievement: Achievement | null;
  
  // Gamification
  dailyChallenge: {
    title: string;
    description: string;
    xpReward: number;
    completed: boolean;
  } | null;
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setColorScheme: (scheme: 'blue' | 'purple' | 'green' | 'orange') => void;
  setUser: (user: User | null) => void;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedCourse: (course: Course | null) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setAITyping: (typing: boolean) => void;
  unlockAchievement: (achievementId: string) => void;
  closeAchievementModal: () => void;
  addXP: (amount: number) => void;
  completeDailyChallenge: () => void;
  enrollInCourse: (courseId: string) => void;
}

const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  role: 'learner',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  xp: 2450,
  level: 3,
  streak: 7,
  badges: ['first-course', 'week-streak', 'night-owl'],
  enrolledCourses: ['1', '2'],
  createdCourses: [],
};

export const useBeamStore = create<BeamStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'light',
      colorScheme: 'blue',
      user: null,
      isAuthenticated: false,
      mockUser,
      currentPage: 'landing',
      sidebarOpen: false,
      courses: [],
      selectedCourse: null,
      chatMessages: [],
      isAITyping: false,
      achievements: [],
      showAchievementModal: false,
      newAchievement: null,
      dailyChallenge: {
        title: "Complete a lesson today",
        description: "Finish any lesson to maintain your learning streak",
        xpReward: 50,
        completed: false
      },

      // Actions
      setTheme: (theme) => set({ theme }),
      setColorScheme: (colorScheme) => set({ colorScheme }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setSelectedCourse: (selectedCourse) => set({ selectedCourse }),
      
      addChatMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({
          chatMessages: [...state.chatMessages, newMessage],
        }));
      },
      
      setAITyping: (isAITyping) => set({ isAITyping }),
      
      unlockAchievement: (achievementId) => {
        const state = get();
        const achievement = state.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
          set({
            achievements: state.achievements.map(a =>
              a.id === achievementId
                ? { ...a, unlocked: true, unlockedAt: new Date() }
                : a
            ),
            showAchievementModal: true,
            newAchievement: { ...achievement, unlocked: true, unlockedAt: new Date() }
          });
        }
      },
      
      closeAchievementModal: () => set({ showAchievementModal: false, newAchievement: null }),
      
      addXP: (amount) => {
        const state = get();
        if (state.user) {
          const newXP = state.user.xp + amount;
          const newLevel = Math.floor(newXP / 1000) + 1;
          const leveledUp = newLevel > state.user.level;
          
          set({
            user: {
              ...state.user,
              xp: newXP,
              level: newLevel,
            }
          });
          
          if (leveledUp) {
            get().unlockAchievement('level-up');
          }
        }
      },
      
      completeDailyChallenge: () => {
        const state = get();
        if (state.dailyChallenge && !state.dailyChallenge.completed) {
          set({
            dailyChallenge: {
              ...state.dailyChallenge,
              completed: true
            }
          });
          get().addXP(state.dailyChallenge.xpReward);
        }
      },
      
      enrollInCourse: (courseId) => {
        const state = get();
        if (state.user && !state.user.enrolledCourses.includes(courseId)) {
          set({
            user: {
              ...state.user,
              enrolledCourses: [...state.user.enrolledCourses, courseId]
            }
          });
        }
      },
    }),
    {
      name: 'beam-store',
      partialize: (state) => ({
        theme: state.theme,
        colorScheme: state.colorScheme,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);