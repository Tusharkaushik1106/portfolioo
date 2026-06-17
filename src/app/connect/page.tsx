import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ResumeLinks from "@/components/ResumeLinks";

const socials = [
  { label: "Email", value: "k.tushar1106@gmail.com", href: "mailto:k.tushar1106@gmail.com", icon: "/socials/email.png" },
  { label: "GitHub", value: "@Tusharkaushik1106", href: "https://github.com/Tusharkaushik1106", icon: "/socials/github.png" },
  { label: "LinkedIn", value: "in/tushar1106", href: "https://www.linkedin.com/in/tushar1106/", icon: "/socials/linkedin.png" },
];

export default function Connect() {
  return (
    <SiteFrame>
      <section className="pt-16 pb-24" id="connect">
        <Reveal>
          <div className="mx-auto mb-10 max-w-lg text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-coral">
              Connect
            </p>
            <h1 className="mt-3 font-editorial leading-none text-[#F5E1CD] text-[44px] sm:text-[64px]">
              Let&apos;s build something
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              Got an idea, a role, or just want to say hi? Send a note — or find
              me on the usual places.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>

        {/* social links */}
        <Reveal>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-lg border border-paper/10 bg-paper/[0.03] px-4 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-coral/40 hover:bg-coral/[0.06]"
              >
                <Image
                  src={s.icon}
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="mb-2 h-9 w-9 transition-transform group-hover:scale-110"
                />
                <span className="block font-mono text-[10px] uppercase tracking-widest text-coral">
                  {s.label}
                </span>
                <span className="mt-1 block max-w-full truncate font-hand text-base text-paper/80 group-hover:text-paper">
                  {s.value}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* résumé */}
        <Reveal>
          <div className="mx-auto mt-8 flex max-w-lg flex-col items-center border-t border-paper/10 pt-8">
            <span className="mb-3 font-mono text-[10px] uppercase tracking-widest text-paper/40">
              or grab my résumé
            </span>
            <ResumeLinks />
          </div>
        </Reveal>
      </section>
    </SiteFrame>
  );
}
