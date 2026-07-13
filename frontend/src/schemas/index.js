import { z } from "zod";

export const aboutSchema = z.object({
  fullName: z.string().min(1, "Full name is required.").max(100, "Full name cannot exceed 100 characters."),
  headline: z.string().min(1, "Headline is required.").max(150, "Headline cannot exceed 150 characters."),
  bio: z.string().min(1, "Bio is required."),
  email: z.string().min(1, "Email is required.").email("Please provide a valid email address.").max(100),
  phone: z.string().max(20).optional().or(z.literal("")),
  location: z.string().max(100).optional().or(z.literal("")),
  address: z.string().max(255).optional().or(z.literal("")),
  profileImage: z.string().max(255).optional().or(z.literal("")),
  coverImage: z.string().max(255).optional().or(z.literal("")),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required.").max(100),
  category: z.enum(["PROGRAMMING_LANGUAGE", "FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "MOBILE", "AI", "TOOLS"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  icon: z.string().max(255).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0, "Display order cannot be negative."),
  active: z.boolean(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required.").max(150),
  slug: z.string().min(1, "Project slug is required.").max(170),
  shortDescription: z.string().min(1, "Short description is required.").max(300),
  description: z.string().min(1, "Project description is required."),
  technologies: z.string().max(255).optional().or(z.literal("")),
  githubUrl: z.string().max(255).optional().or(z.literal("")),
  liveDemoUrl: z.string().max(255).optional().or(z.literal("")),
  status: z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]),
  featured: z.boolean(),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
});

export const certificationSchema = z.object({
  title: z.string().min(1, "Title is required.").max(150),
  issuer: z.string().min(1, "Issuer is required.").max(100),
  issueDate: z.string().min(1, "Issue date is required."),
  expiryDate: z.string().optional().or(z.literal("")),
  credentialId: z.string().max(100).optional().or(z.literal("")),
  credentialUrl: z.string().max(255).optional().or(z.literal("")),
  imageUrl: z.string().max(255).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0),
  active: z.boolean(),
});

export const passionSchema = z.object({
  title: z.string().min(1, "Title is required.").max(200),
  description: z.string().optional().or(z.literal("")),
  category: z.enum(["CONTENT_CREATION", "TRAVEL", "UNIVERSITY_LIFE", "FAVOURITES", "BOOKS", "INSPIRATIONS", "TURNING_POINTS", "OTHER"]),
  contentPlatform: z.enum(["YOUTUBE", "INSTAGRAM", "FACEBOOK", "TIKTOK", "BEHANCE", "DRIBBBLE", "FLICKR", "OTHER", "NONE"]),
  thumbnail: z.string().max(255).optional().or(z.literal("")),
  externalUrl: z.string().max(500).optional().or(z.literal("")),
  featured: z.boolean(),
  featuredHome: z.boolean(),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
});

export const resumeSchema = z.object({
  fileName: z.string().min(1, "File name is required.").max(255),
  fileUrl: z.string().min(1, "File URL is required.").max(255),
  fileType: z.enum(["PDF", "DOCX"]),
  fileSize: z.coerce.number().int().positive("File size must be positive."),
  version: z.string().max(20).optional().or(z.literal("")),
  active: z.boolean(),
  aboutId: z.coerce.number().int().positive("About profile is required."),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["GITHUB", "LINKEDIN", "YOUTUBE", "FACEBOOK", "INSTAGRAM", "X", "TIKTOK", "DISCORD", "EMAIL", "WHATSAPP"]),
  url: z.string().min(1, "URL is required.").max(255),
  icon: z.string().max(100).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0),
  active: z.boolean(),
});

export const youtubeSchema = z.object({
  title: z.string().min(1, "Title is required.").max(200),
  videoId: z.string().min(1, "Video ID is required.").max(50),
  thumbnailUrl: z.string().max(255).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  publishedAt: z.string().optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0),
  featured: z.boolean(),
  active: z.boolean(),
});

