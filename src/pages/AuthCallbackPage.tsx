import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

interface AuthCallbackPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AuthCallbackPage: React.FC<AuthCallbackPageProps> = ({ setCurrentPage }) => {
  const { user, updatePassword } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password reset fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    const processAuthCallback = async () => {
      try {
        const hash = window.location.hash;
        const search = window.location.search;
        const urlParams = new URLSearchParams(search);
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''));

        // Check for error reported in URL
        const errorDesc =
          urlParams.get('error_description') ||
          hashParams.get('error_description') ||
          urlParams.get('error') ||
          hashParams.get('error');

        if (errorDesc) {
          if (mounted) {
            setErrorMessage(decodeURIComponent(errorDesc).replace(/\+/g, ' '));
            setLoading(false);
          }
          return;
        }

        // Check if this is a password recovery flow
        const typeParam = urlParams.get('type') || hashParams.get('type');
        if (typeParam === 'recovery' || hash.includes('type=recovery')) {
          if (mounted) {
            setIsRecovery(true);
            setLoading(false);
          }
          return;
        }

        // Otherwise set confirmed
        if (mounted) {
          setIsConfirmed(true);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setErrorMessage(err?.message || 'Failed to process authentication.');
          setLoading(false);
        }
      }
    };

    processAuthCallback();

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setErrorMessage(error.message || 'Failed to update password.');
      } else {
        setPasswordSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Authentication Verification | Supernova Pvt. Ltd."
        description="Verify your Supernova Pvt. Ltd. client portal authentication credentials or complete password reset."
        keywords="auth verification, password reset, Supernova Pvt Ltd"
        canonicalPath="/auth/callback"
      />

      <PageHeader
        title="Account Authentication"
        subtitle="Verifying Secure Security Credentials and Session Authorization."
        badge="Security Verification"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto pb-20">
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
          {/* 1. LOADING STATE */}
          {loading && (
            <div className="text-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-700 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Verifying Security Credentials...
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Please wait while we validate your authentication token.
              </p>
            </div>
          )}

          {/* 2. PASSWORD RECOVERY FLOW */}
          {!loading && isRecovery && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-amber-600">
                <KeyRound className="w-6 h-6 shrink-0" />
                <h2 className="text-xl font-bold text-slate-900 font-serif">
                  Reset Account Password
                </h2>
              </div>

              {passwordSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-lg space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <h3 className="font-bold text-base">Password Updated Successfully</h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Your password has been securely reset. You can now access your account with the new credentials.
                  </p>
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="w-full py-2.5 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Portal Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    Enter a new secure password for your Supernova portal account.
                  </p>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                  >
                    {passwordLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Save New Password</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. EMAIL CONFIRMED / SESSION ACTIVE */}
          {!loading && !isRecovery && isConfirmed && (
            <div className="space-y-6 text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <UserCheck className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Authentication Successful
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your identity has been verified. You can now access your profile portal, track RFP proposals, and manage organizational inquiries.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="px-6 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2"
                >
                  <span>Go to Client Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-6 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-300"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

          {/* 4. ERROR STATE */}
          {!loading && !isRecovery && !isConfirmed && errorMessage && (
            <div className="space-y-6 text-center py-6">
              <div className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center mx-auto text-red-600">
                <AlertCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Verification Failed or Link Expired
                </h2>
                <p className="text-xs text-red-700 max-w-md mx-auto leading-relaxed">
                  {errorMessage}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-6 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2"
                >
                  <span>Return to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-300"
                >
                  Contact Support
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
