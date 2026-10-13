import React, { useState } from 'react';
import { PageId, CareerPosition } from '../types';
import { CAREERS_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { saveCareerApplication, saveResumeFile } from '../lib/storage';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Upload,
  Send,
  Sparkles,
  Users,
  Award,
  BookOpen,
  Loader2,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface CareersPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ setCurrentPage }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeJobModal, setActiveJobModal] = useState<CareerPosition | null>(null);

  // Application Form State inside modal
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const departments = ['All', 'Engineering', 'AI Solutions', 'Cloud & DevOps'];

  const filteredJobs =
    selectedDept === 'All'
      ? CAREERS_DATA
      : CAREERS_DATA.filter((j) => j.department === selectedDept);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!applicantName.trim() || !applicantEmail.trim() || !activeJobModal) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }

    setLoading(true);

    try {
      let uploadedResumePath: string | null = null;

      if (selectedResumeFile) {
        // Validate file type (PDF, DOC, DOCX)
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const fileNameLower = selectedResumeFile.name.toLowerCase();
        const hasValidExt = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));
        if (!hasValidExt) {
          setErrorMessage('Invalid file type. Please upload a PDF, DOC, or DOCX document.');
          setLoading(false);
          return;
        }

        // Validate file size (10MB)
        if (selectedResumeFile.size > 10 * 1024 * 1024) {
          setErrorMessage('Resume file size must be less than 10MB.');
          setLoading(false);
          return;
        }

        const sanitizeFileName = selectedResumeFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fileKey = `${Date.now()}_${sanitizeFileName}`;
        uploadedResumePath = fileKey;

        // Read file as data URL to save locally
        try {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              saveResumeFile(fileKey, reader.result);
            }
          };
          reader.readAsDataURL(selectedResumeFile);
        } catch (e) {
          console.warn('Could not read resume file locally:', e);
        }
      }

      saveCareerApplication({
        full_name: applicantName.trim(),
        email: applicantEmail.trim(),
        phone: applicantPhone.trim() || null,
        position: activeJobModal.title,
        experience: activeJobModal.experience,
        resume_path: uploadedResumePath,
        cover_letter: applicantCover.trim() || null,
        status: 'new',
      });

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Application submit error:', err);
      setErrorMessage(err?.message || 'An unexpected error occurred during submission.');
      setLoading(false);
    }
  };


  const careersJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Job Openings at Supernova Pvt. Ltd.',
    'itemListElement': CAREERS_DATA.map((job, idx) => ({
      '@type': 'JobPosting',
      'position': idx + 1,
      'title': job.title,
      'description': job.summary,
      'jobLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Noida, Sector 62',
          'addressRegion': 'Uttar Pradesh',
          'addressCountry': 'India'
        }
      },
      'hiringOrganization': {
        '@type': 'Organization',
        'name': 'Supernova Pvt. Ltd.',
        'url': 'https://supernova.com/'
      }
    }))
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Careers & Job Openings in Noida | Supernova Pvt. Ltd."
        description="Explore software engineering, Java architect, AI engineer, and DevOps job openings at Supernova Pvt. Ltd. in Noida, Sector 62, Uttar Pradesh, India."
        keywords="IT jobs in Noida, software developer careers Noida Sector 62, Java architect jobs, AI RAG engineer openings, DevOps engineer jobs Supernova"
        canonicalPath="/careers"
        jsonLd={careersJsonLd}
      />

      <PageHeader
        title="Careers at Supernova"
        subtitle="Join our engineering teams in Noida, Sector 62 building enterprise software architectures, cloud infrastructure, and AI systems."
        badge="Careers & Opportunities"
        setCurrentPage={setCurrentPage}
      />

      {/* Engineering Culture Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-2">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-serif">Engineering Autonomy</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Solve complex enterprise software challenges with clean modular architecture, unit testing, and peer code reviews.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-2">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-serif">Professional Growth</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Continuous learning support for cloud certifications (AWS, Azure, Java Spring, Docker, Kubernetes) and tech workshops.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-2">
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-serif">Collaborative Environment</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Structured agile sprints, transparent engineering feedback, and competitive compensation packages in Noida.
            </p>
          </div>
        </div>
      </section>

      {/* Department Filter & Job Listings */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Current Open Engineering Roles</h2>
            <p className="text-slate-600 text-xs mt-1">
              Select a position to view qualifications, responsibilities, and submit candidate profiles.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all border ${
                  selectedDept === d
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {job.department}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-serif">{job.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-2">{job.summary}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Experience: {job.experience}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveJobModal(job)}
                className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
              >
                View Details & Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {activeJobModal.department} • {activeJobModal.type}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 font-serif">{activeJobModal.title}</h3>
              <p className="text-xs text-slate-600 mt-1">Location: {activeJobModal.location} • Experience Required: {activeJobModal.experience}</p>
            </div>

            <div className="space-y-4 border-y border-slate-200 py-4 text-xs text-slate-700 max-h-60 overflow-y-auto pr-2">
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 uppercase text-[11px] text-blue-700">Key Qualifications</h4>
                <ul className="space-y-1">
                  {activeJobModal.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 uppercase text-[11px] text-blue-700">Primary Responsibilities</h4>
                <ul className="space-y-1">
                  {activeJobModal.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Application Form */}
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-center space-y-2 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Application Submitted Successfully</h4>
                <p className="text-xs">
                  Thank you for applying for <span className="font-bold text-slate-900">{activeJobModal.title}</span>. Your application has been logged in our enterprise HR portal. Our HR team at Noida, Sector 62 will review your profile.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setActiveJobModal(null);
                    setApplicantName('');
                    setApplicantEmail('');
                    setApplicantPhone('');
                    setApplicantCover('');
                    setSelectedResumeFile(null);
                  }}
                  className="mt-2 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Submit Candidate Profile</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Attach Resume (PDF/DOCX)</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded border border-slate-300 flex items-center gap-1.5 flex-1">
                        <Upload className="w-3.5 h-3.5 text-blue-700" />
                        <span className="truncate">{selectedResumeFile ? selectedResumeFile.name : 'Choose File...'}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelectedResumeFile(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cover Letter / GitHub Profile URL</label>
                  <textarea
                    rows={2}
                    value={applicantCover}
                    onChange={(e) => setApplicantCover(e.target.value)}
                    placeholder="https://github.com/username or short statement..."
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application to Supernova HR</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
