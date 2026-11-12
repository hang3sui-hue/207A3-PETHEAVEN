// Draws a friendly cartoon portrait of a cat or dog with SVG.
// Every pet uses the same component; only the colours and shapes change (props).
// Because the pictures are drawn in code, the site needs no photo files.

export default function PetArt({ species, art, name, className = '', cover = false }) {
  const { fur, accent, muzzle, ear, pattern, bg, eyes = '#2b2420' } = art
  const isCat = species === 'Cat'
  const inner = isCat ? '#f4a7a3' : accent

  return (
    <svg
      className={`pet-art ${className}`}
      viewBox="0 0 200 200"
      preserveAspectRatio={cover ? 'xMidYMid slice' : 'xMidYMid meet'}
      role="img" aria-label={`Drawing of ${name}, a ${species.toLowerCase()}`}>
      <rect width="200" height="200" fill={bg} />
      <circle cx="160" cy="38" r="54" fill="#ffffff" opacity="0.35" />
      <circle cx="28" cy="176" r="40" fill="#ffffff" opacity="0.3" />

      {/* body */}
      <ellipse cx="100" cy="205" rx="74" ry="52" fill={fur} />
      {pattern === 'patch' && <ellipse cx="100" cy="196" rx="30" ry="36" fill={muzzle} />}

      {/* ears behind the head */}
      {ear === 'pointy' && (
        <g>
          <path d="M44 82 L52 22 L94 56 Z" fill={fur} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
          <path d="M156 82 L148 22 L106 56 Z" fill={fur} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
          <path d="M55 70 L58 36 L83 57 Z" fill={inner} />
          <path d="M145 70 L142 36 L117 57 Z" fill={inner} />
        </g>
      )}
      {ear === 'upright' && (
        <g>
          <path d="M46 78 Q46 30 62 22 Q86 40 92 58 Z" fill={fur} />
          <path d="M154 78 Q154 30 138 22 Q114 40 108 58 Z" fill={fur} />
          <path d="M56 66 Q57 40 64 34 Q78 46 82 58 Z" fill={muzzle} opacity="0.9" />
          <path d="M144 66 Q143 40 136 34 Q122 46 118 58 Z" fill={muzzle} opacity="0.9" />
        </g>
      )}

      {/* head */}
      <ellipse cx="100" cy="102" rx={isCat ? 60 : 58} ry={isCat ? 54 : 56} fill={fur} />

      {/* fur patterns */}
      {pattern === 'stripes' && (
        <g stroke={accent} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M100 52 L100 70" />
          <path d="M84 55 L88 70" />
          <path d="M116 55 L112 70" />
          <path d="M44 100 L58 104" />
          <path d="M156 100 L142 104" />
        </g>
      )}
      {pattern === 'patch' && <ellipse cx="74" cy="92" rx="22" ry="20" fill={accent} />}
      {pattern === 'mask' && <path d="M100 66 Q70 96 72 132 L128 132 Q130 96 100 66 Z" fill={muzzle} />}
      {pattern === 'calico' && (
        <g>
          <path d="M48 96 Q50 56 92 50 Q84 80 60 100 Z" fill={accent} />
          <path d="M152 92 Q148 60 116 52 Q122 74 146 98 Z" fill="#3b302b" />
        </g>
      )}

      {/* floppy ears in front of the head */}
      {ear === 'floppy' && (
        <g>
          <path d="M50 64 Q24 70 30 124 Q36 144 54 132 Q62 100 66 72 Z" fill={accent} />
          <path d="M150 64 Q176 70 170 124 Q164 144 146 132 Q138 100 134 72 Z" fill={accent} />
        </g>
      )}

      {/* muzzle */}
      {isCat ? (
        <g fill={muzzle}>
          <ellipse cx="89" cy="124" rx="14" ry="11" />
          <ellipse cx="111" cy="124" rx="14" ry="11" />
        </g>
      ) : (
        <ellipse cx="100" cy="128" rx="30" ry="22" fill={muzzle} />
      )}

      {/* eyes */}
      <g>
        <ellipse cx="78" cy="98" rx="8" ry={isCat ? 9 : 8} fill={eyes} />
        <ellipse cx="122" cy="98" rx="8" ry={isCat ? 9 : 8} fill={eyes} />
        {isCat && (
          <g fill="#1d1a18">
            <ellipse cx="78" cy="98" rx="3" ry="7" />
            <ellipse cx="122" cy="98" rx="3" ry="7" />
          </g>
        )}
        <circle cx="81" cy="94" r="2.6" fill="#fff" />
        <circle cx="125" cy="94" r="2.6" fill="#fff" />
      </g>

      {/* nose and mouth */}
      {isCat ? (
        <path d="M94 114 L106 114 L100 121 Z" fill="#e8818a" />
      ) : (
        <ellipse cx="100" cy="116" rx="10" ry="7" fill="#2b2420" />
      )}
      <path
        d={isCat ? 'M100 121 Q100 130 92 131 M100 121 Q100 130 108 131' : 'M100 123 Q100 136 90 137 M100 123 Q100 136 110 137'}
        stroke="#2b2420"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {!isCat && <path d="M94 138 Q100 150 106 138 Z" fill="#ef8a95" />}

      {/* whiskers for cats */}
      {isCat && (
        <g stroke="#2b2420" strokeWidth="1.4" opacity="0.55" strokeLinecap="round">
          <path d="M74 122 L44 116" />
          <path d="M74 128 L44 132" />
          <path d="M126 122 L156 116" />
          <path d="M126 128 L156 132" />
        </g>
      )}

      {/* cheeks */}
      <circle cx="64" cy="118" r="7" fill="#f28b82" opacity="0.28" />
      <circle cx="136" cy="118" r="7" fill="#f28b82" opacity="0.28" />
    </svg>
  )
}
