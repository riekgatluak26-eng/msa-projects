import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Mission for Sustainable Advancement (MSA) collects, uses and protects your information.',
};

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Information' },
  { id: 'sharing', label: 'Sharing & Disclosure' },
  { id: 'security', label: 'Data Security' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'cookies', label: 'Cookies' },
  { id: 'international', label: 'International Transfers' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Privacy"
        titleAccent="Policy"
        subtitle="How we collect, use and protect your information."
        lastUpdated="October 8, 2026"
      />
      <div className="flag-bar" />
      <LegalLayout sections={SECTIONS}>
        <Section id="introduction" title="1. Introduction">
          <p>
            Mission for Sustainable Advancement (&ldquo;MSA&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a legally registered
            National Organisation operating in South Sudan. This Privacy Policy
            explains how we collect, use, store, share and protect information
            about you when you visit our website at{' '}
            <a
              href="https://msasouthsudan.org"
              className="text-green-600 hover:underline font-semibold"
            >
              msasouthsudan.org
            </a>
            , contact us, apply for a program, volunteer, partner with us, or
            otherwise interact with our organisation.
          </p>
          <p>
            By using our website or services, you agree to the practices
            described in this Privacy Policy. If you do not agree, please do
            not use the website.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information We Collect">
          <p>
            We collect information to better serve communities across South
            Sudan. The types of information we may collect include:
          </p>

          <h3 className="font-bold text-gray-900 text-lg mt-6 mb-3">
            2.1 Information you provide directly
          </h3>
          <ul className="space-y-2 my-4">
            <ListItem>
              <strong>Contact information</strong> — name, email address, phone
              number, organisation and message content when you fill out our
              contact form.
            </ListItem>
            <ListItem>
              <strong>Volunteer and partner applications</strong> — information
              you submit when applying to volunteer, partner with us or request
              program information.
            </ListItem>
            <ListItem>
              <strong>Donation details</strong> — if you donate, we may collect
              your name, contact information and donation details (we do not
              store credit card or bank account information on our servers).
            </ListItem>
            <ListItem>
              <strong>Program participation</strong> — information collected
              when you enrol in or participate in our education, health,
              protection, livelihoods or media programs.
            </ListItem>
          </ul>

          <h3 className="font-bold text-gray-900 text-lg mt-6 mb-3">
            2.2 Information we collect automatically
          </h3>
          <ul className="space-y-2 my-4">
            <ListItem>
              <strong>Technical information</strong> — IP address, browser type,
              device type, operating system, and the pages you visit on our
              site.
            </ListItem>
            <ListItem>
              <strong>Usage information</strong> — pages viewed, time spent on
              pages, referring URLs, and other interaction data.
            </ListItem>
          </ul>

          <h3 className="font-bold text-gray-900 text-lg mt-6 mb-3">
            2.3 Information from third parties
          </h3>
          <p>
            We may receive information about you from our partners, donors,
            government authorities and other organisations we work with, where
            it is necessary for our programs or required by law.
          </p>
        </Section>

        <Section id="how-we-use" title="3. How We Use Information">
          <p>We use the information we collect to:</p>
          <ul className="space-y-2 my-4">
            <ListItem>
              Respond to your inquiries, requests and messages
            </ListItem>
            <ListItem>
              Process volunteer applications, partnership requests and donations
            </ListItem>
            <ListItem>
              Deliver and improve our education, health, protection, resilience,
              governance and media programs
            </ListItem>
            <ListItem>
              Communicate updates, impact reports and news about our work
              (only if you have opted in)
            </ListItem>
            <ListItem>
              Comply with our legal, regulatory and reporting obligations
            </ListItem>
            <ListItem>
              Monitor website performance and detect technical issues
            </ListItem>
            <ListItem>
              Protect the safety and rights of children, vulnerable persons and
              our staff
            </ListItem>
          </ul>
          <p>
            We will never sell your personal information to third parties.
          </p>
        </Section>

        <Section id="sharing" title="4. Sharing & Disclosure">
          <p>
            We do not sell, rent or trade your personal information. We may
            share information with:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>
              <strong>Trusted partners</strong> — including donors, funding
              organisations and implementing partners such as Christian World
              Service, Oxfam Novib, World Vision Somalia and government
              ministries — but only as necessary for our programs.
            </ListItem>
            <ListItem>
              <strong>Service providers</strong> — such as email platforms,
              website hosting, file storage and analytics providers who help
              us operate.
            </ListItem>
            <ListItem>
              <strong>Legal authorities</strong> — when required by law, court
              order or to protect the safety of children and vulnerable
              persons.
            </ListItem>
          </ul>
          <p>
            All third parties we work with are required to protect your
            information and use it only for the purposes we specify.
          </p>
        </Section>

        <Section id="security" title="5. Data Security">
          <p>
            We take the security of your information seriously. We use
            industry-standard measures to protect it, including:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>Encrypted connections (HTTPS) across our website</ListItem>
            <ListItem>
              Secure cloud storage with access controls and encryption at rest
            </ListItem>
            <ListItem>
              Password-protected administrative systems with hashed credentials
            </ListItem>
            <ListItem>
              Restricted access to personal information, granted only to staff
              who need it
            </ListItem>
          </ul>
          <p>
            No method of transmission or storage is 100% secure. While we take
            reasonable steps to protect your information, we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section id="retention" title="6. Data Retention">
          <p>
            We retain personal information only as long as necessary for the
            purposes described in this policy, or as required by law. When
            information is no longer needed, we securely delete or anonymise
            it.
          </p>
          <p>
            Donor and program records may be retained for several years to
            comply with reporting requirements of our funders and the
            Government of South Sudan.
          </p>
        </Section>

        <Section id="rights" title="7. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="space-y-2 my-4">
            <ListItem>Request access to the personal information we hold about you</ListItem>
            <ListItem>Request correction of inaccurate information</ListItem>
            <ListItem>Request deletion of your information (where legally permitted)</ListItem>
            <ListItem>Object to or restrict certain uses of your information</ListItem>
            <ListItem>Withdraw consent for marketing communications at any time</ListItem>
          </ul>
          <p>
            To exercise any of these rights, contact us using the details at
            the end of this policy. We will respond within a reasonable
            timeframe.
          </p>
        </Section>

        <Section id="children" title="8. Children's Privacy">
          <p>
            Many of MSA&apos;s programs serve children. We take child
            safeguarding seriously and comply with the South Sudan Child Act
            2008 and international child protection standards.
          </p>
          <p>
            We do not knowingly collect personal information from children
            online without parental or guardian consent. Information about
            children in our programs is collected directly through program
            activities, with the consent of parents, guardians or relevant
            authorities, and is protected with additional safeguards.
          </p>
          <p>
            If you believe a child has provided us with personal information
            without appropriate consent, please contact us immediately.
          </p>
        </Section>

        <Section id="cookies" title="9. Cookies & Tracking">
          <p>
            Our website uses a small number of cookies and similar
            technologies to:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>Remember your preferences</ListItem>
            <ListItem>Keep you signed in to the admin area (if applicable)</ListItem>
            <ListItem>Understand how visitors use our site so we can improve it</ListItem>
          </ul>
          <p>
            You can disable cookies in your browser settings at any time.
            Doing so may affect some parts of the website.
          </p>
        </Section>

        <Section id="international" title="10. International Transfers">
          <p>
            Some of our service providers (such as cloud hosting and email
            platforms) store data in servers located outside South Sudan. When
            we transfer personal information internationally, we take
            reasonable steps to ensure it receives an adequate level of
            protection.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will post the updated version on this page and change the
            &ldquo;Last Updated&rdquo; date at the top. We encourage you to
            review this page periodically.
          </p>
        </Section>

        <Section id="contact" title="12. Contact Us">
          <p>
            If you have questions, concerns or requests about this Privacy
            Policy or how we handle your information, please contact us:
          </p>
          <div className="mt-5 p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="font-bold text-gray-900 mb-3">
              Mission for Sustainable Advancement (MSA)
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-green-600 w-4" />
                <span>Head Office, Juba, Central Equatoria State, South Sudan</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-envelope text-green-600 w-4" />
                <a
                  href="mailto:info@msa-southsudan.org"
                  className="text-green-600 hover:underline"
                >
                  info@msa-southsudan.org
                </a>
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-phone text-green-600 w-4" />
                <a href="tel:+211925784075" className="text-green-600 hover:underline">
                  +211 925 784 075
                </a>
              </p>
            </div>
          </div>
        </Section>

        <LegalFooterNav current="privacy" />
      </LegalLayout>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   SHARED COMPONENTS (duplicated across both files, small)
   ════════════════════════════════════════════════════════════ */

function LegalHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  lastUpdated: string;
}) {
  return (
    <section className="relative pt-40 pb-20 mesh-bg-dark noise-overlay overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            background: 'rgba(7,137,48,.4)',
            top: -100,
            right: -100,
          }}
        />
        <div
          className="orb"
          style={{
            width: 320,
            height: 320,
            background: 'rgba(0,51,160,.4)',
            bottom: -80,
            left: -80,
            animationDelay: '6s',
          }}
        />
      </div>

      <div className="container relative z-10 text-center max-w-3xl">
        <span className="section-badge bg-white/10 text-yellow-400 mb-6">
          <i className="fas fa-scale-balanced mr-2" />
          {eyebrow}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          {title}{' '}
          <span className="text-gradient-gold">{titleAccent}</span>
        </h1>
        <p className="text-lg text-white/65 max-w-2xl mx-auto mb-6">
          {subtitle}
        </p>
        <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">
          <i className="far fa-calendar mr-2" />
          Last Updated: {lastUpdated}
        </p>
      </div>
    </section>
  );
}

function LegalLayout({
  sections,
  children,
}: {
  sections: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Table of Contents — sticky sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
                On This Page
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 max-w-3xl">
            <div className="space-y-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 pb-3 border-b-2 border-gray-100">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed text-[16px]">
        {children}
      </div>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-gray-700">
      <i className="fas fa-circle text-green-500 text-[6px] mt-2.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function LegalFooterNav({ current }: { current: 'privacy' | 'terms' }) {
  const other =
    current === 'privacy'
      ? { label: 'Terms of Use', href: '/terms' }
      : { label: 'Privacy Policy', href: '/privacy' };

  return (
    <div className="mt-16 pt-8 border-t border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors"
        >
          <i className="fas fa-arrow-left text-xs" /> Back to Home
        </Link>
        <Link
          href={other.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          <i className="fas fa-file-contract text-xs" />
          {other.label}
          <i className="fas fa-arrow-right text-xs" />
        </Link>
      </div>
    </div>
  );
}