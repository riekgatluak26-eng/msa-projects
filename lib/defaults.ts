// ============================================================
// MISSION FOR SUSTAINABLE ADVANCEMENT (MSA) — DEFAULT CONTENT
// ============================================================

export const homepageDefaults: any = {
  hero: {
    badge: 'Since 2000 • Maridi, South Sudan',
    titleLine1: 'Empowering',
    titleLine2: 'Communities',
    titleLine3: 'for a Sustainable Future',
    subtitle:
      'MSA envisions literate, healthy and well informed communities in South Sudan — through Education, Health, Resilience & Recovery, Governance, Protection and Media.',
    backgroundImage: '/images/msa1.jpeg',
    primaryCtaText: 'Explore Programs',
    primaryCtaLink: '#programs',
    secondaryCtaText: 'Our Story',
    secondaryCtaLink: '#about',
    stats: [
      { value: '15', label: 'Years of Service' },
      { value: '4', label: 'Schools Established' },
      { value: '20000', label: 'Radio Listeners' },
    ],
    heroImage: '/images/msa12.png',
    heroBadge: 'EDUCATION PROGRAM',
    heroCardTitle: 'Maridi High School',
    heroCardText:
      'One secondary school and three community nursery schools, supporting youth and children to attain quality education.',
    floatCard1: { icon: 'fas fa-tower-broadcast', title: '88.9 FM', sub: 'Maridi FM' },
    floatCard2: { icon: 'fas fa-hand-holding-heart', title: '20+ Monthly', sub: 'GBV Cases Supported' },
  },
  about: {
    eyebrow: 'About MSA',
    title: 'Building a Literate, Healthy &',
    titleAccent: 'Well-Informed',
    titleEnd: 'South Sudan',
    paragraph1:
      'MSA (Mission for Sustainable Advancement) is a legally registered National Organisation operating in South Sudan. MSA began in 2000 operating as Maridi Students Association, transformed into Maridi Service Agency in 2005, and in 2021 — due to expansion across sectors — became Mission For Sustainable Advancement, maintaining its brand name MSA.',
    paragraph2:
      'Through intense capacity building from external partners, MSA now operates with strengthened Governance, Management, Financial Management, Service Delivery and Human Resource Management — guided by functional financial, personnel, editorial, governance, volunteers and appraisal policies.',
    missionTitle: 'Our Mission',
    missionText:
      'Empowering communities and Local Governments in South Sudan through Education, Health, Resilience and Recovery, Governance, Protection and media Programs for a sustainable future.',
    visionTitle: 'Our Vision',
    visionText:
      'MSA envisions literate, healthy and well informed communities in South Sudan.',
    quote:
      'To be professional in our actions, at all times, to our clients, partners and each other.',
    quoteAuthor: 'MSA Guiding Principle',
    image: '/images/msa3.jpeg',
  },
  values: {
    eyebrow: 'Core Values',
    title: 'Our',
    titleAccent: 'Guiding Principles',
    subtitle: 'The values that guide every action, decision and partnership at MSA.',
    items: [
      { icon: 'fas fa-user-tie', color: 'brand', title: 'Professionalism', text: 'Professional in our actions at all times, to our clients, partners and each other.' },
      { icon: 'fas fa-bolt', color: 'navy', title: 'Responsive', text: 'In-depth understanding of the changing needs of the communities we serve.' },
      { icon: 'fas fa-handshake', color: 'gold', title: 'Respectful', text: 'Non-discriminatory services and solutions for the benefit of all people.' },
      { icon: 'fas fa-user-check', color: 'red', title: 'Individualised Support', text: 'Understanding individual needs and creating support that is right for their development.' },
      { icon: 'fas fa-globe', color: 'purple', title: 'Diversity', text: 'Honouring the choices of people from diverse backgrounds.' },
      { icon: 'fas fa-clipboard-check', color: 'cyan', title: 'Accountability', text: 'Highest level of integrity in administrative, service and outreach activities.' },
      { icon: 'fas fa-rocket', color: 'indigo', title: 'Modern Approach', text: 'Excellent, high quality, state-of-the-art approaches for all communities.' },
      { icon: 'fas fa-people-arrows', color: 'emerald', title: 'Partnerships', text: 'Working with a wide variety of partners and advocating for quality service provision.' },
    ],
  },
  impact: {
    eyebrow: 'Our Impact',
    title: 'Making a Difference Across South Sudan',
    subtitle: 'Measurable results from over two decades of community service and partnership.',
    stats: [
      { icon: 'fas fa-calendar-alt', value: '15', label: 'Years of Existence' },
      { icon: 'fas fa-school', value: '4', label: 'Schools Established' },
      { icon: 'fas fa-tower-broadcast', value: '88.9', label: 'Maridi FM Radio', static: true },
      { icon: 'fas fa-headphones', value: '20000', label: 'Radio Listeners' },
      { icon: 'fas fa-shield-halved', value: '20', label: 'GBV Cases / Month' },
      { icon: 'fas fa-children', value: '17', label: 'Children Reunified' },
    ],
    directTitle: 'Direct Beneficiaries',
    directTags: ['Women', 'Children', 'Youth (In & Out of School)', 'School Girls', 'Local Authorities', 'Community Leaders'],
    indirectTitle: 'Indirect Beneficiaries',
    indirectTags: ['CSO Employees', 'Partner Organisations', 'Wider Community', 'Host Communities'],
  },
  programs: {
    eyebrow: 'What We Do',
    title: 'Our',
    titleAccent: 'Programs',
    subtitle: 'Comprehensive initiatives designed to uplift communities and build a stronger, more united South Sudan.',
    items: [
      {
        id: 'education',
        image: '/images/msa4.jpeg',
        tag: 'Flagship',
        tagColor: 'navy',
        icon: 'fas fa-graduation-cap',
        title: 'Education',
        text: 'Capacity building for teachers and PTAs, establishment and management of schools, distribution of educational materials, sponsorships and promotion of female child education.',
        features: ['1 Secondary & 3 Nursery Schools', "Girls' Scholarships (4 years)", 'Teacher & PTA Training'],
        link: '/education',
      },
      {
        id: 'health',
        image: '/images/msa10.jpeg',
        tag: 'Essential',
        tagColor: 'red',
        icon: 'fas fa-heartbeat',
        title: 'Health',
        text: 'Primary Health Care services, Sexual Reproductive Health, Nutritional Programs and comprehensive HIV/AIDS programs including VCT services since 2013.',
        features: ['Youth-Friendly VCT Centre', 'HIV/AIDS Awareness Clubs', 'Condom Distribution & SRH'],
        link: '/programs#health',
      },
      {
        id: 'resilience',
        image: '/images/msa1.jpeg',
        tag: 'Growth',
        tagColor: 'green',
        icon: 'fas fa-seedling',
        title: 'Resilience & Recovery',
        text: 'Food Security Programs, Economic Recovery Programs, and Skills/Vocational trainings for youth and women — including computer, tailoring, mechanics and driving skills.',
        features: ['Computer & Technical Skills', "Women's Business Start-up Capital", 'Youth Agriculture Support'],
        link: '/programs#resilience',
      },
      {
        id: 'governance',
        image: '/images/msa11.jpeg',
        tag: 'Core',
        tagColor: 'blue',
        icon: 'fas fa-balance-scale',
        title: 'Governance',
        text: 'Democracy and democratization, Rule of Law, Peace Building and Community Security Programs — strengthening local governance and civic participation.',
        features: ['Rule of Law Promotion', 'Peace Building Dialogues', 'Community Security Programs'],
        link: '/programs#governance',
      },
      {
        id: 'protection',
        image: '/images/msa9.jpeg',
        tag: 'Priority',
        tagColor: 'purple',
        icon: 'fas fa-shield-halved',
        title: 'Protection',
        text: 'Child Protection — prevention, response, child-friendly services, coordination. Gender Program — GBV, legal systems, capacity building, psychosocial support.',
        features: ['Special Protection Unit (Police)', 'Child Reunification & Advocacy', 'Psychosocial Support & Counselling'],
        link: '/programs#protection',
      },
      {
        id: 'media',
        image: '/images/msa8.jpeg',
        tag: 'Unique',
        tagColor: 'gold',
        icon: 'fas fa-tower-broadcast',
        title: 'Information & Media',
        text: 'Establishment of Community FM radios, strengthening capacity of media houses, publication and awareness — including Maridi FM 88.9, the only privately operated community radio in the state.',
        features: ['Maridi FM 88.9 Community Radio', 'Media House Capacity Strengthening', 'Policy Advocacy & Awareness'],
        link: '/programs#media',
      },
    ],
  },
  featured: {
    eyebrow: 'Featured Initiative',
    title: 'Promoting',
    titleAccent: 'Girl Child',
    titleEnd: 'Education',
    text: 'MSA carries out massive community education awareness programs to promote education in the areas of our operation. In 2018, we conducted an in-school awareness campaign using women role models to talk to girls about the importance of education and the dangers of early marriage and unwanted pregnancy — under the theme "Girls Decide Today and Save Your Future."',
    steps: [
      { color: 'brand', title: 'In-School Awareness Campaigns', text: 'Women role models engage school girls on education, early marriage and pregnancy prevention.' },
      { color: 'navy', title: 'National Girls Education Day', text: "MSA supports Government-led celebrations to amplify awareness on girls' education." },
      { color: 'gold', title: '4-Year Scholarships for Girls', text: 'Full tuition, scholastic materials, uniforms and requirements — Senior One to Senior Four.' },
    ],
    ctaText: "Support a Girl's Education",
    ctaLink: '/contact',
    image: '/images/msa6.jpeg',
    imageCaption: 'Girls Decide Today',
    imageSubcaption: 'Save Your Future — MSA Campaign',
  },
  achievements: {
    eyebrow: 'Key Achievements',
    title: 'Our',
    titleAccent: 'Track Record',
    subtitle: 'Milestones from the last five years across our programme areas.',
    items: [
      { color: 'brand', icon: 'fas fa-graduation-cap', title: 'Education', points: ['Established Maridi High School (mixed secondary)', '2 community Nursery Schools for IDPs', "Girls' scholarships (S1–S4)", 'National Girls Education Day support'] },
      { color: 'red', icon: 'fas fa-heartbeat', title: 'HIV/AIDS & SRH', points: ['VCT services since 2013 (youth-friendly)', 'School HIV/AIDS & SRHR clubs', 'Condom distribution at youth centres', 'Referrals to ART clinic'] },
      { color: 'purple', icon: 'fas fa-shield-halved', title: 'Child Protection', points: ['17 LRA abducted children reunified', 'Trained child protection committees', 'Police trained on Child Act 2008', 'Pre-school for displaced children'] },
      { color: 'pink', icon: 'fas fa-venus', title: 'Gender & GBV', points: ['Special Protection Unit at Maridi Police', '~20 GBV cases supported monthly', 'Radio awareness reaching 20,000+', 'Advocacy for 1st class judge (2017)'] },
      { color: 'green', icon: 'fas fa-hands-holding-child', title: 'Livelihoods', points: ['Computer skills training for youth', 'Tailoring, mechanics & driving', "Women's business start-up capital", 'Youth agriculture & sports programs'] },
      { color: 'gold', icon: 'fas fa-tower-broadcast', title: 'Information & Media', points: ['Maridi FM 88.9 established', 'Only privately operated community radio', 'Policy advocacy & sensitisation', 'Media house capacity strengthening'] },
    ],
  },
  news: {
    eyebrow: 'News & Media',
    title: 'Stories of',
    titleAccent: 'Progress',
    subtitle: 'Campaigns, press releases, media coverage and impact stories from across South Sudan.',
    articles: [],
    viewAllText: 'View All News',
    viewAllLink: '/news',
  },
  newsletter: {
    title: 'Never miss an update',
    subtitle: 'Get programme news, press releases and impact stories straight to your inbox.',
    placeholder: 'you@example.com',
    buttonText: 'Subscribe',
  },
    partners: {
    title: 'Our Partners & Collaborators',
    items: [
      { logo: '', icon: 'fas fa-hands-holding-circle', label: 'Oxfam Novib' },
      { logo: '', icon: 'fas fa-landmark', label: 'Ministry of Education' },
      { logo: '', icon: 'fas fa-shield-halved', label: 'Maridi Police' },
      { logo: '', icon: 'fas fa-broadcast-tower', label: 'Maridi FM 88.9' },
      { logo: '', icon: 'fas fa-hospital', label: 'Maridi Hospital' },
      { logo: '', icon: 'fas fa-school', label: 'Maridi High School' },
      { logo: '', icon: 'fas fa-users', label: 'Community Leaders' },
      { logo: '', icon: 'fas fa-globe', label: 'International Donors' },
    ],
  },
  cta: {
    title: 'Become a Partner Today',
    text: 'Join us in building a literate, healthy and well-informed South Sudan. Together, we create lasting change.',
    button1Text: 'Volunteer With Us',
    button1Link: '/contact',
    button2Text: 'Support Our Cause',
    button2Link: '/contact',
    backgroundImage: '/images/msa4.jpeg',
  },
  contact: {
    eyebrow: 'Get In Touch',
    title: 'Contact',
    titleAccent: 'Us',
    subtitle: "Ready to make a difference? Reach out and join the movement for a better South Sudan.",
    headOfficeTitle: 'Head Office',
    headOfficeText: 'Juba, South Sudan',
    fieldOfficesTitle: 'Field Offices',
    fieldOfficesText: 'Maridi • Aweil • Yei',
    phoneTitle: 'Phone',
    phone: '+211 925 784 075',
    phoneLink: 'tel:+211925784075',
    emailTitle: 'Email',
    email: 'info@msasouthsudan.org',
    emailLink: 'mailto:info@msasouthsudan.org',
    hoursTitle: 'Office Hours',
    hoursText: 'Mon – Fri, 8:00 – 17:00',
    socials: [
      { icon: 'fab fa-facebook-f', label: 'Facebook', url: '#' },
      { icon: 'fab fa-instagram', label: 'Instagram', url: '#' },
      { icon: 'fab fa-x-twitter', label: 'X', url: '#' },
      { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: '#' },
      { icon: 'fab fa-youtube', label: 'YouTube', url: '#' },
    ],
    form: {
      title: 'Send a Message',
      subtitle: "Fill out the form below and we'll get back to you shortly.",
      firstNameLabel: 'First Name',
      lastNameLabel: 'Last Name',
      emailLabel: 'Email Address',
      interestLabel: "I'm interested in",
      interestOptions: ['Volunteering', 'Partnership', 'Donation', 'Education Programs', 'Health Programs', 'Protection & GBV', 'Media & Communications', 'Other'],
      messageLabel: 'Your Message',
      messagePlaceholder: "Tell us how you'd like to contribute...",
      submitText: 'Send Message',
      successTitle: 'Message sent successfully!',
      successText: "We'll get back to you soon.",
      web3formsKey: 'YOUR_WEB3FORMS_KEY_HERE',
    },
  },
};

