import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useSocialLinks } from '../context/SocialLinksContext';
import {
  ContactInquiry,
  CareerApplication,
  Profile,
  getContactInquiries,
  getCareerApplications,
  getAllProfiles,
  updateInquiryStatus,
  updateApplicationStatus,
  getResumeUrl,
} from '../lib/storage';
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  MoreVertical,
  Activity,
  Server,
  Download,
  Check,
  X,
  Loader2,
  RefreshCw,
  Eye,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ setCurrentPage }) => {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const { socialLinks, openEditModal } = useSocialLinks();
  const [activeTab, setActiveTab] = useState<'rfps' | 'applicants' | 'users' | 'system'>('rfps');

  // Stored data state
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [profilesList, setProfilesList] = useState<Profile[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, isAdmin]);

  const fetchAdminData = async () => {
    setDataLoading(true);
    try {
      setInquiries(getContactInquiries());
      setApplications(getCareerApplications());
      setProfilesList(getAllProfiles());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleInquiryStatusChange = async (inquiryId: string, newStatus: string) => {
    setActionLoading(inquiryId);
    try {
      updateInquiryStatus(inquiryId, newStatus);
      setInquiries(inquiries.map((i) => (i.id === inquiryId ? { ...i, status: newStatus } : i)));
    } catch (err) {
      console.error('Exception updating inquiry status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAppStatusChange = async (appId: string, newStatus: string) => {
    setActionLoading(appId);
    try {
      updateApplicationStatus(appId, newStatus);
      setApplications(applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a)));
    } catch (err) {
      console.error('Exception updating application status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const getResumeDownloadUrl = async (resumePath: string) => {
    try {
      const url = getResumeUrl(resumePath);
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = resumePath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err: any) {
      console.warn('Could not download resume file:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-8 font-sans">
        <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
          <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
          <span>Verifying executive administrator credentials...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="bg-slate-50 min-h-screen font-sans">
        <SEOHead
          title="Admin Access Required | Supernova Pvt. Ltd."
          description="Executive Admin Control Center for Supernova Pvt. Ltd."
          canonicalPath="/admin"
        />
        <PageHeader
          title="Admin Control Center"
          subtitle="Restricted System Access. Executive Administrator Credentials Required."
          badge="Internal Governance"
          setCurrentPage={setCurrentPage}
        />
        <div className="py-16 px-4 max-w-md mx-auto text-center space-y-6">
          <div className="bg-white p-8 rounded-lg border border-amber-200 shadow-sm space-y-4">
            <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-serif">Executive Authorization Required</h3>
            <p className="text-xs text-slate-600">
              The Admin Dashboard is protected by Role-Based Access Control (RBAC) policies. Please log in with an administrator account.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow transition-colors"
              >
                Sign In as Admin
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
        title="Admin Control Center | Supernova Pvt. Ltd."
        description="Supernova Pvt. Ltd. executive admin management dashboard for lead inquiries, candidate applications, and system monitors."
        keywords="admin dashboard Supernova Pvt Ltd"
        canonicalPath="/admin"
      />

      <PageHeader
        title="Admin Control Center"
        subtitle="Supernova Executive Management Portal: Review Inbound RFPs, Candidate Resumes, Registered Users, and System Logs."
        badge="Internal Portal"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-20">
        {/* KPI Metrics Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Inbound RFPs & Inquiries</span>
              <FileText className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-serif">{inquiries.length} Inquiries</div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live Database Sync
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Candidate Applications</span>
              <Briefcase className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-serif">{applications.length} Applicants</div>
            <div className="text-[11px] text-slate-600 font-medium">Resumes in Storage</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Registered Accounts</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-serif">{profilesList.length} Profiles</div>
            <div className="text-[11px] text-slate-600 font-medium">Enterprise Auth Verified</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>System & Security</span>
              <ShieldCheck className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-serif">RBAC Protected</div>
            <div className="text-[11px] text-blue-700 font-semibold">Security Rules Active</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex flex-wrap space-x-2 gap-y-2">
            <button
              onClick={() => setActiveTab('rfps')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'rfps'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Inbound RFPs ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'applicants'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Candidate Resumes ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Registered Users ({profilesList.length})
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                activeTab === 'system'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              System Logs & RLS Status
            </button>
          </div>

          <button
            onClick={fetchAdminData}
            disabled={dataLoading}
            className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin text-blue-700' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tab Content: RFPs Table */}
        {activeTab === 'rfps' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 font-serif">Inbound Project & Proposal Inquiries</span>
              <span className="text-slate-500 font-medium">Showing {inquiries.length} database records</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No inquiries found in database yet. Submit one from the Contact Us page to see real-time data sync!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Contact Name & Email</th>
                      <th className="p-3.5">Organization / Phone</th>
                      <th className="p-3.5">Requested Service</th>
                      <th className="p-3.5">Budget</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{inq.full_name}</div>
                          <div className="text-[11px] font-mono text-blue-700">{inq.corporate_email}</div>
                        </td>
                        <td className="p-3.5 text-slate-800">
                          <div>{inq.organization || 'Individual'}</div>
                          <div className="text-[11px] text-slate-500">{inq.phone || 'No phone'}</div>
                        </td>
                        <td className="p-3.5 text-slate-800">{inq.service_requested}</td>
                        <td className="p-3.5 font-bold text-emerald-700">{inq.budget_range || 'N/A'}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border capitalize ${
                            inq.status === 'new'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : inq.status === 'in_review'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleInquiryStatusChange(inq.id, 'in_review')}
                            disabled={actionLoading === inq.id}
                            className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200 cursor-pointer"
                          >
                            In Review
                          </button>
                          <button
                            onClick={() => handleInquiryStatusChange(inq.id, 'resolved')}
                            disabled={actionLoading === inq.id}
                            className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200 cursor-pointer"
                          >
                            Resolve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Applicants Table */}
        {activeTab === 'applicants' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 text-xs font-bold text-slate-900 font-serif">
              Candidate Applications & Resume Storage Bucket
            </div>
            {applications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No career applications recorded yet. Submit one from the Careers page to test resume upload!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Candidate Name</th>
                      <th className="p-3.5">Email & Phone</th>
                      <th className="p-3.5">Applied Position</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Resume File</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-slate-900">{app.full_name}</td>
                        <td className="p-3.5">
                          <div className="font-mono text-blue-700">{app.email}</div>
                          <div className="text-[11px] text-slate-500">{app.phone || 'No phone'}</div>
                        </td>
                        <td className="p-3.5 text-slate-800">{app.position}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 capitalize">
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {app.resume_path ? (
                            <button
                              onClick={() => getResumeDownloadUrl(app.resume_path!)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] rounded border border-blue-200 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>Get Resume</span>
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[10px]">No file attached</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Users Table */}
        {activeTab === 'users' && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 text-xs font-bold text-slate-900 font-serif">
              Registered Portal Profiles (Database Users)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">User ID</th>
                    <th className="p-3.5">Full Name</th>
                    <th className="p-3.5">Corporate Email</th>
                    <th className="p-3.5">Organization</th>
                    <th className="p-3.5">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {profilesList.map((prof) => (
                    <tr key={prof.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono text-[10px] text-slate-500">{prof.id.substring(0, 8)}...</td>
                      <td className="p-3.5 font-bold text-slate-900">{prof.full_name || 'N/A'}</td>
                      <td className="p-3.5 font-mono text-blue-700">{prof.email}</td>
                      <td className="p-3.5 text-slate-800">{prof.company_name || 'N/A'}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          prof.role === 'admin' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {prof.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: System Health */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-white border border-slate-200 p-6 rounded-lg space-y-3 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 font-serif">
                <Server className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Database & Storage Health</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">Database Connection:</span>
                  <span className="text-emerald-700 font-bold font-mono">Connected</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">Role-Based Access Control (RBAC):</span>
                  <span className="text-emerald-700 font-bold font-mono">Enabled</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-700 font-medium">Resume File Storage:</span>
                  <span className="text-blue-700 font-bold font-mono">Configured</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-lg space-y-3 shadow-sm md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 font-serif">
                  <div className="w-5 h-5 rounded bg-[#0A66C2] text-white flex items-center justify-center">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span>Company Social Media & LinkedIn Profile</span>
                </h3>
                <button
                  onClick={openEditModal}
                  className="px-3 py-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Edit / Update LinkedIn Link</span>
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current LinkedIn URL:</span>
                  <div className="font-mono text-xs text-blue-700 font-semibold break-all">
                    {socialLinks.linkedin}
                  </div>
                </div>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1 shrink-0"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
