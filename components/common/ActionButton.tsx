import React from 'react';
import styles from '@/styles/ActionButton.module.scss';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;