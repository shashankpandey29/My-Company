import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { ContactInquiry, getUserInquiries } from '../lib/storage';
import {
  User,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  Clock,
  Key,
  CheckCircle2,
  Lock,
  Plus,
  ArrowRight,
  LogOut,
  Edit2,
  Loader2,
  Save,
  AlertCircle,
  LayoutDashboard,
} from 'lucide-react';

interface UserProfilePageProps {
  setCurrentPage: (page: PageId) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ setCurrentPage }) => {
  const { user, profile, signOut, updateProfile, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'security'>('overview');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // User inquiries state
  const [userInquiries, setUserInquiries] = useState<ContactInquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditName(profile.full_name || '');
      setEditPhone(profile.phone || '');
      setEditCompany(profile.company_name || '');
      fetchUserInquiries();
    }
  }, [profile]);

  const fetchUserInquiries = async () => {
    if (!profile?.email) return;
    setInquiriesLoading(true);

    try {
      const data = getUserInquiries(profile.email);
      setUserInquiries(data);
    } catch (err) {
      console.error('Fetch user inquiries exception:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaveSuccess(false);
    setSaveLoading(true);

    const { error } = await updateProfile({
      full_name: editName.trim(),
      phone: editPhone.trim(),
      company_name: editCompany.trim(),
    });

    setSaveLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Failed to update profile.');
    } else {
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentPage('login');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'SU';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (authLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
          <Loader2 className="w-6 h-6 animate-spin text-blue-700" />
          <span>Loading client portal authentication...</span>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="bg-slate-50 min-h-screen font-sans">
        <PageHeader
          title="Client Account Portal"
          subtitle="Please sign in to access your enterprise dashboard, service inquiries, and project timeline."
          badge="Authentication Required"
          setCurrentPage={setCurrentPage}
        />
        <div className="py-16 px-4 max-w-md mx-auto text-center space-y-6">
          <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <User className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-serif">Sign In Required</h3>
            <p className="text-xs text-slate-600">
              You are currently not signed in. Log in or create an account to view your project requests and management portal.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded shadow transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Client Account Portal | Supernova Pvt. Ltd."
        description="Manage your enterprise client account with Supernova Pvt. Ltd. Track service requests, project RFPs, and corporate security settings."
        keywords="client portal Supernova, project dashboard Supernova Pvt Ltd Noida"
        canonicalPath="/profile"
      />

      <PageHeader
        title="Client Account Portal"
        subtitle="Manage Organization Details, Track Active RFPs, Review Proposals, and Access Technical Support."
        badge="Enterprise Profile"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-20">
        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        {/* Profile Card Summary Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded bg-blue-700 flex items-center justify-center text-white text-xl font-bold font-serif shadow">
              {getInitials(profile.full_name)}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 font-serif">{profile.full_name || 'Enterprise User'}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
                  isAdmin ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  {isAdmin ? 'System Administrator' : 'Verified Client'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {profile.company_name || 'Organization Account'}
              </p>
              <div className="text-[11px] text-slate-500 mt-1">
                Joined: {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} • Email: {profile.email}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Admin Control Center</span>
              </button>
            )}
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New RFP</span>
            </button>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Organization Overview
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Active Inquiries ({userInquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Security & Compliance
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between font-serif">
                <span>Corporate Contact Details</span>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit Information
                  </button>
                )}
              </h3>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Organization / Company Name</label>
                    <input
                      type="text"
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                    >
                      {saveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(profile.full_name || '');
                        setEditPhone(profile.phone || '');
                        setEditCompany(profile.company_name || '');
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded border border-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-slate-500 font-medium">Corporate Email</div>
                    <div className="font-bold text-slate-900 mt-0.5 font-mono">{profile.email}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-slate-500 font-medium">Phone Number</div>
                    <div className="font-bold text-slate-900 mt-0.5 font-mono">{profile.phone || 'Not specified'}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-slate-500 font-medium">Organization Name</div>
                    <div className="font-bold text-slate-900 mt-0.5">{profile.company_name || 'Not specified'}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-slate-500 font-medium">Account Role</div>
                    <div className="font-bold text-slate-900 mt-0.5 capitalize">{profile.role || 'user'}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 font-serif">
                Governance & Security Status
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">NDA Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mutual NDA Executed
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">Data Privacy:</span>
                  <span className="font-bold text-blue-700">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">Database Persistence:</span>
                  <span className="font-bold text-emerald-700 font-mono">Enterprise Access Security</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiriesLoading ? (
              <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-700" />
                <span>Loading service inquiries...</span>
              </div>
            ) : userInquiries.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3 shadow-sm">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">No Service Inquiries Found</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  You haven't submitted any service inquiries or RFP tickets with <span className="font-semibold text-slate-900">{profile.email}</span> yet.
                </p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="mt-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded shadow transition-colors"
                >
                  Submit First Project Inquiry
                </button>
              </div>
            ) : (
              userInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-blue-700">{inq.id.substring(0, 8)}...</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold border capitalize ${
                        inq.status === 'new'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : inq.status === 'in_review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {inq.status.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Submitted: {new Date(inq.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-slate-500 font-medium">Service Requested</div>
                      <div className="font-bold text-slate-900 mt-0.5">{inq.service_requested || 'Software Development'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-medium">Organization / Phone</div>
                      <div className="font-bold text-slate-800 mt-0.5">{inq.organization || profile.company_name} • {inq.phone || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-medium">Estimated Budget Range</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{inq.budget_range || 'Not specified'}</div>
                    </div>
                  </div>

                  {inq.message && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3 rounded">
                      <span className="font-semibold text-slate-800">Message details: </span>
                      {inq.message}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-xl space-y-4 text-xs shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 font-serif">
              Authentication & Security Settings
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Enterprise Auth Session</div>
                  <div className="text-slate-500 text-[11px]">Secure Token & Session Management</div>
                </div>
                <span className="text-xs text-emerald-700 font-bold font-mono">Active</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">User ID (UID)</div>
                  <div className="text-slate-500 text-[11px] font-mono">{user.id}</div>
                </div>
                <span className="text-xs text-blue-700 font-bold">Encrypted</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
