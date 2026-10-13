import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES_DATA, INDUSTRIES_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import {
  UserPlus,
  Mail,
  Lock,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface SignupPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ setCurrentPage }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    corporateEmail: '',
    phone: '',
    companyName: '',
    industrySector: 'Banking & Finance',
    primaryServiceInterest: 'software-development',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmationPending, setConfirmationPending] = useState(false);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.corporateEmail.trim() || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please recheck your confirm password field.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const { error, requiresConfirmation } = await signUp(
        formData.corporateEmail.trim(),
        formData.password,
        formData.fullName.trim(),
        formData.phone.trim(),
        formData.companyName.trim(),
        formData.industrySector
      );

      if (error) {
        console.error('Signup error:', error);
        setErrorMessage(error.message || 'Failed to create user account.');
        setLoading(false);
        return;
      }

      setLoading(false);

      if (requiresConfirmation) {
        setConfirmationPending(true);
      } else {
        setCurrentPage('profile');
      }
    } catch (err: any) {
      console.error('Unexpected signup error:', err);
      setErrorMessage(err?.message || 'An unexpected error occurred during signup.');
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Register Client Portal Account | Supernova Pvt. Ltd."
        description="Create a client portal account with Supernova Pvt. Ltd. to submit software project proposals, track timelines, and communicate with dedicated engineering leads."
        keywords="register client account Supernova, portal signup Supernova Pvt Ltd Noida"
        canonicalPath="/signup"
      />

      <PageHeader
        title="Create Enterprise Account"
        subtitle="Register Your Organization to Manage Service Requests, RFPs, and Dedicated Software Teams."
        badge="Portal Registration"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-20">
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-700" />
              <span>Register Organization Account</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Gain access to Supernova project dashboards, service proposals, and technical support ticketing.
            </p>
          </div>

          {confirmationPending ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-6 rounded-lg space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <h3 className="font-bold text-base text-slate-900 font-serif">
                  Registration Successful! Verification Email Sent
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We have sent a verification email to <strong className="text-slate-900">{formData.corporateEmail}</strong>.
                Please check your inbox (and spam folder) and click the confirmation link to activate your Supernova Enterprise account.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage('login')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors shadow flex items-center justify-center space-x-2"
                >
                  <span>Go to Login Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ananya Rao"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={formData.corporateEmail}
                  onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                  placeholder="ananya@enterprise.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company Name Pvt. Ltd."
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Industry Sector</label>
                <select
                  value={formData.industrySector}
                  onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {INDUSTRIES_DATA.map((ind) => (
                    <option key={ind.id} value={ind.name}>
                      {ind.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Primary Interest Area</label>
                <select
                  value={formData.primaryServiceInterest}
                  onChange={(e) => setFormData({ ...formData, primaryServiceInterest: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 border border-slate-300 rounded pl-3.5 pr-10 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
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

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="agree"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-blue-700 focus:ring-0"
              />
              <label htmlFor="agree" className="text-[11px] text-slate-600 leading-normal">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('terms')}
                  className="text-blue-700 underline font-semibold"
                >
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('privacy')}
                  className="text-blue-700 underline font-semibold"
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Already registered?</span>
            <button
              onClick={() => setCurrentPage('login')}
              className="font-bold text-blue-700 hover:underline"
            >
              Sign In Here
            </button>
          </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
