'use client';

import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
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
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account 📝</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-3 py-2">
              <User className="w-5 h-5 mr-2" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="bg-transparent outline-none w-full text-white placeholder:text-white/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 mr-2" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
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
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
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
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Already have an account?{' '}
          <a href="/auth/login" className="underline hover:text-white">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
