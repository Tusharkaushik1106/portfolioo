/**
 * Résumé call-to-action — a "Download" button (forces the PDF download straight
 * from Google Drive) paired with a "View" button (opens the Drive preview).
 *
 * To self-host the file later, drop the PDF in /public (e.g.
 * /public/resume/tushar-kaushik.pdf) and point RESUME_DOWNLOAD_URL at it.
 */

const DRIVE_FILE_ID = "14iiY0wIcfefTuM2e4Rk0HOKaRnkUkxfx";

export const RESUME_VIEW_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/view`;
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

export default function ResumeLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={RESUME_DOWNLOAD_URL}
        className="group inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper-white shadow-[0_8px_20px_-8px_rgba(227,83,66,0.8)] transition-transform hover:-translate-y-0.5"
      >
        <DownloadIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
        Download Resume
      </a>
      <a
        href={RESUME_VIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-coral/50 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-coral transition-all hover:-translate-y-0.5 hover:border-coral hover:bg-coral/10"
      >
        <EyeIcon className="size-4" />
        View Resume
      </a>
    </div>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  );
}

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
