import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";
import { buildMediaUrl } from "../../utils/apiHelpers";
import LazyImage from "./LazyImage";

const CertificationCard = ({ certification }) => {
  const hasImage = Boolean(certification?.imageUrl);

  const imageContent = (
    <LazyImage
      src={certification?.imageUrl}
      alt={certification?.title || "Certification"}
      wrapperClassName="aspect-[4/3] overflow-hidden"
      className="transition-transform duration-500 group-hover:scale-105"
      fallbackLabel={certification?.issuer || "Credential"}
    />
  );

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
    >
      {hasImage ? (
        <a 
          href={buildMediaUrl(certification.imageUrl)} 
          target="_blank" 
          rel="noreferrer"
          className="block overflow-hidden"
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <FiAward className="h-4 w-4" />
          {certification?.issuer}
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {certification?.title}
        </h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {certification?.issueDate ? <p>Issued {formatDate(certification.issueDate)}</p> : null}
          {certification?.expiryDate ? <p>Expires {formatDate(certification.expiryDate)}</p> : null}
          {certification?.credentialId ? <p>ID: {certification.credentialId}</p> : null}
        </div>
        {certification?.credentialUrl ? (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300"
          >
            Verify credential
            <FiArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
};

export default CertificationCard;
