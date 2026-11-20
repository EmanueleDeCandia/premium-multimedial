import { useId } from "react";
import { Play } from "lucide-react";
import type { WindowKind } from "../data/content";
import { useTilt } from "../lib/hooks";
import { cn } from "../utils/cn";

/* ---------------------------------------------------------------------------
   Illustrazioni vettoriali delle finestre (ispirate alla moodboard allegata).
   Ogni finestra ha un interno illuminato con danzatori in silhouette e
   ante/sash che si aprono al passaggio del cursore, al focus o in "auto-open".
   --------------------------------------------------------------------------- */

type IdFn = (name: string) => string;

function useSvgIds(prefix: string): IdFn {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (name: string) => `${prefix}-${name}-${raw}`;
}

const url = (id: string) => `url(#${id})`;

type Pose = "arabesque" | "releve" | "jete";

function DancerShape({ pose, c }: { pose: Pose; c: string }) {
  if (pose === "releve") {
    return (
      <>
        <circle cx="0" cy="-32" r="4.2" fill={c} />
        <path d="M0 -27 L0 -11" stroke={c} strokeWidth="5.4" strokeLinecap="round" />
        <path
          d="M-0.5 -25 Q-11 -33 -6 -43 Q0 -47 6 -43 Q11 -33 0.5 -25"
          stroke={c}
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M-11 -10 Q0 -15 11 -10 Q0 -6 -11 -10Z" fill={c} />
        <path d="M-1.2 -10 L-1.7 17" stroke={c} strokeWidth="2.9" strokeLinecap="round" />
        <path d="M1.2 -10 L1.7 17" stroke={c} strokeWidth="2.9" strokeLinecap="round" />
      </>
    );
  }
  if (pose === "jete") {
    return (
      <>
        <circle cx="2.5" cy="-31" r="4.2" fill={c} />
        <path d="M1.5 -26 L0 -11" stroke={c} strokeWidth="5.4" strokeLinecap="round" />
        <path d="M1.5 -23.5 Q8 -29 15 -34" stroke={c} strokeWidth="2.1" strokeLinecap="round" fill="none" />
        <path d="M1 -23.5 Q-6 -24 -13.5 -28" stroke={c} strokeWidth="2.1" strokeLinecap="round" fill="none" />
        <path d="M-10 -10.5 Q0 -15 10 -10.5 Q0 -6.5 -10 -10.5Z" fill={c} />
        <path d="M1 -10.5 Q10 -9 19.5 -4" stroke={c} strokeWidth="2.9" strokeLinecap="round" fill="none" />
        <path d="M-1 -10.5 Q-10 -9 -19.5 -6" stroke={c} strokeWidth="2.9" strokeLinecap="round" fill="none" />
      </>
    );
  }
  return (
    <>
      <circle cx="-0.5" cy="-31" r="4.2" fill={c} />
      <path d="M-0.5 -26 L1.2 -11" stroke={c} strokeWidth="5.4" strokeLinecap="round" />
      <path d="M-0.2 -23.5 Q-6 -31 -9.5 -41" stroke={c} strokeWidth="2.1" strokeLinecap="round" fill="none" />
      <path d="M0.4 -23.5 Q9 -26.5 17.5 -25.5" stroke={c} strokeWidth="2.1" strokeLinecap="round" fill="none" />
      <path d="M-9.5 -9.8 Q1.5 -15.5 13 -11.8 Q2 -6.4 -9.5 -9.8Z" fill={c} />
      <path d="M0.8 -10 L-0.6 17" stroke={c} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 -10.6 Q12.5 -11.5 23.5 -17.5" stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </>
  );
}

function Dancer({
  x,
  y,
  s = 1,
  pose = "arabesque",
  flip = false,
  color = "#120A14",
  delay = 0,
}: {
  x: number;
  y: number;
  s?: number;
  pose?: Pose;
  flip?: boolean;
  color?: string;
  delay?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="dancer" style={{ animationDelay: `${delay}s` }}>
        <DancerShape pose={pose} c={color} />
      </g>
    </g>
  );
}

