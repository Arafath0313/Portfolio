export const SKILL_CATEGORIES = [
  { value: "PROGRAMMING_LANGUAGE", label: "Programming Language" },
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "DATABASE", label: "Database" },
  { value: "TOOLS", label: "Tools" },
  { value: "AI", label: "AI" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "MOBILE", label: "Mobile" },
];

export const SKILL_LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
];

export const PROJECT_STATUSES = [
  { value: "PLANNING", label: "Planning" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ON_HOLD", label: "On Hold" },
];

export const SOCIAL_PLATFORMS = [
  { value: "GITHUB", label: "GitHub" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "YOUTUBE", label: "YouTube" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "X", label: "X (Twitter)" },
  { value: "TIKTOK", label: "TikTok" },
  { value: "DISCORD", label: "Discord" },
  { value: "EMAIL", label: "Email" },
  { value: "WHATSAPP", label: "WhatsApp" },
];

export const CONTACT_STATUSES = [
  { value: "NEW", label: "New" },
  { value: "READ", label: "Read" },
  { value: "REPLIED", label: "Replied" },
];

export const ADMIN_ROLES = [{ value: "ADMIN", label: "Admin" }];

export const FILE_TYPES = [
  { value: "PDF", label: "PDF" },
  { value: "DOCX", label: "DOCX" },
];

export const PASSION_CATEGORIES = [
  { value: "CONTENT_CREATION", label: "🎬 Content Creation" },
  { value: "TRAVEL", label: "✈️ Travel" },
  { value: "UNIVERSITY_LIFE", label: "🎓 University Life" },
  { value: "FAVOURITES", label: "❤️ Favourites" },
  { value: "BOOKS", label: "📚 Books" },
  { value: "INSPIRATIONS", label: "💡 Inspirations" },
  { value: "TURNING_POINTS", label: "🌟 Turning Points" },
  { value: "OTHER", label: "✨ Other" }
];

export const CONTENT_PLATFORMS = [
  { value: "YOUTUBE", label: "YouTube" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "TIKTOK", label: "TikTok" },
  { value: "BEHANCE", label: "Behance" },
  { value: "DRIBBBLE", label: "Dribbble" },
  { value: "FLICKR", label: "Flickr" },
  { value: "OTHER", label: "Other" },
  { value: "NONE", label: "None" },
];

export const getEnumLabel = (options, value) =>
  options.find((o) => o.value === value)?.label ?? value;

export const STUDY_MODES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Hybrid" },
];

export const EDUCATION_STATUSES = [
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "GRADUATED", label: "Graduated" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "DROPPED", label: "Dropped" },
];

export const EDUCATION_EVENT_TYPES = [
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "COMPETITION", label: "Competition" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "CONFERENCE", label: "Conference" },
  { value: "GUEST_LECTURE", label: "Guest Lecture" },
  { value: "OTHER", label: "Other" },
];

export const EDUCATION_GALLERY_CATEGORIES = [
  { value: "ACADEMIC", label: "Academic" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "COMPETITION", label: "Competition" },
  { value: "SPORTS", label: "Sports" },
  { value: "IEEE", label: "IEEE" },
  { value: "INDUSTRIAL_VISIT", label: "Industrial Visit" },
  { value: "CAMPUS_EVENT", label: "Campus Event" },
  { value: "MEMORIES", label: "Memories" },
  { value: "OTHER", label: "Other" },
];
