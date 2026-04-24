import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import IntroSection from '../components/IntroSection/IntroSection';
import SolutionsSection from '../components/SolutionsSection/SolutionsSection';
import TechnologySection from '../components/TechnologySection/TechnologySection';
// import PhotoSlider from '../components/PhotoSlider/PhotoSlider';
import StatsSection from '../components/StatsSection/StatsSection';
import PartnersSection from '../components/PartnersSection/PartnersSection';
import ContactSection from '../components/ContactSection/ContactSection';
import Footer from '../components/Footer/Footer';
import RevealOverlay from '../components/RevealOverlay';

export default function Home() {
  const navItems = [
    { label: 'Capabilities', href: '#solutions' },
    { label: 'Why Us', href: '#technology' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ];

  // Icons for solutions
  const sineWaveIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12C3.5 12 3.5 6 5 6C6.5 6 6.5 18 8 18C9.5 18 9.5 6 11 6C12.5 6 12.5 18 14 18C15.5 18 15.5 6 17 6C18.5 6 18.5 12 20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const scanIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7V5C3 3.89543 3.89543 3 5 3H7M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17M7 21H5C3.89543 21 3 20.1046 3 19V17M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const satelliteIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 10L21 2M7.5 12.5L4 16L8 20L11.5 16.5M10.5 13.5L13.5 10.5M6.5 6.5L17.5 17.5M3 21L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const airspaceIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const solutions = [
    {
      icon: sineWaveIcon,
      title: 'Secured Communications',
      items: [
        'Advanced RF Systems and Tactical Radios',
        'Secure Datalinks and Network Infrastructure',
        'Command and Control (C2) Platforms',
        'Encrypted Voice and Data Communications',
        'Ruggedized Equipment for Field Deployment',
        'RF Monitoring and Spectrum Management',
        'Voice Communication Systems (VCS) for Mission-Critical Operations',
        'Test & Measurement',
      ],
    },
    {
      icon: scanIcon,
      title: 'Security & Surveillance',
      items: [
        'Vehicle and Cargo Scanning Systems',
        'Port and Checkpoint Inspection Equipment',
        'Thermal and Optical Surveillance Cameras',
        'Drone Detection and Counter-UAS Systems',
      ],
    },
    {
      icon: satelliteIcon,
      title: 'Telecommunications',
      items: [
        'Satellite coverage and VSAT networks',
        'Fiber Optic and Structured Cabling',
        'Microwave Links for high-capacity transmission',
        'Data Center Solutions',
        'Mobile Network Testing',
        'Synchronization',
      ],
    },
    {
      icon: airspaceIcon,
      title: 'Airspace & Control',
      items: [
        'Air Traffic Control',
        'Airborne Systems',
        'Airborne Radios',
        'Platform Maintenance & Upgrades',
      ],
    },
  ];

  // Icons for Why Lunasat section
  const usersIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const wrenchIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3C14.5168 6.4832 14.4148 6.73216 14.4148 6.99187C14.4148 7.25158 14.5168 7.50054 14.7 7.68375L16.3163 9.3C16.4995 9.4832 16.7484 9.58516 17.0081 9.58516C17.2678 9.58516 17.5168 9.4832 17.7 9.3L21.47 5.53C21.9728 6.64107 22.1251 7.87548 21.9065 9.07203C21.688 10.2686 21.1091 11.3716 20.2453 12.2354C19.3816 13.0991 18.2786 13.678 17.082 13.8965C15.8855 14.1151 14.6511 13.9628 13.54 13.46L6.22 20.78C5.82218 21.1778 5.28261 21.4013 4.72 21.4013C4.15739 21.4013 3.61783 21.1778 3.22 20.78C2.82218 20.3822 2.59869 19.8426 2.59869 19.28C2.59869 18.7174 2.82218 18.1778 3.22 17.78L10.54 10.46C10.0372 9.34893 9.88487 8.11452 10.1035 6.91797C10.322 5.72142 10.9009 4.61841 11.7647 3.75466C12.6284 2.89091 13.7314 2.31201 14.928 2.09347C16.1245 1.87493 17.3589 2.02722 18.47 2.53L14.71 6.29L14.7 6.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const academicIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.16 10.58C18.7 12.26 19 14.07 19 16C19 16.34 18.99 16.67 18.96 17M12 14L5.84 10.58C5.3 12.26 5 14.07 5 16C5 16.34 5.01 16.67 5.04 17M12 14V22M19 22V16M5 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const differentiators = [
    {
      icon: usersIcon,
      title: 'Engineers on the Ground',
      description: "We don't hand off projects and disappear. Our engineering teams remain embedded with clients, providing hands-on support long after installation is complete.",
    },
    {
      icon: wrenchIcon,
      title: 'Preventive, Not Reactive',
      description: "Routine preventive maintenance is built into every engagement. We identify and resolve issues before they become failures—because in mission-critical environments, downtime isn't an option.",
    },
    {
      icon: academicIcon,
      title: 'Training That Lasts',
      description: "We train your operators and technicians to truly understand the systems they use, not just follow procedures. Our goal is confident, capable users who can handle day-to-day operations independently.",
    },
  ];

  const stats = [
    { value: '30', label: 'YEARS OF EXCELLENCE' },
    { value: '200+', label: 'TEAM MEMBERS' },
    { value: '2,000+', label: 'MICROWAVE LINKS INSTALLED' },
    { value: '6,000+', label: 'V-SAT INSTALLED & MANAGED' },
    { value: '57,000+', label: 'RF RADIOS INSTALLED' },
  ];

  const partners = [
    { name: 'L3Harris' },
    { name: 'Leidos' },
    { name: 'FLIR' },
    { name: 'Frequentis' },
    { name: 'Genasys' },
    { name: 'Rohde & Schwarz' },
    { name: 'Cisco' },
    { name: 'Nokia' },
    { name: 'Microchip' },
    { name: 'And More' },
  ];

  return (
    <main>
      <RevealOverlay />
      <Header navItems={navItems} />
      
      <Hero
        title="Innovative Solutions for a More Secure Society"
        subtitle="Lunasat is a systems integrator specializing in secured communications, security infrastructure, and telecommunications. We don't just install technology—we engineer, maintain, and support it for the long term."
        backgroundImage="/lunasat-background.webp"
        ctaText="Contact us"
        ctaHref="#contact"
      />
      
      <IntroSection
        title="Engineering at Our Core"
        description={[
          "With over 90% of our team comprised of engineers, every project is tackled with technical depth, a long-term vision and 25+ years of knowledge and experience in delivering mission critical solutions in harsh environments.",
          "We partner with world-class technology manufacturers to deliver the best technologies across domains. But that is not where our real value is — we leverage our highly skilled team of Field Service Representatives to provide the best support services to ensure our clients' success.",
          "From design through procurement, commissioning & support, our engineers remain on the ground with our clients. We believe in routine preventive maintenance before problems arise and when something does go wrong, we're already there."
        ]}
      />

      <StatsSection stats={stats} />

      <PartnersSection
        title="World-Class Technology Partners"
        description="We integrate solutions from industry-leading manufacturers, bringing together the best available technology with local engineering expertise and support."
        partners={partners}
      />

      {/* <PhotoSlider
        title="Our Work"
        description="A glimpse into our facilities, projects, and the cutting-edge systems we deploy for our clients worldwide."
      /> */}

      <SolutionsSection
        title="Our Capabilities"
        description="We integrate, install, maintain, and train users on mission-critical technology systems. Our work spans three core areas:"
        solutions={solutions}
      />
      
      <TechnologySection
        title="The Lunasat Difference"
        description="Technology is only as good as the team behind it. Here is what sets us apart:"
        items={differentiators}
      />

      <ContactSection
        title="Let's Talk"
        description=""
      />
      
      <Footer
        navLinks={[
          { label: 'Capabilities', href: '#solutions' },
          { label: 'Why Us', href: '#technology' },
          { label: 'Partners', href: '#partners' },
          { label: 'Contact', href: '#contact' },
        ]}
        legalLinks={[
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms & Conditions', href: '#terms' },
          { label: 'Contact us', href: '#contact' },
        ]}
      />
    </main>
  );
}
