import React from 'react';
import styles from '@/styles/FeatureCard.module.scss';

interface FeatureCardProps {
  iconSrc: string;
  iconAlt: string;
  text: string;
  subText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconSrc, iconAlt, text, subText }) => {
  return (
    <div className={styles.featureCard}>
      <img src={iconSrc} alt={iconAlt} className={styles.icon} />
      <p className={styles.text}>{text}</p>
      <p className={styles.text}>{subText}</p>
    </div>
  );
};

export default FeatureCard;