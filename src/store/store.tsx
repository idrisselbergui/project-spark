import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  hintsUsed: number;
  lastAttempt?: Date;
  score?: number;
}

export interface AppState {
  currentUser: User | null;
  session: string | null;
  currentLesson: string | null;
  progress: Record<string, LessonProgress>;
  totalXP: number;
}

interface AppContextType extends AppState {
  setCurrentUser: (user: User | null) => void;
  setSession: (session: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  completeLesson: (lessonId: string, hintsUsed: number, earnedXP: number) => void;
  addHintUsage: (lessonId: string) => void;
  logout: () => void;
}

const STORAGE_KEY = 'codelearn_state';

const defaultState: AppState = {
  currentUser: null,
  session: null,
  currentLesson: null,
  progress: {},
  totalXP: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setCurrentUser = (user: User | null) => {
    setState((prev) => ({ ...prev, currentUser: user }));
  };

  const setSession = (session: string | null) => {
    setState((prev) => ({ ...prev, session }));
  };

  const setCurrentLesson = (lessonId: string | null) => {
    setState((prev) => ({ ...prev, currentLesson: lessonId }));
  };

  const completeLesson = (lessonId: string, hintsUsed: number, earnedXP: number) => {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [lessonId]: {
          lessonId,
          completed: true,
          hintsUsed,
          lastAttempt: new Date(),
          score: Math.max(100 - hintsUsed * 10, 50),
        },
      },
      totalXP: prev.totalXP + earnedXP,
      currentUser: prev.currentUser
        ? { ...prev.currentUser, xp: prev.currentUser.xp + earnedXP }
        : null,
    }));
  };

  const addHintUsage = (lessonId: string) => {
    setState((prev) => {
      const current = prev.progress[lessonId] || { lessonId, completed: false, hintsUsed: 0 };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [lessonId]: { ...current, hintsUsed: current.hintsUsed + 1 },
        },
      };
    });
  };

  const logout = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentUser,
        setSession,
        setCurrentLesson,
        completeLesson,
        addHintUsage,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
};

export const useAuth = () => {
  const { currentUser, session, setCurrentUser, setSession, logout } = useAppStore();
  return { currentUser, session, setCurrentUser, setSession, logout };
};

export const useLesson = () => {
  const { currentLesson, progress, setCurrentLesson, completeLesson, addHintUsage } = useAppStore();
  return { currentLesson, progress, setCurrentLesson, completeLesson, addHintUsage };
};
