import React from 'react';

const ConnectedSystemsDiagram = () => {
  return (
    <svg 
      viewBox="0 0 1920 1080" 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#0a0c0f' 
      }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="40%" stopColor="#0d1a2d" />
          <stop offset="70%" stopColor="#0f1e33" />
          <stop offset="100%" stopColor="#132640" />
        </linearGradient>
        
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2332" />
          <stop offset="100%" stopColor="#0d1218" />
        </linearGradient>
        
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1a2e" />
          <stop offset="100%" stopColor="#061220" />
        </linearGradient>
        
        <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00cc6a" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4488ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2266dd" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00a8cc" stopOpacity="0.6" />
        </linearGradient>
        
        {/* Glow filters */}
        <filter id="greenGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00ff88" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="blueGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#4488ff" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="cyanGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00d4ff" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Line pattern for data flow */}
        <pattern id="dataFlow" patternUnits="userSpaceOnUse" width="20" height="1">
          <rect width="10" height="1" fill="#00ff88" opacity="0.6">
            <animate attributeName="x" from="0" to="20" dur="1s" repeatCount="indefinite" />
          </rect>
        </pattern>
        
        {/* Grid pattern */}
        <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3050" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Background layers */}
      <rect width="1920" height="1080" fill="url(#skyGradient)" />
      
      {/* Subtle grid overlay */}
      <rect width="1920" height="1080" fill="url(#gridPattern)" opacity="0.4" />
      
      {/* Horizon line and ground */}
      <path d="M0 720 Q 480 700, 960 720 Q 1440 740, 1920 720 L1920 1080 L0 1080 Z" fill="url(#groundGradient)" />
      
      {/* Ocean area (right side) */}
      <path d="M1200 720 Q 1400 710, 1600 730 Q 1800 750, 1920 720 L1920 1080 L1200 1080 Z" fill="url(#oceanGradient)" opacity="0.8" />
      
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <circle 
          key={i}
          cx={Math.random() * 1920}
          cy={Math.random() * 400}
          r={Math.random() * 1.5 + 0.5}
          fill="#ffffff"
          opacity={Math.random() * 0.5 + 0.2}
        />
      ))}
      
      {/* ============ CONNECTION LINES ============ */}
      
      {/* Central hub connections - from command center */}
      <g opacity="0.6">
        {/* To Satellite */}
        <path d="M960 850 Q 960 400, 960 180" stroke="#00ff88" strokeWidth="2" fill="none" strokeDasharray="8 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* To Commercial Aircraft */}
        <path d="M960 850 Q 700 600, 400 320" stroke="#00ff88" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        {/* To Cargo Plane */}
        <path d="M960 850 Q 1200 500, 1500 280" stroke="#00ff88" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        {/* To Drone Swarm */}
        <path d="M960 850 Q 600 700, 280 480" stroke="#4488ff" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.8s" repeatCount="indefinite" />
        </path>
        
        {/* To Commercial Truck Fleet */}
        <path d="M960 850 Q 600 880, 300 870" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* To Mining Equipment */}
        <path d="M960 850 Q 700 920, 520 920" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* To Cargo Ship */}
        <path d="M960 850 Q 1200 850, 1550 880" stroke="#4488ff" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.2s" repeatCount="indefinite" />
        </path>
        
        {/* To Research Vessel */}
        <path d="M960 850 Q 1400 920, 1750 950" stroke="#4488ff" strokeWidth="1.5" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.2s" repeatCount="indefinite" />
        </path>
        
        {/* To Data Center */}
        <path d="M960 850 Q 1100 870, 1300 850" stroke="#00ff88" strokeWidth="2" fill="none" strokeDasharray="8 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        {/* Satellite to aircraft connections */}
        <path d="M960 180 Q 680 250, 400 320" stroke="#00ff88" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M960 180 Q 1230 230, 1500 280" stroke="#00ff88" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
        </path>
        
        {/* LEO constellation connections */}
        <path d="M760 120 Q 860 150, 960 180" stroke="#4488ff" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.4" />
        <path d="M1160 120 Q 1060 150, 960 180" stroke="#4488ff" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.4" />
      </g>
      
      {/* ============ SPACE ASSETS ============ */}
      
      {/* Main Communications Satellite */}
      <g transform="translate(960, 180)" filter="url(#greenGlowFilter)">
        {/* Solar panels */}
        <rect x="-60" y="-8" width="45" height="16" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        <rect x="15" y="-8" width="45" height="16" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Panel lines */}
        <line x1="-55" y1="-8" x2="-55" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="-45" y1="-8" x2="-45" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="-35" y1="-8" x2="-35" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="-25" y1="-8" x2="-25" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="-8" x2="20" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="30" y1="-8" x2="30" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="-8" x2="40" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        <line x1="50" y1="-8" x2="50" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.5" />
        {/* Main body */}
        <rect x="-12" y="-12" width="24" height="24" fill="#0d1a28" stroke="#00ff88" strokeWidth="1.5" />
        {/* Dish */}
        <ellipse cx="0" cy="18" rx="8" ry="4" fill="none" stroke="#00ff88" strokeWidth="1" />
        <line x1="0" y1="12" x2="0" y2="18" stroke="#00ff88" strokeWidth="1" />
        {/* Status indicator */}
        <circle cx="0" cy="0" r="3" fill="#00ff88">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* LEO Constellation satellites */}
      <g transform="translate(760, 120)" filter="url(#blueGlowFilter)" opacity="0.8">
        <rect x="-20" y="-4" width="15" height="8" fill="#1a2a40" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="5" y="-4" width="15" height="8" fill="#1a2a40" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-6" y="-6" width="12" height="12" fill="#0d1a28" stroke="#4488ff" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="#4488ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
      
      <g transform="translate(1160, 120)" filter="url(#blueGlowFilter)" opacity="0.8">
        <rect x="-20" y="-4" width="15" height="8" fill="#1a2a40" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="5" y="-4" width="15" height="8" fill="#1a2a40" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-6" y="-6" width="12" height="12" fill="#0d1a28" stroke="#4488ff" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="#4488ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* ============ AIRCRAFT ============ */}
      
      {/* Commercial Aircraft */}
      <g transform="translate(400, 320) rotate(-15)" filter="url(#greenGlowFilter)">
        {/* Fuselage */}
        <ellipse cx="0" cy="0" rx="45" ry="8" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Wings */}
        <path d="M-10 0 L-30 -35 L-25 -35 L0 0" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        <path d="M-10 0 L-30 35 L-25 35 L0 0" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Tail */}
        <path d="M40 0 L50 -15 L50 -12 L42 0" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Engines */}
        <ellipse cx="-20" cy="-20" rx="8" ry="3" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <ellipse cx="-20" cy="20" rx="8" ry="3" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        {/* Cockpit */}
        <ellipse cx="-40" cy="0" rx="6" ry="5" fill="#00ff88" opacity="0.3" />
        {/* Windows */}
        <g opacity="0.5">
          <circle cx="-25" cy="0" r="1.5" fill="#00ff88" />
          <circle cx="-18" cy="0" r="1.5" fill="#00ff88" />
          <circle cx="-11" cy="0" r="1.5" fill="#00ff88" />
          <circle cx="-4" cy="0" r="1.5" fill="#00ff88" />
        </g>
      </g>
      
      {/* Cargo Aircraft */}
      <g transform="translate(1500, 280) rotate(10)" filter="url(#greenGlowFilter)">
        {/* Fuselage - larger/boxier for cargo */}
        <rect x="-50" y="-12" width="100" height="24" rx="8" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Wings */}
        <path d="M-15 -12 L-40 -50 L-35 -50 L-5 -12" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        <path d="M-15 12 L-40 50 L-35 50 L-5 12" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* Tail */}
        <path d="M45 -12 L55 -30 L55 -25 L48 -12" fill="#1a2a40" stroke="#00ff88" strokeWidth="1" />
        {/* 4 Engines */}
        <ellipse cx="-25" cy="-32" rx="10" ry="4" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <ellipse cx="-25" cy="32" rx="10" ry="4" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <ellipse cx="-10" cy="-25" rx="8" ry="3" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <ellipse cx="-10" cy="25" rx="8" ry="3" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        {/* Cockpit */}
        <path d="M-50 -8 Q-58 0, -50 8" fill="#00ff88" opacity="0.3" />
      </g>
      
      {/* Commercial Drone Swarm */}
      <g filter="url(#blueGlowFilter)">
        {/* Drone 1 */}
        <g transform="translate(280, 480)">
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <circle cx="-12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="-12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <rect x="-4" y="-4" width="8" height="8" fill="#0d1a28" stroke="#4488ff" strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill="#4488ff">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Drone 2 */}
        <g transform="translate(240, 520) scale(0.8)">
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <circle cx="-12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="-12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <rect x="-4" y="-4" width="8" height="8" fill="#0d1a28" stroke="#4488ff" strokeWidth="1" />
        </g>
        {/* Drone 3 */}
        <g transform="translate(320, 450) scale(0.7)">
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#4488ff" strokeWidth="2" />
          <circle cx="-12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="-12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="-12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <circle cx="12" cy="12" r="5" fill="none" stroke="#4488ff" strokeWidth="1" />
          <rect x="-4" y="-4" width="8" height="8" fill="#0d1a28" stroke="#4488ff" strokeWidth="1" />
        </g>
      </g>
      
      {/* ============ GROUND VEHICLES ============ */}
      
      {/* Commercial Truck Fleet */}
      <g transform="translate(300, 870)" filter="url(#cyanGlowFilter)">
        {/* Truck 1 - Semi */}
        <g>
          {/* Trailer */}
          <rect x="-60" y="-20" width="80" height="35" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          {/* Cab */}
          <rect x="25" y="-15" width="25" height="30" rx="3" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="-40" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="-20" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="35" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          {/* Windshield */}
          <rect x="27" y="-12" width="10" height="12" fill="#00d4ff" opacity="0.3" />
          {/* Antenna */}
          <line x1="45" y1="-15" x2="45" y2="-25" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="45" cy="-27" r="2" fill="#00d4ff">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Truck 2 */}
        <g transform="translate(-100, 30) scale(0.8)">
          <rect x="-60" y="-20" width="80" height="35" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          <rect x="25" y="-15" width="25" height="30" rx="3" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="-40" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="-20" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="35" cy="18" r="6" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
        </g>
      </g>
      
      {/* Mining/Construction Equipment */}
      <g transform="translate(520, 920)" filter="url(#cyanGlowFilter)">
        {/* Excavator */}
        <g>
          {/* Tracks */}
          <rect x="-35" y="10" width="70" height="18" rx="8" fill="#0d1a28" stroke="#00d4ff" strokeWidth="1" />
          {/* Body */}
          <rect x="-25" y="-15" width="50" height="28" rx="3" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          {/* Cab */}
          <rect x="5" y="-25" width="18" height="15" rx="2" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          <rect x="7" y="-23" width="8" height="8" fill="#00d4ff" opacity="0.3" />
          {/* Boom arm */}
          <path d="M-20 -5 L-60 -40 L-55 -45 L-15 -10" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          <path d="M-60 -40 L-90 -20 L-85 -15 L-55 -38" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          {/* Bucket */}
          <path d="M-90 -20 L-105 -10 L-100 5 L-85 -5 Z" fill="#1a2a40" stroke="#00d4ff" strokeWidth="1" />
          {/* Antenna */}
          <line x1="15" y1="-25" x2="15" y2="-35" stroke="#00d4ff" strokeWidth="1" />
          <circle cx="15" cy="-37" r="2" fill="#00d4ff">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      
      {/* ============ MARITIME VESSELS ============ */}
      
      {/* Cargo Ship */}
      <g transform="translate(1550, 880)" filter="url(#blueGlowFilter)">
        {/* Hull */}
        <path d="M-80 0 L-70 20 L70 20 L80 0 L70 -5 L-70 -5 Z" fill="#1a2a40" stroke="#4488ff" strokeWidth="1" />
        {/* Containers */}
        <rect x="-50" y="-25" width="20" height="20" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-28" y="-25" width="20" height="20" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-6" y="-25" width="20" height="20" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-50" y="-45" width="20" height="20" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        <rect x="-28" y="-45" width="20" height="20" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        {/* Bridge */}
        <rect x="30" y="-40" width="30" height="35" rx="2" fill="#1a2a40" stroke="#4488ff" strokeWidth="1" />
        <rect x="35" y="-35" width="12" height="10" fill="#4488ff" opacity="0.3" />
        {/* Mast */}
        <line x1="45" y1="-40" x2="45" y2="-60" stroke="#4488ff" strokeWidth="1" />
        <circle cx="45" cy="-62" r="3" fill="#4488ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Radar dish */}
        <ellipse cx="45" cy="-55" rx="8" ry="3" fill="none" stroke="#4488ff" strokeWidth="1" />
      </g>
      
      {/* Research/Survey Vessel */}
      <g transform="translate(1750, 950)" filter="url(#blueGlowFilter)">
        {/* Hull */}
        <path d="M-50 0 L-45 15 L45 15 L50 0 L45 -5 L-45 -5 Z" fill="#1a2a40" stroke="#4488ff" strokeWidth="1" />
        {/* Superstructure */}
        <rect x="-20" y="-30" width="35" height="25" rx="2" fill="#1a2a40" stroke="#4488ff" strokeWidth="1" />
        <rect x="-15" y="-25" width="10" height="8" fill="#4488ff" opacity="0.3" />
        {/* Equipment deck */}
        <rect x="20" y="-15" width="15" height="10" fill="#0d1a28" stroke="#4488ff" strokeWidth="0.5" />
        {/* Crane */}
        <line x1="30" y1="-15" x2="30" y2="-35" stroke="#4488ff" strokeWidth="1" />
        <line x1="30" y1="-35" x2="45" y2="-25" stroke="#4488ff" strokeWidth="1" />
        {/* Antenna array */}
        <line x1="0" y1="-30" x2="0" y2="-50" stroke="#4488ff" strokeWidth="1" />
        <circle cx="0" cy="-52" r="3" fill="#4488ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="0" cy="-45" rx="6" ry="2" fill="none" stroke="#4488ff" strokeWidth="1" />
      </g>
      
      {/* ============ COMMAND CENTER ============ */}
      
      {/* Central Operations Hub */}
      <g transform="translate(960, 850)" filter="url(#greenGlowFilter)">
        {/* Main building */}
        <rect x="-60" y="-50" width="120" height="60" rx="3" fill="#1a2a40" stroke="#00ff88" strokeWidth="2" />
        {/* Roof detail */}
        <rect x="-55" y="-55" width="110" height="8" fill="#0d1a28" stroke="#00ff88" strokeWidth="1" />
        {/* Windows */}
        <g opacity="0.4">
          <rect x="-45" y="-40" width="15" height="12" fill="#00ff88" />
          <rect x="-25" y="-40" width="15" height="12" fill="#00ff88" />
          <rect x="-5" y="-40" width="15" height="12" fill="#00ff88" />
          <rect x="15" y="-40" width="15" height="12" fill="#00ff88" />
          <rect x="35" y="-40" width="15" height="12" fill="#00ff88" />
          <rect x="-45" y="-22" width="15" height="12" fill="#00ff88" />
          <rect x="-25" y="-22" width="15" height="12" fill="#00ff88" />
          <rect x="-5" y="-22" width="15" height="12" fill="#00ff88" />
          <rect x="15" y="-22" width="15" height="12" fill="#00ff88" />
          <rect x="35" y="-22" width="15" height="12" fill="#00ff88" />
        </g>
        {/* Antenna array */}
        <line x1="-40" y1="-55" x2="-40" y2="-80" stroke="#00ff88" strokeWidth="1.5" />
        <line x1="0" y1="-55" x2="0" y2="-90" stroke="#00ff88" strokeWidth="2" />
        <line x1="40" y1="-55" x2="40" y2="-80" stroke="#00ff88" strokeWidth="1.5" />
        {/* Satellite dishes */}
        <ellipse cx="-40" cy="-82" rx="8" ry="4" fill="none" stroke="#00ff88" strokeWidth="1" />
        <ellipse cx="40" cy="-82" rx="8" ry="4" fill="none" stroke="#00ff88" strokeWidth="1" />
        {/* Main antenna */}
        <circle cx="0" cy="-95" r="5" fill="#00ff88">
          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Signal waves */}
        <circle cx="0" cy="-95" r="15" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="15;40;15" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-95" r="25" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.2">
          <animate attributeName="r" values="25;55;25" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Data Center */}
      <g transform="translate(1300, 850)" filter="url(#greenGlowFilter)">
        {/* Building */}
        <rect x="-40" y="-40" width="80" height="50" rx="2" fill="#1a2a40" stroke="#00ff88" strokeWidth="1.5" />
        {/* Server indicators */}
        <g>
          <rect x="-30" y="-32" width="6" height="3" fill="#00ff88" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x="-20" y="-32" width="6" height="3" fill="#00ff88" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.7s" repeatCount="indefinite" />
          </rect>
          <rect x="-10" y="-32" width="6" height="3" fill="#00ff88" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.4s" repeatCount="indefinite" />
          </rect>
          <rect x="0" y="-32" width="6" height="3" fill="#00ff88" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="10" y="-32" width="6" height="3" fill="#00ff88" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.55s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="-32" width="6" height="3" fill="#00ff88" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.3;0.5" dur="0.8s" repeatCount="indefinite" />
          </rect>
        </g>
        {/* Cooling units */}
        <rect x="-35" y="-5" width="12" height="12" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <rect x="-18" y="-5" width="12" height="12" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <rect x="-1" y="-5" width="12" height="12" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        <rect x="16" y="-5" width="12" height="12" fill="#0d1a28" stroke="#00ff88" strokeWidth="0.5" />
        {/* Antenna */}
        <line x1="0" y1="-40" x2="0" y2="-55" stroke="#00ff88" strokeWidth="1" />
        <circle cx="0" cy="-58" r="3" fill="#00ff88">
          <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* ============ LABELS ============ */}
      
      <g fontFamily="'SF Pro Display', -apple-system, sans-serif" fontSize="11" letterSpacing="0.1em" textAnchor="middle">
        {/* Asset labels */}
        <text x="960" y="230" fill="#00ff88" opacity="0.8">GEO SATELLITE</text>
        <text x="760" y="160" fill="#4488ff" opacity="0.7" fontSize="9">LEO CONSTELLATION</text>
        <text x="1160" y="160" fill="#4488ff" opacity="0.7" fontSize="9">LEO CONSTELLATION</text>
        <text x="400" y="390" fill="#00ff88" opacity="0.8">COMMERCIAL AIRCRAFT</text>
        <text x="1500" y="350" fill="#00ff88" opacity="0.8">CARGO AIRCRAFT</text>
        <text x="280" y="550" fill="#4488ff" opacity="0.8">SURVEY DRONE SWARM</text>
        <text x="300" y="960" fill="#00d4ff" opacity="0.8">LOGISTICS FLEET</text>
        <text x="520" y="1000" fill="#00d4ff" opacity="0.8">AUTONOMOUS EQUIPMENT</text>
        <text x="1550" y="930" fill="#4488ff" opacity="0.8">CARGO VESSEL</text>
        <text x="1750" y="1000" fill="#4488ff" opacity="0.8">RESEARCH VESSEL</text>
        <text x="960" y="780" fill="#00ff88" opacity="0.9" fontSize="12" fontWeight="600">OPERATIONS CENTER</text>
        <text x="1300" y="780" fill="#00ff88" opacity="0.8">DATA CENTER</text>
      </g>
      
      {/* ============ TITLE AND BRANDING ============ */}
      
      <g fontFamily="'SF Pro Display', -apple-system, sans-serif">
        {/* Title */}
        <text x="100" y="70" fill="#ffffff" fontSize="28" fontWeight="600" letterSpacing="0.05em">INTEGRATED NETWORK</text>
        <text x="100" y="100" fill="rgba(255,255,255,0.5)" fontSize="14" letterSpacing="0.15em">MULTI-DOMAIN CONNECTIVITY PLATFORM</text>
        
        {/* Legend */}
        <g transform="translate(100, 950)">
          <text fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="0.15em">NETWORK DOMAINS</text>
          
          <g transform="translate(0, 25)">
            <circle cx="5" cy="0" r="4" fill="#00ff88" />
            <text x="20" y="4" fill="rgba(255,255,255,0.6)" fontSize="10">SATELLITE / COMMAND</text>
          </g>
          
          <g transform="translate(0, 50)">
            <circle cx="5" cy="0" r="4" fill="#4488ff" />
            <text x="20" y="4" fill="rgba(255,255,255,0.6)" fontSize="10">AERIAL / MARITIME</text>
          </g>
          
          <g transform="translate(0, 75)">
            <circle cx="5" cy="0" r="4" fill="#00d4ff" />
            <text x="20" y="4" fill="rgba(255,255,255,0.6)" fontSize="10">GROUND / LOGISTICS</text>
          </g>
        </g>
      </g>
      
      {/* Corner accent */}
      <g transform="translate(1820, 50)">
        <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
        <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.5" />
        <rect x="-3" y="-3" width="6" height="6" fill="#00ff88" opacity="0.7" />
      </g>
      
    </svg>
  );
};

export default ConnectedSystemsDiagram;
