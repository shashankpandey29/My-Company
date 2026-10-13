export interface Profile {
  id: string;
  full_name: string | null;
  email?: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  company_name?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  corporate_email: string;
  phone: string | null;
  organization: string | null;
  service_requested: string | null;
  budget_range?: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface CareerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  position: string;
  experience?: string | null;
  resume_path: string | null;
  cover_letter?: string | null;
  status: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    phone?: string;
    company_name?: string;
  };
}

export interface Session {
  access_token: string;
  user: User;
  expires_at?: number;
}

interface StoredAccount {
  user: User;
  passwordHash: string;
  profile: Profile;
}

const STORAGE_KEYS = {
  USERS: 'supernova_accounts',
  SESSION: 'supernova_auth_session',
  INQUIRIES: 'supernova_contact_inquiries',
  APPLICATIONS: 'supernova_career_applications',
  RESUMES: 'supernova_uploaded_resumes',
};

// Initial mock data seed
const SEED_PROFILES: Profile[] = [
  {
    id: 'usr_admin_001',
    full_name: 'Supernova IT Administrator',
    email: 'admin@supernova.com',
    phone: '+917905243606',
    role: 'admin',
    company_name: 'Supernova Pvt. Ltd.',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'usr_client_002',
    full_name: 'Rahul Sharma',
    email: 'rahul.sharma@apexfinance.in',
    phone: '+91 98765 43210',
    role: 'user',
    company_name: 'Apex Financial Services',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const SEED_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq_001',
    full_name: 'Rahul Sharma',
    corporate_email: 'rahul.sharma@apexfinance.in',
    phone: '+91 98765 43210',
    organization: 'Apex Financial Services',
    service_requested: 'Software Development',
    budget_range: '₹20 Lakh - ₹50 Lakh',
    message: 'We are seeking an enterprise microservices backend for our real-time loan origination portal.',
    status: 'in_review',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'inq_002',
    full_name: 'Priya Iyer',
    corporate_email: 'p.iyer@medicarehealth.org',
    phone: '+91 98111 22334',
    organization: 'MediCare Clinical Network',
    service_requested: 'CRM / ERP Solutions',
    budget_range: '₹50 Lakh+',
    message: 'Requirement for custom clinical inventory and patient appointment management system.',
    status: 'contacted',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'inq_003',
    full_name: 'Amit Verma',
    corporate_email: 'amit@greenlineLogistics.com',
    phone: '+91 97234 56789',
    organization: 'Greenline Logistics',
    service_requested: 'Website Development',
    budget_range: '₹5 Lakh - ₹20 Lakh',
    message: 'Looking to redesign our customer portal with high core web vitals and client shipment tracking.',
    status: 'new',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const SEED_APPLICATIONS: CareerApplication[] = [
  {
    id: 'app_001',
    full_name: 'Vikram Sengupta',
    email: 'vikram.sengupta@devmail.com',
    phone: '+91 99887 66554',
    position: 'Senior Java Enterprise Architect',
    experience: '8+ Years',
    resume_path: 'vikram_sengupta_resume.pdf',
    cover_letter: '8+ years architecting high-throughput Spring Boot microservices and Kubernetes clusters.',
    status: 'in_review',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'app_002',
    full_name: 'Ananya Deshmukh',
    email: 'ananya.d@cloudpro.io',
    phone: '+91 91234 56780',
    position: 'DevOps & Cloud Specialist',
    experience: '5+ Years',
    resume_path: 'ananya_deshmukh_cv.pdf',
    cover_letter: 'Hands-on experience managing Terraform configurations, AWS multi-region setups, and CI/CD pipelines.',
    status: 'new',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultAccounts: StoredAccount[] = [
      {
        user: {
          id: 'usr_admin_001',
          email: 'admin@supernova.com',
          user_metadata: {
            full_name: 'Supernova IT Administrator',
            company_name: 'Supernova Pvt. Ltd.',
          },
        },
        passwordHash: 'admin123',
        profile: SEED_PROFILES[0],
      },
      {
        user: {
          id: 'usr_client_002',
          email: 'rahul.sharma@apexfinance.in',
          user_metadata: {
            full_name: 'Rahul Sharma',
            phone: '+91 98765 43210',
            company_name: 'Apex Financial Services',
          },
        },
        passwordHash: 'client123',
        profile: SEED_PROFILES[1],
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultAccounts));
  }

  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SEED_INQUIRIES));
  }

  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));
  }

  if (!localStorage.getItem(STORAGE_KEYS.RESUMES)) {
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify({}));
  }
}