function CommonDefs({ id }: { id: IdFn }) {
  return (
    <>
      <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE6B8" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#F4B26A" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#F2A65A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={id("hot")} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4DA" stopOpacity="1" />
        <stop offset="50%" stopColor="#FFC680" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FFC680" stopOpacity="0" />
      </radialGradient>
      <pattern id={id("dots")} width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.55" fill="#fff" fillOpacity="0.2" />
      </pattern>
      <pattern id={id("dotsDark")} width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.6" fill="#000" fillOpacity="0.16" />
      </pattern>
    </>
  );
}

const oct = (cx: number, cy: number, r: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const a = ((22.5 + i * 45) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

const diamond = (cx: number, cy: number, r = 8) => `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;

/* ---------- 1. Finestra a timpano (corallo) ---------- */
export function PedimentWindow({ className }: { className?: string }) {
  const id = useSvgIds("ped");
  const cream = "#F2EDDB";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <CommonDefs id={id} />
        <clipPath id={id("open")}>
          <rect x="68" y="63" width="64" height="91" />
        </clipPath>
        <pattern id={id("lat")} x="68" y="63" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 0L16 16M16 0L0 16" stroke="#ECE6D0" strokeWidth="1.7" />
        </pattern>
        <pattern id={id("lat2")} x="68" y="114.5" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 0L16 16M16 0L0 16" stroke="#CFC7AA" strokeWidth="1.7" />
        </pattern>
        <mask id={id("m1")} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <rect width="200" height="200" fill="#fff" />
          <polygon points={oct(100, 85, 13)} fill="#000" />
        </mask>
        <mask id={id("m2")} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <rect width="200" height="200" fill="#fff" />
          <polygon points={oct(100, 134.5, 12)} fill="#000" />
        </mask>
      </defs>

      <polygon points="52,52.5 100,35 148,52.5" fill="#C4513F" />
      <polygon points="52,48 100,30 148,48" fill="#B4A66C" />
      <polygon points="64,46 100,35 136,46" fill={url(id("dotsDark"))} />
      <rect x="50.5" y="47" width="99" height="5" fill="#A0924F" />
      <rect x="56" y="52" width="88" height="2.6" fill="#EBA48F" />

      <rect x="60" y="54.6" width="80" height="106.4" fill={cream} />
      <rect x="64" y="59" width="72" height="98" fill="#E2DAC0" />

      <g clipPath={url(id("open"))}>
        <rect x="68" y="63" width="64" height="91" fill="#1A2030" />
        <ellipse className="win-glow" cx="100" cy="112" rx="46" ry="54" fill={url(id("glow"))} />
        <ellipse className="win-glow-hot" cx="100" cy="112" rx="40" ry="48" fill={url(id("hot"))} />
        <Dancer x={98} y={133} s={1} pose="arabesque" />
      </g>

      {/* anta superiore */}
      <rect className="win-tint" x="68" y="63" width="64" height="44" fill="#3D4A64" fillOpacity="0.82" />
      <g className="win-tint">
        <polygon points={diamond(116, 71)} fill="#6A4C66" />
        <polygon points={diamond(76, 95)} fill="#4A3550" />
        <polygon points={diamond(124, 95)} fill="#6A4C66" />
      </g>
      <rect x="68" y="63" width="64" height="44" fill={url(id("dots"))} />
      <rect x="68" y="63" width="64" height="44" fill={url(id("lat"))} mask={url(id("m1"))} />
      <polygon points={oct(100, 85, 13)} fill="none" stroke="#ECE6D0" strokeWidth="1.7" />

      {/* anta inferiore (sash che si solleva) */}
      <g className="win-sash">
        <rect className="win-tint" x="68" y="114.5" width="64" height="39.5" fill="#4A5670" fillOpacity="0.82" />
        <g className="win-tint">
          <polygon points={diamond(76, 130.5)} fill="#5B4560" />
          <polygon points={diamond(124, 146.5)} fill="#6A4C66" />
        </g>
        <rect x="68" y="114.5" width="64" height="39.5" fill={url(id("dots"))} />
        <rect x="68" y="114.5" width="64" height="39.5" fill={url(id("lat2"))} mask={url(id("m2"))} />
        <polygon points={oct(100, 134.5, 12)} fill="none" stroke="#CFC7AA" strokeWidth="1.7" />
        <rect x="64" y="108" width="72" height="6.5" fill={cream} />
        <rect x="64" y="113.2" width="72" height="1.4" fill="#EBA48F" />
        <rect x="64" y="114.5" width="4" height="40" fill={cream} />
        <rect x="132" y="114.5" width="4" height="40" fill={cream} />
        <rect x="64" y="154" width="72" height="3" fill={cream} />
      </g>

      <rect x="54" y="161" width="92" height="7" fill="#B4A66C" />
      <rect x="54" y="161" width="92" height="7" fill={url(id("dotsDark"))} />
      <rect x="57" y="168" width="86" height="3" fill="#C4513F" />
    </svg>
  );
}

/* ---------- 2. Finestra classica ad arco (crema) ---------- */
export function ClassicalWindow({ className }: { className?: string }) {
  const id = useSvgIds("cla");
  const opening = "M74 166V102A26 26 0 0 1 126 102V166Z";
  const left = "M74 166V102A26 26 0 0 1 100 76V166Z";
  const right = "M100 76A26 26 0 0 1 126 102V166H100Z";
  const stone = "#F5F2E9";
  const shade = "#CDBFB3";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <CommonDefs id={id} />
        <clipPath id={id("open")}>
          <path d={opening} />
        </clipPath>
      </defs>

      <path d="M43 63A73 73 0 0 1 157 63Z" fill={stone} />
      <path
        d="M47.5 63A68.5 68.5 0 0 1 152.5 63"
        fill="none"
        stroke="#BFB1A5"
        strokeWidth="1.6"
        strokeDasharray="0.6 2.4"
        strokeLinecap="round"
      />
      <path d="M54 63A62 62 0 0 1 146 63" fill="none" stroke={shade} strokeWidth="2.6" />
      <path d="M62 63A54 54 0 0 1 138 63" fill="none" stroke="#E3D9CE" strokeWidth="1.4" />
      <path d="M95.5 46.5h9l-1.6 9h-5.8z" fill="#D8CCC0" />

      <rect x="41" y="62" width="118" height="5" fill={stone} />
      <rect x="45" y="67" width="110" height="4.5" fill={shade} />
      <rect x="49" y="71.5" width="102" height="3" fill="#E5DCD1" />

      {[52, 134].map((x) => (
        <g key={x}>
          <rect x={x} y="74.5" width="14" height="93.5" fill="#F3EFE5" />
          <rect x={x + 5.5} y="88" width="3" height="74" fill="#DCD1C6" />
          <circle cx={x + 7} cy="81" r="3.6" fill="none" stroke={shade} strokeWidth="1.4" />
          <circle cx={x + 7} cy="81" r="1.2" fill={shade} />
        </g>
      ))}

      <path d="M68 168V100A32 32 0 0 1 132 100V168Z" fill={stone} />
      <path d="M71 168V101A29 29 0 0 1 129 101V168Z" fill="#E0D6CA" />
      <path d="M96.5 67.5h7l-1 7h-5z" fill="#D2C5B8" />

      <g clipPath={url(id("open"))}>
        <rect x="70" y="70" width="60" height="100" fill="#0E1F1D" />
        <ellipse className="win-glow" cx="100" cy="124" rx="40" ry="54" fill={url(id("glow"))} />
        <ellipse className="win-glow-hot" cx="100" cy="124" rx="34" ry="48" fill={url(id("hot"))} />
        <Dancer x={100} y={146} s={1.05} pose="releve" delay={-2} />
      </g>

      <g className="win-case-l">
        <path className="win-tint" d={left} fill="#1E3A33" fillOpacity="0.84" />
        <path d={left} fill={url(id("dots"))} />
        <path d={left} fill="none" stroke="#EFEADF" strokeWidth="2.4" />
        <path d="M74 126H100" stroke="#EFEADF" strokeWidth="2.4" />
      </g>
      <g className="win-case-r">
        <path className="win-tint" d={right} fill="#1E3A33" fillOpacity="0.84" />
        <path className="win-tint" d="M100 76A26 26 0 0 1 126 102V126H100Z" fill="#6E7D3A" fillOpacity="0.62" />
        <path d={right} fill={url(id("dots"))} />
        <path d={right} fill="none" stroke="#EFEADF" strokeWidth="2.4" />
        <path d="M100 126H126" stroke="#EFEADF" strokeWidth="2.4" />
      </g>

      <rect x="62" y="168" width="76" height="5" fill={stone} />
      <rect x="57" y="173" width="86" height="5" fill={shade} />
      <rect x="64" y="178" width="12" height="6" fill="#DCD1C6" />
      <rect x="124" y="178" width="12" height="6" fill="#DCD1C6" />
    </svg>
  );
}

/* ---------- 3. Bifora gotica (sabbia) ---------- */
export function GothicWindow({ className }: { className?: string }) {
  const id = useSvgIds("got");
  const outer = "M58 178V100Q58 58 100 30Q142 58 142 100V178Z";
  const inner = "M66 176V102Q66 66 100 42Q134 66 134 102V176Z";
  const lancetL = "M72 172V120Q72 102 84 93Q96 102 96 120V172Z";
  const lancetR = "M104 172V120Q104 102 116 93Q128 102 128 120V172Z";
  const lobes = [0, 60, 120, 180, 240, 300].map((a) => ({
    cx: +(100 + 8 * Math.cos((a * Math.PI) / 180)).toFixed(2),
    cy: +(70 + 8 * Math.sin((a * Math.PI) / 180)).toFixed(2),
  }));
  const ring = Array.from({ length: 12 }, (_, i) => ({
    cx: +(100 + 14 * Math.cos((i * 30 * Math.PI) / 180)).toFixed(2),
    cy: +(70 + 14 * Math.sin((i * 30 * Math.PI) / 180)).toFixed(2),
  }));
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <CommonDefs id={id} />
        <clipPath id={id("open")}>
          <path d={lancetL} />
          <path d={lancetR} />
          <circle cx="100" cy="70" r="5.5" />
          {lobes.map((l, i) => (
            <circle key={i} cx={l.cx} cy={l.cy} r="5.2" />
          ))}
        </clipPath>
      </defs>

      <path d="M51 181V100Q51 51 100 20Q149 51 149 100V181" fill="none" stroke="#EEE5D2" strokeWidth="1.2" />
      {[124, 142, 160, 178].map((y) => (
        <g key={y} stroke="#C9A58F" strokeWidth="1.2">
          <line x1="42" y1={y} x2="51" y2={y} />
          <line x1="149" y1={y} x2="158" y2={y} />
        </g>
      ))}

      <path d={outer} fill="#CC9C84" />
      <path d={outer} fill={url(id("dotsDark"))} opacity="0.5" />
      <path d="M62 112h-4M62 140h-4M62 160h-4M138 112h4M138 140h4M138 160h4" stroke="#B88570" strokeWidth="1" />

      <path d={inner} fill="#5D7596" />
      <path d={inner} fill="none" stroke="#7D92B0" strokeWidth="1" />
      <circle cx="100" cy="70" r="17" fill="#4E6688" />

      <g clipPath={url(id("open"))}>
        <rect x="60" y="45" width="80" height="135" fill="#1B0E1E" />
        <ellipse className="win-glow" cx="100" cy="132" rx="46" ry="60" fill={url(id("glow"))} />
        <ellipse className="win-glow-hot" cx="100" cy="128" rx="40" ry="56" fill={url(id("hot"))} />
        <ellipse className="win-glow-hot" cx="100" cy="70" rx="16" ry="16" fill={url(id("hot"))} />
        <Dancer x={84} y={157} s={0.6} pose="releve" delay={-1} />
        <Dancer x={116} y={157} s={0.6} pose="releve" flip delay={-4.5} />
      </g>

      <g className="win-tint">
        <path d={lancetL} fill="#2E1A33" fillOpacity="0.85" />
        <path d={lancetR} fill="#2E1A33" fillOpacity="0.85" />
        {[84, 116].map((cx) => (
          <g key={cx} fill="#3E2646">
            <circle cx={cx} cy="105" r="5.5" />
            <circle cx={cx - 4.5} cy="112" r="4.2" />
            <circle cx={cx + 4.5} cy="112" r="4.2" />
          </g>
        ))}
        <circle cx="100" cy="70" r="5.5" fill="#2E1A33" />
        {lobes.map((l, i) => (
          <circle key={i} cx={l.cx} cy={l.cy} r="5.2" fill="#2E1A33" />
        ))}
      </g>
      <path d={lancetL} fill={url(id("dots"))} />
      <path d={lancetR} fill={url(id("dots"))} />

      {[72, 104].map((x) => (
        <g key={x}>
          <rect x={x} y="146" width="24" height="3" fill="#7088A8" />
          <rect x={x} y="149" width="24" height="3" fill="#0F0910" opacity="0.7" />
        </g>
      ))}
      <path d={lancetL} fill="none" stroke="#7D92B0" strokeWidth="1.3" />
      <path d={lancetR} fill="none" stroke="#7D92B0" strokeWidth="1.3" />

      <circle cx="100" cy="70" r="5.5" fill="none" stroke="#8BA0BD" strokeWidth="1.1" />
      {lobes.map((l, i) => (
        <circle key={i} cx={l.cx} cy={l.cy} r="5.2" fill="none" stroke="#8BA0BD" strokeWidth="1.1" />
      ))}
      <g className="win-rose">
        {ring.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={i % 3 === 0 ? 1.3 : 0.8} fill="#A9BAD2" />
        ))}
      </g>

      {[56, 144].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="100" r="4.4" fill="#E8DECD" />
          <circle cx={cx} cy="100" r="4.4" fill="none" stroke="#B88570" strokeWidth="1" />
          <circle cx={cx} cy="100" r="1.3" fill="#B88570" />
        </g>
      ))}
      <line x1="54" y1="181.5" x2="146" y2="181.5" stroke="#C9A58F" strokeWidth="1.4" />
    </svg>
  );
}

/* ---------- 4. Bifora romanica a lacunari (cremisi) ---------- */
export function RomanesqueWindow({ className }: { className?: string }) {
  const id = useSvgIds("rom");
  const winL = "M54 164V113A18 18 0 0 1 90 113V164Z";
  const winR = "M110 164V113A18 18 0 0 1 146 113V164Z";
  const coffers = [-36, -24, -12, 0, 12, 24, 36].map((a) => {
    const r = (a * Math.PI) / 180;
    return { x: +(100 + 105.5 * Math.sin(r)).toFixed(2), y: +(151 - 105.5 * Math.cos(r)).toFixed(2), a };
  });
  const casement = (dx: number) => (
    <>
      <path
        className="win-tint"
        d={`M${54 + dx} 134V113A18 18 0 0 1 ${90 + dx} 113V134Z`}
        fill="#A6C79C"
        fillOpacity="0.92"
      />
      <path className="win-tint" d={`M${54 + dx} 134H${90 + dx}V164H${54 + dx}Z`} fill="#5F9E8B" fillOpacity="0.92" />
      <path d={dx ? winR : winL} fill={url(id("dots"))} />
      <rect x={54 + dx} y="132.6" width="36" height="2.8" fill="#22362E" />
      <path d={dx ? winR : winL} fill="none" stroke="#22362E" strokeWidth="1.6" />
    </>
  );
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <CommonDefs id={id} />
        <clipPath id={id("open")}>
          <path d={winL} />
          <path d={winR} />
        </clipPath>
      </defs>

      <path d="M26 70A110 110 0 0 1 174 70L164 74A100 100 0 0 0 36 74Z" fill="#8B2B38" />
      <path d="M26 70A110 110 0 0 1 174 70" fill="none" stroke="#C45E67" strokeWidth="1.3" />
      <path d="M36 74A100 100 0 0 1 164 74" fill="none" stroke="#C45E67" strokeWidth="1" />
      {coffers.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.a})`}>
          <rect x="-4" y="-3.6" width="8" height="7.2" fill="#76212D" stroke="#B4505A" strokeWidth="0.7" />
          {i % 2 === 0 && <circle r="1.3" fill="#C45E67" />}
        </g>
      ))}

      <rect x="34" y="74" width="132" height="94" fill="#9A3340" />
      <rect x="37.5" y="77.5" width="125" height="87" fill="none" stroke="#BC525C" strokeWidth="1.1" />
      <rect
        x="41.5"
        y="81.5"
        width="117"
        height="79"
        fill="none"
        stroke="#7E2532"
        strokeWidth="2.6"
        strokeDasharray="1.6 2.4"
      />
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={49 + i * 6} cy="87" r="1.5" fill="#82283A" />
      ))}
      <circle cx="100" cy="99" r="6" fill="#85283A" />
      <circle cx="100" cy="99" r="2.4" fill="#C45E67" />
      <circle cx="45.5" cy="99" r="3.4" fill="#85283A" />
      <circle cx="154.5" cy="99" r="3.4" fill="#85283A" />

      <path d="M50 166V113A22 22 0 0 1 94 113V166Z" fill="#22362E" />
      <path d="M106 166V113A22 22 0 0 1 150 113V166Z" fill="#22362E" />

      <g clipPath={url(id("open"))}>
        <rect x="50" y="90" width="100" height="80" fill="#0D2320" />
        <ellipse className="win-glow" cx="72" cy="134" rx="26" ry="38" fill={url(id("glow"))} />
        <ellipse className="win-glow" cx="128" cy="134" rx="26" ry="38" fill={url(id("glow"))} />
        <ellipse className="win-glow-hot" cx="72" cy="132" rx="22" ry="34" fill={url(id("hot"))} />
        <ellipse className="win-glow-hot" cx="128" cy="132" rx="22" ry="34" fill={url(id("hot"))} />
        <ellipse cx="72" cy="160" rx="9" ry="1.6" fill="#000" opacity="0.35" />
        <ellipse cx="128" cy="160" rx="9" ry="1.6" fill="#000" opacity="0.35" />
        <Dancer x={72} y={142} s={0.72} pose="jete" delay={-0.5} />
        <Dancer x={128} y={142} s={0.72} pose="jete" flip delay={-3.5} />
      </g>

      <g className="win-case-l">{casement(0)}</g>
      <g className="win-case-r">{casement(56)}</g>

      <rect x="96.5" y="118" width="7" height="42" fill="#B6464F" />
      <path d="M99 121v36M101.5 121v36" stroke="#93323D" strokeWidth="0.8" />
      <path d="M93 110.5h14l-2.2 7.5h-9.6z" fill="#C45E67" />
      <rect x="94" y="160" width="12" height="6" fill="#C45E67" />

      <rect x="30" y="168" width="140" height="4" fill="#C45E67" />
      <rect x="26" y="172" width="148" height="6" fill="#8B2B38" />
      <rect x="26" y="172" width="148" height="6" fill={url(id("dotsDark"))} />
    </svg>
  );
}

