import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import SocialLink from "../public/SocialLink";

const quickLinks = [
  { label: "About", to: ROUTES.ABOUT },
  { label: "Projects", to: ROUTES.PROJECTS },
  { label: "Beyond Coding", to: ROUTES.BEYOND_CODING },
  { label: "Videos", to: ROUTES.VIDEOS },
  { label: "Contact", to: ROUTES.CONTACT },
  { label: "Resume", to: ROUTES.RESUME },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { about, brandName, contact, siteSettings, socialLinks } = useAppContext();

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.75fr_0.85fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300">
              {brandName}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {about?.headline || "A polished portfolio experience powered by live content."}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {siteSettings?.footerText || about?.bio || "Explore projects, writing, credentials, videos, and ways to connect."}
          </p>
          {socialLinks.length ? (
            <div className="flex flex-wrap gap-3">
              {socialLinks
                .filter((link) => link.platform !== "EMAIL")
                .map((link) => (
                <SocialLink key={link.id} socialLink={link} compact />
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Explore
          </h3>
          <div className="mt-4 grid gap-3 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {contact.email ? <p>{contact.email}</p> : null}
            {contact.phone ? <p>{contact.phone}</p> : null}
            {contact.address ? <p>{contact.address}</p> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200/80 px-4 py-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{year} {brandName}. All rights reserved.</p>
          <Link to={ROUTES.CONTACT} className="transition hover:text-slate-950 dark:hover:text-white">
            Start a conversation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