// Inquiries API
export function getContactInquiries(): ContactInquiry[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at'>): ContactInquiry {
  initializeStorage();
  const current = getContactInquiries();
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  };
  const updated = [newInquiry, ...current];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return newInquiry;
}

export function updateInquiryStatus(id: string, newStatus: string): boolean {
  initializeStorage();
  const current = getContactInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return true;
}

export function getUserInquiries(email: string): ContactInquiry[] {
  return getContactInquiries().filter(
    (i) => i.corporate_email.trim().toLowerCase() === email.trim().toLowerCase()
  );
}

// Career Applications API
export function getCareerApplications(): CareerApplication[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCareerApplication(app: Omit<CareerApplication, 'id' | 'created_at'>): CareerApplication {
  initializeStorage();
  const current = getCareerApplications();
  const newApp: CareerApplication = {
    ...app,
    id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  };
  const updated = [newApp, ...current];
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  return newApp;
}

export function updateApplicationStatus(id: string, newStatus: string): boolean {
  initializeStorage();
  const current = getCareerApplications();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  return true;
}

export function saveResumeFile(fileKey: string, fileData: string): void {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESUMES) || '{}';
    const resumes = JSON.parse(raw);
    resumes[fileKey] = fileData;
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
  } catch (err) {
    console.error('Error saving resume to local store:', err);
  }
}

export function getResumeUrl(fileKey: string): string | null {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESUMES) || '{}';
    const resumes = JSON.parse(raw);
    return resumes[fileKey] || null;
  } catch {
    return null;
  }
}

// User Profiles & Auth API
function getStoredAccounts(): StoredAccount[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(accounts));
}

export function getAllProfiles(): Profile[] {
  return getStoredAccounts().map((a) => a.profile);
}

export function getProfileById(userId: string): Profile | null {
  const account = getStoredAccounts().find((a) => a.user.id === userId);
  return account ? account.profile : null;
}

export function updateProfileInStore(userId: string, updates: Partial<Profile>): Profile | null {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex((a) => a.user.id === userId);
  if (index === -1) return null;

  const currentProfile = accounts[index].profile;
  const updatedProfile: Profile = {
    ...currentProfile,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  accounts[index].profile = updatedProfile;
  if (updates.full_name) {
    accounts[index].user.user_metadata = {
      ...accounts[index].user.user_metadata,
      full_name: updates.full_name,
    };
  }
  saveStoredAccounts(accounts);
  return updatedProfile;
}

export function registerAccount(
  email: string,
  password: string,
  fullName: string,
  phone?: string,
  companyName?: string
): { user: User; profile: Profile } | { error: string } {
  const accounts = getStoredAccounts();
  const existing = accounts.find((a) => a.user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { error: 'An account with this email address already exists.' };
  }

  const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const newUser: User = {
    id: userId,
    email,
    user_metadata: {
      full_name: fullName,
      phone: phone || '',
      company_name: companyName || '',
    },
  };

  const newProfile: Profile = {
    id: userId,
    full_name: fullName,
    email,
    phone: phone || '',
    role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
    company_name: companyName || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  accounts.push({
    user: newUser,
    passwordHash: password,
    profile: newProfile,
  });

  saveStoredAccounts(accounts);
  return { user: newUser, profile: newProfile };
}

export function authenticateAccount(email: string, password: string): { user: User; profile: Profile } | { error: string } {
  const accounts = getStoredAccounts();
  const account = accounts.find((a) => a.user.email.toLowerCase() === email.toLowerCase());

  if (!account) {
    return { error: 'Invalid login credentials. Please check your email and password.' };
  }

  if (account.passwordHash !== password) {
    return { error: 'Invalid email or password.' };
  }

  return { user: account.user, profile: account.profile };
}

export function updateAccountPassword(userId: string, newPassword: string): boolean {
  const accounts = getStoredAccounts();
  const index = accounts.findIndex((a) => a.user.id === userId);
  if (index === -1) return false;
  accounts[index].passwordHash = newPassword;
  saveStoredAccounts(accounts);
  return true;
}

export function getStoredSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredSession(session: Session | null) {
  if (typeof window === 'undefined') return;
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  } else {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }
}
