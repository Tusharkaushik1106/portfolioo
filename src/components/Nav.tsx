"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "motion/react";

type Social = { name: string; href: string; icon: string };
type NavLink = {
  href: string;
  label: string;
  avatar: string;
  socials?: Social[];
};

const links: NavLink[] = [
  { href: "/about", label: "about", avatar: "/avatars/ava-about.png" },
  { href: "/work", label: "Work", avatar: "/avatars/ava-work.png" },
  { href: "/blogs", label: "blogs", avatar: "/avatars/ava-blogs.png" },
  {
    href: "/connect",
    label: "Connect",
    avatar: "/avatars/ava-connect.png",
    socials: [
      { name: "Email", href: "mailto:k.tushar1106@gmail.com", icon: "/socials/email.png" },
      { name: "GitHub", href: "https://github.com/Tusharkaushik1106", icon: "/socials/github.png" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/tushar1106/", icon: "/socials/linkedin.png" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  shown: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 18 } },
};

const labelVariants: Variants = {
  rest: { y: 0, color: "var(--paper)" },
  active: { y: 0, color: "var(--coral)" },
  hover: {
    y: -2,
    color: "var(--coral)",
    transition: { type: "spring", stiffness: 320, damping: 18 },
  },
};

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  active: { scaleX: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
  hover: { scaleX: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
};

// avatar that pops up above the item on hover
const avatarVariants: Variants = {
  rest: { opacity: 0, scale: 0.4, y: 12, rotate: -10 },
  hover: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 420, damping: 16 },
  },
};

// Connect popup: row of social icons flanking the avatar, staggered in on hover
const socialPopVariants: Variants = {
  rest: {
    pointerEvents: "none",
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  hover: {
    pointerEvents: "auto",
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};
const popItemVariants: Variants = {
  rest: { opacity: 0, scale: 0.3, y: 14 },
  hover: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 460, damping: 17 },
  },
};

/** Centered nav: small logo + handwritten links with hover lift + underline draw. */
export default function Nav() {
  const pathname = usePathname();
  return (
    <motion.header
      initial="hidden"
      animate="shown"
      variants={containerVariants}
      className="relative z-30 flex justify-center px-4 pt-20 pb-3"
    >
      <nav className="flex items-center gap-11">
        <motion.div variants={itemVariants}>
          <Link href="/" aria-label="Home" className="block">
            {/* hand-drawn smiley — cream by default, coral + wink on hover */}
            <motion.svg
              width="27"
              height="27"
              viewBox="0 0 32 32"
              fill="none"
              className="text-paper"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: { rotate: -6, color: "var(--paper)" },
                hover: {
                  rotate: 4,
                  color: "var(--coral)",
                  transition: { type: "spring", stiffness: 300, damping: 14 },
                },
              }}
            >
              {/* eyes */}
              <circle cx="11.5" cy="13" r="1.7" fill="currentColor" />
              <circle cx="20.5" cy="13" r="1.7" fill="currentColor" />
              {/* smile */}
              <path
                d="M10 19 q6 6 12 0"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </motion.svg>
          </Link>
        </motion.div>

        {links.map((l) => {
          const isActive = l.href.startsWith("/") && pathname === l.href;
          return (
          <motion.div
            key={l.href}
            variants={itemVariants}
            initial="rest"
            animate={isActive ? "active" : "rest"}
            whileHover="hover"
            className="relative"
          >
            {/* hover popup: avatar (+ social links flanking it, for Connect) */}
            {l.socials ? (
              <motion.div
                variants={socialPopVariants}
                className="absolute bottom-full left-1/2 flex -translate-x-1/2 items-end gap-2 pb-3"
              >
                {l.socials.slice(0, 2).map((s) => (
                  <SocialIcon key={s.name} s={s} />
                ))}
                <motion.img
                  // eslint-disable-next-line @next/next/no-img-element
                  src={l.avatar}
                  alt=""
                  aria-hidden
                  variants={avatarVariants}
                  className="h-auto w-14 max-w-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
                {l.socials.slice(2).map((s) => (
                  <SocialIcon key={s.name} s={s} />
                ))}
              </motion.div>
            ) : (
              <div className="pointer-events-none absolute -top-[3.6rem] left-1/2 -translate-x-1/2">
                <motion.img
                  // eslint-disable-next-line @next/next/no-img-element
                  src={l.avatar}
                  alt=""
                  aria-hidden
                  variants={avatarVariants}
                  className="h-auto w-14 max-w-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            )}

            <Link href={l.href}>
              <motion.span
                variants={labelVariants}
                className="block font-hand text-[21px] leading-none"
              >
                {l.label}
              </motion.span>
            </Link>

            <span className="pointer-events-none absolute left-0 right-0 -bottom-1.5 h-[6px] overflow-hidden">
              <motion.span
                aria-hidden
                variants={underlineVariants}
                className="block h-[3px] origin-left rounded-full bg-coral"
                style={{ transform: "skewX(-4deg)" }}
              />
            </span>
          </motion.div>
          );
        })}
      </nav>
    </motion.header>
  );
}

function SocialIcon({ s }: { s: Social }) {
  return (
    <motion.a
      href={s.href}
      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={s.name}
      variants={popItemVariants}
      className="block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.icon}
        alt=""
        aria-hidden
        className="h-9 w-9 max-w-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-transform hover:scale-110"
      />
    </motion.a>
  );
}
