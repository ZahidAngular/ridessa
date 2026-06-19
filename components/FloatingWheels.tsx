"use client";

// Round to 3 decimals — prevents SSR/client hydration mismatch from float precision
const R = (n: number) => Math.round(n * 1000) / 1000;
const rad = (deg: number) => (deg * Math.PI) / 180;

function W1() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="fw fw-1">
      <circle cx="100" cy="100" r="90" stroke="var(--accent)" strokeWidth="5"/>
      <circle cx="100" cy="100" r="60" stroke="var(--accent)" strokeWidth="2" opacity="0.45"/>
      <circle cx="100" cy="100" r="14" fill="var(--accent)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>(
        <g key={i}>
          <line x1="100" y1="100" x2={R(100+88*Math.sin(rad(d)))} y2={R(100-88*Math.cos(rad(d)))} stroke="var(--accent)" strokeWidth="2.5" opacity="0.7"/>
          <circle cx={R(100+90*Math.sin(rad(d)))} cy={R(100-90*Math.cos(rad(d)))} r="7" fill="var(--accent)" opacity="0.85"/>
        </g>
      ))}
    </svg>
  );
}

function W2() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="fw fw-2">
      <circle cx="90" cy="90" r="80" stroke="var(--brand)" strokeWidth="5" strokeDasharray="14 7"/>
      <circle cx="90" cy="90" r="52" stroke="var(--brand)" strokeWidth="2.5" opacity="0.5"/>
      <circle cx="90" cy="90" r="11" fill="var(--brand)"/>
      {[0,60,120,180,240,300].map((d,i)=>(
        <g key={i}>
          <line x1="90" y1="90" x2={R(90+78*Math.sin(rad(d)))} y2={R(90-78*Math.cos(rad(d)))} stroke="var(--brand)" strokeWidth="2.5" opacity="0.6"/>
          <rect x={R(90+49*Math.sin(rad(d))-5)} y={R(90-49*Math.cos(rad(d))-7)} width="10" height="14" rx="3" fill="var(--brand)" opacity="0.75"/>
        </g>
      ))}
    </svg>
  );
}

function W3() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="fw fw-3">
      <circle cx="80" cy="80" r="72" stroke="var(--accent)" strokeWidth="3" opacity="0.7"/>
      <circle cx="80" cy="80" r="46" stroke="var(--brand)" strokeWidth="2" opacity="0.4"/>
      <circle cx="80" cy="80" r="9" fill="var(--brand)"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((d,i)=>{
        const long = i%2===0; const len = long?70:44; const col = long?"var(--accent)":"var(--brand)";
        return (
          <g key={i}>
            <line x1="80" y1="80" x2={R(80+len*Math.sin(rad(d)))} y2={R(80-len*Math.cos(rad(d)))} stroke={col} strokeWidth={long?2:1.5} opacity="0.7"/>
            {long&&<circle cx={R(80+72*Math.sin(rad(d)))} cy={R(80-72*Math.cos(rad(d)))} r="5" fill={col} opacity="0.85"/>}
          </g>
        );
      })}
    </svg>
  );
}

function W4() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="fw fw-4">
      <circle cx="100" cy="100" r="92" stroke="var(--brand)" strokeWidth="4" opacity="0.85"/>
      <circle cx="100" cy="100" r="68" stroke="var(--brand)" strokeWidth="2.5" opacity="0.5"/>
      <circle cx="100" cy="100" r="44" stroke="var(--accent)" strokeWidth="2" opacity="0.4"/>
      <circle cx="100" cy="100" r="13" fill="var(--accent)"/>
      {[0,60,120,180,240,300].map((d,i)=>(
        <g key={i}>
          <line x1="100" y1="100" x2={R(100+90*Math.sin(rad(d)))} y2={R(100-90*Math.cos(rad(d)))} stroke="var(--brand)" strokeWidth="3" opacity="0.55"/>
          <circle cx={R(100+92*Math.sin(rad(d)))} cy={R(100-92*Math.cos(rad(d)))} r="9" fill="var(--brand)" opacity="0.9"/>
          <circle cx={R(100+68*Math.sin(rad(d)))} cy={R(100-68*Math.cos(rad(d)))} r="6" fill="var(--accent)" opacity="0.7"/>
        </g>
      ))}
    </svg>
  );
}

function W5() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="fw fw-5">
      <circle cx="70" cy="70" r="64" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <circle cx="70" cy="70" r="42" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="70" cy="70" r="20" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="70" cy="70" r="7" fill="var(--accent)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>(
        <line key={i} x1="70" y1="70" x2={R(70+62*Math.sin(rad(d)))} y2={R(70-62*Math.cos(rad(d)))} stroke="var(--accent)" strokeWidth="1.5" opacity="0.65"/>
      ))}
    </svg>
  );
}

