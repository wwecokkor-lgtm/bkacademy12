
import React, { useState, FormEvent, useEffect } from 'react';
import { ICONS } from '../constants';
import { AuthView } from '../App';
import { validateEmail, validatePassword } from '../utils/validation';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserRole } from '../types';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  t: (key: string) => string;
  setAuthView: (view: AuthView) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, t, setAuthView }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName) newErrors.fullName = t('full_name_required');
    if (!email) newErrors.email = t('email_required');
    else if (!validateEmail(email)) newErrors.email = t('email_invalid');
    
    const passwordValidation = validatePassword(password);
    if (!password) newErrors.password = t('password_required');
    else if (!passwordValidation.minLength) newErrors.password = t('password_min_length');
    else if (!passwordValidation.strength) newErrors.password = t('password_strength');
    
    if (!confirmPassword) newErrors.confirmPassword = t('confirm_password_required');
    else if (password && password !== confirmPassword) newErrors.confirmPassword = t('passwords_no_match');
    
    if (!agreedToTerms) newErrors.terms = t('terms_required');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Special check to assign admin role
      const role = email === 'fffgamer066@gmail.com' ? UserRole.Admin : UserRole.Student;

      // Create user document in Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name: fullName,
        email: email,
        role: role,
        status: 'Active', // Or 'Pending' if admin approval is needed
        avatarUrl: `https://picsum.photos/seed/${firebaseUser.uid}/100/100`,
      });

      setIsLoading(false);
      setSuccessMessage(t('registration_success'));
      
      setTimeout(() => {
          onRegisterSuccess();
      }, 3000);

    } catch (err) {
      const error = err as AuthError;
      console.error("Firebase Register Error:", error.code);
      setErrors({ form: t(error.code) || t('unknown_error') });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <div className="text-center">
        <div className="flex justify-center mb-4 text-4xl text-indigo-600 dark:text-indigo-400">{ICONS.logo}</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('register_title')}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('register_subtitle')}{' '}
          <button onClick={() => setAuthView('login')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            {t('login_now')}
          </button>
        </p>
      </div>
      {successMessage ? (
        <div className="p-4 text-center text-green-800 bg-green-100 dark:bg-green-900/50 dark:text-green-200 rounded-md">
          {successMessage}
        </div>
      ) : (
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.form && <p className="text-sm text-red-500 text-center mb-4">{errors.form}</p>}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('full_name_label')}</label>
          <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('email_label')}</label>
          <input id="email-register" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('password_label')}</label>
          <div className="relative">
            <input id="password-register" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('confirm_password_label')}</label>
          <input id="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>
        <div>
          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              {t('terms_agreement')}{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">{t('terms_and_conditions')}</a>
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
        </div>
        <div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : t('register_button')}
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

export default RegisterPage;