export const settingsDefaults: any = {
  account: { username: 'sustainable', passwordHash: '' },
  site: {
    name: 'Mission for Sustainable Advancement',
    shortName: 'MSA',
    tagline: 'Empowering Communities',
    description:
      'MSA — Empowering communities and Local Governments in South Sudan through Education, Health, Resilience and Recovery, Governance, Protection and Media programmes for a sustainable future.',
    logo: '/images/msalogo.jpeg',
    favicon: '/favicon.ico',
    contactEmail: 'info@msasouthsudan.org',
    phone: '+211 925 784 075',
    whatsapp: '+211 925 784 075',
    address: 'Juba, South Sudan',
    registration: 'Registered National NGO, South Sudan',
  },
  header: {
    logo: '/images/msalogo.jpeg',
    brandName: 'Mission for Sustainable',
    brandTagline: 'Advancement • South Sudan',
    tagline: 'Empowering Communities',
    ctaText: 'Partner With Us',
    ctaLink: '/contact',
    topBarPhone: '+211 925 784 075',
    topBarEmail: 'info@msasouthsudan.org',
    topBarAddress: 'Maridi Head Office, Western Equatoria State',
    topBarLinks: [
      { label: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
      { label: 'Instagram', icon: 'fab fa-instagram', href: '#' },
      { label: 'X', icon: 'fab fa-x-twitter', href: '#' },
      { label: 'WhatsApp', icon: 'fab fa-whatsapp', href: '#' },
      { label: 'YouTube', icon: 'fab fa-youtube', href: '#' },
    ],
    navLinks: [
      { label: 'Home', href: '/' },
      {
        label: 'About',
        href: '/about',
        children: [
          { label: 'Who We Are', href: '/about#who' },
          { label: 'Mission & Vision', href: '/about#mission' },
          { label: 'Core Values', href: '/about#values' },
          { label: 'Our Capacity', href: '/about#capacity' },
        ],
      },
      {
        label: 'Programs',
        href: '/programs',
        children: [
          { label: 'Education', href: '/education' },
          { label: 'Health', href: '/programs#health' },
          { label: 'Resilience & Recovery', href: '/programs#resilience' },
          { label: 'Governance', href: '/programs#governance' },
          { label: 'Protection', href: '/programs#protection' },
          { label: 'Information & Media', href: '/programs#media' },
        ],
      },
      { label: 'Impact', href: '/impact' },
      { label: 'News', href: '/news' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  footer: {
    aboutText:
      'A legally registered National Organisation empowering communities and Local Governments in South Sudan through Education, Health, Resilience & Recovery, Governance, Protection and Media programs — for a sustainable future.',
    trustBadges: [
      { icon: 'fas fa-shield-halved', text: 'Registered NGO' },
      { icon: 'fas fa-calendar-check', text: 'Since 2000' },
      { icon: 'fas fa-handshake', text: 'Oxfam Novib Partner' },
    ],
    newsletterTitle: 'Stay connected',
    newsletterSubtitle:
      'Get impact stories, programme updates and partnership opportunities straight to your inbox.',
    officeLocations: [
      { label: 'Head Office', city: 'Juba', accent: 'gold' },
      { label: 'Field Office', city: 'Maridi', accent: 'brand' },
      { label: 'Field Office', city: 'Aweil', accent: 'brand' },
      { label: 'Field Office', city: 'Yei', accent: 'brand' },
    ],
    columns: [
      {
        title: 'Quick Links',
        accent: 'brand',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Core Values', href: '/about#values' },
          { label: 'Our Impact', href: '/impact' },
          { label: 'News & Media', href: '/news' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
      {
        title: 'Our Programs',
        accent: 'gold',
        links: [
          { icon: 'fas fa-graduation-cap', label: 'Education', href: '/education', highlight: true },
          { icon: 'fas fa-heartbeat', label: 'Health', href: '/programs#health' },
          { icon: 'fas fa-seedling', label: 'Resilience & Recovery', href: '/programs#resilience' },
          { icon: 'fas fa-balance-scale', label: 'Governance', href: '/programs#governance' },
          { icon: 'fas fa-shield-halved', label: 'Protection', href: '/programs#protection' },
          { icon: 'fas fa-tower-broadcast', label: 'Information & Media', href: '/programs#media' },
        ],
      },
      {
        title: 'Get Involved',
        accent: 'navy',
        links: [
          { icon: 'fas fa-hand-holding-heart', label: 'Donate', href: '/contact' },
          { icon: 'fas fa-hands-helping', label: 'Volunteer', href: '/contact' },
          { icon: 'fas fa-handshake', label: 'Become a Partner', href: '/contact' },
          { icon: 'fas fa-briefcase', label: 'Careers', href: '/contact' },
          { icon: 'fas fa-file-lines', label: 'Reports & Policies', href: '/contact' },
          { icon: 'fas fa-newspaper', label: 'Press Releases', href: '/news' },
        ],
      },
    ],
    contactTitle: 'Contact Us',
    contactAccent: 'red',
    contacts: [
      { label: 'Head Office', value: 'Juba, South Sudan', icon: 'fas fa-map-marker-alt', accent: 'brand' },
      { label: 'Field Offices', value: 'Maridi • Aweil • Yei', icon: 'fas fa-building', accent: 'gold' },
      { label: 'Phone', value: '+211 925 784 075', href: 'tel:+211925784075', icon: 'fas fa-phone', accent: 'brand' },
      { label: 'Email', value: 'info@msasouthsudan.org', href: 'mailto:info@msasouthsudan.org', icon: 'fas fa-envelope', accent: 'brand' },
      { label: 'Office Hours', value: 'Mon – Fri, 8:00 – 17:00', icon: 'fas fa-clock', accent: 'brand' },
    ],
    socialLinks: [
      { icon: 'fab fa-facebook-f', label: 'Facebook', url: '#', color: 'brand' },
      { icon: 'fab fa-instagram', label: 'Instagram', url: '#', color: 'pink' },
      { icon: 'fab fa-x-twitter', label: 'X (Twitter)', url: '#', color: 'blue' },
      { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: '#', color: 'green' },
      { icon: 'fab fa-youtube', label: 'YouTube', url: '#', color: 'red' },
      { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: '#', color: 'blue' },
    ],
    copyrightText: 'Mission for Sustainable Advancement (MSA). All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Safeguarding', href: '#' },
    ],
    legalText:
      'MSA is a legally registered National Organisation operating in South Sudan. Field offices: Maridi, Aweil & Yei. Head office: Juba, South Sudan.',
  },
};

// ============================================================
// ABOUT PAGE — DEFAULT CONTENT
// ============================================================
export const aboutDefaults: any = {
  hero: {
    badge: 'Since 2000 • Maridi, South Sudan',
    titleLine1: 'Our Story,',
    titleLine2: 'Our Mission,',
    titleLine3: 'Our People',
    subtitle:
      'From a small students association in Maridi to a national organization serving communities across South Sudan.',
    backgroundImage: '/images/msa1.jpeg',
    stats: [
      { value: '2000', label: 'Founded', static: true },
      { value: '15', label: 'Years of Service' },
      { value: '4', label: 'Offices Nationwide' },
      { value: '20000', label: 'Lives Touched' },
    ],
  },

  who: {
    eyebrow: 'Who We Are',
    title: 'A Journey of',
    titleAccent: 'Growth & Purpose',
    titleEnd: 'Since 2000',
    paragraph1:
      'MSA (Mission for Sustainable Advancement) is a legally registered National Organisation operating in South Sudan. Our story began in 2000 as the Maridi Students Association — a grassroots initiative of young people determined to give back to their community through education.',
    paragraph2:
      'In 2005, as our reach expanded beyond schools into health, protection and community resilience, we transformed into the Maridi Service Agency. Over the next decade, we built trust with local authorities, schools, hospitals and community leaders across Western Equatoria and beyond.',
    paragraph3:
      'In 2021, reflecting our growth into a multi-sector national organisation, we became the Mission for Sustainable Advancement — keeping the MSA name that communities had come to know and trust. Today we operate from a Head Office in Juba and field offices in Maridi, Aweil and Yei, serving thousands of beneficiaries every year.',
    image: '/images/msa3.jpeg',
    imageCaption: 'Maridi, South Sudan',
    imageSubcaption: 'Where the story began',
  },

  journey: {
    eyebrow: 'Our Journey',
    title: 'Milestones That',
    titleAccent: 'Shaped Us',
    subtitle: 'Three chapters in our story so far — each one built on the last.',
    milestones: [
      {
        year: '2000',
        title: 'Maridi Students Association',
        text: 'Founded by students in Maridi County who wanted to improve access to education for children and youth in their community.',
      },
      {
        year: '2005',
        title: 'Maridi Service Agency',
        text: 'Broadened our mandate beyond education to include health, community resilience and protection as needs on the ground evolved.',
      },
      {
        year: '2013',
        title: 'VCT & HIV/AIDS Programme',
        text: 'Launched Youth-Friendly VCT services and school HIV/AIDS awareness clubs — the beginning of our dedicated Health portfolio.',
      },
      {
        year: '2021',
        title: 'Mission for Sustainable Advancement',
        text: 'Renamed to reflect our expanded national footprint and multi-sector mandate, while preserving the trusted MSA brand.',
      },
      {
        year: 'Today',
        title: 'National Reach',
        text: 'Operating from Juba with field offices in Maridi, Aweil and Yei — delivering programmes across six thematic areas.',
      },
    ],
  },

  mission: {
    eyebrow: 'Mission & Vision',
    title: 'What Drives',
    titleAccent: 'Our Work',
    subtitle: 'Two anchors that guide every decision we make and every programme we deliver.',
    missionTitle: 'Our Mission',
    missionText:
      'Empowering communities and Local Governments in South Sudan through Education, Health, Resilience and Recovery, Governance, Protection and media Programs for a sustainable future.',
    visionTitle: 'Our Vision',
    visionText:
      'MSA envisions literate, healthy and well informed communities in South Sudan.',
    quote:
      'To be professional in our actions, at all times, to our clients, partners and each other.',
    quoteAuthor: 'MSA Guiding Principle',
  },

  values: {
    eyebrow: 'Core Values',
    title: 'The Principles That',
    titleAccent: 'Guide Us',
    subtitle: 'Eight commitments we make to every community, partner and colleague we work with.',
    items: [
      { icon: 'fas fa-user-tie', color: 'brand', title: 'Professionalism', text: 'Professional in our actions at all times, to our clients, partners and each other.' },
      { icon: 'fas fa-bolt', color: 'navy', title: 'Responsive', text: 'In-depth understanding of the changing needs of the communities we serve.' },
      { icon: 'fas fa-handshake', color: 'gold', title: 'Respectful', text: 'Non-discriminatory services and solutions for the benefit of all people.' },
      { icon: 'fas fa-user-check', color: 'red', title: 'Individualised Support', text: 'Understanding individual needs and creating support that is right for their development.' },
      { icon: 'fas fa-globe', color: 'purple', title: 'Diversity', text: 'Honouring the choices of people from diverse backgrounds.' },
      { icon: 'fas fa-clipboard-check', color: 'cyan', title: 'Accountability', text: 'Highest level of integrity in administrative, service and outreach activities.' },
      { icon: 'fas fa-rocket', color: 'indigo', title: 'Modern Approach', text: 'Excellent, high quality, state-of-the-art approaches for all communities.' },
      { icon: 'fas fa-people-arrows', color: 'emerald', title: 'Partnerships', text: 'Working with a wide variety of partners and advocating for quality service provision.' },
    ],
  },

  capacity: {
    eyebrow: 'Our Capacity',
    title: 'Built for',
    titleAccent: 'Impact',
    subtitle:
      'Through intense capacity building from our partners, MSA operates with strengthened systems across every area of our organisation — guided by functional policies.',
    items: [
      {
        icon: 'fas fa-balance-scale',
        color: 'brand',
        title: 'Governance',
        text: 'A functioning board and clear governance policies that keep MSA accountable to the communities we serve and to our partners.',
      },
      {
        icon: 'fas fa-users-cog',
        color: 'navy',
        title: 'Management',
        text: 'Experienced leadership with clear reporting lines, structured planning cycles and results-based management systems.',
      },
      {
        icon: 'fas fa-coins',
        color: 'gold',
        title: 'Financial Management',
        text: 'Robust financial controls, audited accounts and full compliance with donor requirements — money goes where it is needed.',
      },
      {
        icon: 'fas fa-concierge-bell',
        color: 'red',
        title: 'Service Delivery',
        text: 'Field-tested delivery mechanisms, community feedback loops and a track record of reaching the hardest-to-reach populations.',
      },
      {
        icon: 'fas fa-user-tie',
        color: 'purple',
        title: 'Human Resources',
        text: 'Trained staff, clear HR policies, volunteer management and continuous professional development for every team member.',
      },
      {
        icon: 'fas fa-file-contract',
        color: 'cyan',
        title: 'Policies & Compliance',
        text: 'Functional financial, personnel, editorial, governance, volunteers and appraisal policies — documented and applied.',
      },
    ],
  },

  cta: {
    title: 'Be Part of the Next Chapter',
    text: 'Whether you want to partner with us, volunteer your skills or support our work — there is a place for you at MSA.',
    button1Text: 'Work With Us',
    button1Link: '/contact',
    button2Text: 'Explore Programs',
    button2Link: '/programs',
    backgroundImage: '/images/msa4.jpeg',
  },
};

// ============================================================
// EDUCATION PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const educationDefaults: any = {
  hero: {
    image: '/images/msa3.jpeg',
    badge: 'MSA EDUCATION PROGRAM',
    imageCaption: 'From nursery to secondary — building a literate South Sudan, one child at a time.',
    sideStats: [
      { value: '4', label: 'Schools' },
      { value: '50', label: 'Girls' },
      { value: '4Y', label: 'Sponsorship' },
    ],
    titleLine1: 'Eradicating',
    titleLine2: 'Illiteracy',
    titleLine3: 'in South Sudan',
    subtitle:
      "MSA establishes and manages schools, supports teacher trainings, distributes educational materials, and promotes female child education — building a literate, healthy and well-informed nation.",
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Support a Girl',
    secondaryCtaLink: '#support',
    stats: [
      { value: '4', label: 'Schools' },
      { value: '50', label: 'Girls Sponsored' },
      { value: '4', label: 'Yrs Scholarship', suffix: ' Yrs', static: true },
    ],
  },

  overview: {
    eyebrow: 'Education Program',
    title: 'Building a',
    titleAccent: 'Literate',
    titleEnd: 'Nation',
    subtitle:
      'Education is the cornerstone of everything MSA does. We believe that a literate community is a healthy, informed and prosperous one — and that every child, regardless of circumstance, deserves access to quality learning.',
    cards: [
      {
        icon: 'fas fa-school',
        color: 'brand',
        title: 'Schools We Manage',
        text: 'One mixed secondary school and three community nursery schools — serving displaced and host communities across Maridi County.',
      },
      {
        icon: 'fas fa-user-graduate',
        color: 'navy',
        title: 'Girls We Sponsor',
        text: 'Full 4-year secondary school scholarships — covering tuition, materials, uniforms and all requirements from Senior One to Senior Four.',
      },
      {
        icon: 'fas fa-chalkboard-user',
        color: 'gold',
        title: 'Teachers We Train',
        text: 'Capacity building for teachers and Parent-Teacher Associations (PTAs) to strengthen the quality of education delivered in schools.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Education',
    titleAccent: 'Activities',
    subtitle:
      "Six core focus areas that define MSA's work in education — each one designed to break down the barriers that keep children out of school across South Sudan.",
    items: [
      {
        number: '01',
        icon: 'fas fa-school',
        color: 'brand',
        title: 'Establishment and Management of Schools',
        badge: 'Core',
        text: 'MSA runs and manages one secondary school and three community nursery schools, supporting youth and children to attain quality education. We established Maridi High School — a mixed secondary school in Maridi County — and established community Nursery Schools in areas where IDPs have densely settled. These schools help children of the displaced and host communities to get educated and have hope for the future.',
        features: ['Maridi High School', 'Community Nursery Schools', 'IDP Settlements'],
        wide: true,
      },
      {
        number: '02',
        icon: 'fas fa-chalkboard-user',
        color: 'navy',
        title: 'Capacity Building to Teachers & PTAs',
        badge: '',
        text: 'We invest in the people who deliver education. MSA conducts capacity building programs for teachers and Parent-Teacher Associations (PTAs) in schools.',
        features: ['Pedagogy & classroom management', 'Child safeguarding practices', 'Community engagement skills'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-boxes-stacked',
        color: 'gold',
        title: 'Distribution of Educational Materials',
        badge: '',
        text: 'MSA distributes educational materials and facilities to schools and students — reducing the barriers to quality education.',
        features: ['Textbooks', 'Stationery', 'Desks', 'Facilities'],
        wide: false,
      },
      {
        number: '04',
        icon: 'fas fa-bullhorn',
        color: 'red',
        title: 'Awareness, Creation and Sensitisation',
        badge: 'Advocacy',
        text: 'MSA carries out massive community education awareness programs in an effort to promote education in the areas of our operation. We carry both in-school and out-of-school awareness programs targeting girls and their communities. In 2018, MSA massively conducted an in-school awareness campaign using women role models to talk to girls about the importance of education and the dangers of early marriage and unwanted pregnancy.',
        quote: '"Girls Decide Today and Save Your Future."',
        features: [],
        wide: true,
      },
      {
        number: '05',
        icon: 'fas fa-award',
        color: 'purple',
        title: 'Sponsorships',
        badge: 'Life-changing',
        text: 'MSA provides scholarships to girls in Secondary Schools and vulnerable children in primary schools. We pay all their tuition fees, provide scholastic materials, uniforms and other requirements for the girls and children under MSA scholarship. Our scholarship runs for 4 years for Secondary School girls — from Senior One to Senior Four — ensuring sustained support through the full secondary cycle.',
        features: ['Tuition Fees', 'Scholastic Materials', 'Uniforms', 'All Requirements'],
        wide: true,
      },
      {
        number: '06',
        icon: 'fas fa-female',
        color: 'pink',
        title: 'Promotion of Female Child Education',
        badge: 'Flagship',
        text: "Promoting the girl child is central to MSA's education mission. We run girls' education programs that combine:",
        features: [
          'In-school awareness campaigns with women role models',
          'Out-of-school community sensitisation',
          'Full 4-year secondary school scholarships for girls',
          "Support to Government-led Girls' Education Days",
          'Monthly advisory meetings on sex education & pregnancy prevention',
          '"Sports for Girls" programs for confidence & leadership',
        ],
        wide: true,
      },
    ],
    footerText: 'Every activity above is delivered hand-in-hand with communities, local authorities and partners — because sustainable change is built together.',
    ctaText: 'Support Our Education Work',
    ctaLink: '#support',
  },

  girlFeature: {
    eyebrow: 'Flagship Focus',
    title: 'Every Girl Deserves',
    titleAccent: 'A Future',
    subtitle:
      'MSA is widely recognised for its relentless promotion of female child education. Through community sensitisation, women role models, and full scholarships, we are breaking down the barriers that keep girls out of school.',
    paragraph2:
      'We work with communities, local authorities, families and the girls themselves — because lasting change happens when everyone is involved. From Senior One to Senior Four, our scholars receive everything they need to succeed.',
    image: '/images/msa4.jpeg',
    imageBadge: 'GIRL CHILD EDUCATION',
    imageCaption: 'Girls Decide Today',
    imageSubcaption: 'Save Your Future — MSA Campaign Theme',
    floatCard1: { icon: 'fas fa-female', title: '4 Years', sub: 'Full Scholarship' },
    floatCard2: { icon: 'fas fa-heart', title: 'All Inclusive', sub: 'Fees, uniforms & more' },
    benefits: [
      { icon: 'fas fa-user-graduate', color: 'pink', title: 'Scholarships for Girls', text: 'Full tuition, materials, uniforms and requirements.' },
      { icon: 'fas fa-chalkboard-user', color: 'navy', title: 'Women Role Models', text: 'Inspiring girls through direct conversations and mentorship.' },
      { icon: 'fas fa-futbol', color: 'gold', title: '"Sports for Girls" Programs', text: 'Building confidence, health and leadership through sport.' },
    ],
    ctaText: 'Sponsor a Girl Today',
    ctaLink: '#support',
  },

  schools: {
    eyebrow: 'Schools We Manage',
    title: 'Places of',
    titleAccent: 'Learning',
    subtitle:
      "MSA's schools serve displaced and host communities — giving children a place to learn, grow and hope.",
    items: [
      {
        image: '/images/msa12.png',
        badge: 'Secondary School',
        badgeColor: 'navy',
        title: 'Maridi High School',
        text: 'A mixed secondary school established and managed by MSA in Maridi County. It offers education to youth from across the county — boys and girls learning side by side — with a strong focus on academic excellence and character formation.',
        stats: [
          { value: '1', label: 'Secondary School' },
          { value: 'Mixed', label: 'Boys & Girls', static: true },
          { value: 'Maridi', label: 'County', static: true },
        ],
      },
      {
        image: '/images/msa2.jpeg',
        badge: 'Nursery Schools',
        badgeColor: 'brand',
        title: 'Community Nursery Schools',
        text: 'Three community nursery schools established by MSA in areas where IDPs have densely settled. These schools help children of the displaced and host communities to get educated and have hope for the future.',
        stats: [
          { value: '3', label: 'Nursery Schools' },
          { value: 'IDPs', label: 'Focused', static: true },
          { value: 'Early', label: 'Childhood', static: true },
        ],
      },
    ],
  },

  gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Learning',
    subtitle:
      "Snapshots from MSA's education programs — classrooms, campaigns, and the everyday moments that build a literate South Sudan.",
    items: [
      { image: '/images/msa12.png', badge: 'Featured', badgeColor: 'gold', title: 'Classrooms full of hope', subtitle: 'Every seat filled is a future rewritten.', size: 'large', span: 2, rows: 2 },
      { image: '/images/msa2.jpeg', badge: 'Nursery', badgeColor: 'brand', title: 'Early beginnings', subtitle: 'Community Nursery Schools', size: 'small' },
      { image: '/images/msa3.jpeg', badge: 'Girls', badgeColor: 'pink', title: 'Girls Decide Today', subtitle: 'Save Your Future campaign', size: 'small' },
      { image: '/images/msa4.jpeg', badge: 'Materials', badgeColor: 'navy', title: 'Tools for learning', subtitle: 'Books, desks & supplies', size: 'small' },
      { image: '/images/msa6.jpeg', badge: 'Teachers', badgeColor: 'gold', title: 'Empowering educators', subtitle: 'Capacity building', size: 'small' },
    ],
    footerText: 'Every photograph tells a story of a child, a teacher, or a community choosing education.',
    ctaText: 'Support a Classroom',
    ctaLink: '#support',
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Deliver Education',
    subtitle: 'A four-step approach that ensures every intervention creates lasting change.',
    steps: [
      { number: '1', color: 'brand', title: 'Assess', text: 'We work with communities to understand the local education needs and barriers — especially for girls and displaced children.' },
      { number: '2', color: 'navy', title: 'Establish', text: 'We establish and manage schools — secondary and nursery — in the places where they are needed most, including IDP settlements.' },
      { number: '3', color: 'gold', title: 'Support', text: 'We provide scholarships, distribute learning materials, and build teacher and PTA capacity — sustaining quality for the long term.' },
      { number: '4', color: 'red', title: 'Advocate', text: "We use radio, community campaigns and role models to promote girls' education and change the attitudes that keep girls out of school." },
    ],
    stats: [
      { icon: 'fas fa-school', color: 'brand', value: '4', label: 'Schools Established' },
      { icon: 'fas fa-user-graduate', color: 'pink', value: '50', label: 'Girls Sponsored' },
      { icon: 'fas fa-calendar-check', color: 'gold', value: '4', label: 'Yrs Scholarship Cycle', suffix: ' Yrs', static: true },
      { icon: 'fas fa-chalkboard-user', color: 'navy', value: 'PTA', label: 'Capacity Building', static: true },
    ],
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories from',
    titleAccent: 'Our Community',
    subtitle: 'What education means to the people MSA serves.',
    items: [
      {
        quote: '"Before MSA came to our community, many of us girls had no hope of continuing school. Now I am in Senior Three and I know I will finish."',
        author: 'MSA Sponsored Scholar',
        role: 'Maridi High School',
        color: 'brand',
      },
      {
        quote: '"The teacher training changed how I teach. My students are more engaged, and the results are visible. MSA invested in us as professionals."',
        author: 'Teacher',
        role: 'Community Nursery School',
        color: 'navy',
      },
      {
        quote: '"My daughter is the first girl in our family to go to secondary school. MSA\'s support has given our whole family hope."',
        author: 'Parent',
        role: 'Maridi County',
        color: 'gold',
      },
    ],
  },

  support: {
    icon: 'fas fa-graduation-cap',
    title: 'Help Us Build a Literate South Sudan',
    text: 'Sponsor a girl, support a school, or partner with us to strengthen education in communities that need it most. Every contribution creates lasting change.',
    button1Text: 'Sponsor a Girl',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-heartbeat', color: 'red', title: 'Health', subtitle: 'PHC, SRH, HIV/AIDS', href: '/health' },
      { icon: 'fas fa-seedling', color: 'green', title: 'Resilience', subtitle: 'Food & economic recovery', href: '/resilience' },
      { icon: 'fas fa-balance-scale', color: 'blue', title: 'Governance', subtitle: 'Democracy & rule of law', href: '/governance' },
      { icon: 'fas fa-shield-halved', color: 'purple', title: 'Protection', subtitle: 'Child & gender protection', href: '/protection' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', title: 'Media', subtitle: 'Community FM & awareness', href: '/media' },
    ],
  },
};

// ============================================================
// HEALTH PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const healthDefaults: any = {
  hero: {
    image: '/images/msa10.jpeg',
    badge: 'MSA HEALTH PROGRAM',
    imageCaption: 'Youth-friendly VCT, HIV/AIDS awareness, and Primary Health Care — serving communities across Maridi and beyond.',
    sideStats: [
      { value: '2013', label: 'VCT Since' },
      { value: '20K+', label: 'Listeners' },
      { value: '100%', label: 'On Treatment' },
    ],
    titleLine1: 'Healthy',
    titleLine2: 'Communities',
    titleLine3: 'in South Sudan',
    subtitle:
      'MSA delivers Primary Health Care, Sexual Reproductive Health, Nutrition and comprehensive HIV/AIDS programs — including Youth-Friendly VCT services since 2013.',
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Get Support',
    secondaryCtaLink: '#support',
    stats: [
      { value: '2013', label: 'VCT Since', static: true },
      { value: '100', label: 'HIV+ on Treatment', suffix: '%', static: true },
      { value: '20', label: 'K+ Radio Reach', static: true },
    ],
  },

  overview: {
    eyebrow: 'Health Program',
    title: 'Caring for the',
    titleAccent: 'Whole Person',
    titleEnd: 'and Community',
    subtitle:
      'Health is at the heart of MSA\'s mission. From Primary Health Care to HIV/AIDS testing and counselling, we work with youth, women, and communities to build a healthier South Sudan — physically, mentally and socially.',
    cards: [
      {
        icon: 'fas fa-heart-pulse',
        color: 'red',
        title: 'Primary Health Care',
        text: 'Community-level health services that reach the most vulnerable — including IDPs and hard-to-reach populations.',
      },
      {
        icon: 'fas fa-venus',
        color: 'purple',
        title: 'Sexual & Reproductive Health',
        text: 'Youth-friendly SRH services, education and referrals that empower young people to make informed choices.',
      },
      {
        icon: 'fas fa-virus',
        color: 'navy',
        title: 'HIV/AIDS Program',
        text: 'Comprehensive HIV services since 2013 — VCT, awareness, referrals to ART clinic and condom distribution.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Health',
    titleAccent: 'Activities',
    subtitle:
      'Five core program areas that define MSA\'s work in health — delivered hand-in-hand with communities, youth and partners.',
    items: [
      {
        number: '01',
        icon: 'fas fa-bullhorn',
        color: 'red',
        title: 'Advocacy, Lobbying & Research',
        badge: 'Enabling',
        text: 'We advocate for better health policies, conduct community-based research and lobby local authorities and partners to improve health service delivery at county and state level.',
        features: ['Policy advocacy', 'Community-based research', 'Multi-stakeholder engagement'],
        wide: false,
      },
      {
        number: '02',
        icon: 'fas fa-heart-pulse',
        color: 'brand',
        title: 'Primary Health Care Services',
        badge: 'Core',
        text: 'MSA delivers essential Primary Health Care services at community level — reaching the most vulnerable populations including IDPs and hard-to-reach communities.',
        features: ['Community health outreach', 'Basic curative & preventive care', 'Referrals to health facilities'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-venus',
        color: 'purple',
        title: 'Sexual & Reproductive Health',
        badge: 'Youth Focus',
        text: 'MSA provides Sexual and Reproductive Health services and information tailored for young people — including counselling, family planning education, and referral pathways.',
        features: ['Youth-friendly counselling', 'Family planning education', 'SRH information & referrals'],
        wide: false,
      },
      {
        number: '04',
        icon: 'fas fa-apple-whole',
        color: 'gold',
        title: 'Nutritional Programs',
        badge: 'Essential',
        text: 'Nutrition support programs that address malnutrition among children, pregnant women and vulnerable households — complementing our broader health and resilience work.',
        features: ['Malnutrition screening', 'Nutritional supplements', 'Community nutrition education'],
        wide: false,
      },
      {
        number: '05',
        icon: 'fas fa-virus',
        color: 'navy',
        title: 'HIV/AIDS Programs',
        badge: 'Flagship',
        text: 'MSA has provided comprehensive HIV/AIDS services since 2013 — including VCT, in-school awareness clubs, community outreaches, condom distribution and referrals to the ART clinic. All our HIV positive clients are enrolled on treatment.',
        features: ['Youth-Friendly VCT', 'HIV Testing & Counselling', 'Referrals to ART Clinic', 'Condom Distribution'],
        wide: true,
      },
    ],
    footerText: 'Every service above is delivered with dignity, confidentiality and community partnership — because health is a right, not a privilege.',
    ctaText: 'Support Our Health Work',
    ctaLink: '#support',
  },

  vctFeature: {
    eyebrow: 'HIV/AIDS Program',
    title: 'Youth-Friendly',
    titleAccent: 'VCT Services',
    subtitle:
      'Since 2013, MSA has operated a Youth-Friendly Voluntary Counselling and Testing (VCT) centre at the MSA compound in Maridi — providing confidential HIV testing, counselling and referrals.',
    paragraph2:
      'Every client who tests positive is referred to the ART clinic at the main hospital, and to date all our HIV positive clients are enrolled on treatment. This wrap-around approach ensures that testing leads to real, life-sustaining care.',
    image: '/images/msa10.jpeg',
    imageBadge: 'VCT SERVICES SINCE 2013',
    imageCaption: 'Youth-Friendly VCT',
    imageSubcaption: 'At the MSA Compound in Maridi',
    floatCard1: { icon: 'fas fa-calendar-check', title: 'Since 2013', sub: 'VCT Services' },
    floatCard2: { icon: 'fas fa-heart', title: 'All on ART', sub: 'Positive clients supported' },
    benefits: [
      { icon: 'fas fa-comments', color: 'navy', title: 'Confidential Counselling', text: 'Every client receives pre- and post-test counselling in a safe, youth-friendly space.' },
      { icon: 'fas fa-vial', color: 'red', title: 'HIV Testing', text: 'Free, rapid and confidential HIV testing available to all.' },
      { icon: 'fas fa-hospital', color: 'brand', title: 'Referral to ART', text: 'Positive clients are referred to the main hospital ART clinic and enrolled on treatment.' },
    ],
    ctaText: 'Visit Our VCT Centre',
    ctaLink: '/contact',
  },

  services: {
    eyebrow: 'HIV/AIDS Services',
    title: 'Comprehensive',
    titleAccent: 'Approach',
    subtitle:
      'Three pillars that make MSA\'s HIV/AIDS program one of the most trusted in Western Equatoria.',
    items: [
      {
        icon: 'fas fa-vial-circle-check',
        color: 'navy',
        title: 'Voluntary Counselling & Testing',
        text: 'Youth-friendly VCT services located at the MSA compound in Maridi. Free, confidential, and available year-round. Every client is counselled and — where appropriate — referred to the ART clinic.',
        features: ['Youth-friendly environment', 'Free HIV testing', 'Referral to treatment', 'Confidential counselling'],
      },
      {
        icon: 'fas fa-school-flag',
        color: 'brand',
        title: 'In-School & Community Awareness',
        text: 'MSA reaches both in-school and out-of-school youth with HIV/AIDS awareness messages via school clubs, community outreaches and the community FM radio — reducing new infection rates and stigma.',
        features: ['HIV/AIDS & SRHR clubs', 'Peer educator training', 'Community outreaches', 'Radio awareness'],
      },
      {
        icon: 'fas fa-shield-heart',
        color: 'red',
        title: 'Condom Distribution',
        text: 'Through our VCT services and direct distribution to active youth centers and hot spots, we ensure that sexually active youth have easy access to protection.',
        features: ['VCT distribution point', 'Youth center supply', 'Awareness on safe use', 'Peer-to-peer education'],
      },
    ],
  },

  stats: {
    eyebrow: 'Our Reach',
    title: 'Health by the',
    titleAccent: 'Numbers',
    subtitle: 'Key milestones from over a decade of delivering health services in South Sudan.',
    items: [
      { icon: 'fas fa-calendar-check', color: 'navy', value: '2013', label: 'VCT Services Started', static: true },
      { icon: 'fas fa-heart-pulse', color: 'red', value: '100', label: '% HIV+ on Treatment', suffix: '%', static: true },
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '20000', label: 'Radio Listeners Reached' },
      { icon: 'fas fa-school', color: 'brand', value: '12', label: 'School Health Clubs' },
      { icon: 'fas fa-users', color: 'purple', value: '500', label: 'Youth Reached Annually' },
      { icon: 'fas fa-shield-heart', color: 'pink', value: '20', label: 'GBV Cases / Month' },
    ],
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Deliver Health',
    subtitle: 'A four-step approach that ensures every intervention is confidential, sustainable and community-driven.',
    steps: [
      { number: '1', color: 'red', title: 'Engage', text: 'We work with youth, schools, community leaders and health facilities to identify health priorities and design services that fit local realities.' },
      { number: '2', color: 'brand', title: 'Deliver', text: 'Through our VCT centre, community outreaches and school clubs, we deliver the services where youth already are — reducing barriers to access.' },
      { number: '3', color: 'gold', title: 'Refer', text: 'Positive clients and complex cases are referred to the ART clinic, hospitals and partner facilities — closing the loop from testing to treatment.' },
      { number: '4', color: 'navy', title: 'Sustain', text: 'We train peer educators, strengthen school clubs and build community capacity so that awareness and support continue long after each intervention.' },
    ],
    stats: [
      { icon: 'fas fa-vial', color: 'navy', value: '2013', label: 'VCT Services Since', static: true },
      { icon: 'fas fa-hands-holding-heart', color: 'red', value: '100', label: '% on Treatment', suffix: '%', static: true },
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '20000', label: 'Radio Reach' },
      { icon: 'fas fa-users-line', color: 'brand', value: '500', label: 'Youth Annually' },
    ],
  },

    gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Care',
    subtitle:
      "Snapshots from MSA's health programs — VCT services, community outreach, awareness campaigns and youth-friendly spaces.",
    items: [
      { image: '/images/msa10.jpeg', badge: 'Featured', badgeColor: 'gold',  title: 'Youth-Friendly VCT',    subtitle: 'Confidential testing and counselling', size: 'large' },
      { image: '/images/msa3.jpeg',  badge: 'Outreach', badgeColor: 'brand', title: 'Community Outreach',    subtitle: 'Awareness at the grassroots',           size: 'small' },
      { image: '/images/msa1.jpeg',  badge: 'Awareness', badgeColor: 'red',  title: 'Health Education',      subtitle: 'HIV/AIDS & SRHR programs',              size: 'small' },
      { image: '/images/msa4.jpeg',  badge: 'Youth',    badgeColor: 'navy',  title: 'School Health Clubs',   subtitle: 'Peer-to-peer education',                size: 'small' },
      { image: '/images/msa9.jpeg',  badge: 'Support',  badgeColor: 'pink',  title: 'Counselling Sessions',  subtitle: 'Safe, stigma-free spaces',              size: 'small' },
    ],
    footerText: 'Every moment captured reflects a life touched by accessible, dignified health care.',
    ctaText: 'Support Our Health Work',
    ctaLink: '#support',
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories from',
    titleAccent: 'Our Community',
    subtitle: 'What health services mean to the youth and families MSA serves.',
    items: [
      {
        quote: '"The VCT centre is youth-friendly. I felt comfortable, respected and heard. The counsellor explained everything and I left knowing my status."',
        author: 'Youth Client',
        role: 'Youth-Friendly VCT, Maridi',
        color: 'navy',
      },
      {
        quote: '"The HIV/AIDS club at our school changed how we talk about health. We now teach each other and break the stigma that used to keep us silent."',
        author: 'School Health Club Member',
        role: 'Maridi County',
        color: 'brand',
      },
      {
        quote: '"Because of the radio program and the community outreach, my neighbours now understand HIV. Fear has turned into knowledge and testing."',
        author: 'Community Member',
        role: 'Maridi, Western Equatoria',
        color: 'red',
      },
    ],
  },

  support: {
    icon: 'fas fa-heart-pulse',
    title: 'Help Us Reach More Communities',
    text: 'Support MSA\'s health programs — help us expand HIV testing, awareness and youth-friendly services to communities that need them most.',
    button1Text: 'Support Health Work',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-graduation-cap', color: 'gold', title: 'Education', subtitle: 'Schools & scholarships', href: '/education' },
      { icon: 'fas fa-seedling', color: 'green', title: 'Resilience', subtitle: 'Food & economic recovery', href: '/resilience' },
      { icon: 'fas fa-balance-scale', color: 'blue', title: 'Governance', subtitle: 'Democracy & rule of law', href: '/governance' },
      { icon: 'fas fa-shield-halved', color: 'purple', title: 'Protection', subtitle: 'Child & gender protection', href: '/protection' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', title: 'Media', subtitle: 'Community FM & awareness', href: '/media' },
    ],
      
  },
};

// ============================================================
// RESILIENCE & RECOVERY PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const resilienceDefaults: any = {
  hero: {
    image: '/images/msa1.jpeg',
    badge: 'MSA RESILIENCE & RECOVERY PROGRAM',
    imageCaption: 'Food security, economic recovery, skills training — building self-reliant communities across South Sudan.',
    sideStats: [
      { value: '500+', label: 'Youth Trained' },
      { value: '300+', label: 'Women Empowered' },
      { value: '5+', label: 'Skills Tracks' },
    ],
    titleLine1: 'Building',
    titleLine2: 'Resilient',
    titleLine3: 'Communities',
    subtitle:
      'MSA empowers youth and women with the skills, capital and support they need to build sustainable livelihoods — from computer training and tailoring to agriculture and small business start-ups.',
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Get Support',
    secondaryCtaLink: '#support',
    stats: [
      { value: '500', label: 'Youth Trained', suffix: '+' },
      { value: '300', label: 'Women Empowered', suffix: '+' },
      { value: '5', label: 'Skills Tracks', static: true },
    ],
  },

  overview: {
    eyebrow: 'Resilience & Recovery',
    title: 'From Relief to',
    titleAccent: 'Self-Reliance',
    titleEnd: '',
    subtitle:
      'Recovery is not just about surviving — it is about thriving. MSA works alongside communities to build food security, restore livelihoods and equip youth and women with the skills they need to shape their own futures.',
    cards: [
      {
        icon: 'fas fa-seedling',
        color: 'brand',
        title: 'Food Security',
        text: 'Programs that strengthen food production and reduce hunger — supporting agriculture groups and homestead gardening for vulnerable households.',
      },
      {
        icon: 'fas fa-coins',
        color: 'gold',
        title: 'Economic Recovery',
        text: 'Business skills training, start-up capital and top-up support for women and youth to launch or grow small enterprises.',
      },
      {
        icon: 'fas fa-tools',
        color: 'navy',
        title: 'Skills & Vocational Training',
        text: 'Computer, tailoring, mechanics, driving and other practical skills that lead directly to employment or self-employment.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Resilience',
    titleAccent: 'Activities',
    subtitle:
      'A comprehensive set of programs that build food security, restore livelihoods and equip youth and women with practical, income-generating skills.',
    items: [
      {
        number: '01',
        icon: 'fas fa-utensils',
        color: 'brand',
        title: 'Food Security Programs',
        badge: 'Essential',
        text: 'MSA supports agriculture groups and vulnerable households to improve food production and access — through training, agricultural inputs and homestead gardening.',
        features: ['Agriculture group support', 'Homestead gardening', 'Improved productivity techniques'],
        wide: false,
      },
      {
        number: '02',
        icon: 'fas fa-coins',
        color: 'gold',
        title: 'Economic Recovery Programs',
        badge: 'Livelihoods',
        text: 'We provide business skills training, start-up capital for women IDPs, and top-up capital for existing small businesses — helping families move from survival to stability.',
        features: ['Business skills training', 'Start-up capital', 'Top-up capital for existing businesses'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-laptop-code',
        color: 'navy',
        title: 'Computer Skills Training',
        badge: 'Digital',
        text: 'Youth trained in basic computer literacy, Microsoft Office and internet skills — opening doors to office jobs, freelancing and further study.',
        features: ['Basic computer literacy', 'Microsoft Office', 'Internet & email skills'],
        wide: false,
      },
      {
        number: '04',
        icon: 'fas fa-scissors',
        color: 'purple',
        title: 'Tailoring, Mechanics & Driving',
        badge: 'Vocational',
        text: 'Practical, in-demand trades for youth who have not had the chance to complete formal education — including tailoring, motor mechanics and driving.',
        features: ['Tailoring & garment making', 'Motor mechanics', 'Driving & vehicle maintenance'],
        wide: false,
      },
      {
        number: '05',
        icon: 'fas fa-futbol',
        color: 'pink',
        title: 'Youth Sports & Agriculture Groups',
        badge: 'Youth',
        text: 'MSA supports youth through sports programs that build leadership and teamwork, and through agriculture groups that improve food production and income.',
        features: ['Sports programs for youth', 'Youth agriculture groups', 'Leadership development'],
        wide: false,
      },
      {
        number: '06',
        icon: 'fas fa-hands-holding-heart',
        color: 'red',
        title: 'Women Livelihoods Support',
        badge: 'Flagship',
        text: 'MSA works intensively with women — especially women IDPs — to improve their livelihoods through small business training, start-up capital, top-up capital and homestead gardening. The goal is simple: help women earn, save and grow.',
        features: ['Small business skills training', 'Start-up capital (women IDPs)', 'Top-up capital', 'Homestead gardening support'],
        wide: true,
      },
    ],
    footerText: 'Every activity is designed with sustainability in mind — the goal is not temporary relief, but permanent independence.',
    ctaText: 'Support Our Resilience Work',
    ctaLink: '#support',
  },

  youthFeature: {
    eyebrow: 'Youth Livelihoods',
    title: 'Skills that',
    titleAccent: 'Pay the Bills',
    subtitle:
      'MSA targets youth — both in-school and out-of-school — with practical, income-generating skills. From computer training to technical trades, we equip young people to get employed or become self-employed.',
    paragraph2:
      'Many of the youth we work with have not had the chance to complete formal education. Our training programs are designed to meet them where they are, and to give them skills that are actually in demand in their communities.',
    image: '/images/msa1.jpeg',
    imageBadge: 'YOUTH SKILLS TRAINING',
    imageCaption: 'Youth Skills Training',
    imageSubcaption: 'Computer, technical & vocational tracks',
    floatCard1: { icon: 'fas fa-laptop-code', title: 'Computer', sub: 'Digital skills' },
    floatCard2: { icon: 'fas fa-certificate', title: 'Certified', sub: 'On completion' },
    benefits: [
      { icon: 'fas fa-laptop', color: 'navy', title: 'Computer & Digital Skills', text: 'Basic computer literacy, Microsoft Office, internet — opening doors to office jobs and freelancing.' },
      { icon: 'fas fa-wrench', color: 'purple', title: 'Technical Trades', text: 'Tailoring, mechanics, driving and other practical skills that lead directly to employment.' },
      { icon: 'fas fa-seedling', color: 'brand', title: 'Agriculture & Sports', text: 'Youth agriculture groups and sports programs that build income, leadership and community.' },
    ],
    ctaText: 'Enroll a Youth',
    ctaLink: '/contact',
  },

  womenFeature: {
    eyebrow: 'Women Livelihoods',
    title: 'Empowering',
    titleAccent: 'Women',
    subtitle:
      'Women are the backbone of South Sudanese families and communities. MSA invests in women — especially women IDPs — through business training, start-up capital, top-up capital and homestead gardening.',
    paragraph2:
      'The result is not just income — it is confidence, dignity, and the ability to provide for children. Women who have been through MSA programs have started tailoring shops, small retail businesses, restaurants, and agricultural enterprises.',
    image: '/images/msa3.jpeg',
    imageBadge: 'WOMEN EMPOWERMENT',
    imageCaption: 'Women Empowering Women',
    imageSubcaption: 'Business skills & start-up capital',
    floatCard1: { icon: 'fas fa-female', title: '300+ Women', sub: 'Empowered' },
    floatCard2: { icon: 'fas fa-coins', title: 'Start-up Capital', sub: 'For women IDPs' },
    benefits: [
      { icon: 'fas fa-chalkboard-user', color: 'brand', title: 'Business Skills Training', text: 'Training on small business management, bookkeeping and market awareness.' },
      { icon: 'fas fa-coins', color: 'gold', title: 'Start-up Capital', text: 'Initial capital for women (especially IDPs) to launch small businesses.' },
      { icon: 'fas fa-arrow-trend-up', color: 'navy', title: 'Top-up Capital', text: 'Additional capital for women already running very small businesses — to help them grow.' },
      { icon: 'fas fa-seedling', color: 'pink', title: 'Homestead Gardening', text: 'Support for home gardens that improve family nutrition and provide extra income.' },
    ],
    ctaText: 'Support a Woman Entrepreneur',
    ctaLink: '/contact',
  },

  training: {
    eyebrow: 'Skills Tracks',
    title: 'Training Programs',
    titleAccent: 'We Offer',
    subtitle:
      'Five practical skills tracks delivered in communities across Western Equatoria, Juba and Yei — designed to lead directly to employment or self-employment.',
    items: [
      {
        icon: 'fas fa-laptop-code',
        color: 'navy',
        title: 'Computer Skills',
        text: 'Basic computer literacy, Microsoft Word, Excel, PowerPoint and internet use.',
        features: ['Word & Excel', 'Internet & email', 'Basic troubleshooting'],
      },
      {
        icon: 'fas fa-scissors',
        color: 'purple',
        title: 'Tailoring',
        text: 'Garment making, cutting, sewing and small business setup for fashion and repair work.',
        features: ['Cutting & sewing', 'Garment design', 'Small business setup'],
      },
      {
        icon: 'fas fa-wrench',
        color: 'red',
        title: 'Mechanics',
        text: 'Motor vehicle and motorcycle repair — a trade that is always in demand across South Sudan.',
        features: ['Engine repair', 'Motorcycle mechanics', 'Shop setup'],
      },
      {
        icon: 'fas fa-car',
        color: 'gold',
        title: 'Driving',
        text: 'Professional driving skills and licence preparation — leading to jobs with NGOs, government and private companies.',
        features: ['Driving skills', 'Road safety', 'Licence prep'],
      },
      {
        icon: 'fas fa-seedling',
        color: 'brand',
        title: 'Agriculture',
        text: 'Improving agricultural productivity for youth and women groups — crop management, tools and market access.',
        features: ['Crop management', 'Tools & inputs', 'Market access'],
      },
    ],
  },

    gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Growth',
    subtitle:
      "Photos from our resilience and livelihoods programs — youth trainings, women entrepreneurs, agriculture groups and skills development.",
    items: [
      { image: '/images/msa1.jpeg', badge: 'Featured', badgeColor: 'gold',  title: 'Skills Training',      subtitle: 'Youth building livelihoods',            size: 'large' },
      { image: '/images/msa3.jpeg', badge: 'Women',    badgeColor: 'pink',  title: 'Women Entrepreneurs',  subtitle: 'Small business start-ups',              size: 'small' },
      { image: '/images/msa4.jpeg', badge: 'Agriculture', badgeColor: 'brand', title: 'Agriculture Groups', subtitle: 'Youth farming initiatives',            size: 'small' },
      { image: '/images/msa12.png', badge: 'Youth',    badgeColor: 'navy',  title: 'Computer Training',    subtitle: 'Digital skills for jobs',               size: 'small' },
      { image: '/images/msa6.jpeg', badge: 'Empowerment', badgeColor: 'purple', title: 'Business Support', subtitle: 'Capital & mentoring',                   size: 'small' },
    ],
    footerText: 'Every photo tells a story of someone building a better future.',
    ctaText: 'Support Our Resilience Work',
    ctaLink: '#support',
  },

  stats: {
    eyebrow: 'Our Reach',
    title: 'Resilience by the',
    titleAccent: 'Numbers',
    subtitle: 'Key milestones from our livelihoods and economic recovery work.',
    items: [
      { icon: 'fas fa-users', color: 'brand', value: '500', label: 'Youth Trained', suffix: '+' },
      { icon: 'fas fa-female', color: 'pink', value: '300', label: 'Women Empowered', suffix: '+' },
      { icon: 'fas fa-laptop-code', color: 'navy', value: '100', label: 'Computer Graduates', suffix: '+' },
      { icon: 'fas fa-scissors', color: 'purple', value: '80', label: 'Tailoring Graduates', suffix: '+' },
      { icon: 'fas fa-coins', color: 'gold', value: '200', label: 'Businesses Started', suffix: '+' },
      { icon: 'fas fa-seedling', color: 'green', value: '50', label: 'Agriculture Groups' },
    ],
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Build Resilience',
    subtitle: 'A four-step approach that moves families from relief to sustainable independence.',
    steps: [
      { number: '1', color: 'brand', title: 'Assess', text: 'We work with communities to understand what skills are in demand, what businesses are viable, and what barriers hold people back.' },
      { number: '2', color: 'navy', title: 'Train', text: 'We deliver practical, hands-on training in skills that lead directly to employment or self-employment — no theory without application.' },
      { number: '3', color: 'gold', title: 'Fund', text: 'We provide start-up and top-up capital for women and youth who complete our programs — so they can actually put their new skills to work.' },
      { number: '4', color: 'red', title: 'Support', text: 'We accompany graduates with mentoring, market linkages and follow-up visits — because starting a business is only the first step.' },
    ],
    stats: [
      { icon: 'fas fa-chalkboard-user', color: 'brand', value: '500', label: 'Youth Trained', suffix: '+' },
      { icon: 'fas fa-hand-holding-dollar', color: 'gold', value: '200', label: 'Businesses Started', suffix: '+' },
      { icon: 'fas fa-users-line', color: 'navy', value: '300', label: 'Women Empowered', suffix: '+' },
      { icon: 'fas fa-seedling', color: 'green', value: '50', label: 'Agri Groups' },
    ],
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories of',
    titleAccent: 'Transformation',
    subtitle: 'What livelihoods support means to the youth and women MSA serves.',
    items: [
      {
        quote: '"After the computer training, I got a job at an NGO office. I never thought I would be working on a computer — now I use Excel every day."',
        author: 'Youth Graduate',
        role: 'Computer Skills Training',
        color: 'navy',
      },
      {
        quote: '"The start-up capital helped me open a small shop. Now I can pay school fees for my children without depending on anyone else."',
        author: 'Woman Entrepreneur',
        role: 'Small Business Program',
        color: 'pink',
      },
      {
        quote: '"The agriculture group gave us better seeds and training. Our harvest doubled, and we can sell the extra at the market."',
        author: 'Agriculture Group Member',
        role: 'Youth Agriculture Program',
        color: 'green',
      },
    ],
  },

  support: {
    icon: 'fas fa-seedling',
    title: 'Help Families Build Lasting Livelihoods',
    text: 'Support MSA\'s resilience programs — help us train more youth, empower more women, and build self-reliant communities across South Sudan.',
    button1Text: 'Support Resilience Work',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-graduation-cap', color: 'gold', title: 'Education', subtitle: 'Schools & scholarships', href: '/education' },
      { icon: 'fas fa-heart-pulse', color: 'red', title: 'Health', subtitle: 'PHC, SRH, HIV/AIDS', href: '/health' },
      { icon: 'fas fa-balance-scale', color: 'blue', title: 'Governance', subtitle: 'Democracy & rule of law', href: '/governance' },
      { icon: 'fas fa-shield-halved', color: 'purple', title: 'Protection', subtitle: 'Child & gender protection', href: '/protection' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', title: 'Media', subtitle: 'Community FM & awareness', href: '/media' },
    ],
  },
};

// ============================================================
// GOVERNANCE PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const governanceDefaults: any = {
  hero: {
    image: '/images/msa11.jpeg',
    badge: 'MSA GOVERNANCE PROGRAM',
    imageCaption: 'Democracy, rule of law and peace building — strengthening local governance and civic participation.',
    sideStats: [
      { value: '1st', label: 'Class Judge' },
      { value: '2017', label: 'Advocacy Win' },
      { value: '20+', label: 'Dialogues' },
    ],
    titleLine1: 'Strengthening',
    titleLine2: 'Governance',
    titleLine3: 'for All',
    subtitle:
      'MSA works with communities, local authorities and institutions to promote democracy, the rule of law, peace building and community security — building a South Sudan where every voice matters.',
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Partner With Us',
    secondaryCtaLink: '#support',
    stats: [
      { value: '1st', label: 'Class Judge', static: true },
      { value: '20', label: 'Dialogues Held', suffix: '+' },
      { value: '50', label: 'Leaders Engaged', suffix: '+' },
    ],
  },

  overview: {
    eyebrow: 'Governance Program',
    title: 'Building Accountable',
    titleAccent: 'Institutions',
    titleEnd: 'and Civic Trust',
    subtitle:
      'Good governance is the foundation on which every other development goal rests. MSA works hand-in-hand with communities, local authorities, civil society and traditional leaders to strengthen democratic systems, protect human rights and build lasting peace.',
    cards: [
      {
        icon: 'fas fa-vote-yea',
        color: 'blue',
        title: 'Democracy & Democratization',
        text: 'Civic education, community dialogue and support for inclusive participation in decision-making processes at county and state level.',
      },
      {
        icon: 'fas fa-balance-scale',
        color: 'navy',
        title: 'Rule of Law',
        text: 'Promoting legal awareness, advocating for functioning courts and helping communities understand their rights under South Sudanese law.',
      },
      {
        icon: 'fas fa-dove',
        color: 'green',
        title: 'Peace Building & Security',
        text: 'Bringing communities together through dialogue, reconciliation and community-led security initiatives that prevent conflict.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Governance',
    titleAccent: 'Activities',
    subtitle:
      'Three core focus areas that define MSA\'s work in governance — building institutions, upholding rights and strengthening peace across South Sudan.',
    items: [
      {
        number: '01',
        icon: 'fas fa-vote-yea',
        color: 'navy',
        title: 'Democracy & Democratization',
        badge: 'Civic',
        text: 'MSA supports democratic processes at community level — conducting civic education, facilitating inclusive dialogue between citizens and their leaders, and helping communities understand their role in shaping local decisions. We work with youth, women and traditional leaders to ensure that all voices are heard.',
        features: ['Civic education', 'Community dialogue', 'Inclusive participation', 'Youth & women engagement'],
        wide: false,
      },
      {
        number: '02',
        icon: 'fas fa-balance-scale',
        color: 'brand',
        title: 'Rule of Law',
        badge: 'Core',
        text: 'Through legal awareness campaigns and advocacy, MSA promotes the rule of law in communities. We work with local authorities, police and traditional courts to strengthen systems that protect rights — including our successful 2017 advocacy that brought a 1st class judge to Maridi to handle rape and serious GBV cases.',
        features: ['Legal awareness campaigns', 'Advocacy for functioning courts', 'Police & traditional court engagement', 'Rights education'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-dove',
        color: 'gold',
        title: 'Peace Building & Community Security',
        badge: 'Peace',
        text: 'MSA brings communities together through structured dialogue and reconciliation processes. We support community-led security initiatives that prevent conflict, build trust between groups, and create space for peaceful coexistence. Our work with youth focuses on inclusion in peace processes as a foundation for lasting stability.',
        features: ['Community dialogue', 'Reconciliation processes', 'Community security programs', 'Youth in peace building'],
        wide: true,
      },
    ],
    footerText: 'Good governance is not built in a day — it is built through sustained partnership between communities, leaders and institutions.',
    ctaText: 'Support Our Governance Work',
    ctaLink: '#support',
  },

  ruleOfLawFeature: {
    eyebrow: 'Rule of Law',
    title: 'Advocating for',
    titleAccent: 'Justice',
    subtitle:
      'In 2017, MSA successfully advocated with State Authorities to bring a 1st class judge to Maridi — a landmark win that transformed how the community handles rape and serious GBV cases.',
    paragraph2:
      'We continue this work through legal awareness campaigns, capacity building for local authorities, and partnerships with police, courts and civil society. When people understand their rights, they can demand accountability — and when institutions function, justice reaches everyone.',
    image: '/images/msa11.jpeg',
    imageBadge: 'ADVOCACY WIN • 2017',
    imageCaption: 'Justice for Maridi',
    imageSubcaption: '1st class judge brought to the county',
    floatCard1: { icon: 'fas fa-gavel', title: '2017', sub: 'Advocacy Win' },
    floatCard2: { icon: 'fas fa-scale-balanced', title: '1st Class', sub: 'Judge in Maridi' },
    benefits: [
      { icon: 'fas fa-bullhorn', color: 'red', title: 'Advocacy', text: 'Engaging authorities to strengthen legal systems and bring justice closer to communities.' },
      { icon: 'fas fa-book-open', color: 'navy', title: 'Legal Awareness', text: 'Helping communities understand their rights under national and customary law.' },
      { icon: 'fas fa-users-cog', color: 'brand', title: 'Capacity Building', text: 'Training local authorities and community leaders to uphold the rule of law.' },
    ],
    ctaText: 'Partner With Us',
    ctaLink: '/contact',
  },

  peaceFeature: {
    eyebrow: 'Peace Building',
    title: 'Dialogue is the',
    titleAccent: 'Path to Peace',
    subtitle:
      'MSA facilitates structured dialogue between communities, youth groups, women\'s groups, traditional leaders and local authorities — creating space for reconciliation and shared solutions to common challenges.',
    paragraph2:
      'We also work with youth on inclusion in peace building — because peace that excludes young people is fragile. Young leaders trained by MSA become champions of reconciliation in their own communities.',
    image: '/images/msa3.jpeg',
    imageBadge: 'PEACE BUILDING',
    imageCaption: 'Dialogue for Peace',
    imageSubcaption: 'Communities in conversation',
    floatCard1: { icon: 'fas fa-dove', title: 'Peace', sub: 'Community-led' },
    floatCard2: { icon: 'fas fa-people-group', title: 'Youth', sub: 'Inclusion' },
    benefits: [
      { icon: 'fas fa-comments', color: 'gold', title: 'Structured Dialogue', text: 'Facilitated conversations between conflicting groups and leaders.' },
      { icon: 'fas fa-handshake', color: 'brand', title: 'Reconciliation', text: 'Long-term processes that rebuild trust and heal community divides.' },
      { icon: 'fas fa-people-arrows', color: 'navy', title: 'Youth Inclusion', text: 'Training young leaders to become champions of peace in their communities.' },
      { icon: 'fas fa-shield-halved', color: 'red', title: 'Community Security', text: 'Locally owned initiatives that prevent conflict before it starts.' },
    ],
    ctaText: 'Support Peace Building',
    ctaLink: '/contact',
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Strengthen Governance',
    subtitle: 'A four-step approach that ensures governance work creates lasting institutional change.',
    steps: [
      { number: '1', color: 'brand', title: 'Engage', text: 'We begin with communities — listening to citizens, leaders and local authorities to understand what governance challenges matter most.' },
      { number: '2', color: 'navy', title: 'Educate', text: 'We run civic education and legal awareness campaigns so that everyone understands their rights and responsibilities.' },
      { number: '3', color: 'gold', title: 'Advocate', text: 'We bring community voices to decision-makers — advocating for stronger institutions, better laws and functioning courts.' },
      { number: '4', color: 'red', title: 'Sustain', text: 'We train local actors to carry the work forward, ensuring that governance gains are embedded in communities, not dependent on external support.' },
    ],
    stats: [
      { icon: 'fas fa-gavel', color: 'gold', value: '2017', label: 'Judge Advocacy Win', static: true },
      { icon: 'fas fa-users-line', color: 'brand', value: '20', label: 'Community Dialogues', suffix: '+' },
      { icon: 'fas fa-handshake', color: 'navy', value: '50', label: 'Leaders Engaged', suffix: '+' },
      { icon: 'fas fa-people-group', color: 'red', value: '100', label: 'Youth Trained', suffix: '+' },
    ],
  },

    gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Dialogue',
    subtitle:
      "Photos from our governance work — community dialogues, advocacy meetings, peace building processes and civic education.",
    items: [
      { image: '/images/msa11.jpeg', badge: 'Featured', badgeColor: 'gold',  title: 'Community Dialogue',  subtitle: 'Voices at the table',                    size: 'large' },
      { image: '/images/msa3.jpeg',  badge: 'Advocacy', badgeColor: 'navy',  title: 'Advocacy Meetings',   subtitle: 'Engaging decision-makers',               size: 'small' },
      { image: '/images/msa4.jpeg',  badge: 'Peace',    badgeColor: 'brand', title: 'Peace Building',      subtitle: 'Communities in conversation',            size: 'small' },
      { image: '/images/msa9.jpeg',  badge: 'Youth',    badgeColor: 'pink',  title: 'Youth Inclusion',     subtitle: 'Young leaders at the table',             size: 'small' },
      { image: '/images/msa1.jpeg',  badge: 'Civic',    badgeColor: 'red',   title: 'Civic Education',     subtitle: 'Rights and responsibilities',            size: 'small' },
    ],
    footerText: 'Good governance is built through dialogue, trust and shared responsibility.',
    ctaText: 'Support Our Governance Work',
    ctaLink: '#support',
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories from',
    titleAccent: 'Our Community',
    subtitle: 'What governance work means to the people and leaders MSA serves.',
    items: [
      {
        quote: '"The 2017 advocacy changed everything for us. When the judge came, survivors finally knew there was a path to justice. That was a turning point for Maridi."',
        author: 'Community Leader',
        role: 'Maridi County',
        color: 'gold',
      },
      {
        quote: '"The dialogue sessions brought us together — youth, elders, women. We learned to speak with each other instead of past each other. That is what peace looks like."',
        author: 'Youth Peace Ambassador',
        role: 'Western Equatoria',
        color: 'brand',
      },
      {
        quote: '"Before MSA came, we did not know our rights. Now women in our community understand the law and know where to seek help."',
        author: 'Women\'s Group Leader',
        role: 'Maridi County',
        color: 'navy',
      },
    ],
  },

  support: {
    icon: 'fas fa-balance-scale',
    title: 'Help Us Strengthen Governance in South Sudan',
    text: 'Support MSA\'s governance programs — help us build accountable institutions, protect rights and create lasting peace in communities across South Sudan.',
    button1Text: 'Support Our Work',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-graduation-cap', color: 'gold', title: 'Education', subtitle: 'Schools & scholarships', href: '/education' },
      { icon: 'fas fa-heart-pulse', color: 'red', title: 'Health', subtitle: 'PHC, SRH, HIV/AIDS', href: '/health' },
      { icon: 'fas fa-seedling', color: 'green', title: 'Resilience', subtitle: 'Food & economic recovery', href: '/resilience' },
      { icon: 'fas fa-shield-halved', color: 'purple', title: 'Protection', subtitle: 'Child & gender protection', href: '/protection' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', title: 'Media', subtitle: 'Community FM & awareness', href: '/media' },
    ],
  },
};

// ============================================================
// PROTECTION PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const protectionDefaults: any = {
  hero: {
    image: '/images/msa9.jpeg',
    badge: 'MSA PROTECTION PROGRAM',
    imageCaption: 'Child protection, GBV response and psychosocial support — protecting the most vulnerable across South Sudan.',
    sideStats: [
      { value: '17', label: 'Children Reunified' },
      { value: '20+', label: 'GBV Cases / Month' },
      { value: '20K+', label: 'Radio Reach' },
    ],
    titleLine1: 'Protecting',
    titleLine2: 'the Vulnerable',
    titleLine3: 'with Dignity',
    subtitle:
      'MSA protects children and survivors of gender-based violence through prevention, response, child-friendly services, legal advocacy and psychosocial support — building safer communities across South Sudan.',
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Get Support',
    secondaryCtaLink: '#support',
    stats: [
      { value: '17', label: 'Children Reunified', static: true },
      { value: '20', label: 'GBV Cases / Month', suffix: '+' },
      { value: '20000', label: 'Radio Listeners', suffix: '+' },
    ],
  },

  overview: {
    eyebrow: 'Protection Program',
    title: 'Standing Up for',
    titleAccent: 'Every Right',
    titleEnd: 'and Every Child',
    subtitle:
      'Protection is at the heart of everything MSA does. We work with children, survivors, families, police, community leaders and local authorities to prevent harm, respond to abuse, and build systems that protect the most vulnerable members of our communities.',
    cards: [
      {
        icon: 'fas fa-children',
        color: 'purple',
        title: 'Child Protection',
        text: 'Prevention, response, child-friendly services and coordination — including reunification of children separated from their families by conflict.',
      },
      {
        icon: 'fas fa-shield-heart',
        color: 'red',
        title: 'Gender & GBV',
        text: 'Responding to sexual and gender-based violence, strengthening legal systems, and supporting survivors with dignity and care.',
      },
      {
        icon: 'fas fa-people-group',
        color: 'brand',
        title: 'Coordination & Advocacy',
        text: 'Working with police, courts, community leaders and civil society to strengthen the systems that protect vulnerable people.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Protection',
    titleAccent: 'Activities',
    subtitle:
      'Two pillars of work — Child Protection and Gender/GBV — each with a distinct focus on prevention, response and system strengthening.',
    items: [
      {
        number: '01',
        icon: 'fas fa-shield-halved',
        color: 'purple',
        title: 'Prevention of Child Protection Issues',
        badge: 'Prevention',
        text: 'MSA works upstream to prevent child protection violations before they happen — through community awareness, child-friendly spaces, school-based programs, and training of community child protection committees.',
        features: ['Community awareness', 'Child-friendly spaces', 'School-based programs', 'Prevention committees'],
        wide: false,
      },
      {
        number: '02',
        icon: 'fas fa-hand-holding-heart',
        color: 'red',
        title: 'Response to Child Protection Issues',
        badge: 'Response',
        text: 'When violations occur, MSA responds with case management, referrals to authorities and services, family tracing and reunification, and follow-up support for children and their families.',
        features: ['Case management', 'Family tracing', 'Reunification', 'Follow-up support'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-child-reaching',
        color: 'brand',
        title: 'Child-Friendly Services',
        badge: 'Child-centred',
        text: 'We deliver services designed around the needs of children — safe, welcoming spaces where children can speak freely, receive care, and feel protected. This includes our pre-school for displaced children.',
        features: ['Safe spaces for children', 'Pre-school for IDP children', 'Play-based learning', 'Psychosocial support'],
        wide: false,
      },
      {
        number: '04',
        icon: 'fas fa-network-wired',
        color: 'gold',
        title: 'Strengthened Coordination & Networking',
        badge: 'Systems',
        text: 'MSA facilitates strong coordination between child protection actors — police, local authorities, community committees, schools and partners — so that every case is handled with care and consistency.',
        features: ['Child protection working group', 'Police coordination', 'Community committees', 'Partner collaboration'],
        wide: false,
      },
      {
        number: '05',
        icon: 'fas fa-scale-balanced',
        color: 'navy',
        title: 'Gender & Sexual-Based Violence (GBV)',
        badge: 'GBV',
        text: 'MSA responds to GBV through the Special Protection Unit at Maridi Police Station, community awareness, legal advocacy and direct survivor support. On average, the Special Protection Unit supports around 20 GBV cases per month — more than half being rape cases.',
        features: ['Special Protection Unit', 'Survivor support', 'Legal systems strengthening', 'Community awareness'],
        wide: true,
      },
      {
        number: '06',
        icon: 'fas fa-comments',
        color: 'pink',
        title: 'Psychosocial Support & Counselling',
        badge: 'Care',
        text: 'MSA provides psychosocial support and counselling for children and survivors of GBV — helping them process trauma, rebuild confidence, and move forward with dignity.',
        features: ['Individual counselling', 'Group therapy sessions', 'Family support', 'Trauma-informed care'],
        wide: false,
      },
    ],
    footerText: 'Every survivor and every child is treated with dignity, confidentiality and respect — protection is a right, not a favour.',
    ctaText: 'Support Our Protection Work',
    ctaLink: '#support',
  },

  childFeature: {
    eyebrow: 'Child Protection',
    title: 'Bringing Children',
    titleAccent: 'Home',
    subtitle:
      'MSA has reunified 17 children who were abducted by the Lord\'s Resistance Army (LRA) with their families after they escaped — one of the most impactful achievements of our protection work.',
    paragraph2:
      'Beyond reunification, we train child protection committees, work with police on the Child Act 2008, and run pre-schools for displaced children — creating a system where every child is seen, protected and given a path forward.',
    image: '/images/msa9.jpeg',
    imageBadge: 'CHILD PROTECTION',
    imageCaption: 'Every Child Counts',
    imageSubcaption: 'Reunification, protection, dignity',
    floatCard1: { icon: 'fas fa-children', title: '17 Children', sub: 'Reunified with families' },
    floatCard2: { icon: 'fas fa-house-chimney', title: 'Family', sub: 'Back where they belong' },
    benefits: [
      { icon: 'fas fa-people-arrows', color: 'purple', title: 'Family Reunification', text: '17 children abducted by the LRA were reunified with their families after escaping.' },
      { icon: 'fas fa-users-cog', color: 'navy', title: 'Trained Committees', text: 'Child protection advocacy committees trained across communities.' },
      { icon: 'fas fa-gavel', color: 'brand', title: 'Police Training', text: 'Police officers trained on the Child Act 2008 to protect children effectively.' },
      { icon: 'fas fa-school', color: 'gold', title: 'Pre-school for IDPs', text: 'Pre-schools providing learning and safety for displaced children.' },
    ],
    ctaText: 'Support Child Protection',
    ctaLink: '/contact',
  },

  gbvFeature: {
    eyebrow: 'Gender & GBV',
    title: 'Justice for',
    titleAccent: 'Survivors',
    subtitle:
      'MSA renovated and equipped the Special Protection Unit at Maridi Police Station — the frontline of the fight against GBV and rape cases in Maridi. It supports an average of 20 GBV cases per month, with more than half being rape cases.',
    paragraph2:
      'We continue to strengthen the Unit through training, capacity building and provision of equipment. In 2017, MSA successfully advocated with State Authorities to bring a 1st class judge to Maridi to handle rape and serious GBV cases — a landmark win for justice.',
    image: '/images/msa11.jpeg',
    imageBadge: 'SPECIAL PROTECTION UNIT',
    imageCaption: 'Frontline of Justice',
    imageSubcaption: 'Maridi Police Station',
    floatCard1: { icon: 'fas fa-shield-heart', title: '20+ Monthly', sub: 'GBV cases supported' },
    floatCard2: { icon: 'fas fa-gavel', title: '2017', sub: 'Judge advocacy win' },
    benefits: [
      { icon: 'fas fa-building-shield', color: 'red', title: 'Special Protection Unit', text: 'Renovated, equipped and continuously supported by MSA at Maridi Police Station.' },
      { icon: 'fas fa-bullhorn', color: 'brand', title: 'Radio Awareness', text: 'Reaching over 20,000 listeners with messages on GBV prevention and response.' },
      { icon: 'fas fa-gavel', color: 'navy', title: 'Legal Advocacy', text: 'Advocating for stronger legal systems — including the 2017 1st class judge win.' },
      { icon: 'fas fa-hand-holding-heart', color: 'purple', title: 'Survivor Support', text: 'Psychosocial support and counselling for survivors of GBV.' },
    ],
    ctaText: 'Support GBV Response',
    ctaLink: '/contact',
  },

  stats: {
    eyebrow: 'Our Reach',
    title: 'Protection by the',
    titleAccent: 'Numbers',
    subtitle: 'Key milestones from our protection and GBV programs.',
    items: [
      { icon: 'fas fa-children', color: 'purple', value: '17', label: 'Children Reunified', static: true },
      { icon: 'fas fa-shield-heart', color: 'red', value: '20', label: 'GBV Cases / Month', suffix: '+' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '20000', label: 'Radio Listeners', suffix: '+' },
      { icon: 'fas fa-users-cog', color: 'brand', value: '5', label: 'Committees Trained', suffix: '+' },
      { icon: 'fas fa-gavel', color: 'navy', value: '2017', label: 'Judge Advocacy Win', static: true },
      { icon: 'fas fa-school', color: 'pink', value: '1', label: 'Pre-school for IDPs', static: true },
    ],
  },

    gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Protection',
    subtitle:
      "Photos from our protection programs — child reunification, GBV response, community awareness and psychosocial support.",
    items: [
      { image: '/images/msa9.jpeg',  badge: 'Featured', badgeColor: 'gold',  title: 'Child Protection',    subtitle: 'Every child matters',                    size: 'large' },
      { image: '/images/msa11.jpeg', badge: 'GBV Unit', badgeColor: 'red',   title: 'Special Protection', subtitle: 'Justice for survivors',                  size: 'small' },
      { image: '/images/msa3.jpeg',  badge: 'Awareness', badgeColor: 'purple', title: 'Community Awareness', subtitle: 'Breaking the silence',                 size: 'small' },
      { image: '/images/msa1.jpeg',  badge: 'Support',  badgeColor: 'brand', title: 'Psychosocial Care',   subtitle: 'Healing and recovery',                   size: 'small' },
      { image: '/images/msa4.jpeg',  badge: 'Advocacy', badgeColor: 'navy',  title: 'Legal Advocacy',      subtitle: 'Strengthening systems',                  size: 'small' },
    ],
    footerText: 'Every survivor deserves dignity, safety and a path forward.',
    ctaText: 'Support Our Protection Work',
    ctaLink: '#support',
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Protect',
    subtitle: 'A four-step approach that ensures every case is handled with care, every child is protected, and every survivor is supported.',
    steps: [
      { number: '1', color: 'purple', title: 'Prevent', text: 'We work upstream — training committees, running awareness, creating child-friendly spaces — to prevent harm before it happens.' },
      { number: '2', color: 'red', title: 'Respond', text: 'When violations occur, we respond quickly and carefully — case management, referrals, family tracing, and safe placement.' },
      { number: '3', color: 'brand', title: 'Support', text: 'We walk with survivors and children through recovery — psychosocial support, counselling, and family reunification.' },
      { number: '4', color: 'navy', title: 'Strengthen', text: 'We strengthen the systems that protect — police, courts, community committees — so protection outlasts individual cases.' },
    ],
    stats: [
      { icon: 'fas fa-children', color: 'purple', value: '17', label: 'Children Reunified', static: true },
      { icon: 'fas fa-shield-heart', color: 'red', value: '20', label: 'GBV Cases / Month', suffix: '+' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '20000', label: 'Radio Reach', suffix: '+' },
      { icon: 'fas fa-users-cog', color: 'brand', value: '5', label: 'Committees Trained', suffix: '+' },
    ],
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories of',
    titleAccent: 'Protection',
    subtitle: 'What protection work means to the children, families and survivors MSA serves.',
    items: [
      {
        quote: '"MSA brought my child back home after years of separation. I cannot describe what that moment felt like — my family is whole again."',
        author: 'Parent',
        role: 'Child Reunification Program',
        color: 'purple',
      },
      {
        quote: '"The Special Protection Unit is the reason I could report what happened to me. The officers were trained, kind and believed me. That gave me strength."',
        author: 'GBV Survivor',
        role: 'Maridi, Western Equatoria',
        color: 'red',
      },
      {
        quote: '"The radio program taught our community about GBV. Now when it happens, people know where to go. Silence is no longer the answer."',
        author: 'Community Member',
        role: 'Radio Awareness Listener',
        color: 'brand',
      },
    ],
  },

  support: {
    icon: 'fas fa-shield-halved',
    title: 'Help Us Protect More Children and Survivors',
    text: 'Support MSA\'s protection programs — help us reunify families, respond to GBV, and build safer communities across South Sudan.',
    button1Text: 'Support Protection Work',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-graduation-cap', color: 'gold', title: 'Education', subtitle: 'Schools & scholarships', href: '/education' },
      { icon: 'fas fa-heart-pulse', color: 'red', title: 'Health', subtitle: 'PHC, SRH, HIV/AIDS', href: '/health' },
      { icon: 'fas fa-seedling', color: 'green', title: 'Resilience', subtitle: 'Food & economic recovery', href: '/resilience' },
      { icon: 'fas fa-balance-scale', color: 'blue', title: 'Governance', subtitle: 'Democracy & rule of law', href: '/governance' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', title: 'Media', subtitle: 'Community FM & awareness', href: '/media' },
    ],
  },
};

// ============================================================
// INFORMATION & MEDIA PROGRAM PAGE — DEFAULT CONTENT
// ============================================================
export const mediaDefaults: any = {
  hero: {
    image: '/images/msa8.jpeg',
    badge: 'MSA INFORMATION & MEDIA PROGRAM',
    imageCaption: 'Maridi FM 88.9 — the only privately operated community radio in the state, reaching over 20,000 listeners.',
    sideStats: [
      { value: '88.9', label: 'Maridi FM' },
      { value: '20K+', label: 'Listeners' },
      { value: '24/7', label: 'Broadcasting' },
    ],
    titleLine1: 'Amplifying',
    titleLine2: 'Community',
    titleLine3: 'Voices',
    subtitle:
      'MSA runs Maridi FM 88.9 — the only privately operated community radio in the state — using the power of media to inform, educate and advocate for communities across South Sudan.',
    primaryCtaText: 'Explore the Program',
    primaryCtaLink: '#activities',
    secondaryCtaText: 'Tune In',
    secondaryCtaLink: '#support',
    stats: [
      { value: '88.9', label: 'Maridi FM Frequency', static: true },
      { value: '20000', label: 'Listeners Reached', suffix: '+' },
      { value: '24', label: 'Hours Broadcasting', suffix: '/7', static: true },
    ],
  },

  overview: {
    eyebrow: 'Information & Media',
    title: 'The Voice of',
    titleAccent: 'the Community',
    titleEnd: '',
    subtitle:
      'Access to information is a right. MSA uses community radio and media partnerships to close the information gap in rural South Sudan — keeping communities informed, engaged and empowered to make better decisions for themselves and their families.',
    cards: [
      {
        icon: 'fas fa-tower-broadcast',
        color: 'gold',
        title: 'Maridi FM 88.9',
        text: 'The only privately operated community radio in Western Equatoria — broadcasting news, awareness, and community voices to over 20,000 regular listeners.',
      },
      {
        icon: 'fas fa-signal',
        color: 'navy',
        title: 'Media House Capacity',
        text: 'Strengthening the skills, equipment and systems of local media houses so they can deliver high-quality, independent journalism.',
      },
      {
        icon: 'fas fa-bullhorn',
        color: 'brand',
        title: 'Publication & Awareness',
        text: 'Delivering public interest campaigns on education, health, GBV, peace and governance through radio, print and community outreach.',
      },
    ],
  },

  activities: {
    eyebrow: 'What We Deliver',
    title: 'Our Media',
    titleAccent: 'Activities',
    subtitle:
      'Three focus areas that define MSA\'s work in information and media — building a community radio, strengthening local media, and delivering impactful awareness campaigns.',
    items: [
      {
        number: '01',
        icon: 'fas fa-tower-broadcast',
        color: 'gold',
        title: 'Establishment of Community FM Radios',
        badge: 'Flagship',
        text: 'MSA established Maridi FM 88.9 — a community radio in Maridi County that is used extensively by MSA and other stakeholders for awareness and sensitization programs. The radio broadcasts news, community voices, and public interest campaigns across Western Equatoria, giving a platform to the voices that are usually unheard.',
        features: ['Maridi FM 88.9 Community Radio', 'Local news & community voices', 'Broadcast across Western Equatoria', 'Public interest campaigns'],
        wide: true,
      },
      {
        number: '02',
        icon: 'fas fa-graduation-cap',
        color: 'navy',
        title: 'Strengthening Capacity of Media Houses',
        badge: 'Capacity',
        text: 'MSA invests in the people and systems behind local media — training journalists, improving editorial processes, and providing equipment support so media houses can deliver accurate, independent and high-quality coverage.',
        features: ['Journalist training', 'Editorial capacity', 'Equipment support', 'Independent journalism'],
        wide: false,
      },
      {
        number: '03',
        icon: 'fas fa-bullhorn',
        color: 'brand',
        title: 'Publication & Awareness',
        badge: 'Outreach',
        text: 'Through Maridi FM and community outreach, MSA runs massive public interest campaigns — on GBV prevention, girls\' education, HIV/AIDS awareness, peace building and good governance — reaching tens of thousands of listeners every month.',
        features: ['Public interest campaigns', 'GBV & health awareness', 'Education promotion', 'Peace & governance'],
        wide: false,
      },
    ],
    footerText: 'Every broadcast is a chance to inform, engage and empower — that is the power of community radio.',
    ctaText: 'Support Community Media',
    ctaLink: '#support',
  },

  radioFeature: {
    eyebrow: 'Maridi FM 88.9',
    title: 'The Only Private',
    titleAccent: 'Community Radio',
    subtitle:
      'Maridi FM 88.9 is the only privately operated community radio station in Western Equatoria State. It was established by MSA to give a voice to communities that had none, and it has become the primary source of news, information and awareness in the region.',
    paragraph2:
      'The station reaches over 20,000 regular listeners — including farmers, youth, women and community leaders. It is used by MSA and its partners to run awareness campaigns on GBV, HIV/AIDS, girls\' education, peace building and good governance — turning information into action.',
    image: '/images/msa8.jpeg',
    imageBadge: 'MARIDI FM 88.9',
    imageCaption: 'Maridi FM 88.9',
    imageSubcaption: 'The community\'s own radio station',
    floatCard1: { icon: 'fas fa-tower-broadcast', title: '88.9 FM', sub: 'Maridi FM' },
    floatCard2: { icon: 'fas fa-headphones', title: '20K+', sub: 'Regular listeners' },
    benefits: [
      { icon: 'fas fa-signal', color: 'gold', title: 'Wide Coverage', text: 'Broadcasting across Western Equatoria and reaching communities beyond.' },
      { icon: 'fas fa-users', color: 'navy', title: 'Community Voices', text: 'A platform where every community member can speak and be heard.' },
      { icon: 'fas fa-bullhorn', color: 'brand', title: 'Public Interest', text: 'Awareness campaigns on GBV, health, education and governance.' },
      { icon: 'fas fa-clock', color: 'red', title: '24/7 Broadcasting', text: 'Round-the-clock programming for listeners.' },
    ],
    ctaText: 'Learn More About Maridi FM',
    ctaLink: '/contact',
  },

  campaigns: {
    eyebrow: 'Our Campaigns',
    title: 'Awareness that',
    titleAccent: 'Changes Lives',
    subtitle:
      'Through Maridi FM and community outreach, MSA runs awareness campaigns that reach tens of thousands of listeners every month — turning information into real-world change.',
    items: [
      {
        icon: 'fas fa-shield-heart',
        color: 'red',
        title: 'GBV Awareness',
        text: 'Massive radio campaigns on gender-based violence — reaching over 20,000 listeners with information on prevention, response and survivor support.',
        features: ['Radio talk shows', 'Community call-ins', 'Survivor support info', 'Legal awareness'],
      },
      {
        icon: 'fas fa-graduation-cap',
        color: 'gold',
        title: 'Girls\' Education',
        text: 'Radio programs promoting girls\' education — role model stories, parent engagement, and messages on the dangers of early marriage.',
        features: ['Role model stories', 'Parent engagement', 'Early marriage prevention', 'School support info'],
      },
      {
        icon: 'fas fa-heart-pulse',
        color: 'navy',
        title: 'Health & HIV/AIDS',
        text: 'HIV/AIDS awareness programs reaching in-school and out-of-school youth — reducing new infection rates and stigma across the region.',
        features: ['HIV/AIDS awareness', 'SRH information', 'VCT referral info', 'Stigma reduction'],
      },
      {
        icon: 'fas fa-dove',
        color: 'green',
        title: 'Peace & Governance',
        text: 'Programs promoting peace, community security and good governance — amplifying voices calling for reconciliation and accountability.',
        features: ['Peace building', 'Civic education', 'Governance awareness', 'Community dialogue'],
      },
      {
        icon: 'fas fa-gavel',
        color: 'purple',
        title: 'Legal Awareness',
        text: 'Radio programs teaching communities about their rights under South Sudanese law — from child protection to GBV response.',
        features: ['Rights education', 'Child protection info', 'GBV legal info', 'Community Q&A'],
      },
      {
        icon: 'fas fa-seedling',
        color: 'pink',
        title: 'Livelihoods & Agriculture',
        text: 'Broadcasting practical tips and information for farmers, youth and women entrepreneurs — building resilience through knowledge.',
        features: ['Farming tips', 'Business advice', 'Market info', 'Skills promotion'],
      },
    ],
  },

    gallery: {
    eyebrow: 'Gallery',
    title: 'Moments of',
    titleAccent: 'Community Voice',
    subtitle:
      "Photos from MSA's media work — Maridi FM 88.9, community broadcasts, awareness campaigns and journalism training.",
    items: [
      { image: '/images/msa8.jpeg', badge: 'Featured', badgeColor: 'gold',  title: 'Maridi FM 88.9',   subtitle: 'The community\'s radio',                 size: 'large' },
      { image: '/images/msa1.jpeg', badge: 'Broadcast', badgeColor: 'navy', title: 'Live Broadcasts',  subtitle: 'Reaching 20,000+ listeners',             size: 'small' },
      { image: '/images/msa4.jpeg', badge: 'Training',  badgeColor: 'brand', title: 'Journalist Training', subtitle: 'Building media capacity',            size: 'small' },
      { image: '/images/msa3.jpeg', badge: 'Awareness', badgeColor: 'red',   title: 'Radio Awareness',  subtitle: 'Campaigns that change lives',            size: 'small' },
      { image: '/images/msa9.jpeg', badge: 'Community', badgeColor: 'pink',  title: 'Listeners',        subtitle: 'Voices amplified',                       size: 'small' },
    ],
    footerText: 'Every broadcast amplifies a voice that deserves to be heard.',
    ctaText: 'Support Community Media',
    ctaLink: '#support',
  },

  stats: {
    eyebrow: 'Our Reach',
    title: 'Media by the',
    titleAccent: 'Numbers',
    subtitle: 'Key milestones from MSA\'s information and media work.',
    items: [
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '88.9', label: 'Maridi FM Frequency', static: true },
      { icon: 'fas fa-headphones', color: 'navy', value: '20000', label: 'Regular Listeners', suffix: '+' },
      { icon: 'fas fa-clock', color: 'brand', value: '24', label: 'Hours Broadcasting', suffix: '/7', static: true },
      { icon: 'fas fa-bullhorn', color: 'red', value: '20', label: 'Weekly Programs', suffix: '+' },
      { icon: 'fas fa-users', color: 'purple', value: '1', label: 'Only Private Radio in State', static: true },
      { icon: 'fas fa-microphone', color: 'pink', value: '50', label: 'Journalists Trained', suffix: '+' },
    ],
  },

  approach: {
    eyebrow: 'Our Approach',
    title: 'How We Use Media',
    subtitle: 'A four-step approach that ensures every broadcast is impactful, ethical and community-driven.',
    steps: [
      { number: '1', color: 'gold', title: 'Listen', text: 'We start by listening to the community — understanding their information needs, concerns and priorities.' },
      { number: '2', color: 'navy', title: 'Produce', text: 'We produce high-quality radio programs — news, talk shows, campaigns and community voices — that speak to those needs.' },
      { number: '3', color: 'brand', title: 'Broadcast', text: 'Through Maridi FM 88.9 and partnerships, we broadcast to tens of thousands of listeners across the region.' },
      { number: '4', color: 'red', title: 'Engage', text: 'We turn listeners into participants — through call-ins, community events and follow-up activities that turn information into action.' },
    ],
    stats: [
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '88.9', label: 'Maridi FM', static: true },
      { icon: 'fas fa-headphones', color: 'navy', value: '20000', label: 'Listeners', suffix: '+' },
      { icon: 'fas fa-bullhorn', color: 'brand', value: '20', label: 'Weekly Programs', suffix: '+' },
      { icon: 'fas fa-microphone', color: 'red', value: '50', label: 'Journalists Trained', suffix: '+' },
    ],
  },

  testimonials: {
    eyebrow: 'Voices',
    title: 'Stories from',
    titleAccent: 'Our Listeners',
    subtitle: 'What community radio means to the people MSA serves.',
    items: [
      {
        quote: '"Maridi FM is how our community stays informed. When something happens, we listen. When we need advice, we call in. It feels like the radio is part of our family."',
        author: 'Regular Listener',
        role: 'Maridi County',
        color: 'gold',
      },
      {
        quote: '"The GBV programs opened my eyes. Before, I did not know that some things happening in our community were wrong. Now I talk to my daughters and my neighbours about it."',
        author: 'Community Member',
        role: 'Western Equatoria',
        color: 'red',
      },
      {
        quote: '"As a young journalist, being trained by MSA at Maridi FM gave me a career. I never imagined I would be hosting my own show and reaching so many people."',
        author: 'Broadcast Journalist',
        role: 'Maridi FM 88.9',
        color: 'brand',
      },
    ],
  },

  support: {
    icon: 'fas fa-tower-broadcast',
    title: 'Help Us Keep Community Voices On Air',
    text: 'Support MSA\'s media program — help us strengthen Maridi FM, train more journalists, and reach even more communities with information that matters.',
    button1Text: 'Support Community Radio',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },

  otherPrograms: {
    eyebrow: 'Explore More',
    title: 'Other',
    titleAccent: 'Programs',
    subtitle:
      "MSA works across six sectors. Discover how we're transforming communities across South Sudan.",
    items: [
      { icon: 'fas fa-graduation-cap', color: 'gold', title: 'Education', subtitle: 'Schools & scholarships', href: '/education' },
      { icon: 'fas fa-heart-pulse', color: 'red', title: 'Health', subtitle: 'PHC, SRH, HIV/AIDS', href: '/health' },
      { icon: 'fas fa-seedling', color: 'green', title: 'Resilience', subtitle: 'Food & economic recovery', href: '/resilience' },
      { icon: 'fas fa-balance-scale', color: 'blue', title: 'Governance', subtitle: 'Democracy & rule of law', href: '/governance' },
      { icon: 'fas fa-shield-halved', color: 'purple', title: 'Protection', subtitle: 'Child & gender protection', href: '/protection' },
    ],
  },
};

// ============================================================
// IMPACT PAGE — DEFAULT CONTENT
// ============================================================
export const impactPageDefaults: any = {
  hero: {
    image: '/images/msa1.jpeg',
    badge: 'MSA ANNUAL IMPACT REPORT',
    imageCaption: 'Transforming lives, building resilience, and creating sustainable change in Maridi County, South Sudan.',
    sideStats: [
      { value: '10K+', label: 'Direct Beneficiaries' },
      { value: '30K+', label: 'Radio Listeners' },
      { value: '2024', label: 'Latest Report' },
    ],
    titleLine1: 'Transforming',
    titleLine2: 'Lives',
    titleLine3: 'Across South Sudan',
    subtitle:
      'From education to health, from livelihoods to disaster resilience — our work changes lives every single day. Here is our impact, told in numbers and stories.',
    primaryCtaText: 'See Our Impact',
    primaryCtaLink: '#at-a-glance',
    secondaryCtaText: 'Partner With Us',
    secondaryCtaLink: '/contact',
    stats: [
      { value: '10663', label: 'Direct Beneficiaries 2024' },
      { value: '30000', label: 'Radio Listeners', suffix: '+' },
      { value: '582', label: 'Refugees & IDPs Supported' },
    ],
  },

  atAGlance: {
    eyebrow: '2024 at a Glance',
    title: 'One Year of',
    titleAccent: 'Measurable Change',
    subtitle:
      'In 2024, despite complex humanitarian challenges and economic pressures, MSA delivered vital health, education and economic recovery services to vulnerable youth, women, refugees and IDPs across Maridi County.',
    cards: [
      {
        icon: 'fas fa-users',
        color: 'brand',
        value: '10663',
        label: 'Direct Beneficiaries',
        text: 'Reached across education, health and economic programs.',
      },
      {
        icon: 'fas fa-tower-broadcast',
        color: 'gold',
        value: '30000',
        label: 'Community Reach',
        suffix: '+',
        text: 'Engaged with vital radio programming via Maridi FM.',
      },
      {
        icon: 'fas fa-house-chimney-user',
        color: 'red',
        value: '582',
        label: 'Refugees & IDPs',
        text: 'Provided with urgent WASH and emergency supplies (97 HHs).',
      },
      {
        icon: 'fas fa-users-line',
        color: 'navy',
        value: '480',
        label: 'Committee Members',
        text: 'Trained on disaster risk reduction and early warning systems.',
      },
    ],
  },

  programs: {
    eyebrow: 'Key Program Impacts',
    title: '2024 Program',
    titleAccent: 'Achievements',
    subtitle:
      'Five flagship programs delivering measurable change across education, health, livelihoods, media and emergency response.',
    items: [
      {
        number: '01',
        icon: 'fas fa-graduation-cap',
        color: 'brand',
        image: '/images/msa12.png',
        title: 'Access to Quality Education & Retention',
        supporter: 'Supported by Christian World Service (CWS) New Zealand',
        description:
          'MSA works to break structural barriers to education through community-backed schools, targeted scholarships and community advocacy.',
        achievements: [
          { value: '2460', label: 'Youth & Children Reached', icon: 'fas fa-users' },
          { value: '388', label: 'Maridi Secondary Enrollment', icon: 'fas fa-school' },
          { value: '83.4', label: 'Academic Pass Rate', suffix: '%', icon: 'fas fa-award', static: true },
          { value: '4', label: 'Drop-out Rate', suffix: '%', icon: 'fas fa-user-check', static: true },
          { value: '100', label: 'CSE Candidates', icon: 'fas fa-file-signature' },
          { value: '59', label: "Girls' Scholarships", icon: 'fas fa-female' },
          { value: '1890', label: 'Community Advocates', icon: 'fas fa-bullhorn' },
          { value: '41', label: 'Nursery Graduates', icon: 'fas fa-child-reaching' },
        ],
      },
      {
        number: '02',
        icon: 'fas fa-heart-pulse',
        color: 'red',
        image: '/images/msa10.jpeg',
        title: 'Sexual & Reproductive Health & HIV Prevention',
        supporter: 'Supported by Youth-Friendly Health Center & Community Campaigns',
        description:
          'Creating safe, stigma-free spaces for young people to access reproductive health education, professional counselling and hygiene management.',
        achievements: [
          { value: '6988', label: 'Youth Served', icon: 'fas fa-users' },
          { value: '178', label: 'HIV Tests & Counselling', icon: 'fas fa-vial' },
          { value: '67200', label: 'Condoms Distributed', icon: 'fas fa-shield-heart' },
          { value: '4730', label: 'Educated on STI/HIV', icon: 'fas fa-graduation-cap' },
          { value: '200', label: 'Dignity Kits Distributed', icon: 'fas fa-box' },
          { value: '573', label: "Girls' Talk Attendees", icon: 'fas fa-comments' },
          { value: '1745', label: 'SRHR Library Users', icon: 'fas fa-book' },
          { value: '130', label: 'Boys in Anti-Stigma Workshops', icon: 'fas fa-users' },
        ],
      },
      {
        number: '03',
        icon: 'fas fa-seedling',
        color: 'gold',
        image: '/images/msa1.jpeg',
        title: "Women's Economic Empowerment & Livelihoods",
        supporter: 'Supported by Fostering Financial Independence',
        description:
          'Empowering single mothers, IDPs and refugee women with business tools, technical skills and sustainable food sources.',
        achievements: [
          { value: '25', label: 'Single Mothers Trained', icon: 'fas fa-female' },
          { value: '40', label: 'Households in Agriculture', icon: 'fas fa-seedling' },
          { value: '25', label: 'Micro-Enterprises Launched', icon: 'fas fa-store' },
          { value: '40', label: 'Vegetable Gardens Established', icon: 'fas fa-carrot' },
        ],
      },
      {
        number: '04',
        icon: 'fas fa-tower-broadcast',
        color: 'navy',
        image: '/images/msa8.jpeg',
        title: 'Community Voice: Maridi FM Operation',
        supporter: 'Information as a Tool for Peace & Empowerment',
        description:
          'Maridi FM serves as a vital platform for public education, civic dialogue, social cohesion and peacebuilding across the region.',
        achievements: [
          { value: '30000', label: 'Regular Listeners', icon: 'fas fa-headphones', suffix: '+' },
          { value: '1', label: 'New High-Power Transmitter', icon: 'fas fa-signal', static: true },
          { value: '6', label: 'Weekly Programs', icon: 'fas fa-bullhorn' },
          { value: '24/7', label: 'Broadcasting', icon: 'fas fa-clock', static: true },
        ],
      },
      {
        number: '05',
        icon: 'fas fa-hand-holding-heart',
        color: 'purple',
        image: '/images/msa3.jpeg',
        title: 'Emergency & Humanitarian Support',
        supporter: 'Assisting Sudan Crisis Returnees & Refugees',
        description:
          'Responding rapidly to humanitarian displacement in close collaboration with the Relief and Rehabilitation Commission (RRC).',
        achievements: [
          { value: '582', label: 'Displaced Individuals Supported', icon: 'fas fa-users' },
          { value: '97', label: 'Households Assisted', icon: 'fas fa-house' },
          { value: '5', label: 'WASH Items Distributed', icon: 'fas fa-droplet' },
          { value: '100', label: 'Coordination with RRC', icon: 'fas fa-handshake', suffix: '%', static: true },
        ],
      },
    ],
  },

  disasterRisk: {
    eyebrow: '2023 Impact Report',
    title: 'Community Disaster',
    titleAccent: 'Risk Management',
    subtitle:
      'In partnership with World Vision Somalia, MSA strengthened local capacity for disaster resilience in Maridi County, Western Equatoria State. Through community-led structures and multi-stakeholder coordination, the project equipped local populations to proactively prepare for seasonal flooding and dry season fire hazards.',
    partnership: 'Implemented by MSA in partnership with World Vision Somalia',
    stats: [
      { icon: 'fas fa-users', color: 'brand', value: '3165', label: 'Total Reached' },
      { icon: 'fas fa-bullhorn', color: 'gold', value: '2685', label: 'Awareness Outreaches' },
      { icon: 'fas fa-users-line', color: 'navy', value: '480', label: 'Committee Members' },
      { icon: 'fas fa-map-location-dot', color: 'red', value: '4', label: 'Target Bomas' },
    ],
    ewcTitle: 'Community Early Warning System (EWC) Outreach',
    ewcText:
      'During November 2023, 8 Early Warning Committee (EWC) meetings were organized across 4 target locations (2 per boma). A total of 480 local leaders and representatives participated in establishing action plans for upcoming seasonal risks.',
    attendance: [
      { label: 'Youth', value: '9' },
      { label: 'PWDs', value: '28' },
      { label: 'IDPs', value: '83' },
      { label: 'Male', value: '361' },
      { label: 'Female', value: '444' },
      { label: 'Total', value: '480' },
    ],
    awarenessTitle: 'Public Awareness Campaigns',
    awarenessText:
      'A series of 12 public awareness campaigns (3 per location) reached 2,685 individuals directly, focusing on practical risk reduction strategies for seasonal hazards.',
    bomas: [
      { name: 'Mabirindi Boma', pwd: '12', idp: '39', male: '411', female: '309', total: '720' },
      { name: 'Mudubai Boma', pwd: '9', idp: '59', male: '381', female: '291', total: '672' },
      { name: 'Mburoko Boma', pwd: '19', idp: '37', male: '351', female: '327', total: '678' },
      { name: 'Nagbaka Boma', pwd: '7', idp: '77', male: '321', female: '294', total: '615' },
    ],
    achievements: [
      { icon: 'fas fa-fire-extinguisher', color: 'red', title: 'Fire Prevention Plans', text: 'Communities designed action plans to establish firebreaks and assembly points prior to the dry season.' },
      { icon: 'fas fa-hand-fist', color: 'brand', title: 'Local Ownership', text: 'Direct leadership from EWCs ensured sustainable community-driven risk management.' },
      { icon: 'fas fa-shirt', color: 'gold', title: 'High Visibility', text: 'T-shirt distributions improved visibility and trust among municipal partners and local stakeholders.' },
    ],
    challenges: [
      { icon: 'fas fa-cloud-showers-heavy', title: 'Unseasonal Rainfall', text: 'Heavy evening rains delayed planned sessions.' },
      { icon: 'fas fa-calendar-day', title: 'Adaptive Strategy', text: 'Sessions were rescheduled to morning hours to prevent weather disruptions and guarantee strong turnout.' },
    ],
    successStory: {
      title: 'Community Fire Safety Infrastructure',
      text: 'In Mudubai and Mburoko Bomas, community members launched a collaborative initiative to construct physical firebreaks surrounding the homes of vulnerable residents, local markets and public facilities. Additionally, Mburoko established designated safe assembly zones during fire outbreaks — demonstrating a transition from disaster response to proactive community protection.',
    },
    stakeholdersTitle: 'Project Stakeholders',
    stakeholders: [
      { icon: 'fas fa-people-group', label: 'Mission for Sustainable Advancement (MSA)' },
      { icon: 'fas fa-hands-holding-circle', label: 'World Vision Somalia' },
      { icon: 'fas fa-globe', label: 'WVUS HEA' },
      { icon: 'fas fa-fire', label: 'South Sudan Fire Brigade' },
      { icon: 'fas fa-landmark', label: 'Maridi County Local Government' },
    ],
  },

  impactNumbers: {
    eyebrow: 'Combined Impact',
    title: 'Impact by the',
    titleAccent: 'Numbers',
    subtitle: 'Cumulative results from our 2023 and 2024 programs combined.',
    items: [
      { icon: 'fas fa-users', color: 'brand', value: '10663', label: 'Direct Beneficiaries 2024' },
      { icon: 'fas fa-tower-broadcast', color: 'gold', value: '30000', label: 'Radio Listeners', suffix: '+' },
      { icon: 'fas fa-house-chimney-user', color: 'red', value: '582', label: 'Refugees & IDPs Supported' },
      { icon: 'fas fa-users-line', color: 'navy', value: '480', label: 'Committee Members Trained' },
      { icon: 'fas fa-school', color: 'brand', value: '2460', label: 'Students Reached' },
      { icon: 'fas fa-heart-pulse', color: 'red', value: '6988', label: 'Youth Health Services' },
      { icon: 'fas fa-vial', color: 'purple', value: '178', label: 'HIV Tests Performed' },
      { icon: 'fas fa-shield-heart', color: 'pink', value: '67200', label: 'Condoms Distributed' },
      { icon: 'fas fa-female', color: 'gold', value: '59', label: "Girls' Scholarships" },
      { icon: 'fas fa-seedling', color: 'green', value: '40', label: 'Households in Agriculture' },
      { icon: 'fas fa-store', color: 'brand', value: '25', label: 'Micro-Enterprises Launched' },
      { icon: 'fas fa-fire', color: 'red', value: '4', label: 'Target Bomas' },
    ],
  },

  successStories: {
    eyebrow: 'Success Stories',
    title: 'Stories from the',
    titleAccent: 'Field',
    subtitle: 'Real change, told by the communities MSA serves.',
    items: [
      {
        image: '/images/msa1.jpeg',
        badge: 'Community Fire Safety',
        badgeColor: 'red',
        title: 'Firebreaks Built by the Community',
        text: 'In Mudubai and Mburoko Bomas, community members constructed physical firebreaks around vulnerable homes, markets and public facilities — a lasting example of proactive protection.',
        tag: '2023 Disaster Risk Management',
      },
      {
        image: '/images/msa12.png',
        badge: 'Education Excellence',
        badgeColor: 'brand',
        title: 'Highest Enrollment in 5 Years',
        text: 'Maridi Secondary School enrolled 388 students — with 231 girls — achieving the highest enrollment rate in 5 years, alongside an 83.4% academic pass rate.',
        tag: '2024 Education Program',
      },
      {
        image: '/images/msa3.jpeg',
        badge: "Women's Empowerment",
        badgeColor: 'gold',
        title: 'From Relief to Self-Reliance',
        text: "25 single mothers completed business training and received startup capital — launching micro-enterprises that are now feeding their families and reducing reliance on aid.",
        tag: '2024 Livelihoods Program',
      },
    ],
  },

  partners: {
    eyebrow: 'Our Partners',
    title: 'Collaborating for',
    titleAccent: 'Lasting Change',
    subtitle: 'We do not work alone. These organisations stand with us.',
    items: [
      { icon: 'fas fa-globe', label: 'Christian World Service', subtitle: 'CWS New Zealand', color: 'brand' },
      { icon: 'fas fa-hands-holding-circle', label: 'World Vision Somalia', subtitle: 'WVUS HEA Partner', color: 'gold' },
      { icon: 'fas fa-landmark', label: 'Ministry of Health', subtitle: 'Maridi County Hospital', color: 'red' },
      { icon: 'fas fa-school', label: 'Ministry of Education', subtitle: 'Local School Authorities', color: 'navy' },
      { icon: 'fas fa-hand-holding-heart', label: 'Relief & Rehabilitation', subtitle: 'RRC South Sudan', color: 'purple' },
      { icon: 'fas fa-globe', label: 'UNOCHA & UNFPA', subtitle: 'South Sudan', color: 'pink' },
      { icon: 'fas fa-fire', label: 'Fire Brigade', subtitle: 'South Sudan', color: 'gold' },
      { icon: 'fas fa-building-columns', label: 'Maridi County', subtitle: 'Local Government', color: 'brand' },
    ],
  },

  support: {
    icon: 'fas fa-chart-line',
    title: 'Help Us Reach Even More in 2026',
    text: 'Every donation, partnership and shared voice helps us extend our impact — reaching more children, women, youth and communities across South Sudan.',
    button1Text: 'Support Our Work',
    button1Link: '/contact',
    button2Text: 'Partner With Us',
    button2Link: '/contact',
  },
};

// ============================================================
// NEWS PAGE — DEFAULT CONTENT
// ============================================================
export const newsPageDefaults: any = {
  hero: {
    eyebrow: 'News & Media',
    title: 'Stories of',
    titleAccent: 'Progress',
    subtitle:
      'Campaigns, press releases, media coverage and impact stories from across South Sudan.',
  },
  categories: [
    { id: 'education',  label: 'Education',  color: 'gold' },
    { id: 'health',     label: 'Health',     color: 'red' },
    { id: 'protection', label: 'Protection', color: 'purple' },
    { id: 'media',      label: 'Media',      color: 'navy' },
    { id: 'governance', label: 'Governance', color: 'blue' },
    { id: 'notices',    label: 'Notices',    color: 'gold' },
  ],
  articles: [
    {
      id: 'sample-1',
      title: "Girls Decide Today: MSA's Campaign Reaches 5,000 Students Across Maridi County",
      slug: 'girls-decide-today-campaign-2026',
      date: 'July 17, 2026',
      category: 'education',
      image: '/images/msa12.png',
      excerpt:
        'Using women role models to speak directly to school girls about the importance of education, the dangers of early marriage and unwanted pregnancy.',
      content:
        "In 2026, MSA expanded its flagship girls' education campaign across Maridi County, reaching over 5,000 students in 12 schools.\n\nThe campaign — themed \"Girls Decide Today and Save Your Future\" — brought together women role models, teachers and community leaders to speak directly with girls about the importance of staying in school.\n\n## What We Achieved\n\n- 5,000+ girls reached across 12 schools\n- 50 full 4-year scholarships awarded\n- 30 weekly Girls' Talk sessions held\n- 1,890 community members engaged through outreach\n\n## Why It Matters\n\nEarly marriage and unwanted pregnancy remain the biggest barriers to girls' education in South Sudan. By speaking directly to girls and their families, MSA is breaking the cycle — one conversation at a time.",
      author: 'MSA Media Team',
      featured: true,
      published: true,
    },
    {
      id: 'sample-2',
      title: 'Youth-Friendly VCT Centre Marks 10,000 HIV Tests Since 2013',
      slug: 'vct-10k-hiv-tests-milestone',
      date: 'July 10, 2026',
      category: 'health',
      image: '/images/msa10.jpeg',
      excerpt:
        "MSA's VCT services provide counselling, testing and referrals to ART clinic for all positive clients.",
      content:
        "Since opening its doors in 2013, MSA's Youth-Friendly VCT Centre at the MSA compound in Maridi has provided over 10,000 HIV tests to young people across Western Equatoria.\n\n## Youth-Friendly By Design\n\nThe centre was built with young people in mind — confidential, welcoming, and staffed by counsellors trained to work with adolescents.\n\nEvery client receives pre- and post-test counselling, and those who test positive are referred directly to the ART clinic at the main hospital.\n\n## The Numbers\n\n- 10,000+ HIV tests since 2013\n- 178 tests in 2024 alone\n- 100% of positive clients linked to ART care\n- 4,730 community members educated on STI/HIV prevention",
      author: 'Health Team',
      featured: false,
      published: true,
    },
    {
      id: 'sample-3',
      title: 'MSA Reunifies 17 Former LRA Abductees with Families',
      slug: 'msa-reunifies-17-lra-abductees',
      date: 'July 9, 2026',
      category: 'protection',
      image: '/images/msa9.jpeg',
      excerpt:
        'The children, who escaped from the Lord\'s Resistance Army, have been reunited with their families after years of separation.',
      content:
        'MSA has successfully reunified 17 children who were abducted by the Lord\'s Resistance Army (LRA) with their families in Maridi County.\n\nThe children — some of whom had been separated from their families for years — were traced through a comprehensive family reunification process led by MSA\'s child protection team.\n\n## How It Works\n\n- Family tracing and verification\n- Psychosocial support for the child and family\n- Community sensitisation to prevent stigma\n- Follow-up visits to ensure successful reintegration\n\n## A Community Effort\n\nThis work was only possible through close coordination with local authorities, police, community leaders and child protection committees.',
      author: 'Protection Team',
      featured: false,
      published: true,
    },
  ],
};

// ============================================================
// CONTACT PAGE — DEFAULT CONTENT
// ============================================================
export const contactPageDefaults: any = {
  hero: {
    eyebrow: 'Get In Touch',
    title: 'Contact',
    titleAccent: 'Us',
    subtitle:
      "Ready to make a difference? Reach out and join the movement for a better South Sudan. Whether you want to partner, volunteer, donate or simply ask a question — we'd love to hear from you.",
  },

  details: {
    eyebrow: 'Contact Details',
    title: 'Reach Us',
    titleAccent: 'Directly',
    subtitle: 'Our team is available across our offices in Juba, Maridi, Aweil and Yei.',
    offices: [
      {
        icon: 'fas fa-building',
        color: 'gold',
        label: 'Head Office',
        city: 'Juba',
        address: 'Juba, Central Equatoria State, South Sudan',
        note: 'Main coordination office',
      },
      {
        icon: 'fas fa-school',
        color: 'brand',
        label: 'Field Office',
        city: 'Maridi',
        address: 'Maridi County, Western Equatoria State, South Sudan',
        note: 'Founded here in 2000',
      },
      {
        icon: 'fas fa-city',
        color: 'brand',
        label: 'Field Office',
        city: 'Aweil',
        address: 'Aweil, Northern Bahr el Ghazal State, South Sudan',
        note: 'Northern operations',
      },
      {
        icon: 'fas fa-city',
        color: 'brand',
        label: 'Field Office',
        city: 'Yei',
        address: 'Yei, Central Equatoria State, South Sudan',
        note: 'Southern operations',
      },
    ],
    phone: '+211 925 784 075',
    phoneAlt: '',
    phoneLink: 'tel:+211925784075',
    email: 'info@msasouthsudan.org',
    emailAlt: 'maridiservice@gmail.com',
    emailLink: 'mailto:info@msasouthsudan.org',
    hoursText: 'Monday – Friday, 8:00 AM – 5:00 PM',
    hoursNote: 'Closed on weekends & public holidays',
    socials: [
      { icon: 'fab fa-facebook-f', label: 'Facebook', url: '#' },
      { icon: 'fab fa-instagram', label: 'Instagram', url: '#' },
      { icon: 'fab fa-x-twitter', label: 'X', url: '#' },
      { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: '#' },
      { icon: 'fab fa-youtube', label: 'YouTube', url: '#' },
    ],
  },

  form: {
    eyebrow: 'Send a Message',
    title: 'How Can We',
    titleAccent: 'Help You?',
    subtitle:
      "Fill out the form below and we'll get back to you within 2-3 business days.",
    successTitle: 'Message sent successfully!',
    successText: "Thank you for reaching out. We'll be in touch soon.",
    submitText: 'Send Message',
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      organization: 'Organization (optional)',
      interest: 'I am interested in',
      subject: 'Subject',
      message: 'Your Message',
      messagePlaceholder: "Tell us how you'd like to contribute or how we can help...",
    },
    interestOptions: [
      'Volunteering',
      'Partnership',
      'Donation',
      'Education Programs',
      'Health Programs',
      'Protection & GBV',
      'Media & Communications',
      'Careers',
      'Media Inquiry',
      'Other',
    ],
    web3formsKey: 'YOUR_WEB3FORMS_KEY_HERE',
  },

  map: {
    eyebrow: 'Find Us',
    title: 'Visit Our',
    titleAccent: 'Head Office',
    subtitle:
      'Our Head Office is in Juba, Central Equatoria State. Visitors are welcome during office hours — please call ahead.',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63515.49401368647!2d31.562154672484405!3d4.859435850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1713f37d1d8c6c03%3A0x1e6eab2e4f5e2b5c!2sJuba!5e0!3m2!1sen!2sss!4v1718000000000!5m2!1sen!2sss',
    directionsText: 'Get Directions',
    directionsLink: 'https://www.google.com/maps/search/?api=1&query=Juba+South+Sudan',
  },

  faq: {
    eyebrow: 'Frequently Asked',
    title: 'Common',
    titleAccent: 'Questions',
    subtitle: "Answers to questions we get asked most often.",
    items: [
      {
        question: 'How do I partner with MSA?',
        answer:
          'Reach out via the contact form above with "Partnership" selected. Our team will respond within 2-3 business days with next steps and a partnership brief. We welcome partnerships from organisations, donors, and community groups aligned with our mission.',
      },
      {
        question: 'Can I volunteer with MSA?',
        answer:
          'Yes! We welcome volunteers across all our program areas — from education and health to media and protection. Fill out the contact form with "Volunteering" selected and tell us your skills and availability. Volunteers based in Maridi, Juba, Aweil or Yei can work on-site; remote volunteers are also welcome for design, writing and technical roles.',
      },
      {
        question: 'How can I donate to MSA?',
        answer:
          "Contact us through the form with \"Donation\" selected. We'll share our bank details, mobile money options, or coordinate an in-kind donation. Every contribution — big or small — goes directly to our programs in South Sudan.",
      },
      {
        question: 'Do you offer internships?',
        answer:
          'We offer internships in communications, monitoring & evaluation, program support, and finance. Internships are typically 3-6 months and are based in our Maridi or Juba offices. Reach out via the form with "Careers" selected.',
      },
      {
        question: 'How do I request an interview or media coverage?',
        answer:
          'For press inquiries, story requests, or interview opportunities, contact us with "Media Inquiry" selected. Our communications team will respond within 24 hours on business days. We can provide photos, quotes, and background information on our work.',
      },
      {
        question: 'Where is your head office located?',
        answer:
          'Our Head Office is in Juba, Central Equatoria State, South Sudan. We also operate field offices in Maridi (Western Equatoria), Aweil (Northern Bahr el Ghazal), and Yei (Central Equatoria). The map above shows the Juba office location.',
      },
    ],
  },

  cta: {
    title: 'Ready to Make a Difference?',
    text: 'Join us in building a literate, healthy and well-informed South Sudan. Every partnership, every volunteer hour, every donation creates lasting change.',
    button1Text: 'Explore Programs',
    button1Link: '/education',
    button2Text: 'Support Our Cause',
    button2Link: '/contact',
    backgroundImage: '/images/msa4.jpeg',
  },
};

// ============================================================
// RESOURCES PAGE — DEFAULT CONTENT
// ============================================================
// ============================================================
// RESOURCES PAGE — DEFAULT CONTENT
// ============================================================
export const resourcesPageDefaults: any = {
  hero: {
    eyebrow: 'Resource Library',
    title: 'Documents &',
    titleAccent: 'Reports',
    subtitle:
      "Access MSA's annual reports, policies, research papers and organizational documents. Free to download and share.",
  },

  stats: {
    show: true,
    items: [
      { icon: 'fas fa-file-lines',     color: 'brand', value: '0', label: 'Documents', suffix: '' },
      { icon: 'fas fa-folder-tree',    color: 'gold',  value: '0', label: 'Categories', static: true },
      { icon: 'fas fa-download',       color: 'navy',  value: '0', label: 'Downloads', suffix: '' },
      { icon: 'fas fa-hourglass-half', color: 'red',   value: '2026', label: 'Coming Soon', static: true },
    ],
  },

  categories: [
    { id: 'annual-reports', label: 'Annual Reports', icon: 'fas fa-file-lines',    color: 'brand' },
    { id: 'policies',       label: 'Policies',       icon: 'fas fa-file-contract', color: 'navy' },
    { id: 'financial',      label: 'Financial',      icon: 'fas fa-coins',         color: 'gold' },
    { id: 'research',       label: 'Research',       icon: 'fas fa-book-open',     color: 'purple' },
    { id: 'guides',         label: 'Guides',         icon: 'fas fa-compass',       color: 'red' },
    { id: 'forms',          label: 'Forms',          icon: 'fas fa-file-pen',      color: 'brand' },
  ],

  documents: [],

  emptyState: {
    title: 'Resources Are On The Way',
    text: "Our team is currently preparing a curated library of annual reports, policies, financial statements and organizational documents. Check back soon — everything will be free to download and share.",
  },

  cta: {
    title: 'Need Something Specific?',
    text: "If you can't find the document you're looking for, reach out — we're happy to help.",
    button1Text: 'Contact Us',
    button1Link: '/contact',
    button2Text: 'Explore Our Work',
    button2Link: '/impact',
  },
};