function W6() {
  return (
    <svg viewBox="0 0 170 170" fill="none" className="fw fw-6">
      <circle cx="85" cy="85" r="78" stroke="var(--brand)" strokeWidth="6"/>
      <circle cx="85" cy="85" r="55" stroke="var(--brand)" strokeWidth="3" opacity="0.4"/>
      <circle cx="85" cy="85" r="15" fill="var(--brand)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>{
        const gx=R(85+78*Math.sin(rad(d))); const gy=R(85-78*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="85" y1="85" x2={gx} y2={gy} stroke="var(--brand)" strokeWidth="3" opacity="0.6"/>
            <polygon points={`${gx},${R(gy-8)} ${R(gx+7)},${R(gy+6)} ${R(gx-7)},${R(gy+6)}`} fill="var(--brand)" opacity="0.85" transform={`rotate(${d} ${gx} ${gy})`}/>
          </g>
        );
      })}
    </svg>
  );
}

function W7() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="fw fw-7">
      <circle cx="90" cy="90" r="82" stroke="var(--accent)" strokeWidth="4"/>
      <circle cx="90" cy="90" r="70" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.5"/>
      <circle cx="90" cy="90" r="28" stroke="var(--accent)" strokeWidth="2.5" opacity="0.4"/>
      <circle cx="90" cy="90" r="10" fill="var(--accent)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>{
        const x2=R(90+80*Math.sin(rad(d))); const y2=R(90-80*Math.cos(rad(d)));
        const rx=R(90+68*Math.sin(rad(d))); const ry=R(90-68*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="90" y1="90" x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="2" opacity="0.65"/>
            <rect x={R(rx-4)} y={R(ry-4)} width="8" height="8" rx="2" fill="var(--accent)" opacity="0.8" transform={`rotate(45 ${rx} ${ry})`}/>
          </g>
        );
      })}
    </svg>
  );
}

function W8() {
  return (
    <svg viewBox="0 0 190 190" fill="none" className="fw fw-8">
      <circle cx="95" cy="95" r="86" stroke="var(--brand)" strokeWidth="3" opacity="0.9"/>
      <circle cx="95" cy="95" r="60" stroke="var(--accent)" strokeWidth="2" opacity="0.5" strokeDasharray="10 6"/>
      <circle cx="95" cy="95" r="35" stroke="var(--brand)" strokeWidth="1.5" opacity="0.35"/>
      <circle cx="95" cy="95" r="12" fill="var(--brand)"/>
      {[0,60,120,180,240,300].map((d,i)=>(
        <g key={i}>
          <line x1="95" y1="95" x2={R(95+84*Math.sin(rad(d)))} y2={R(95-84*Math.cos(rad(d)))} stroke="var(--brand)" strokeWidth="3" opacity="0.6"/>
          <circle cx={R(95+86*Math.sin(rad(d)))} cy={R(95-86*Math.cos(rad(d)))} r="8" fill="var(--brand)" opacity="0.9"/>
          <circle cx={R(95+60*Math.sin(rad(d)))} cy={R(95-60*Math.cos(rad(d)))} r="5" fill="var(--accent)" opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

function W9() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="fw fw-9">
      <circle cx="80" cy="80" r="73" stroke="var(--accent)" strokeWidth="4"/>
      <circle cx="80" cy="80" r="10" fill="var(--accent)"/>
      {[0,36,72,108,144,180,216,252,288,324].map((d,i)=>{
        const gx=R(80+73*Math.sin(rad(d))); const gy=R(80-73*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="80" y1="80" x2={gx} y2={gy} stroke="var(--accent)" strokeWidth="2" opacity="0.6"/>
            <rect x={R(gx-5)} y={R(gy-5)} width="10" height="10" rx="2" fill="var(--accent)" opacity="0.8" transform={`rotate(${d} ${gx} ${gy})`}/>
          </g>
        );
      })}
    </svg>
  );
}

function W10() {
  return (
    <svg viewBox="0 0 175 175" fill="none" className="fw fw-10">
      <circle cx="87.5" cy="87.5" r="80" stroke="var(--brand)" strokeWidth="4" opacity="0.9"/>
      <circle cx="87.5" cy="87.5" r="52" stroke="var(--brand)" strokeWidth="2" opacity="0.4" strokeDasharray="5 5"/>
      <circle cx="87.5" cy="87.5" r="12" fill="var(--brand)"/>
      {[0,60,120,180,240,300].map((d,i)=>{
        const gx=R(87.5+80*Math.sin(rad(d))); const gy=R(87.5-80*Math.cos(rad(d)));
        const hx=R(87.5+52*Math.sin(rad(d))); const hy=R(87.5-52*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="87.5" y1="87.5" x2={gx} y2={gy} stroke="var(--brand)" strokeWidth="2.5" opacity="0.65"/>
            <polygon points={`${R(gx-6)},${gy} ${R(gx-3)},${R(gy-7)} ${R(gx+3)},${R(gy-7)} ${R(gx+6)},${gy} ${R(gx+3)},${R(gy+7)} ${R(gx-3)},${R(gy+7)}`} fill="var(--brand)" opacity="0.8"/>
            <circle cx={hx} cy={hy} r="4" fill="var(--accent)" opacity="0.7"/>
          </g>
        );
      })}
    </svg>
  );
}

function W11() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="fw fw-11">
      <circle cx="100" cy="100" r="90" stroke="var(--brand)" strokeWidth="5" opacity="0.85"/>
      <circle cx="100" cy="100" r="55" stroke="var(--accent)" strokeWidth="3" opacity="0.6"/>
      <circle cx="100" cy="100" r="13" fill="var(--accent)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>(
        <g key={i}>
          <line x1="100" y1="100" x2={R(100+88*Math.sin(rad(d)))} y2={R(100-88*Math.cos(rad(d)))} stroke="var(--brand)" strokeWidth="2.5" opacity="0.55"/>
          <circle cx={R(100+90*Math.sin(rad(d)))} cy={R(100-90*Math.cos(rad(d)))} r="7" fill="var(--brand)" opacity="0.85"/>
          <circle cx={R(100+55*Math.sin(rad(d)))} cy={R(100-55*Math.cos(rad(d)))} r="5" fill="var(--accent)" opacity="0.75"/>
        </g>
      ))}
    </svg>
  );
}