/* ---------- 5. Porta-finestra con balcone (salvia) ---------- */
export function BalconyWindow({ className }: { className?: string }) {
  const id = useSvgIds("bal");
  const cream = "#E7DED1";
  const door = (x: number, colors: string[]) => (
    <>
      {[
        { y: 51, h: 23.5 },
        { y: 74.5, h: 24.5 },
        { y: 99, h: 25 },
      ].map((p, i) => (
        <rect key={i} className="win-tint" x={x} y={p.y} width="29" height={p.h} fill={colors[i]} fillOpacity="0.88" />
      ))}
      <rect x={x} y="51" width="29" height="73" fill={url(id("dots"))} />
      <rect x={x} y="51" width="29" height="73" fill="none" stroke={cream} strokeWidth="2" />
      <path d={`M${x} 74.5H${x + 29}M${x} 99H${x + 29}`} stroke={cream} strokeWidth="2" />
    </>
  );
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <CommonDefs id={id} />
        <clipPath id={id("open")}>
          <rect x="70" y="51" width="60" height="73" />
          <rect x="68" y="127.5" width="64" height="43" />
        </clipPath>
        <clipPath id={id("rail")}>
          <rect x="68" y="127.5" width="64" height="43" />
        </clipPath>
      </defs>

      <rect x="54" y="25" width="92" height="5" fill="#EBE3D7" />
      <rect x="58" y="30" width="84" height="10" fill="#E2D8CB" />
      <path d="M61 35H139" stroke="#B5AA9E" strokeWidth="1.5" strokeDasharray="0.5 2" strokeLinecap="round" />
      <rect x="58" y="40" width="84" height="3.5" fill="#7B8690" />

      <rect x="62" y="43.5" width="76" height="131" fill={cream} />
      <rect x="65.5" y="47" width="69" height="124" fill="#9D8195" />
      <rect x="68" y="49" width="64" height="122" fill={cream} />

      <g clipPath={url(id("open"))}>
        <rect x="66" y="49" width="68" height="124" fill="#221A20" />
        <ellipse className="win-glow" cx="100" cy="104" rx="42" ry="64" fill={url(id("glow"))} />
        <ellipse className="win-glow-hot" cx="100" cy="100" rx="36" ry="58" fill={url(id("hot"))} />
        <Dancer x={98} y={133} s={1.08} pose="arabesque" delay={-3} />
      </g>

      <g className="win-case-l">{door(70, ["#2A2128", "#5C4A3F", "#4F543F"])}</g>
      <g className="win-case-r">{door(101, ["#2A2128", "#4F543F", "#5C4A3F"])}</g>

      <path d="M72.5 113.5Q84.5 103 96.5 113.5Z" fill="#B3A545" />
      <rect x="73" y="113" width="23" height="11" rx="1.5" fill="#A94F3B" />
      <path d="M78 113v8M84 113v10M90 113v7" stroke="#C2B44E" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M104 114.5h12l-1.6 9.5h-8.8z" fill="#8F9BAB" />
      <path d="M108 114.5l-1-3.5M112 114.5l1.5-3" stroke="#B3A545" strokeWidth="1" />
      <circle cx="106.5" cy="109.5" r="3" fill="#C2483B" />
      <circle cx="106.5" cy="109.5" r="1" fill="#F2E9DE" />
      <circle cx="113.5" cy="110.5" r="2.4" fill="#F2E9DE" />
      <circle cx="113.5" cy="110.5" r="0.9" fill="#C2483B" />

      <rect x="66" y="124" width="68" height="3.5" fill="#2A2128" />
      <rect x="66" y="124" width="68" height="1.3" fill="#E3D9CB" />
      <g clipPath={url(id("rail"))}>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx={68 + i * 9.2} cy="149" rx="8" ry="20.5" fill="none" stroke="#E3D9CB" strokeWidth="1.6" />
        ))}
      </g>

      <rect x="57" y="171" width="86" height="6" fill="#E3D9CB" />
      <rect x="59" y="177" width="82" height="5" fill="#7B8690" />
    </svg>
  );
}

