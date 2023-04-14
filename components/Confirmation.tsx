import React from 'react';
import { useEffect } from 'react';
const confetti = require('canvas-confetti');

const Confirmation: React.FC = () => {

    const defaultConfettiConfig: { desktop: AnimationConfig, mobile: AnimationConfig } = {
        desktop: { startVelocity: 30, spread: 360, origin: { x: 0.73, y: 0.12 } },
        mobile: { startVelocity: 20, spread: 225, origin: { y: 0.20 } }
    };

    const triggerConfetti = () => {
        const mediaConfettiConfig = window.matchMedia("(min-width: 990px)")?.matches ? defaultConfettiConfig.desktop : defaultConfettiConfig.mobile;
        const activeMediaConfettiConfig = Object.assign(mediaConfettiConfig, { particleCount: 100, colors: ['#FFC163', '#67B3FA', '#21C06B', '#264F46'] });
        confetti.default(activeMediaConfettiConfig);
    }
    useEffect(() => {
        setTimeout(() => triggerConfetti(), 300);
    }, []);

    return (
        <rally-confirmation-details></rally-confirmation-details>
    );
};

export default Confirmation;

export interface AnimationConfig {
    startVelocity?: number;
    spread?: number;
    origin?: { y?: number, x?: number };
}