"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "motion/react";

const links = [
  { href: "/about", label: "about", avatar: "/avatars/ava-about.png" },
  { href: "/work", label: "Work", avatar: "/avatars/ava-work.png" },
  { href: "/blogs", label: "blogs", avatar: "/avatars/ava-blogs.png" },
  { href: "#connect", label: "Connect", avatar: "/avatars/ava-connect.png" },
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
            {/* avatar pops up above the item on hover */}
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