function W12() {
  return (
    <svg viewBox="0 0 150 150" fill="none" className="fw fw-12">
      <circle cx="75" cy="75" r="68" stroke="var(--brand)" strokeWidth="2" strokeDasharray="4 4" opacity="0.9"/>
      <circle cx="75" cy="75" r="50" stroke="var(--brand)" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="75" cy="75" r="9" fill="var(--brand)"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>(
        <g key={i}>
          <line x1="75" y1="75" x2={R(75+66*Math.sin(rad(d)))} y2={R(75-66*Math.cos(rad(d)))} stroke="var(--brand)" strokeWidth="2" opacity="0.6"/>
          <circle cx={R(75+68*Math.sin(rad(d)))} cy={R(75-68*Math.cos(rad(d)))} r="5" fill="var(--brand)" opacity="0.9"/>
        </g>
      ))}
    </svg>
  );
}

function W13() {
  return (
    <svg viewBox="0 0 130 130" fill="none" className="fw fw-13">
      <circle cx="65" cy="65" r="58" stroke="var(--accent)" strokeWidth="3" opacity="0.7"/>
      <circle cx="65" cy="65" r="35" stroke="var(--accent)" strokeWidth="2" opacity="0.4"/>
      <circle cx="65" cy="65" r="10" fill="var(--accent)"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((d,i)=>{
        const len = i%2===0?56:40;
        return <line key={i} x1="65" y1="65" x2={R(65+len*Math.sin(rad(d)))} y2={R(65-len*Math.cos(rad(d)))} stroke="var(--accent)" strokeWidth={i%2===0?2:1.2} opacity="0.65"/>;
      })}
    </svg>
  );
}

function W14() {
  return (
    <svg viewBox="0 0 185 185" fill="none" className="fw fw-14">
      <circle cx="92.5" cy="92.5" r="84" stroke="var(--brand)" strokeWidth="7" opacity="0.9"/>
      <circle cx="92.5" cy="92.5" r="14" fill="var(--brand)"/>
      {[0,60,120,180,240,300].map((d,i)=>{
        const gx=R(92.5+84*Math.sin(rad(d))); const gy=R(92.5-84*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="92.5" y1="92.5" x2={gx} y2={gy} stroke="var(--brand)" strokeWidth="4" opacity="0.65"/>
            <rect x={R(gx-7)} y={R(gy-10)} width="14" height="18" rx="4" fill="var(--brand)" opacity="0.85"/>
          </g>
        );
      })}
    </svg>
  );
}

function W15() {
  return (
    <svg viewBox="0 0 145 145" fill="none" className="fw fw-15">
      <circle cx="72.5" cy="72.5" r="65" stroke="var(--accent)" strokeWidth="3" opacity="0.7"/>
      <circle cx="72.5" cy="72.5" r="40" stroke="var(--brand)" strokeWidth="2" opacity="0.4"/>
      <circle cx="72.5" cy="72.5" r="10" fill="var(--accent)"/>
      {[0,24,48,72,96,120,144,168,192,216,240,264,288,312,336].map((d,i)=>{
        const col = i%2===0?"var(--accent)":"var(--brand)";
        const gx=R(72.5+65*Math.sin(rad(d))); const gy=R(72.5-65*Math.cos(rad(d)));
        return (
          <g key={i}>
            <line x1="72.5" y1="72.5" x2={gx} y2={gy} stroke={col} strokeWidth="1.5" opacity="0.5"/>
            <circle cx={gx} cy={gy} r="5" fill={col} opacity="0.85"/>
          </g>
        );
      })}
    </svg>
  );
}

const ALL = [W1,W2,W3,W4,W5,W6,W7,W8,W9,W10,W11,W12,W13,W14,W15];

export default function FloatingWheels() {
  return (
    <div className="fw-container" aria-hidden>
      {ALL.map((Wheel, i) => <Wheel key={i} />)}
    </div>
  );
}
