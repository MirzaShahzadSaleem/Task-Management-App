'use client';

import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 mr-2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-white placeholder:text-white/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 mr-2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-white placeholder:text-white/60"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-100 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Don’t have an account?{' '}
          <a href="/auth/register" className="underline hover:text-white">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
