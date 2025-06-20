export const mockRecommendations = [
  {
    id: "1",
    title: "Enable Multi-Factor Authentication for Admin Accounts",
    description:
      "Implement MFA for all administrative accounts to prevent unauthorized access and reduce the risk of credential-based attacks.",
    riskScore: 85,
    riskClass: "HIGH" as const,
    cloudProviders: ["AWS", "Azure"],
    frameworks: [
      { id: "soc2", name: "SOC 2", version: "2017" },
      { id: "iso27001", name: "ISO 27001", version: "2013" },
    ],
    reasons: [
      "Prevents credential stuffing attacks",
      "Reduces impact of password breaches",
      "Required for compliance frameworks",
    ],
    impact:
      "High impact on security posture. Implementing MFA will significantly reduce the risk of unauthorized access to critical systems and data.",
    resourcesEnforced: [
      "IAM Users with administrative privileges",
      "Root account access",
      "Service accounts with elevated permissions",
    ],
    isArchived: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    title: "Implement Network Segmentation for Database Servers",
    description:
      "Isolate database servers in separate network segments with restricted access to minimize attack surface and prevent lateral movement.",
    riskScore: 92,
    riskClass: "CRITICAL" as const,
    cloudProviders: ["AWS", "GCP"],
    frameworks: [
      { id: "pci", name: "PCI DSS", version: "4.0" },
      { id: "nist", name: "NIST CSF", version: "1.1" },
    ],
    reasons: [
      "Prevents lateral movement in case of breach",
      "Reduces blast radius of security incidents",
      "Required for PCI DSS compliance",
    ],
    impact:
      "Critical for data protection. Network segmentation will prevent attackers from accessing sensitive databases even if they compromise other systems.",
    resourcesEnforced: [
      "Database instances",
      "Network security groups",
      "VPC configurations",
      "Firewall rules",
    ],
    isArchived: false,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "3",
    title: "Enable Encryption at Rest for All Storage Services",
    description:
      "Configure encryption at rest for all storage services including databases, file systems, and backup storage to protect data confidentiality.",
    riskScore: 78,
    riskClass: "HIGH" as const,
    cloudProviders: ["AWS", "Azure", "GCP"],
    frameworks: [
      { id: "gdpr", name: "GDPR", version: "2018" },
      { id: "hipaa", name: "HIPAA", version: "2013" },
    ],
    reasons: [
      "Protects data at rest from unauthorized access",
      "Required for regulatory compliance",
      "Industry best practice for data protection",
    ],
    impact:
      "Moderate implementation effort with high security benefit. Encryption at rest ensures data remains protected even if storage media is compromised.",
    resourcesEnforced: [
      "RDS instances",
      "S3 buckets",
      "EBS volumes",
      "Backup storage",
    ],
    isArchived: false,
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-19T13:10:00Z",
  },
  {
    id: "4",
    title: "Configure Automated Security Scanning for Container Images",
    description:
      "Implement automated vulnerability scanning for all container images before deployment to identify and remediate security issues early in the development lifecycle.",
    riskScore: 65,
    riskClass: "MEDIUM" as const,
    cloudProviders: ["AWS", "Azure", "GCP"],
    frameworks: [
      { id: "nist", name: "NIST CSF", version: "1.1" },
      { id: "cis", name: "CIS Controls", version: "8" },
    ],
    reasons: [
      "Identifies vulnerabilities before production deployment",
      "Reduces security debt in containerized applications",
      "Enables shift-left security practices",
    ],
    impact:
      "Low to moderate impact on development workflow. Automated scanning helps catch vulnerabilities early, reducing remediation costs.",
    resourcesEnforced: [
      "Container registries",
      "CI/CD pipelines",
      "Kubernetes clusters",
      "Container runtime environments",
    ],
    isArchived: true,
    createdAt: "2024-01-08T14:30:00Z",
    updatedAt: "2024-01-16T10:20:00Z",
  },
  {
    id: "5",
    title: "Implement Centralized Logging and Monitoring",
    description:
      "Deploy centralized logging solution to collect, analyze, and monitor security events across all systems for improved threat detection and incident response.",
    riskScore: 71,
    riskClass: "MEDIUM" as const,
    cloudProviders: ["AWS", "Azure"],
    frameworks: [
      { id: "soc2", name: "SOC 2", version: "2017" },
      { id: "iso27001", name: "ISO 27001", version: "2013" },
    ],
    reasons: [
      "Enables real-time threat detection",
      "Improves incident response capabilities",
      "Required for compliance auditing",
    ],
    impact:
      "Significant operational improvement. Centralized logging provides visibility into security events and enables faster incident response.",
    resourcesEnforced: [
      "Application servers",
      "Database servers",
      "Network devices",
      "Security tools",
    ],
    isArchived: false,
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-21T09:30:00Z",
  },
];

export const mockFilterOptions = {
  frameworks: [
    { id: "soc2", name: "SOC 2", version: "2017" },
    { id: "iso27001", name: "ISO 27001", version: "2013" },
    { id: "pci", name: "PCI DSS", version: "4.0" },
    { id: "nist", name: "NIST CSF", version: "1.1" },
    { id: "gdpr", name: "GDPR", version: "2018" },
    { id: "hipaa", name: "HIPAA", version: "2013" },
    { id: "cis", name: "CIS Controls", version: "8" },
  ],
  cloudProviders: ["AWS", "Azure", "GCP", "Oracle Cloud"],
  classes: ["LOW", "MEDIUM", "HIGH", "CRITICAL"], // risk classes
  reasons: [
    "Prevents credential stuffing attacks",
    "Reduces impact of password breaches",
    "Required for compliance frameworks",
    "Prevents lateral movement in case of breach",
    "Reduces blast radius of security incidents",
    "Protects data at rest from unauthorized access",
    "Industry best practice for data protection",
    "Identifies vulnerabilities before production deployment",
    "Enables shift-left security practices",
    "Enables real-time threat detection",
    "Improves incident response capabilities",
  ],
};