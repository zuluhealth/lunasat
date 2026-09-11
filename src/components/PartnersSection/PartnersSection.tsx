import React from 'react';
import Image from 'next/image';
import TitleDescription from '../TitleDescription/TitleDescription';
import styles from './PartnersSection.module.scss';

interface Partner {
  name: string;
  logo?: string;
}

interface PartnersSectionProps {
  title: string;
  description: string;
  partners: Partner[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ title, description, partners }) => {
  return (
    <section className={styles.section} id="partners">
      <div className={styles.container}>
        <TitleDescription
          title={title}
          description={description}
          className={styles.header}
        />

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.partnerCard}>
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className={styles.logo}
                  width={120}
                  height={40}
                  sizes="120px"
                  loading="lazy"
                />
              ) : (
                <span className={styles.placeholder}>{partner.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
