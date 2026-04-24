import React from 'react';
import TitleDescription from '../TitleDescription/TitleDescription';
import styles from './ContactSection.module.scss';
import TextReveal from '../TextReveal/TextReveal';

interface ContactSectionProps {
  title: string;
  description: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, description }) => {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <TitleDescription 
          title={title} 
          description={description}
          className={styles.header}
        />
        
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>[ Name ]</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={styles.input}
                placeholder="ENTER FULL NAME"
              />
            </div>
            
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>[ Email ]</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={styles.input}
                placeholder="ENTER EMAIL ADDRESS"
              />
            </div>
          </div>
          
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="company" className={styles.label}>[ Company ]</label>
              <input
                type="text"
                id="company"
                name="company"
                className={styles.input}
                placeholder="ENTER ORGANIZATION"
              />
            </div>
            
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>[ Phone ]</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.input}
                placeholder="ENTER PHONE NUMBER"
              />
            </div>
          </div>
          
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>[ Message ]</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className={styles.textarea}
              placeholder="ENTER MESSAGE"
            />
          </div>
          
          <button type="submit" className={styles.button}>
            <TextReveal text="[ TRANSMIT MESSAGE ]" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