export function WindowArt({ kind, className }: { kind: WindowKind; className?: string }) {
  switch (kind) {
    case "gothic":
      return <GothicWindow className={className} />;
    case "romanesque":
      return <RomanesqueWindow className={className} />;
    case "classical":
      return <ClassicalWindow className={className} />;
    case "balcony":
      return <BalconyWindow className={className} />;
    default:
      return <PedimentWindow className={className} />;
  }
}

export function WindowTile({
  kind,
  color,
  ink,
  title,
  subtitle,
  open = false,
  onOpen,
  className,
  large = false,
}: {
  kind: WindowKind;
  color: string;
  ink: string;
  title: string;
  subtitle: string;
  open?: boolean;
  onOpen: () => void;
  className?: string;
  large?: boolean;
}) {
  const tilt = useTilt(6);
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      aria-label={`Apri la versione multimediale: ${subtitle} — ${title}`}
      className={cn(
        "win-tile tilt group relative block aspect-[4/5] w-full overflow-hidden text-left ring-1 ring-black/5",
        "shadow-[0_24px_60px_-28px_rgba(23,18,27,0.45)] hover:shadow-[0_44px_80px_-30px_rgba(23,18,27,0.55)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/25",
        large ? "rounded-[36px]" : "rounded-[28px]",
        open && "win-open",
        className,
      )}
      style={{ backgroundColor: color, color: ink }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]"
      />
      <span aria-hidden className="tilt-sheen pointer-events-none absolute inset-0" />
      <span className="absolute inset-0 flex flex-col">
      <span className={cn("relative block min-h-0 flex-1", large ? "mx-6 mt-6" : "mx-3 mt-3")}>
        <WindowArt
          kind={kind}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </span>
      <span className={cn("relative flex items-end justify-between gap-3", large ? "px-6 pb-6 pt-2 sm:px-7 sm:pb-7" : "px-4 pb-4 pt-1 sm:px-5 sm:pb-5")}>
        <span className="min-w-0">
          <span className="line-clamp-2 block text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] opacity-70">
            {subtitle}
          </span>
          <span className={cn("mt-1 block font-display leading-tight", large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl")}>
            {title}
          </span>
        </span>
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-110",
            large ? "h-12 w-12" : "h-10 w-10",
          )}
        >
          <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
        </span>
      </span>
      </span>
    </button>
  );
}
