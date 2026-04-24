import React from 'react';
import styles from './Footer.module.scss';
import TextReveal from '../TextReveal/TextReveal';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  navLinks?: FooterLink[];
  legalLinks?: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ navLinks = [], legalLinks = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <a href="#home" className={styles.logo}>
            <img
              src="/lunasat-full.svg"
              alt="Lunasat"
              className={styles.logoImage}
            />
          </a>
          
          <div className={styles.copyright}>
            COPYRIGHT © {currentYear} LUNASAT INC.
          </div>
        </div>
        
        <div className={styles.gridOverlay} />
        <div className={styles.divider} />
        
        <div className={styles.bottom}>
          <nav className={styles.nav}>
            <div className={styles.navColumn}>
              <span className={styles.columnHeader}>NAVIGATION</span>
              {navLinks.map((link, index) => (
                <a key={index} href={link.href} className={styles.link}>
                  <TextReveal text={link.label} trigger="hover" />
                </a>
              ))}
            </div>

            <div className={styles.navColumn}>
              <span className={styles.columnHeader}>LEGAL</span>
              {legalLinks.map((link, index) => (
                <a key={index} href={link.href} className={styles.link}>
                  <TextReveal text={link.label} trigger="hover" />
                </a>
              ))}
            </div>

            <div className={styles.navColumn}>
              <span className={styles.columnHeader}>CONNECT</span>
              <a
                href="https://www.linkedin.com/company/lunasat/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H2V21H6V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <TextReveal text="LinkedIn" trigger="hover" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
