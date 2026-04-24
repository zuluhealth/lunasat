import React from 'react';

const EncryptedRFIllustration = () => {
  // Generate frequency hopping pattern points
  const generateHoppingPattern = (startX, width, baseY, seed = 0) => {
    const points = [];
    const frequencies = [0, 1, 3, 2, 4, 1, 3, 0, 2, 4, 3, 1, 4, 2, 0, 3, 1, 4, 2, 0];
    const hopWidth = width / frequencies.length;
    
    frequencies.forEach((freq, i) => {
      const x = startX + (i * hopWidth);
      const y = baseY - (freq * 35);
      points.push({ x, y, freq });
    });
    
    return points;
  };

  const hoppingPoints = generateHoppingPattern(480, 960, 540);

  return (
    <svg 
      viewBox="0 0 1920 1080" 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#060810' 
      }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0e18" />
          <stop offset="50%" stopColor="#060810" />
          <stop offset="100%" stopColor="#0a1020" />
        </linearGradient>
        
        <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
          <stop offset="20%" stopColor="#00ff88" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#00ff88" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </linearGradient>
        
        <linearGradient id="jamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff3344" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff3344" stopOpacity="0" />
        </linearGradient>
        
        <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4444ff" />
          <stop offset="25%" stopColor="#00ccff" />
          <stop offset="50%" stopColor="#00ff88" />
          <stop offset="75%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#ff4444" />
        </linearGradient>
        
        <linearGradient id="encryptGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00ffaa" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Filters */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#00ff88" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feFlood floodColor="#ff3344" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#4488ff" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
        
        {/* Patterns */}
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2a40" strokeWidth="0.5" opacity="0.5" />
        </pattern>
        
        <pattern id="binaryPattern" width="100" height="20" patternUnits="userSpaceOnUse">
          <text x="0" y="14" fill="#00ff88" opacity="0.15" fontSize="10" fontFamily="monospace">01001011 10110100 11010010</text>
        </pattern>
        
        {/* Clip paths */}
        <clipPath id="spectrumClip">
          <rect x="480" y="350" width="960" height="220" />
        </clipPath>
      </defs>
      
      {/* Background */}
      <rect width="1920" height="1080" fill="url(#bgGradient)" />
      <rect width="1920" height="1080" fill="url(#gridPattern)" />
      
      {/* Binary data overlay */}
      <rect width="1920" height="1080" fill="url(#binaryPattern)" opacity="0.3" />
      
      {/* ============ TITLE SECTION ============ */}
      <g fontFamily="'SF Pro Display', -apple-system, sans-serif">
        <text x="100" y="80" fill="#ffffff" fontSize="32" fontWeight="600" letterSpacing="0.02em">
          SECURE RF COMMUNICATIONS
        </text>
        <text x="100" y="115" fill="rgba(255,255,255,0.5)" fontSize="14" letterSpacing="0.2em">
          FREQUENCY HOPPING SPREAD SPECTRUM • AES-256 ENCRYPTION • ANTI-JAM WAVEFORMS
        </text>
      </g>
      
      {/* ============ SPECTRUM ANALYZER DISPLAY ============ */}
      
      {/* Main spectrum frame */}
      <g>
        {/* Outer frame */}
        <rect x="460" y="160" width="1000" height="450" fill="none" stroke="#1a3050" strokeWidth="1" rx="4" />
        <rect x="465" y="165" width="990" height="440" fill="#050810" stroke="#0a1a2a" strokeWidth="1" rx="2" />
        
        {/* Frequency bands background */}
        <g opacity="0.3">
          <rect x="480" y="180" width="960" height="40" fill="#0a1525" />
          <rect x="480" y="220" width="960" height="40" fill="#080d18" />
          <rect x="480" y="260" width="960" height="40" fill="#0a1525" />
          <rect x="480" y="300" width="960" height="40" fill="#080d18" />
          <rect x="480" y="340" width="960" height="40" fill="#0a1525" />
          <rect x="480" y="380" width="960" height="40" fill="#080d18" />
          <rect x="480" y="420" width="960" height="40" fill="#0a1525" />
          <rect x="480" y="460" width="960" height="40" fill="#080d18" />
          <rect x="480" y="500" width="960" height="40" fill="#0a1525" />
          <rect x="480" y="540" width="960" height="40" fill="#080d18" />
        </g>
        
        {/* Frequency labels (Y-axis) */}
        <g fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace" textAnchor="end">
          <text x="470" y="205">450 MHz</text>
          <text x="470" y="245">425 MHz</text>
          <text x="470" y="285">400 MHz</text>
          <text x="470" y="325">375 MHz</text>
          <text x="470" y="365">350 MHz</text>
          <text x="470" y="405">325 MHz</text>
          <text x="470" y="445">300 MHz</text>
          <text x="470" y="485">275 MHz</text>
          <text x="470" y="525">250 MHz</text>
          <text x="470" y="565">225 MHz</text>
        </g>
        
        {/* Time labels (X-axis) */}
        <g fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace" textAnchor="middle">
          <text x="480" y="595">T₀</text>
          <text x="600" y="595">T₁</text>
          <text x="720" y="595">T₂</text>
          <text x="840" y="595">T₃</text>
          <text x="960" y="595">T₄</text>
          <text x="1080" y="595">T₅</text>
          <text x="1200" y="595">T₆</text>
          <text x="1320" y="595">T₇</text>
          <text x="1440" y="595">T₈</text>
        </g>
      </g>
      
      {/* ============ JAMMING/INTERFERENCE ZONES ============ */}
      
      {/* Jamming zone 1 */}
      <g filter="url(#redGlow)" opacity="0.6">
        <rect x="650" y="280" width="180" height="100" fill="url(#jamGradient)" rx="2">
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
        {/* Noise pattern */}
        <g opacity="0.5">
          {[...Array(30)].map((_, i) => (
            <line 
              key={`jam1-${i}`}
              x1={660 + Math.random() * 160}
              y1={290 + Math.random() * 80}
              x2={660 + Math.random() * 160}
              y2={290 + Math.random() * 80 + 10}
              stroke="#ff3344"
              strokeWidth="2"
              opacity={Math.random() * 0.8}
            >
              <animate 
                attributeName="opacity" 
                values={`${Math.random()};${Math.random()};${Math.random()}`} 
                dur={`${0.1 + Math.random() * 0.3}s`} 
                repeatCount="indefinite" 
              />
            </line>
          ))}
        </g>
      </g>
      
      {/* Jamming zone 2 */}
      <g filter="url(#redGlow)" opacity="0.5">
        <rect x="1100" y="400" width="200" height="80" fill="url(#jamGradient)" rx="2">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <g opacity="0.5">
          {[...Array(25)].map((_, i) => (
            <line 
              key={`jam2-${i}`}
              x1={1110 + Math.random() * 180}
              y1={410 + Math.random() * 60}
              x2={1110 + Math.random() * 180}
              y2={410 + Math.random() * 60 + 8}
              stroke="#ff3344"
              strokeWidth="2"
              opacity={Math.random() * 0.7}
            >
              <animate 
                attributeName="opacity" 
                values={`${Math.random()};${Math.random()};${Math.random()}`} 
                dur={`${0.1 + Math.random() * 0.2}s`} 
                repeatCount="indefinite" 
              />
            </line>
          ))}
        </g>
      </g>
      
      {/* Jamming labels */}
      <g fontSize="9" fontFamily="monospace" fill="#ff3344" opacity="0.8">
        <text x="740" y="275" textAnchor="middle">HOSTILE JAMMING</text>
        <text x="1200" y="395" textAnchor="middle">INTERFERENCE</text>
      </g>
      
      {/* ============ FREQUENCY HOPPING PATH ============ */}
      
      {/* Hopping path background glow */}
      <g filter="url(#glow)">
        <path 
          d={`M ${hoppingPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
          fill="none" 
          stroke="#00ff88" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </g>
      
      {/* Main hopping path */}
      <path 
        d={`M ${hoppingPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
        fill="none" 
        stroke="#00ff88" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="0.5s" repeatCount="indefinite" />
      </path>
      
      {/* Frequency hop points */}
      {hoppingPoints.map((point, i) => (
        <g key={i} transform={`translate(${point.x}, ${point.y})`}>
          {/* Outer ring */}
          <circle r="8" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
          </circle>
          {/* Inner dot */}
          <circle r="4" fill="#00ff88" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" begin={`${i * 0.05}s`} />
          </circle>
          {/* Center */}
          <circle r="2" fill="#ffffff" />
        </g>
      ))}
      
      {/* Moving signal indicator */}
      <circle r="6" fill="#00ff88" filter="url(#glow)">
        <animateMotion 
          dur="4s" 
          repeatCount="indefinite"
          path={`M ${hoppingPoints.map((p, i) => `${i === 0 ? '' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
        />
      </circle>
      
      {/* ============ ENCRYPTION VISUALIZATION ============ */}
      
      {/* Encryption tunnel overlay */}
      <g opacity="0.4">
        <rect x="480" y="180" width="960" height="400" fill="url(#encryptGradient)" rx="2" />
      </g>
      
      {/* Encryption indicators along path */}
      {hoppingPoints.filter((_, i) => i % 3 === 0).map((point, i) => (
        <g key={`enc-${i}`} transform={`translate(${point.x}, ${point.y - 25})`} opacity="0.7">
          <rect x="-12" y="-8" width="24" height="16" fill="#0a1525" stroke="#00ff88" strokeWidth="0.5" rx="2" />
          <text y="4" textAnchor="middle" fill="#00ff88" fontSize="7" fontFamily="monospace">AES</text>
        </g>
      ))}
      
      {/* ============ COMMUNICATION ENDPOINTS ============ */}
      
      {/* Transmitter (Left) */}
      <g transform="translate(200, 400)">
        {/* Radio body */}
        <rect x="-50" y="-60" width="100" height="120" fill="#0a1525" stroke="#00ff88" strokeWidth="1.5" rx="4" />
        <rect x="-45" y="-55" width="90" height="70" fill="#050810" stroke="#0a2030" strokeWidth="1" rx="2" />
        
        {/* Display screen */}
        <rect x="-40" y="-50" width="80" height="40" fill="#0a1020" stroke="#00ff88" strokeWidth="0.5" rx="1" />
        <text x="0" y="-35" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">TX ACTIVE</text>
        <text x="0" y="-22" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" repeatCount="indefinite" />
          HOPPING
        </text>
        
        {/* Indicators */}
        <g transform="translate(-35, 25)">
          <circle cx="0" cy="0" r="4" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.3s" repeatCount="indefinite" />
          </circle>
          <text x="12" y="3" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">PWR</text>
          
          <circle cx="50" cy="0" r="4" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.2s" repeatCount="indefinite" />
          </circle>
          <text x="62" y="3" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">ENC</text>
        </g>
        
        {/* Antenna */}
        <line x1="30" y1="-60" x2="30" y2="-100" stroke="#00ff88" strokeWidth="2" />
        <line x1="30" y1="-100" x2="20" y2="-90" stroke="#00ff88" strokeWidth="1.5" />
        <line x1="30" y1="-100" x2="40" y2="-90" stroke="#00ff88" strokeWidth="1.5" />
        
        {/* RF waves emanating */}
        <g opacity="0.5">
          <path d="M50 -80 Q70 -80, 70 -60" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M55 -85 Q85 -85, 85 -55" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </path>
          <path d="M60 -90 Q100 -90, 100 -50" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </g>
        
        {/* Label */}
        <text x="0" y="85" textAnchor="middle" fill="#00ff88" fontSize="11" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">TRANSMITTER</text>
      </g>
      
      {/* Receiver (Right) */}
      <g transform="translate(1720, 400)">
        {/* Radio body */}
        <rect x="-50" y="-60" width="100" height="120" fill="#0a1525" stroke="#00ff88" strokeWidth="1.5" rx="4" />
        <rect x="-45" y="-55" width="90" height="70" fill="#050810" stroke="#0a2030" strokeWidth="1" rx="2" />
        
        {/* Display screen */}
        <rect x="-40" y="-50" width="80" height="40" fill="#0a1020" stroke="#00ff88" strokeWidth="0.5" rx="1" />
        <text x="0" y="-35" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">RX SYNC</text>
        <text x="0" y="-22" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" repeatCount="indefinite" begin="0.1s" />
          DECRYPT
        </text>
        
        {/* Indicators */}
        <g transform="translate(-35, 25)">
          <circle cx="0" cy="0" r="4" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.3s" repeatCount="indefinite" begin="0.1s" />
          </circle>
          <text x="12" y="3" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">PWR</text>
          
          <circle cx="50" cy="0" r="4" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.2s" repeatCount="indefinite" begin="0.15s" />
          </circle>
          <text x="62" y="3" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">DEC</text>
        </g>
        
        {/* Antenna */}
        <line x1="-30" y1="-60" x2="-30" y2="-100" stroke="#00ff88" strokeWidth="2" />
        <line x1="-30" y1="-100" x2="-40" y2="-90" stroke="#00ff88" strokeWidth="1.5" />
        <line x1="-30" y1="-100" x2="-20" y2="-90" stroke="#00ff88" strokeWidth="1.5" />
        
        {/* RF waves incoming */}
        <g opacity="0.5">
          <path d="M-50 -80 Q-70 -80, -70 -60" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.5;0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M-55 -85 Q-85 -85, -85 -55" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.5;0" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </path>
          <path d="M-60 -90 Q-100 -90, -100 -50" fill="none" stroke="#00ff88" strokeWidth="1">
            <animate attributeName="opacity" values="0;0.5;0" dur="1s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </g>
        
        {/* Label */}
        <text x="0" y="85" textAnchor="middle" fill="#00ff88" fontSize="11" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">RECEIVER</text>
      </g>
      
      {/* ============ CONNECTION BEAM ============ */}
      
      {/* Encrypted data beam */}
      <g opacity="0.3">
        <rect x="270" y="385" width="1180" height="30" fill="url(#secureGradient)" rx="15">
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Data packets flowing */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`packet-${i}`}>
          <rect width="30" height="10" rx="2" fill="#00ff88" opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.6}s`}>
              <mpath href="#dataPath" />
            </animateMotion>
          </rect>
        </g>
      ))}
      <path id="dataPath" d="M270 400 L1450 400" fill="none" />
      
      {/* ============ ENCRYPTION DETAIL PANEL ============ */}
      
      <g transform="translate(100, 650)">
        {/* Panel frame */}
        <rect x="0" y="0" width="350" height="200" fill="#0a1020" stroke="#1a3050" strokeWidth="1" rx="4" />
        <rect x="5" y="5" width="340" height="30" fill="#0a1525" rx="2" />
        <text x="175" y="25" textAnchor="middle" fill="#00ff88" fontSize="12" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">ENCRYPTION LAYER</text>
        
        {/* Key exchange visualization */}
        <g transform="translate(25, 60)">
          <text fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">CIPHER: AES-256-GCM</text>
          <text y="18" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">KEY EXCHANGE: ECDH P-384</text>
          <text y="36" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">HMAC: SHA-384</text>
          
          {/* Key visualization */}
          <g transform="translate(0, 55)">
            <text fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">SESSION KEY:</text>
            <rect x="0" y="8" width="300" height="20" fill="#050810" stroke="#1a3050" strokeWidth="0.5" rx="2" />
            <text x="10" y="22" fill="#00ff88" fontSize="9" fontFamily="monospace" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
              7F4A 2B91 E8C3 5D6F 9A12 B4E7...
            </text>
          </g>
          
          {/* Status */}
          <g transform="translate(0, 100)">
            <circle cx="5" cy="5" r="4" fill="#00ff88">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="15" y="9" fill="#00ff88" fontSize="9" fontFamily="monospace">SECURE CHANNEL ESTABLISHED</text>
          </g>
        </g>
      </g>
      
      {/* ============ FREQUENCY HOPPING DETAIL PANEL ============ */}
      
      <g transform="translate(500, 650)">
        {/* Panel frame */}
        <rect x="0" y="0" width="400" height="200" fill="#0a1020" stroke="#1a3050" strokeWidth="1" rx="4" />
        <rect x="5" y="5" width="390" height="30" fill="#0a1525" rx="2" />
        <text x="200" y="25" textAnchor="middle" fill="#4488ff" fontSize="12" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">FHSS PARAMETERS</text>
        
        <g transform="translate(25, 55)">
          <text fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">HOP RATE: 1,000 hops/sec</text>
          <text y="18" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">CHANNELS: 2,500</text>
          <text y="36" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">BANDWIDTH: 225-450 MHz</text>
          <text y="54" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">DWELL TIME: 1ms</text>
          
          {/* Hopping sequence visualization */}
          <g transform="translate(0, 75)">
            <text fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">CURRENT SEQUENCE:</text>
            <g transform="translate(0, 15)">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <g key={i} transform={`translate(${i * 35}, 0)`}>
                  <rect width="30" height="25" fill="#050810" stroke="#4488ff" strokeWidth="0.5" rx="2">
                    <animate attributeName="stroke" values="#4488ff;#00ff88;#4488ff" dur="0.5s" repeatCount="indefinite" begin={`${i * 0.05}s`} />
                  </rect>
                  <text x="15" y="17" textAnchor="middle" fill="#4488ff" fontSize="10" fontFamily="monospace">
                    CH{Math.floor(Math.random() * 99) + 1}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </g>
      </g>
      
      {/* ============ ANTI-JAM METRICS PANEL ============ */}
      
      <g transform="translate(950, 650)">
        {/* Panel frame */}
        <rect x="0" y="0" width="350" height="200" fill="#0a1020" stroke="#1a3050" strokeWidth="1" rx="4" />
        <rect x="5" y="5" width="340" height="30" fill="#0a1525" rx="2" />
        <text x="175" y="25" textAnchor="middle" fill="#ff6644" fontSize="12" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">ANTI-JAM STATUS</text>
        
        <g transform="translate(25, 55)">
          {/* Metrics */}
          <text fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">PROCESSING GAIN: +32 dB</text>
          <text y="18" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">JAM RESISTANCE: HIGH</text>
          <text y="36" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">DETECTED THREATS: 2</text>
          
          {/* Threat bars */}
          <g transform="translate(0, 60)">
            <text fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">JAMMING INTENSITY:</text>
            
            {/* Bar 1 */}
            <g transform="translate(0, 15)">
              <rect width="200" height="12" fill="#0a0a0a" stroke="#1a2030" strokeWidth="0.5" rx="2" />
              <rect width="140" height="12" fill="#ff3344" opacity="0.6" rx="2">
                <animate attributeName="width" values="140;160;140" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="210" y="10" fill="#ff3344" fontSize="9" fontFamily="monospace">70%</text>
            </g>
            
            {/* Bar 2 */}
            <g transform="translate(0, 35)">
              <rect width="200" height="12" fill="#0a0a0a" stroke="#1a2030" strokeWidth="0.5" rx="2" />
              <rect width="80" height="12" fill="#ff6644" opacity="0.6" rx="2">
                <animate attributeName="width" values="80;100;80" dur="1.5s" repeatCount="indefinite" />
              </rect>
              <text x="210" y="10" fill="#ff6644" fontSize="9" fontFamily="monospace">40%</text>
            </g>
          </g>
          
          {/* Status */}
          <g transform="translate(0, 130)">
            <circle cx="5" cy="5" r="4" fill="#00ff88">
              <animate attributeName="fill" values="#00ff88;#ffcc00;#00ff88" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="15" y="9" fill="#00ff88" fontSize="9" fontFamily="monospace">LINK MAINTAINED - EVADING</text>
          </g>
        </g>
      </g>
      
      {/* ============ WAVEFORM DETAIL ============ */}
      
      <g transform="translate(1350, 650)">
        {/* Panel frame */}
        <rect x="0" y="0" width="450" height="200" fill="#0a1020" stroke="#1a3050" strokeWidth="1" rx="4" />
        <rect x="5" y="5" width="440" height="30" fill="#0a1525" rx="2" />
        <text x="225" y="25" textAnchor="middle" fill="#00d4ff" fontSize="12" fontFamily="'SF Pro Display', sans-serif" letterSpacing="0.1em">WAVEFORM ANALYSIS</text>
        
        {/* Waveform display */}
        <g transform="translate(25, 50)">
          <rect width="400" height="100" fill="#050810" stroke="#1a2030" strokeWidth="0.5" rx="2" />
          
          {/* Grid lines */}
          <g stroke="#1a2030" strokeWidth="0.5" opacity="0.5">
            <line x1="0" y1="50" x2="400" y2="50" />
            <line x1="100" y1="0" x2="100" y2="100" />
            <line x1="200" y1="0" x2="200" y2="100" />
            <line x1="300" y1="0" x2="300" y2="100" />
          </g>
          
          {/* Encrypted waveform */}
          <path 
            d="M0 50 Q10 20, 20 50 Q30 80, 40 50 Q50 15, 60 50 Q70 85, 80 50 Q90 25, 100 50 Q110 75, 120 50 Q130 20, 140 50 Q150 80, 160 50 Q170 30, 180 50 Q190 70, 200 50 Q210 25, 220 50 Q230 75, 240 50 Q250 20, 260 50 Q270 80, 280 50 Q290 35, 300 50 Q310 65, 320 50 Q330 25, 340 50 Q350 75, 360 50 Q370 30, 380 50 Q390 70, 400 50"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1.5"
            opacity="0.8"
          >
            <animate attributeName="d" 
              values="M0 50 Q10 20, 20 50 Q30 80, 40 50 Q50 15, 60 50 Q70 85, 80 50 Q90 25, 100 50 Q110 75, 120 50 Q130 20, 140 50 Q150 80, 160 50 Q170 30, 180 50 Q190 70, 200 50 Q210 25, 220 50 Q230 75, 240 50 Q250 20, 260 50 Q270 80, 280 50 Q290 35, 300 50 Q310 65, 320 50 Q330 25, 340 50 Q350 75, 360 50 Q370 30, 380 50 Q390 70, 400 50;
                     M0 50 Q10 80, 20 50 Q30 20, 40 50 Q50 85, 60 50 Q70 15, 80 50 Q90 75, 100 50 Q110 25, 120 50 Q130 80, 140 50 Q150 20, 160 50 Q170 70, 180 50 Q190 30, 200 50 Q210 75, 220 50 Q230 25, 240 50 Q250 80, 260 50 Q270 20, 280 50 Q290 65, 300 50 Q310 35, 320 50 Q330 75, 340 50 Q350 25, 360 50 Q370 70, 380 50 Q390 30, 400 50;
                     M0 50 Q10 20, 20 50 Q30 80, 40 50 Q50 15, 60 50 Q70 85, 80 50 Q90 25, 100 50 Q110 75, 120 50 Q130 20, 140 50 Q150 80, 160 50 Q170 30, 180 50 Q190 70, 200 50 Q210 25, 220 50 Q230 75, 240 50 Q250 20, 260 50 Q270 80, 280 50 Q290 35, 300 50 Q310 65, 320 50 Q330 25, 340 50 Q350 75, 360 50 Q370 30, 380 50 Q390 70, 400 50"
              dur="0.5s" 
              repeatCount="indefinite" 
            />
          </path>
          
          {/* Labels */}
          <text x="200" y="120" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">TIME →</text>
        </g>
        
        {/* Waveform specs */}
        <g transform="translate(25, 165)" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
          <text>GMSK • 9600 bps • BT=0.3</text>
        </g>
      </g>
      
      {/* ============ CORNER BRANDING ============ */}
      
      <g transform="translate(1820, 50)">
        <rect x="-25" y="-25" width="50" height="50" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3" transform="rotate(45)" />
        <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.5" transform="rotate(45)" />
        <circle r="4" fill="#00ff88" opacity="0.8" />
      </g>
      
    </svg>
  );
};

export default EncryptedRFIllustration;
