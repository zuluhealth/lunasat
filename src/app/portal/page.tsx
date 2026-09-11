import styles from "./page.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";
import { requirePartnerSession } from "@/lib/portal/session";
import { portalNav } from "@/lib/portal/nav";
import SectionLink from "@/components/portal/SectionLink";
import HashScrollOnMount from "@/components/portal/SectionLink/HashScrollOnMount";
import OverviewSection from "@/components/portal/sections/OverviewSection";
import WhyLunasatSection from "@/components/portal/sections/WhyLunasatSection";
import CapabilitySection from "@/components/portal/sections/CapabilitySection";
import IntelligenceSection from "@/components/portal/sections/IntelligenceSection";
import ProvenDeliverySection from "@/components/portal/sections/ProvenDeliverySection";
import ProgramsSection from "@/components/portal/sections/ProgramsSection";
import TechnologyPartnersSection from "@/components/portal/sections/TechnologyPartnersSection";
import ComplianceSection from "@/components/portal/sections/ComplianceSection";
import SupportSection from "@/components/portal/sections/SupportSection";
import VerticalSolutionsSection from "@/components/portal/sections/VerticalSolutionsSection";

function formatSessionTimestamp(date: Date): string {
  const iso = date.toISOString().replace("T", " ").slice(0, 16);
  return `${iso} UTC`;
}

function formatNdaDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toISOString().slice(0, 10);
}

// One-line summary per section, keyed by nav href. Single source of truth for
// card copy; the index grid itself is generated from `portalNav`.
const SECTION_SUMMARIES: Record<string, string> = {
  "/portal#overview":
    "What a principal gets by appointing Lunasat as its regional integrator.",
  "/portal#why-lunasat":
    "How a certified local integrator de-risks entry into a hard market.",
  "/portal#capability-secured-communications":
    "Secured, resilient communications across the operating stack.",
  "/portal#capability-security-surveillance":
    "Security and Surveillance systems for fixed and mobile sites.",
  "/portal#capability-telecommunications":
    "Telecommunications infrastructure and network delivery.",
  "/portal#capability-airspace-control":
    "Airspace and Control Systems for monitored, managed airspace.",
  "/portal#proven-delivery":
    "A stat wall of delivery under real operational and regulatory constraints.",
  "/portal#programs":
    "Six anonymized program clusters showing scope, stack and outcome.",
  "/portal#technology-partners":
    "The OEM ecosystem of technology partners we've worked with already.",
  "/portal#compliance":
    "Governance posture across ITAR, FCPA, UKBA, Trace screening and CMMC cybersecurity standards.",
  "/portal#support-sustainment":
    "Preventive maintenance, installation, trainings and support when it matters most.",
  "/portal#vertical-solutions": "Our standard vertical solutions.",
};

// Sections that stay in the page and the sidebar, but are not surfaced as
// cards on the hub index.
const HIDDEN_FROM_INDEX = new Set([
  "/portal#top",
  "/portal#capability-intelligence",
  "/portal#proven-delivery",
  "/portal#programs",
]);

