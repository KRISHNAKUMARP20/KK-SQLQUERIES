import React, { useState } from 'react';
import { Database, Lock, Mail, User as UserIcon, ArrowRight, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AuthMode = 'login' | 'register' | 'forgot';

interface AuthViewProps {
  onLogin: (user: { email: string; name: string }) => void;
}

export function AuthView({ onLogin }: AuthViewProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'forgot') {
        if (!email) {
          setError('Please enter your email address.');
          return;
        }
        setSuccess('Password reset link sent! Check your inbox.');
        setTimeout(() => setMode('login'), 3000);
        return;
      }

      if (mode === 'register') {
        if (!email || !password || !name) {
          setError('Please fill in all fields.');
          return;
        }
        // Mock save to localStorage
        localStorage.setItem(`mock_user_${email}`, JSON.stringify({ email, name, password }));
        setSuccess('Account created successfully! Logging in...');
        setTimeout(() => onLogin({ email, name }), 1000);
        return;
      }

      if (mode === 'login') {
        if (!email || !password) {
          setError('Please enter both email and password.');
          return;
        }
        const savedUser = localStorage.getItem(`mock_user_${email}`);
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user.password === password) {
            onLogin({ email: user.email, name: user.name });
            return;
          }
        }
        setError('Invalid email or password.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-8 text-center z-10"
      >
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        >
          <Database className="h-8 w-8 text-indigo-400" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white tracking-tight">SQL Academy</h1>
        <p className="text-slate-400 mt-2">Master databases from Basic to Advanced</p>
      </motion.div>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl z-10"
      >
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 pb-2 text-sm font-semibold transition-colors border-b-2 ${
              mode === 'login' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 pb-2 text-sm font-semibold transition-colors border-b-2 ${
              mode === 'register' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            Create Account
          </button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs text-center"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs text-center"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {mode === 'register' && (
              <motion.div 
                key="name-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-semibold text-slate-400 ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>
            )}

            <motion.div 
              key="email-field"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-1.5"
            >
            <label className="text-xs font-semibold text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </motion.div>

            {mode !== 'forgot' && (
              <motion.div 
                key="password-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-semibold text-slate-400">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (
              <>
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        {mode === 'forgot' && (
          <button
            onClick={() => setMode('login')}
            className="w-full mt-4 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Back to login
          </button>
        )}
      </motion.div>
    </div>
  );
}
