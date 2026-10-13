import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import {
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  KeyRound,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface LoginPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const { signIn, resetPassword, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleType, setRoleType] = useState<'client' | 'admin'>('client');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setResetMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email.trim(), password);

      if (error) {
        console.error('Login error:', error);
        setErrorMessage(error.message || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      setLoading(false);
      if (roleType === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('profile');
      }
    } catch (err: any) {
      console.error('Unexpected auth error:', err);
      setErrorMessage(err?.message || 'An unexpected error occurred during sign in.');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setErrorMessage(null);
    setResetMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address above to receive password reset instructions.');
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email.trim());
    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Failed to send password reset email.');
    } else {
      setResetMessage(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
    }
  };


  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Client & Portal Login | Supernova Pvt. Ltd."
        description="Sign in to Supernova Pvt. Ltd. Client Account Portal or Admin Control Center to manage project status, service requests, and support tickets."
        keywords="client portal login Supernova, admin portal login Supernova Pvt Ltd, IT portal login Noida"
        canonicalPath="/login"
      />

      <PageHeader
        title="Client & Portal Login"
        subtitle="Access Supernova Enterprise Client Portal, Project Timelines, Service Proposals, and Technical Support."
        badge="Enterprise Authentication"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto pb-20">
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Role Segment Toggle */}
          <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
            <button
              type="button"
              onClick={() => setRoleType('client')}
              className={`flex-1 py-2 text-xs font-bold rounded transition-all flex items-center justify-center space-x-1.5 ${
                roleType === 'client'
                  ? 'bg-blue-700 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </button>
            <button
              type="button"
              onClick={() => setRoleType('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded transition-all flex items-center justify-center space-x-1.5 ${
                roleType === 'admin'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              {roleType === 'client' ? 'Sign In to Client Portal' : 'Admin Control Center Login'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {roleType === 'client'
                ? 'Enter your registered corporate email credentials.'
                : 'Internal executive and system administration portal access.'}
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resetMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resetMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded pl-10 pr-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-700 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded pl-10 pr-10 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SSO Options */}
            <div className="pt-2">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                  Single Sign-On (SSO)
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage('profile')}
                  className="py-2.5 px-3 rounded bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-700" />
                  <span>Google Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('profile')}
                  className="py-2.5 px-3 rounded bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SAML 2.0 / Okta</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded font-bold text-xs text-white transition-colors shadow flex items-center justify-center space-x-2 mt-4 cursor-pointer disabled:opacity-70 ${
                roleType === 'client'
                  ? 'bg-blue-700 hover:bg-blue-800'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login to {roleType === 'client' ? 'Client Portal' : 'Admin Control Center'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Need a new portal account?</span>
            <button
              onClick={() => setCurrentPage('signup')}
              className="font-bold text-blue-700 hover:underline"
            >
              Register Here
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
