'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!email) {
      setEmailError('Email requis');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email invalide');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Mot de passe requis');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
      console.log('Form submitted:', { email, password });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Connexion Admin
        </h1>
        <p className="text-xl text-gray-500 font-medium">Heureux de vous revoir !</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Field */}
        <div className="space-y-3">
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700 ml-1">
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-6 py-5 text-lg bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
            placeholder="exemple@vipho.com"
          />
          {emailError && <p className="text-red-500 text-sm font-medium ml-1">{emailError}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-3">
          <div className="flex items-center justify-between ml-1">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
              Mot de passe
            </label>
            <button
              type="button"
              className="text-base text-primary-600 hover:text-primary-700 font-semibold hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-5 pr-16 text-lg bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm font-medium ml-1">{passwordError}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-5 px-8 rounded-2xl text-xl font-bold hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500/20 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-primary-600/20 mt-4"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}