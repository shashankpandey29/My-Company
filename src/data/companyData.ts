import { ServiceItem, IndustryItem, TechnologyItem, CareerPosition, OfficeLocation } from '../types';

export const COMPANY_INFO = {
  name: 'Supernova Pvt. Ltd.',
  shortName: 'Supernova',
  tagline: 'Enterprise Software & Intelligent IT Services Company',
  description:
    'Supernova Pvt. Ltd. is a premier technology services company headquartered in Noida, Sector 62, Uttar Pradesh, India. We specialize in custom enterprise software development, cloud computing, AI solutions, web applications, and managed IT services.',
  foundedYear: '2018',
  headquarters: 'Noida, Sector 62, Uttar Pradesh, India',
  primaryEmail: 'contact@supernova.com',
  careersEmail: 'careers@supernova.com',
  supportEmail: 'support@supernova.com',
  phone: '+917905243606',
  emailPlaceholder: '[Email Placeholder: contact@supernova.com]',
  phonePlaceholder: '[Phone Placeholder: +917905243606 ]',
  addressPlaceholder: 'Noida, Sector 62, Uttar Pradesh, India',
  branches: [
    {
      id: 'branch-virar',
      name: 'Virar Branch Office',
      city: 'Vasai-Virar',
      state: 'Maharashtra',
      address: '8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303',
      phone: '+917905243606',
      email: 'contact@supernova.com',
      badge: 'Branch 1',
    },
    {
      id: 'branch-goregaon',
      name: 'Goregaon Branch Office',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063',
      phone: '+917905243606',
      email: 'contact@supernova.com',
      badge: 'Branch 2',
    },
  ],
  isoCertifications: ['ISO/IEC 27001 Security Standards', 'ISO 9001 Quality Management'],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/supernova-pvt-ltd',
    twitter: 'https://twitter.com/supernovatech',
    github: 'https://github.com/supernova-tech',
    instagram: 'https://instagram.com/supernova.technologies',
    youtube: 'https://youtube.com/@supernovatech',
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    shortDesc: 'Custom enterprise software solutions engineered for performance, security, and long-term business scalability.',
    fullDesc:
      'Supernova Pvt. Ltd. delivers end-to-end custom software development services tailored to enterprise requirements. We design distributed microservices, refactor legacy monolithic architectures, build secure RESTful/gRPC APIs, and integrate automated continuous delivery pipelines with robust data protection.',
    iconName: 'Code2',
    keyFeatures: [
      'Microservices & Event-Driven Architecture',
      'Legacy Code Modernization & Refactoring',
      'High-Throughput RESTful & GraphQL APIs',
      'Enterprise System Integration & Middleware',
      'Automated CI/CD & Testing Pipelines',
    ],
    deliverables: [
      'Complete Production Source Code & IP Transfer',
      'Technical Architecture & API Documentation',
      'Automated Unit, Integration & E2E Test Suites',
      'Containerization & Deployment Configuration',
    ],
    technologiesUsed: ['Java', '.NET Core', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    imageUrl: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    shortDesc: 'Enterprise web applications, digital customer portals, and accessible web solutions built with modern frameworks.',
    fullDesc:
      'Our web development team builds high-performance, accessible (WCAG 2.1 AA), and SEO-optimized web applications. Leveraging modern React, TypeScript, and micro-frontend patterns, we craft digital platforms designed for high conversion, fast page load speeds, and seamless user experiences.',
    iconName: 'Globe',
    keyFeatures: [
      'Responsive Micro-Frontend & Modular UI Systems',
      'Server-Side Rendering & Core Web Vitals Optimization',
      'Headless CMS & Custom Portal Engineering',
      'Web Accessibility (WCAG 2.1 AA) Compliance',
      'Single Sign-On (SSO) & Role-Based Access Controls',
    ],
    deliverables: [
      'Scalable Front-End Web Application Codebase',
      'Admin Dashboards & Content Workflows',
      'Core Web Vitals & Accessibility Audit Reports',
      'Cross-Browser & Multi-Device Test Validation',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'PHP'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'it-support-maintenance',
    title: 'IT Support & Maintenance',
    shortDesc: 'Managed IT infrastructure monitoring, system patching, security maintenance, and SLA-backed support.',
    fullDesc:
      'Ensure 24/7 reliability and uptime for your operational software with Supernova managed IT services. We provide proactive cloud monitoring, security patch management, database optimization, incident response, and SLA-driven multi-tier support.',
    iconName: 'ShieldCheck',
    keyFeatures: [
      'Proactive 24/7 Infrastructure & Server Monitoring',
      'Multi-Tier (L1/L2/L3) Technical Support Engine',
      'Automated Patch Management & Data Backup Verification',
      'Cloud Resource Cost & Efficiency Optimization',
      'Disaster Recovery & System Continuity Assurance',
    ],
    deliverables: [
      'SLA Contract with Uptime Commitments',
      'Monthly Infrastructure & Security Health Reports',
      'Real-Time Operational Monitoring Dashboards',
      'Disaster Recovery Playbooks & Protocols',
    ],
    technologiesUsed: ['AWS CloudWatch', 'Prometheus', 'Grafana', 'Ansible', 'Linux', 'Windows Server'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },

  {
    id: 'crm-erp-solutions',
    title: 'CRM / ERP Solutions',
    shortDesc: 'Custom ERP and CRM platforms to streamline business operations, inventory, and customer workflows.',
    fullDesc:
      'We design and deploy custom Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) software tailored to your specific organizational workflows. Consolidate financials, automate inventory tracking, manage sales pipelines, and eliminate data silos.',
    iconName: 'Layers',
    keyFeatures: [
      'Supply Chain & Operations Workflow Automation',
      'Financial Management & Multi-Ledger Accounting',
      'Sales Pipeline & Client Interaction Tracking',
      'Custom Executive Analytics & Reporting Dashboards',
      'Granular Role-Based Access & Complete Audit Logs',
    ],
    deliverables: [
      'Tailored ERP/CRM Application Architecture',
      'Data Migration Scripts & Verification Tools',
      'User Onboarding & Departmental User Guides',
      'System Integration API Maintenance Suite',
    ],
    technologiesUsed: ['Java', '.NET', 'PHP', 'PostgreSQL', 'AWS', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    tagline: 'Secure, high-reliability software engineering for banking, fintech, and financial systems.',
    overview:
      'Supernova Pvt. Ltd. assists financial institutions in building resilient digital banking platforms, transaction processing engines, and secure compliance gateways.',
    challenges: [
      'Meeting rigorous security protocols and financial regulatory standards',
      'Managing high-throughput transaction loads without latency spikes',
      'Modernizing legacy core banking systems safely',
    ],
    solutions: [
      'High-throughput microservices for real-time transaction processing',
      'Sub-second payment verification and fraud monitoring rules',
      'Secure Open Banking API integration with OAuth2 standards',
    ],
    complianceStandards: ['PCI-DSS Level 1 Standards', 'ISO 20022 Financial Messaging', 'Data Encryption Controls'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Compliant medical software, health portals, and clinical workflow platforms.',
    overview:
      'We partner with healthcare providers, clinical networks, and healthtech organizations to engineer secure patient portals, scheduling platforms, and clinical data management tools.',
    challenges: [
      'Ensuring strict patient data confidentiality and privacy compliance',
      'Connecting disparate electronic health record (EHR) systems',
      'Supporting remote patient engagement and digital consultation tools',
    ],
    solutions: [
      'Interoperable clinical data pipelines following FHIR standards',
      'Encrypted patient web portals for appointments and records',
      'Automated medical billing and administrative workflow tools',
    ],
    complianceStandards: ['HIPAA Compliant Controls', 'FHIR Data Standards', 'ISO 27001 Security'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'education',
    name: 'Education',
    tagline: 'Scalable Learning Management Systems (LMS) and digital educational campus software.',
    overview:
      'Supernova Pvt. Ltd. builds robust digital learning platforms, student management systems, and online assessment portals for educational institutions and corporate training academies.',
    challenges: [
      'Supporting sudden concurrency spikes during exam periods',
      'Delivering accessible, intuitive interfaces across devices',
      'Consolidating student records across admissions, fees, and grading',
    ],
    solutions: [
      'Cloud-autoscaling LMS infrastructure handling peak traffic',
      'Interactive learning modules and automated assessment workflows',
      'Centralized student portal with role-based dashboard views',
    ],
    complianceStandards: ['WCAG 2.1 AA Accessibility', 'Student Data Protection Standards'],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    tagline: 'Property management portals, tenant platforms, and real estate operational software.',
    overview:
      'We develop custom real estate software solutions for commercial developers, property managers, and listing platforms to automate tenant management and asset tracking.',
    challenges: [
      'Streamlining lease renewals, tenant requests, and maintenance logs',
      'Maintaining real-time visibility over multi-property portfolios',
      'Managing tenant communications and payment reconciliation',
    ],
    solutions: [
      'Tenant portals with online maintenance ticketing and payment tracking',
      'Portfolio executive dashboards displaying real-time occupancy metrics',
      'Interactive spatial mapping and digital property tour web interfaces',
    ],
    complianceStandards: ['Real Estate Data Privacy Rules', 'Standard Security Audits'],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'retail',
    name: 'Retail',
    tagline: 'E-commerce platforms, POS integration, and inventory management systems.',
    overview:
      'Supernova Pvt. Ltd. crafts unified retail platforms connecting online e-commerce portals, inventory management systems, and point-of-sale operational tools.',
    challenges: [
      'Keeping inventory synchronized across physical stores and web channels',
      'Maintaining fast page load speeds during high-traffic promotional sales',
      'Unifying customer purchase data for personalized loyalty programs',
    ],
    solutions: [
      'Modern web storefronts with real-time inventory locking',
      'High-throughput checkout pipelines with multi-payment gateway options',
      'Centralized customer data platforms for order tracking and analytics',
    ],
    complianceStandards: ['PCI-DSS Compliance', 'Customer Data Protection Standards'],
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  },
];

export const TECHNOLOGIES_DATA: TechnologyItem[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'Backend',
    description: 'Enterprise backend development using Spring Boot and Quarkus for high-concurrency applications.',
    keyCapabilities: [
      'Spring Boot & Microservices Development',
      'High-Throughput Reactive Architecture',
      'Enterprise System Integration Patterns',
      'JVM Tuning & Memory Optimization',
    ],
    useCases: ['Core Transaction Engines', 'Enterprise ERP Systems', 'Financial Processing Backends'],
    iconName: 'Coffee',
  },
  {
    id: 'dotnet',
    name: '.NET',
    category: 'Backend',
    description: 'Cross-platform, high-performance web and enterprise application development with C# and .NET 8+.',
    keyCapabilities: [
      'ASP.NET Core Web APIs & Services',
      'Entity Framework Core Data Access',
      'Cloud-Native Azure Services Integration',
      'Asynchronous System IO Engineering',
    ],
    useCases: ['Enterprise Business Portals', 'Healthcare Systems Gateways', 'Cross-Platform Enterprise Tools'],
    iconName: 'Cpu',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Frontend / Mobile',
    description: 'Cross-platform mobile and multi-screen application development with unified codebases.',
    keyCapabilities: [
      'Consistent Custom UI Design Implementation',
      'State Management Architecture (Bloc/Provider)',
      'Device Feature Integration (GPS, Camera, Biometrics)',
      'Offline Data Sync Capability',
    ],
    useCases: ['Mobile Customer Dashboards', 'Healthcare Mobile Portals', 'Field Service Applications'],
    iconName: 'Smartphone',
  },
  {
    id: 'c',
    name: 'C',
    category: 'Systems',
    description: 'Low-level systems programming, embedded firmware development, and hardware interface modules.',
    keyCapabilities: [
      'System-Level Memory Management',
      'Embedded Operating Systems & IoT Modules',
      'High-Speed Network Protocol Handling',
      'Real-Time Processing Performance',
    ],
    useCases: ['IoT Edge Controllers', 'Hardware Telemetry Gateways', 'Low-Latency System Services'],
    iconName: 'Terminal',
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Backend',
    description: 'Modern structured web engineering with Laravel for rapid digital portal and web application development.',
    keyCapabilities: [
      'Laravel Enterprise Architecture',
      'RESTful API Development & Integration',
      'Content Management & Web Portals',
      'Role-Based Authorization & Security',
    ],
    useCases: ['Corporate Content Portals', 'E-Commerce Backends', 'Business Directory Tools'],
    iconName: 'Code',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    description: 'Architecting resilient, scalable, and cost-efficient cloud infrastructure on Amazon Web Services.',
    keyCapabilities: [
      'Infrastructure as Code (Terraform)',
      'Serverless Architectures (Lambda, ECS, Fargate)',
      'Managed Database Services (Aurora, DynamoDB)',
      'Cloud Security & Access Control Governance',
    ],
    useCases: ['Cloud Migration Projects', 'DevOps CI/CD Automation', 'High-Availability Architectures'],
    iconName: 'Cloud',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI & Data',
    description: 'AI model pipelines, Retrieval-Augmented Generation (RAG), and high-performance Web APIs with FastAPI.',
    keyCapabilities: [
      'FastAPI & Django Web APIs',
      'Machine Learning Pipeline Engineering',
      'Vector Search & RAG System Design',
      'Automated Data Transformation Scripts',
    ],
    useCases: ['Enterprise Data Pipelines', 'Data Processing Workflows', 'Analytical Reporting Tools'],
    iconName: 'Binary',
  },
];

export const CAREERS_DATA: CareerPosition[] = [
  {
    id: 'sr-java-architect',
    title: 'Senior Java Enterprise Architect',
    department: 'Engineering',
    location: 'Noida, Sector 62, Uttar Pradesh, India',
    type: 'Full-time',
    experience: '8+ Years',
    summary:
      'Lead the architectural design and modernization of enterprise Java applications for client engagements.',
    requirements: [
      'Hands-on expertise with Java, Spring Boot, Spring Cloud, and ORM frameworks',
      'Understanding of microservices, distributed caching, and message queues',
      'Experience with Docker, Kubernetes, and cloud deployment patterns',
      'Strong knowledge of relational database design (PostgreSQL, Oracle)',
    ],
    responsibilities: [
      'Architect resilient backend services and microservice modules',
      'Establish technical coding standards and perform code reviews',
      'Collaborate with client teams to define technical specifications',
    ],
  },
  {
    id: 'ai-rag-engineer',
    title: 'Senior AI & RAG Solutions Engineer',
    department: 'AI Solutions',
    location: 'Noida, Sector 62, Uttar Pradesh, India',
    type: 'Full-time',
    experience: '4+ Years',
    summary:
      'Develop Retrieval-Augmented Generation (RAG) AI modules and conversational integration pipelines.',
    requirements: [
      'Proficiency in Python, FastAPI/Django, and AI orchestration frameworks (LangChain/LlamaIndex)',
      'Experience working with Vector Databases (Pinecone, Qdrant, PGVector)',
      'Knowledge of LLM integration, prompt engineering, and guardrail policies',
      'Strong API design and software engineering fundamentals',
    ],
    responsibilities: [
      'Build context-aware conversational AI pipelines connected to enterprise data stores',
      'Optimize retrieval accuracy, response speeds, and security guardrails',
      'Maintain documentation for AI pipelines and API integrations',
    ],
  },
  {
    id: 'devops-aws-specialist',
    title: 'DevOps & Cloud Specialist',
    department: 'Cloud & DevOps',
    location: 'Noida, Sector 62, Uttar Pradesh, India',
    type: 'Full-time',
    experience: '5+ Years',
    summary:
      'Manage Infrastructure-as-Code deployments, container orchestration, and automated CI/CD pipelines.',
    requirements: [
      'Experience with Terraform, Ansible, and AWS cloud management',
      'Hands-on knowledge of Docker, Kubernetes, and container security',
      'Familiarity with monitoring tools (Prometheus, Grafana, CloudWatch)',
      'Understanding of security baseline controls and network configuration',
    ],
    responsibilities: [
      'Maintain continuous integration and deployment pipelines for software applications',
      'Monitor cloud infrastructure health, security logs, and system resource utilization',
      'Implement automated backup protocols and disaster recovery procedures',
    ],
  },
  {
    id: 'fullstack-web-developer',
    title: 'Full Stack Web Developer (React / Node)',
    department: 'Engineering',
    location: 'Noida, Sector 62, Uttar Pradesh, India',
    type: 'Full-time',
    experience: '3+ Years',
    summary:
      'Build modern, responsive web applications, customer portals, and RESTful web services.',
    requirements: [
      'Strong proficiency in React, TypeScript, HTML5, CSS3, and Tailwind CSS',
      'Experience with Node.js/Express or Python/PHP backend APIs',
      'Understanding of state management, responsive layout design, and web accessibility',
      'Familiarity with Git, REST APIs, and modern frontend deployment tools',
    ],
    responsibilities: [
      'Develop clean, responsive user interfaces and integrate backend API services',
      'Ensure web application performance, cross-browser compatibility, and WCAG accessibility',
      'Participate in team agile sprints, code reviews, and technical planning',
    ],
  },
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Noida',
    country: 'India',
    address: 'Noida, Sector 62, Uttar Pradesh, India',
    email: 'contact@supernova.com',
    phone: '+917905243606',
    type: 'Corporate Headquarters',
  },
  {
    city: 'Vasai-Virar',
    country: 'India',
    address: '8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303',
    email: 'contact@supernova.com',
    phone: '+917905243606',
    type: 'Regional Office',
  },
  {
    city: 'Mumbai',
    country: 'India',
    address: 'Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063',
    email: 'contact@supernova.com',
    phone: '+917905243606',
    type: 'Regional Office',
  },
];
