
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import MyLearningView from './components/MyLearningView';
import BrowseCoursesView from './components/BrowseCoursesView';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPanel from './components/admin/AdminPanel';
import { courses, enrolledCourses } from './data/mockData';
import { translations } from './translations';
import type { User } from './types';
import { UserRole } from './types';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export type View = 'dashboard' | 'my-learning' | 'browse-courses' | 'settings';
export type AuthView = 'login' | 'register';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authView, setAuthView] = useState<AuthView>('login');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    return translation;
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'bn' : 'en'));
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAuthView('login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser({
            id: firebaseUser.uid,
            ...userDocSnap.data()
          } as User);
        } else {
          // Handle case where user exists in Auth but not Firestore
          console.error("User document not found in Firestore!");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('font-bn', language === 'bn');
  }, [language]);

  const renderStudentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView user={user!} enrolledCourses={enrolledCourses} t={t} />;
      case 'my-learning':
        return <MyLearningView enrolledCourses={enrolledCourses} t={t} />;
      case 'browse-courses':
        return <BrowseCoursesView courses={courses} t={t} />;
      case 'settings':
        return <div className="p-8"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('settings')}</h1><p className="text-gray-600 dark:text-gray-400 mt-2">{t('settings_tagline')}</p></div>;
      default:
        return <DashboardView user={user!} enrolledCourses={enrolledCourses} t={t} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-indigo-600"></i>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 right-4">
              <button 
                onClick={toggleLanguage}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-12 text-center py-2 rounded-md font-bold text-sm text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Language"
              >
                {language === 'en' ? 'BN' : 'EN'}
              </button>
          </div>
          {authView === 'login' ? (
              <LoginPage t={t} setAuthView={setAuthView} />
          ) : (
              <RegisterPage onRegisterSuccess={() => setAuthView('login')} t={t} setAuthView={setAuthView} />
          )}
      </div>
    );
  }

  if (user.role === UserRole.Admin) {
    return <AdminPanel user={user} onLogout={handleLogout} t={t} language={language} toggleLanguage={toggleLanguage} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        t={t}
        onLogout={handleLogout}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header 
          title={t(currentView)} 
          user={user} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderStudentView()}
        </main>
      </div>
    </div>
  );
};

export default App;