export const siteSettingSchema = z.object({
  siteTitle: z.string().min(1, "Site title is required.").max(100),
  logoUrl: z.string().max(255).optional().or(z.literal("")),
  faviconUrl: z.string().max(255).optional().or(z.literal("")),
  contactEmail: z.string().min(1, "Contact email is required.").email().max(100),
  contactPhone: z.string().max(30).optional().or(z.literal("")),
  address: z.string().max(255).optional().or(z.literal("")),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  footerText: z.string().max(255).optional().or(z.literal("")),
  active: z.boolean(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100),
  email: z.string().min(1, "Email is required.").email().max(100),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required.").max(150),
  message: z.string().min(1, "Message is required."),
});

export const adminSchema = z.object({
  username: z.string().min(3, "Username must be between 3 and 50 characters.").max(50),
  email: z.string().min(1, "Email is required.").email().max(100),
  password: z.string().min(8, "Password must be between 8 and 255 characters.").max(255),
  role: z.enum(["ADMIN"]),
  enabled: z.boolean(),
});

export const adminEditSchema = adminSchema;

export const educationSchema = z.object({
  universityName: z.string().min(1, "University name is required.").max(150),
  universityLogo: z.string().max(255).optional().or(z.literal("")),
  universityWebsite: z.string().max(255).optional().or(z.literal("")),
  degree: z.string().min(1, "Degree is required.").max(150),
  faculty: z.string().max(100).optional().or(z.literal("")),
  department: z.string().max(100).optional().or(z.literal("")),
  enrollmentYear: z.coerce.number().int().min(1900, "Valid year is required."),
  expectedGraduationYear: z.coerce.number().int().optional().or(z.literal("")),
  currentAcademicYear: z.string().max(50).optional().or(z.literal("")),
  currentSemester: z.string().max(50).optional().or(z.literal("")),
  studyMode: z.enum(["FULL_TIME", "PART_TIME", "ONLINE", "HYBRID"]),
  gpa: z.coerce.number().optional().or(z.literal("")),
  status: z.enum(["IN_PROGRESS", "GRADUATED", "SUSPENDED", "DROPPED"]),
  academicSummary: z.string().max(2000).optional().or(z.literal("")),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
});

export const educationEventSchema = z.object({
  title: z.string().min(1, "Title is required.").max(150),
  description: z.string().min(1, "Description is required.").max(1000),
  eventDate: z.string().min(1, "Event date is required."),
  eventType: z.enum(["WORKSHOP", "SEMINAR", "COMPETITION", "HACKATHON", "CONFERENCE", "GUEST_LECTURE", "OTHER"]),
  image: z.string().max(255).optional().or(z.literal("")),
  externalUrl: z.string().max(255).optional().or(z.literal("")),
  featured: z.boolean(),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
  educationId: z.coerce.number().int().positive("Education is required."),
});

export const academicOrganizationSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required.").max(150),
  role: z.string().min(1, "Role is required.").max(150),
  description: z.string().max(1000).optional().or(z.literal("")),
  logo: z.string().max(255).optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().optional().or(z.literal("")),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
  educationId: z.coerce.number().int().positive("Education is required."),
});

export const educationGallerySchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required.").max(255),
  title: z.string().max(150).optional().or(z.literal("")),
  caption: z.string().max(500).optional().or(z.literal("")),
  eventDate: z.string().optional().or(z.literal("")),
  category: z.enum(["ACADEMIC", "WORKSHOP", "SEMINAR", "COMPETITION", "SPORTS", "IEEE", "INDUSTRIAL_VISIT", "CAMPUS_EVENT", "MEMORIES", "OTHER"]),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
  educationId: z.coerce.number().int().positive("Education is required."),
});

export const academicAchievementSchema = z.object({
  title: z.string().min(1, "Title is required.").max(150),
  description: z.string().max(1000).optional().or(z.literal("")),
  achievementDate: z.string().min(1, "Achievement date is required."),
  certificateImage: z.string().max(255).optional().or(z.literal("")),
  externalUrl: z.string().max(255).optional().or(z.literal("")),
  active: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
  educationId: z.coerce.number().int().positive("Education is required."),
});