export default async function PortalPage() {
  const session = await requirePartnerSession();
  const timestamp = formatSessionTimestamp(new Date());

  const cards = portalNav.flatMap((group) =>
    group.items
      .filter((item) => !HIDDEN_FROM_INDEX.has(item.href))
      .map((item) => ({
        group: group.label,
        index: item.index,
        label: item.label,
        href: item.href,
        summary: SECTION_SUMMARIES[item.href] ?? "",
      })),
  );

  return (
    <div className={styles.page}>
      <HashScrollOnMount />

      <div className={styles.sessionStrip}>
        <span className={styles.sessionItem}>
          <span className={styles.sessionLabel}>SESSION</span>
          <span className={styles.sessionValue}>{timestamp}</span>
        </span>
        <span className={styles.sessionItem}>
          <span className={styles.sessionLabel}>// OPERATOR</span>
          <span className={styles.sessionValue}>{session.email}</span>
        </span>
        {session.ndaAcceptedAt && (
          <span className={styles.sessionItem}>
            <span className={styles.sessionLabel}>// NDA ACK</span>
            <span className={styles.sessionValue}>
              {formatNdaDate(session.ndaAcceptedAt)}
            </span>
          </span>
        )}
      </div>

      <header className={styles.hero} id="top">
        <span className={styles.heroEyebrow}>// BRIEFING ROOM</span>
        <div className={styles.heroWordmark}>
          <svg
            viewBox="0 0 1098 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.heroLogo}
            role="img"
            aria-label="Lunasat"
          >
            <path d="M290.462 66.0059C275.693 66.0059 236.347 66.0063 236.347 130.006C236.347 66.0054 236.347 66.0059 0.000342242 66.0058C236.347 66.0059 236.347 66.0059 236.347 2.00587C236.347 66.0059 274.462 66.0059 290.462 66.0059Z" fill="currentColor" />
            <path d="M355.734 126.95V2.48921H379.204V105.614H436.1V126.95H355.734Z" fill="currentColor" />
            <path d="M496.634 129.439C486.44 129.439 477.669 127.602 470.32 123.927C463.089 120.134 457.518 114.8 453.607 107.925C449.814 100.931 447.917 92.6934 447.917 83.2107V2.48921H471.387V83.9219C471.387 91.508 473.52 97.494 477.788 101.88C482.173 106.265 488.456 108.458 496.634 108.458C504.813 108.458 511.036 106.265 515.303 101.88C519.689 97.494 521.882 91.508 521.882 83.9219V2.48921H545.352V83.2107C545.352 92.6934 543.396 100.931 539.484 107.925C535.691 114.8 530.12 120.134 522.771 123.927C515.541 127.602 506.828 129.439 496.634 129.439Z" fill="currentColor" />
            <path d="M568.088 126.95V2.48921H612.716L637.43 110.948H640.631V2.48921H663.745V126.95H619.117L594.402 18.4913H591.202V126.95H568.088Z" fill="currentColor" />
            <path d="M678.666 126.95L711.381 2.48921H752.275L784.991 126.95H760.81L754.053 99.5683H709.603L702.847 126.95H678.666ZM715.115 77.8767H748.542L733.429 17.2467H730.228L715.115 77.8767Z" fill="currentColor" />
            <path d="M843.094 129.439C833.493 129.439 825.018 127.72 817.669 124.283C810.319 120.845 804.571 115.926 800.422 109.525C796.273 103.124 794.199 95.4196 794.199 86.4111V81.4327H817.313V86.4111C817.313 93.8787 819.624 99.5091 824.247 103.302C828.87 106.977 835.152 108.814 843.094 108.814C851.154 108.814 857.14 107.214 861.052 104.013C865.082 100.813 867.097 96.7235 867.097 91.7451C867.097 88.3076 866.09 85.5221 864.075 83.3885C862.178 81.2549 859.333 79.5361 855.54 78.2323C851.866 76.8099 847.361 75.506 842.027 74.3206L837.938 73.4316C829.403 71.5351 822.054 69.1644 815.891 66.3196C809.845 63.3563 805.163 59.5039 801.844 54.7626C798.644 50.0212 797.044 43.8575 797.044 36.2713C797.044 28.6852 798.822 22.2251 802.378 16.8911C806.052 11.4385 811.149 7.28983 817.669 4.44502C824.306 1.48167 832.07 0 840.96 0C849.85 0 857.733 1.54094 864.608 4.62282C871.601 7.58616 877.054 12.0904 880.966 18.1357C884.996 24.0623 887.011 31.53 887.011 40.5385V45.8726H863.897V40.5385C863.897 35.7972 862.948 32.0041 861.052 29.1593C859.274 26.196 856.666 24.0623 853.229 22.7585C849.791 21.3361 845.702 20.6249 840.96 20.6249C833.848 20.6249 828.574 21.988 825.136 24.7143C821.817 27.322 820.158 30.9373 820.158 35.5601C820.158 38.642 820.928 41.2497 822.469 43.3833C824.129 45.517 826.559 47.295 829.759 48.7174C832.959 50.1398 837.049 51.3844 842.027 52.4512L846.117 53.3402C855.007 55.2367 862.711 57.6667 869.231 60.63C875.869 63.5933 881.025 67.505 884.699 72.3648C888.374 77.2247 890.211 83.4477 890.211 91.0339C890.211 98.6201 888.255 105.317 884.344 111.125C880.551 116.815 875.098 121.319 867.986 124.638C860.993 127.839 852.695 129.439 843.094 129.439Z" fill="currentColor" />
            <path d="M899.18 126.95L931.896 2.48921H972.79L1005.51 126.95H981.324L974.568 99.5683H930.118L923.361 126.95H899.18ZM935.63 77.8767H969.056L953.943 17.2467H950.743L935.63 77.8767Z" fill="currentColor" />
            <path d="M1037.75 126.95V23.8253H1001.48V2.48921H1097.49V23.8253H1061.22V126.95H1037.75Z" fill="currentColor" />
          </svg>
        </div>
        <h1 className={styles.heroPositioning}>
          <TextReveal text="Your extended arm of technology into the Levant – A certified integrator with deep market expertise." />
        </h1>
      </header>

      <section className={styles.grid} aria-label="Portal sections">
        {cards.map((card) => (
          <SectionLink
            key={card.href}
            href={card.href}
            className={styles.card}
          >
            <div className={styles.cardHead}>
              {card.index && (
                <span className={styles.cardIndex}>{card.index}</span>
              )}
              <span className={styles.cardEyebrow}>
                <span className={styles.cardEyebrowMark}>//</span>
                {card.group}
              </span>
            </div>
            <h2 className={styles.cardTitle}>
              <TextReveal text={card.label} />
            </h2>
            <p className={styles.cardSummary}>{card.summary}</p>
            <span className={styles.cardCta} aria-hidden="true">
              [ ENTER &rarr; ]
            </span>
          </SectionLink>
        ))}
      </section>

      <div className={styles.sections}>
        <section id="overview" className={styles.anchor}>
          <OverviewSection />
        </section>
        <section id="why-lunasat" className={styles.anchor}>
          <WhyLunasatSection />
        </section>
        <section id="capability-secured-communications" className={styles.anchor}>
          <CapabilitySection slug="secured-communications" number="01" />
        </section>
        <section id="capability-intelligence" className={styles.anchor}>
          <IntelligenceSection />
        </section>
        <section id="capability-security-surveillance" className={styles.anchor}>
          <CapabilitySection slug="security-surveillance" number="03" />
        </section>
        <section id="capability-telecommunications" className={styles.anchor}>
          <CapabilitySection slug="telecommunications" number="04" />
        </section>
        <section id="capability-airspace-control" className={styles.anchor}>
          <CapabilitySection slug="airspace-control" number="05" />
        </section>
        <section id="proven-delivery" className={styles.anchor}>
          <ProvenDeliverySection />
        </section>
        <section id="programs" className={styles.anchor}>
          <ProgramsSection />
        </section>
        <section id="technology-partners" className={styles.anchor}>
          <TechnologyPartnersSection />
        </section>
        <section id="compliance" className={styles.anchor}>
          <ComplianceSection />
        </section>
        <section id="support-sustainment" className={styles.anchor}>
          <SupportSection />
        </section>
        <section id="vertical-solutions" className={styles.anchor}>
          <VerticalSolutionsSection />
        </section>
      </div>
    </div>
  );
}
