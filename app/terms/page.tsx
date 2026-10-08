import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use',
  description:
    'The terms and conditions for using the Mission for Sustainable Advancement (MSA) website and services.',
};

const SECTIONS = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'about', label: 'About MSA' },
  { id: 'use-of-website', label: 'Use of the Website' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'user-content', label: 'User Submissions' },
  { id: 'third-party', label: 'Third-Party Links' },
  { id: 'disclaimer', label: 'Disclaimer' },
  { id: 'limitation', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
];

export default function TermsPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Terms of"
        titleAccent="Use"
        subtitle="The terms and conditions for using the MSA website and services."
        lastUpdated="October 8, 2026"
      />
      <div className="flag-bar" />
      <LegalLayout sections={SECTIONS}>
        <Section id="acceptance" title="1. Acceptance of Terms">
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and
            use of the website, services and content of Mission for Sustainable
            Advancement (&ldquo;MSA&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;,
            or &ldquo;us&rdquo;) at{' '}
            <a
              href="https://msasouthsudan.org"
              className="text-green-600 hover:underline font-semibold"
            >
              msasouthsudan.org
            </a>{' '}
            and any related services.
          </p>
          <p>
            By accessing or using our website, you confirm that you have read,
            understood and agree to be bound by these Terms. If you do not
            agree, please do not use the website.
          </p>
          <p>
            You must be at least 18 years old, or the age of majority in your
            jurisdiction, to use certain features of the website (such as
            submitting a contact form or donating). Visitors under 18 may view
            public pages under the supervision of a parent or guardian.
          </p>
        </Section>

        <Section id="about" title="2. About MSA">
          <p>
            MSA is a legally registered National Organisation operating in
            South Sudan. Our mission is to empower communities and Local
            Governments in South Sudan through Education, Health, Resilience
            and Recovery, Governance, Protection and Media Programs for a
            sustainable future.
          </p>
          <p>
            We work across six program areas: Education, Health, Resilience
            &amp; Recovery, Governance, Protection, and Information &amp;
            Media, with field offices in Maridi, Aweil and Yei and our head
            office in Juba.
          </p>
        </Section>

        <Section id="use-of-website" title="3. Use of the Website">
          <p>You agree to use our website only for lawful purposes. You must not:</p>
          <ul className="space-y-2 my-4">
            <ListItem>
              Use the website in any way that violates any applicable local,
              national or international law
            </ListItem>
            <ListItem>
              Attempt to gain unauthorised access to any part of the website,
              other accounts, or computer systems connected to the website
            </ListItem>
            <ListItem>
              Interfere with or disrupt the website or servers or networks
              connected to the website
            </ListItem>
            <ListItem>
              Use the website to transmit any malicious code, virus, worm or
              harmful technology
            </ListItem>
            <ListItem>
              Use automated systems (bots, scrapers, crawlers) to access the
              website in a way that sends more request messages than a human
              could reasonably produce
            </ListItem>
            <ListItem>
              Impersonate any person or entity, or falsely state or misrepresent
              your affiliation with any person or entity
            </ListItem>
            <ListItem>
              Collect or store personal information about other users without
              their consent
            </ListItem>
            <ListItem>
              Upload or share any content that is defamatory, obscene,
              threatening, hateful or otherwise objectionable
            </ListItem>
          </ul>
          <p>
            We reserve the right to restrict or terminate your access to the
            website if we determine that you have violated these Terms.
          </p>
        </Section>

        <Section id="intellectual-property" title="4. Intellectual Property">
          <p>
            All content on this website — including text, graphics, logos,
            images, photographs, videos, audio, data, software and code — is
            the property of MSA or its content providers and is protected by
            copyright, trademark and other intellectual property laws.
          </p>
          <p>
            You may view, download and print pages from the website for your
            personal, non-commercial use, provided you:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>
              Do not modify or republish the content
            </ListItem>
            <ListItem>
              Do not use the content for commercial purposes without our written
              permission
            </ListItem>
            <ListItem>
              Acknowledge MSA as the source of the content
            </ListItem>
          </ul>
          <p>
            The MSA name, logo and related marks are our intellectual property.
            You may not use them without our prior written permission.
          </p>
          <p>
            If you believe any content on our website infringes your copyright
            or other intellectual property rights, please contact us using the
            details at the end of these Terms.
          </p>
        </Section>

        <Section id="user-content" title="5. User Submissions">
          <p>
            When you submit information to us — for example, through the
            contact form, volunteer applications, partnership enquiries or
            program participation — you are responsible for ensuring it is
            accurate, lawful and does not infringe the rights of any third
            party.
          </p>
          <p>
            By submitting content to us, you grant MSA a non-exclusive,
            worldwide, royalty-free licence to use, reproduce, modify, adapt,
            publish, translate and distribute that content in connection with
            our mission and programs.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights
            to any content you submit, and that our use of that content will
            not violate any third-party rights.
          </p>
        </Section>

        <Section id="third-party" title="6. Third-Party Links">
          <p>
            Our website may contain links to third-party websites and services
            that are not owned or controlled by MSA. We provide these links
            for your convenience and do not endorse the content, products or
            services of these third parties.
          </p>
          <p>
            We have no control over, and assume no responsibility for, the
            content, privacy policies or practices of any third-party
            websites. We encourage you to review the terms and privacy policies
            of any third-party sites you visit.
          </p>
        </Section>

        <Section id="disclaimer" title="7. Disclaimer">
          <p>
            The information on this website is provided on an &ldquo;as is&rdquo;
            and &ldquo;as available&rdquo; basis. While we strive to keep the
            information accurate and up to date, we make no warranties or
            representations of any kind, express or implied, about the
            completeness, accuracy, reliability, suitability or availability
            of the website or the information, products, services or related
            graphics contained on the website.
          </p>
          <p>
            Any reliance you place on such information is strictly at your own
            risk. In no event will we be liable for any loss or damage arising
            from the use of this website.
          </p>
          <p>
            Nothing on this website constitutes professional, legal, medical or
            financial advice. If you require such advice, please consult a
            qualified professional.
          </p>
        </Section>

        <Section id="limitation" title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, MSA, its officers,
            directors, employees, volunteers, partners and agents shall not be
            liable for any indirect, incidental, special, consequential or
            punitive damages, including without limitation loss of profits,
            data, use, goodwill or other intangible losses, resulting from:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>
              Your access to, use of, or inability to access or use the website
            </ListItem>
            <ListItem>
              Any conduct or content of any third party on the website
            </ListItem>
            <ListItem>
              Any content obtained from the website
            </ListItem>
            <ListItem>
              Unauthorised access, use or alteration of your transmissions or
              content
            </ListItem>
          </ul>
          <p>
            Where liability cannot be excluded, our total liability to you is
            limited to the amount you have paid to MSA in the twelve months
            preceding the claim (if any).
          </p>
        </Section>

        <Section id="indemnification" title="9. Indemnification">
          <p>
            You agree to indemnify, defend and hold harmless MSA and its
            officers, directors, employees, volunteers, partners and agents
            from and against any and all claims, damages, obligations, losses,
            liabilities, costs or debt, and expenses (including legal fees)
            arising from:
          </p>
          <ul className="space-y-2 my-4">
            <ListItem>Your use of and access to the website</ListItem>
            <ListItem>Your violation of any term of these Terms</ListItem>
            <ListItem>
              Your violation of any third-party right, including without
              limitation any copyright, property or privacy right
            </ListItem>
            <ListItem>
              Any claim that your content caused damage to a third party
            </ListItem>
          </ul>
        </Section>

        <Section id="governing-law" title="10. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the Republic of South Sudan, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Any dispute arising out of or relating to these Terms or your use
            of the website shall be subject to the exclusive jurisdiction of
            the courts of South Sudan.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to These Terms">
          <p>
            We may update these Terms of Use from time to time. When we do, we
            will post the updated version on this page and change the
            &ldquo;Last Updated&rdquo; date at the top. Your continued use of
            the website after any changes constitutes acceptance of the new
            Terms.
          </p>
          <p>
            We encourage you to review these Terms periodically to stay
            informed of any updates.
          </p>
        </Section>

        <Section id="contact" title="12. Contact Us">
          <p>
            If you have any questions about these Terms of Use, please contact
            us:
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

        <LegalFooterNav current="terms" />
      </LegalLayout>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   SHARED COMPONENTS (same as Privacy page)
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