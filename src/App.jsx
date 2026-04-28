import React, { useState, useMemo } from 'react';
import * as htmlToImage from 'html-to-image';

// --- KOMPONEN IKON SVG (Custom Martial Arts) ---
const IconUser = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconScale = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>;
const IconDownload = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconReset = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconFist = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5 17 11"/></svg>;
const IconAlert = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;

// --- FUNGSI SCORING LOGIC PENCAK SILAT ---
const getScoreSilat = (test, gender, value) => {
  if (value === '' || value === null || isNaN(value)) return 0;
  const v = parseFloat(value); const isM = gender === 'Putra';
  switch(test) {
    case 'sitReach': return isM ? (v >= 32.0 ? 100 : v >= 25.6 ? 80 : v >= 22.4 ? 70 : v >= 19.2 ? 60 : 40) : (v >= 38.0 ? 100 : v >= 30.4 ? 80 : v >= 26.6 ? 70 : v >= 22.8 ? 60 : 40);
    case 'pushUp': return isM ? (v >= 75 ? 100 : v >= 60 ? 80 : v >= 53 ? 70 : v >= 45 ? 60 : 40) : (v >= 50 ? 100 : v >= 40 ? 80 : v >= 35 ? 70 : v >= 30 ? 60 : 40);
    case 'sitUp': return isM ? (v >= 110 ? 100 : v >= 88 ? 80 : v >= 77 ? 70 : v >= 66 ? 60 : 40) : (v >= 90 ? 100 : v >= 72 ? 80 : v >= 63 ? 70 : v >= 54 ? 60 : 40);
    case 'pullDyna': return isM ? (v >= 120 ? 100 : v >= 96 ? 80 : v >= 84 ? 70 : v >= 72 ? 60 : 40) : (v >= 80 ? 100 : v >= 64 ? 80 : v >= 56 ? 70 : v >= 48 ? 60 : 40);
    case 'pushDyna': return isM ? (v >= 100 ? 100 : v >= 80 ? 80 : v >= 70 ? 70 : v >= 60 ? 60 : 40) : (v >= 70 ? 100 : v >= 56 ? 80 : v >= 49 ? 70 : v >= 42 ? 60 : 40);
    case 'core': return v >= 12 ? 100 : v >= 10 ? 80 : v >= 9 ? 70 : v >= 7 ? 60 : 40;
    case 'pullUp': return isM ? (v >= 20 ? 100 : v >= 16 ? 80 : v >= 14 ? 70 : v >= 12 ? 60 : 40) : (v >= 10 ? 100 : v >= 8 ? 80 : v >= 7 ? 70 : v >= 6 ? 60 : 40);
    case 'hopR': return isM ? (v >= 28.39 ? 100 : v >= 22.71 ? 80 : v >= 19.87 ? 70 : v >= 17.03 ? 60 : 40) : (v >= 25.87 ? 100 : v >= 20.70 ? 80 : v >= 18.11 ? 70 : v >= 15.52 ? 60 : 40);
    case 'hopL': return isM ? (v >= 28.01 ? 100 : v >= 22.41 ? 80 : v >= 19.61 ? 70 : v >= 16.81 ? 60 : 40) : (v >= 24.44 ? 100 : v >= 19.55 ? 80 : v >= 17.11 ? 70 : v >= 14.66 ? 60 : 40);
    case 'medPass': return isM ? (v >= 4.80 ? 100 : v >= 3.84 ? 80 : v >= 3.36 ? 70 : v >= 2.88 ? 60 : 40) : (v >= 3.88 ? 100 : v >= 3.10 ? 80 : v >= 2.72 ? 70 : v >= 2.33 ? 60 : 40);
    case 'illinois': // Inverse
      return isM ? (v <= 15.2 ? 100 : v <= 17.5 ? 80 : v <= 18.2 ? 70 : v <= 19.8 ? 60 : 40) : (v <= 16.3 ? 100 : v <= 18.7 ? 80 : v <= 19.6 ? 70 : v <= 21.2 ? 60 : 40);
    case 'rastWatt': return isM ? (v >= 700 ? 100 : v >= 560 ? 80 : v >= 490 ? 70 : v >= 420 ? 60 : 40) : (v >= 500 ? 100 : v >= 400 ? 80 : v >= 350 ? 70 : v >= 300 ? 60 : 40);
    case 'rastFatigue': // Inverse
      return isM ? (v <= 10.0 ? 100 : v <= 11.5 ? 80 : v <= 12.0 ? 70 : v <= 13.0 ? 60 : 40) : (v <= 12.0 ? 100 : v <= 13.8 ? 80 : v <= 14.4 ? 70 : v <= 15.6 ? 60 : 40);
    case 'sprint20': // Inverse
      return isM ? (v <= 2.75 ? 100 : v <= 3.03 ? 80 : v <= 3.30 ? 70 : v <= 3.58 ? 60 : 40) : (v <= 3.20 ? 100 : v <= 3.52 ? 80 : v <= 3.84 ? 70 : v <= 4.16 ? 60 : 40);
    case 'beep': return isM ? (v >= 66.3 ? 100 : v >= 53.0 ? 80 : v >= 49.7 ? 70 : v >= 46.4 ? 60 : 40) : (v >= 60.0 ? 100 : v >= 48.0 ? 80 : v >= 45.0 ? 70 : v >= 42.0 ? 60 : 40);
    default: return 0;
  }
};

// --- FUNGSI TARGET PLACEHOLDER ---
const getTargetPlaceholder = (test, gender) => {
  const isM = gender === 'Putra';
  switch(test) {
    case 'sitReach': return isM ? '≥ 32.0' : '≥ 38.0';
    case 'pushUp': return isM ? '≥ 75' : '≥ 50';
    case 'sitUp': return isM ? '≥ 110' : '≥ 90';
    case 'pullDyna': return isM ? '≥ 120' : '≥ 80';
    case 'pushDyna': return isM ? '≥ 100' : '≥ 70';
    case 'core': return '≥ 12';
    case 'pullUp': return isM ? '≥ 20' : '≥ 10';
    case 'hopR': return isM ? '≥ 28.39' : '≥ 25.87';
    case 'hopL': return isM ? '≥ 28.01' : '≥ 24.44';
    case 'medPass': return isM ? '≥ 4.80' : '≥ 3.88';
    case 'illinois': return isM ? '≤ 15.2' : '≤ 16.3';
    case 'sprint20': return isM ? '≤ 2.75' : '≤ 3.20';
    case 'beep': return isM ? '≥ 66.3' : '≥ 60.0';
    default: return '';
  }
};

// --- KOMPONEN RADAR CHART ---
const RadarChart = ({ data, labels, isBlanko }) => {
  const size = 320; const center = size / 2; const radius = 100;
  const angleStep = (Math.PI * 2) / labels.length;

  const getCoordinates = (val, i) => {
    const r = (val / 100) * radius;
    const a = i * angleStep - Math.PI / 2;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };

  const dataPoints = data.map((val, i) => getCoordinates(val, i));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {[20, 40, 60, 80, 100].map(level => {
        const pts = labels.map((_, i) => getCoordinates(level, i));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke={level === 100 ? '#f43f5e' : '#e2e8f0'} strokeWidth={level === 100 ? 2 : 1} strokeDasharray={level < 100 ? "4 4" : "none"} />
      })}
      
      {labels.map((label, i) => {
        const pOuter = getCoordinates(125, i);
        const pEdge = getCoordinates(100, i);
        return (
          <g key={i}>
            <line x1={center} y1={center} x2={pEdge.x} y2={pEdge.y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={pOuter.x} y={pOuter.y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-black fill-slate-500 uppercase">{label}</text>
          </g>
        );
      })}

      {!isBlanko && (
        <>
          <path d={dataPath} fill="rgba(225, 29, 72, 0.3)" stroke="#e11d48" strokeWidth="3" strokeLinejoin="round" />
          {dataPoints.map((p, i) => ( <circle key={i} cx={p.x} cy={p.y} r="4" fill="#9f1239" /> ))}
        </>
      )}
    </svg>
  );
};

export default function App() {
  const [identity, setIdentity] = useState({ name: '', origin: '', dob: '', gender: 'Putra' });
  const [anthro, setAnthro] = useState({ weight: '', height: '', armSpan: '', sitHeight: '' });
  
  // State dengan penambahan Parameter Waktu RAST (T1-T6)
  const [tests, setTests] = useState({ 
    sitReach: '', pushUp: '', sitUp: '', pullDyna: '', pushDyna: '', core: '', pullUp: '', 
    hopR: '', hopL: '', medPass: '', illinois: '', sprint20: '', beepLevel: '', beepShuttle: '',
    rastT1: '', rastT2: '', rastT3: '', rastT4: '', rastT5: '', rastT6: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  const age = useMemo(() => {
    if (!identity.dob) return '-';
    const birthDate = new Date(identity.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
    return calculatedAge;
  }, [identity.dob]);

  const bmiData = useMemo(() => {
    if (!anthro.weight || !anthro.height || anthro.height <= 0) return { bmi: '-', status: '-', color: 'text-slate-400' };
    const hM = anthro.height / 100;
    const bmiValue = (anthro.weight / (hM * hM));
    const bmi = bmiValue.toFixed(1);
    let status = 'Kurus'; let color = 'text-amber-500';
    if (bmi >= 18.5 && bmi <= 24.9) { status = 'Ideal'; color = 'text-emerald-500'; }
    else if (bmi >= 25 && bmi <= 29.9) { status = 'Gemuk'; color = 'text-orange-500'; }
    else if (bmi >= 30) { status = 'Obesitas'; color = 'text-rose-600'; }
    return { bmi, status, color };
  }, [anthro.weight, anthro.height]);

  // --- MESIN PENGHITUNG APE INDEX & RASIO TUNGKAI ---
  const proportionData = useMemo(() => {
    const h = parseFloat(anthro.height);
    const arm = parseFloat(anthro.armSpan);
    const sit = parseFloat(anthro.sitHeight);

    let apeIndex = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi & Lengan' };
    let legRatio = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi Duduk' };

    if (h > 0 && arm > 0) {
      const ratio = arm / h;
      if (ratio > 1.02) apeIndex = { value: ratio.toFixed(2), text: 'Superior', color: 'text-rose-600', desc: 'Jangkauan Bantingan Ekstra' };
      else if (ratio >= 1.0) apeIndex = { value: ratio.toFixed(2), text: 'Ideal', color: 'text-emerald-500', desc: 'Proporsi Fighter Normal' };
      else apeIndex = { value: ratio.toFixed(2), text: 'Standar', color: 'text-slate-500', desc: 'Fokus Pertarungan Jarak Dekat' };
    }

    if (h > 0 && sit > 0 && sit < h) {
      const legLength = h - sit;
      const legPercentage = (legLength / h) * 100;
      if (legPercentage >= 50) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Panjang', color: 'text-rose-600', desc: 'Jangkauan Tendangan Sabit Jauh' };
      else if (legPercentage >= 47) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Ideal', color: 'text-emerald-500', desc: 'Keseimbangan Kuda-Kuda Stabil' };
      else legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Pendek', color: 'text-slate-500', desc: 'Pusat Gravitasi Tahan Bantingan' };
    }

    return { apeIndex, legRatio };
  }, [anthro.height, anthro.armSpan, anthro.sitHeight]);

  // --- MESIN PENGHITUNG VO2MAX OTOMATIS (BEEP TEST) ---
  const calculatedVO2Max = useMemo(() => {
    const l = parseInt(tests.beepLevel);
    const s = parseInt(tests.beepShuttle);
    if (!l || !s || l < 1 || s < 1) return ''; 
    const vo2max = 3.46 * (l + s / (l * 0.4325 + 7.0048)) + 12.2;
    return parseFloat(vo2max.toFixed(2));
  }, [tests.beepLevel, tests.beepShuttle]);

  // --- MESIN PENGHITUNG RAST OTOMATIS ---
  const rastData = useMemo(() => {
    const w = parseFloat(anthro.weight);
    const t1 = parseFloat(tests.rastT1); const t2 = parseFloat(tests.rastT2);
    const t3 = parseFloat(tests.rastT3); const t4 = parseFloat(tests.rastT4);
    const t5 = parseFloat(tests.rastT5); const t6 = parseFloat(tests.rastT6);

    // Pastikan berat badan & semua waktu sudah terisi
    if (!w || !t1 || !t2 || !t3 || !t4 || !t5 || !t6) return { watt: '', fatigue: '' };

    const times = [t1, t2, t3, t4, t5, t6];
    // Rumus Power = (Weight * Distance^2) / Time^3. Jarak RAST = 35m, 35^2 = 1225
    const powers = times.map(t => (w * 1225) / Math.pow(t, 3)); 
    
    const maxP = Math.max(...powers);
    const minP = Math.min(...powers);
    const avgP = powers.reduce((a, b) => a + b, 0) / 6;
    
    // Fatigue Index % = ((Max Power - Min Power) / Max Power) * 100
    const fi = ((maxP - minP) / maxP) * 100;

    return { watt: parseFloat(avgP.toFixed(2)), fatigue: parseFloat(fi.toFixed(2)) };
  }, [anthro.weight, tests.rastT1, tests.rastT2, tests.rastT3, tests.rastT4, tests.rastT5, tests.rastT6]);


  // Deteksi Simetri Kuda-Kuda (10 Hop Jump Kanan vs Kiri)
  const symmetryData = useMemo(() => {
    const r = parseFloat(tests.hopR);
    const l = parseFloat(tests.hopL);
    if (!r || !l || r === 0 || l === 0) return { diff: 0, isDanger: false };
    const min = Math.min(r, l);
    const max = Math.max(r, l);
    const diff = 100 - ((min / max) * 100);
    return { diff: diff.toFixed(1), isDanger: diff > 10, weakSide: r < l ? 'Kanan' : 'Kiri' }; 
  }, [tests.hopR, tests.hopL]);

  const scores = useMemo(() => ({
    sitReach: getScoreSilat('sitReach', identity.gender, tests.sitReach),
    pushUp: getScoreSilat('pushUp', identity.gender, tests.pushUp),
    sitUp: getScoreSilat('sitUp', identity.gender, tests.sitUp),
    pullDyna: getScoreSilat('pullDyna', identity.gender, tests.pullDyna),
    pushDyna: getScoreSilat('pushDyna', identity.gender, tests.pushDyna),
    core: getScoreSilat('core', identity.gender, tests.core),
    pullUp: getScoreSilat('pullUp', identity.gender, tests.pullUp),
    hopR: getScoreSilat('hopR', identity.gender, tests.hopR),
    hopL: getScoreSilat('hopL', identity.gender, tests.hopL),
    medPass: getScoreSilat('medPass', identity.gender, tests.medPass),
    illinois: getScoreSilat('illinois', identity.gender, tests.illinois),
    rastWatt: getScoreSilat('rastWatt', identity.gender, rastData.watt), // Output Kalkulator
    rastFatigue: getScoreSilat('rastFatigue', identity.gender, rastData.fatigue), // Output Kalkulator
    sprint20: getScoreSilat('sprint20', identity.gender, tests.sprint20),
    beep: getScoreSilat('beep', identity.gender, calculatedVO2Max),
  }), [tests, identity.gender, calculatedVO2Max, rastData]);

  // Radar Grouping: Mengelompokkan 15 tes jadi 8 sumbu
  const radarScores = useMemo(() => {
    return {
      Flexibility: scores.sitReach,
      UpperPwr: Math.round((scores.pullDyna + scores.pushDyna + scores.medPass) / 3) || 0,
      CoreStab: Math.round((scores.sitUp + scores.core) / 2) || 0,
      LowerPwr: Math.round((scores.hopR + scores.hopL) / 2) || 0,
      Agility: scores.illinois,
      Speed: scores.sprint20,
      Anaerobic: Math.round((scores.rastWatt + scores.rastFatigue) / 2) || 0,
      AerobicVO2: scores.beep
    };
  }, [scores]);

  const activeLabels = Object.keys(radarScores);
  const activeRadarData = Object.values(radarScores);
  
  const averageScore = useMemo(() => {
    const vals = Object.values(scores);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [scores]);

  const isBlanko = !identity.name && averageScore === 0;

  const handleReset = () => { if (window.confirm("Hapus semua data isian?")) window.location.reload(); };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      const element = document.getElementById('report-container');
      const dataUrl = await htmlToImage.toPng(element, { quality: 1.0, backgroundColor: "#f8fafc", pixelRatio: 2 });
      const safeName = identity?.name ? identity.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'pesilat';
      const link = document.createElement("a");
      link.download = `Rapor_Silat_Elite_${safeName}.png`;
      link.href = dataUrl; link.click();
    } catch (error) { console.error(error); alert("Gagal membuat gambar."); } finally { setIsExporting(false); }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-rose-600 transition-all";
  const testInputClass = "w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 font-black text-slate-900 focus:outline-none focus:border-rose-600 transition-all pr-20 placeholder:text-[11px] placeholder:font-bold placeholder:text-slate-400/70 text-right";

  return (
    <div id="report-container" className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4 font-sans print:bg-white print:py-0 print:px-0">
      
      {isExporting && (
        <style dangerouslySetInnerHTML={{__html: `
          #report-container input, #report-container select { appearance: none !important; -webkit-appearance: none; padding-bottom: 8px !important; }
          #report-container input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none !important; margin: 0 !important; }
        `}} />
      )}

      {/* HEADER: CRIMSON & GOLD THEME (PENCAK SILAT) */}
      <header className="bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden w-full max-w-7xl rounded-[2.5rem] border-b-8 border-rose-700">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600 blur-[120px] rounded-full"></div>
           <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-amber-500/20 blur-[100px] rounded-full transform rotate-45"></div>
        </div>
        
        <div className="mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-block bg-amber-500 text-slate-900 font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 shadow-lg">
              IPSI • PERMENPORA 15 / 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase text-white drop-shadow-md">
              MARTIAL <span className="text-rose-600">KINETICS</span>
            </h1>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            {!isExporting && (
              <div className="no-print flex flex-wrap items-center justify-start md:justify-end gap-3 mb-4">
                <button onClick={handleReset} className="bg-white/10 hover:bg-rose-700/80 text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold tracking-wider backdrop-blur-sm border border-white/10">
                  <IconReset /> <span>Reset</span>
                </button>
                <button onClick={handleDownloadImage} disabled={isExporting} className="bg-rose-700 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-wider shadow-[0_0_20px_rgba(190,18,60,0.5)]">
                  <IconDownload /> {isExporting ? 'Processing...' : 'Export PNG'}
                </button>
              </div>
            )}
            <div className="mt-2">
                <p className="font-black text-rose-500/80 text-[11px] tracking-[0.3em] uppercase">
                  Combat Analytics <span className="text-amber-500">by fiqhipondaa9</span>
                </p>
            </div>
          </div>
        </div>
      </header>

      <main className={`${isExporting ? 'w-[1200px]' : 'max-w-7xl w-full'} mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8`}>
        
        {/* LEFT COLUMN: BIOMETRICS & TESTS */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* IDENTITAS */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5 relative z-10">
              <div className="bg-rose-700 text-white p-3 rounded-2xl shadow-lg"><IconUser /></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Profil Pendekar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Atlet</label><input type="text" value={identity.name} onChange={e => setIdentity({...identity, name: e.target.value})} className={inputClass} placeholder="Nama lengkap..." /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Perguruan / Provinsi</label><input type="text" value={identity.origin} onChange={e => setIdentity({...identity, origin: e.target.value})} className={inputClass} placeholder="Asal perguruan..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tgl Lahir</label><input type="date" value={identity.dob} onChange={e => setIdentity({...identity, dob: e.target.value})} className={`${inputClass} text-sm`} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age Index</label><div className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 text-center">{age !== '-' ? `${age} Thn` : '\u00A0'}</div></div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Gender</label>
                <select value={identity.gender} onChange={e => setIdentity({...identity, gender: e.target.value})} className={`${inputClass} cursor-pointer`}>
                  <option value="Putra">Putra (Male)</option><option value="Putri">Putri (Female)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {[{label: 'Tinggi (cm)', id: 'height'}, {label: 'Berat (kg)', id: 'weight'}, {label: 'Arm Span', id: 'armSpan'}, {label: 'Sit Height', id: 'sitHeight'}].map(item => (
                 <div key={item.id} className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</label>
                   <input type="number" value={anthro[item.id]} onChange={e => setAnthro({...anthro, [item.id]: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-3 font-black text-center focus:border-rose-600 outline-none text-slate-900" placeholder="0" />
                 </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl border-l-8 border-rose-700 relative z-10">
               <div className="flex items-center gap-4"><IconScale /> <span className="font-black text-xs tracking-[0.2em] uppercase text-slate-400">Body Mass Index</span></div>
               <div className="flex items-center gap-5">
                 <span className="text-4xl font-black italic text-white">{bmiData.bmi}</span>
                 {bmiData.status !== '-' && <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-800 border border-slate-700 shadow-inner ${bmiData.color}`}>{bmiData.status}</span>}
               </div>
            </div>

            {/* KOTAK APE INDEX & RASIO TUNGKAI */}
            {(anthro.height > 0 && (anthro.armSpan > 0 || anthro.sitHeight > 0)) && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 animate-in fade-in">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden shadow-sm">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-600"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ape Index</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.apeIndex.color}`}>{proportionData.apeIndex.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none italic">{proportionData.apeIndex.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.apeIndex.desc}</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden shadow-sm">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rasio Tungkai</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.legRatio.color}`}>{proportionData.legRatio.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none italic">{proportionData.legRatio.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.legRatio.desc}</p>
                </div>
              </div>
            )}
          </div>

          {/* PARAMETER UJI FISIK */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
              <div className="bg-rose-100 text-rose-700 p-3 rounded-2xl"><IconFist /></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Grappling & Striking Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
               {[
                 { id: 'sitReach', label: 'Sit & Reach Flexibility', unit: 'CM' },
                 { id: 'core', label: 'Core Stability', unit: 'LVL' },
                 { id: 'pushUp', label: 'Push Up (1 Menit)', unit: 'REPS' },
                 { id: 'sitUp', label: 'Sit Up (2 Menit)', unit: 'REPS' },
                 { id: 'pullUp', label: 'Pull Up', unit: 'REPS' },
                 { id: 'medPass', label: 'Med. Chest Pass 5Kg', unit: 'MTR' },
                 { id: 'pullDyna', label: 'Pull Dynamometer', unit: 'KG' },
                 { id: 'pushDyna', label: 'Push Dynamometer', unit: 'KG' },
                 { id: 'hopR', label: '10 Hop Jump (Kanan)', unit: 'MTR' },
                 { id: 'hopL', label: '10 Hop Jump (Kiri)', unit: 'MTR' },
                 { id: 'illinois', label: 'Illinois Agility', unit: 'SEC' },
                 { id: 'sprint20', label: 'Sprint 20m', unit: 'SEC' },
               ].map(item => (
                 <div key={item.id} className="flex flex-col">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{item.label}</label>
                   <div className="relative">
                     <input type="number" step="0.01" value={tests[item.id]} onChange={e => setTests({...tests, [item.id]: e.target.value})} className={testInputClass} placeholder={getTargetPlaceholder(item.id, identity.gender)} />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.unit}</span>
                   </div>
                 </div>
               ))}

               {/* RAST AUTO CONVERTER (6 Sprints) */}
               <div className="sm:col-span-2 bg-slate-900 p-6 rounded-[2rem] border border-slate-800 mt-2 shadow-inner">
                 <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-3">
                   <div>
                      <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-1">
                        RAST (6x35m Anaerobic Sprint)
                      </label>
                      <p className="text-[9px] text-slate-500 font-bold ml-1 mt-1">*Pastikan Berat Badan Atlet (Kg) sudah diisi di atas.</p>
                   </div>
                   <div className="flex flex-wrap items-center gap-2">
                     {rastData.watt !== '' && (
                       <>
                         <span className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-sm animate-in fade-in">
                           Avg Power: {rastData.watt} <span className="text-[10px] opacity-70">W</span>
                         </span>
                         <span className="bg-amber-500 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-sm animate-in fade-in">
                           Fatigue: {rastData.fatigue} <span className="text-[10px] opacity-70">%</span>
                         </span>
                       </>
                     )}
                   </div>
                 </div>
                 <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((t) => (
                      <div key={t} className="relative">
                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-500 uppercase">{t}</span>
                         <input type="number" step="0.01" value={tests[`rast${t}`]} onChange={e => setTests({...tests, [`rast${t}`]: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 font-black text-white focus:outline-none focus:border-rose-500 transition-all pl-8 text-center text-sm" placeholder="dtk" />
                      </div>
                    ))}
                 </div>
               </div>

               {/* BEEP TEST AUTO CONVERTER */}
               <div className="sm:col-span-2 bg-rose-50/50 p-6 rounded-[2rem] border border-rose-100 mt-2 shadow-inner">
                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-3">
                   <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">
                     Beep Test Aerobic Base
                   </label>
                   <div className="flex flex-wrap items-center gap-2">
                     {calculatedVO2Max !== '' && (
                       <span className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-sm animate-in fade-in slide-in-from-right-2 flex items-center gap-2">
                         VO2Max: {calculatedVO2Max} <span className="text-[10px] opacity-70">ML/KG/MIN</span>
                       </span>
                     )}
                     <span className="bg-slate-900 text-amber-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                       Target Emas: {getTargetPlaceholder('beep', identity.gender)}
                     </span>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</span>
                       <input type="number" value={tests.beepLevel} onChange={e => setTests({...tests, beepLevel: e.target.value})} className={`${testInputClass} pl-16 pr-6`} placeholder="0" />
                    </div>
                    <div className="relative">
                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Balikan</span>
                       <input type="number" value={tests.beepShuttle} onChange={e => setTests({...tests, beepShuttle: e.target.value})} className={`${testInputClass} pl-20 pr-6`} placeholder="0" />
                    </div>
                 </div>
               </div>

               {/* PERINGATAN ASIMETRIS KUDA-KUDA (HOP JUMP) */}
               {symmetryData.isDanger && (
                   <div className="sm:col-span-2 mt-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5 flex gap-4 animate-pulse shadow-sm">
                     <div className="text-amber-600 mt-0.5"><IconAlert /></div>
                     <div>
                       <h4 className="font-black text-sm uppercase tracking-wide">Peringatan Asimetri Kuda-kuda (Stance Imbalance)</h4>
                       <p className="text-xs font-medium mt-1 leading-relaxed">Daya ledak kaki Kanan dan Kiri berselisih ekstrem melebihi 10% (Tepatnya: <b>{symmetryData.diff}%</b>). Otot tungkai <b>{symmetryData.weakSide}</b> sangat rawan memicu cedera atau hilangnya keseimbangan (equilibrium) saat mengeksekusi teknik tendangan atau menahan bantingan.</p>
                     </div>
                   </div>
               )}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div className={`rounded-[3rem] p-10 shadow-2xl text-center relative overflow-hidden transition-all duration-700 border-b-[12px] ${averageScore > 80 ? 'bg-slate-900 text-white border-rose-700' : averageScore < 60 && averageScore > 0 ? 'bg-red-800 text-white border-red-900' : 'bg-white border-slate-200'}`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-rose-600 opacity-50"></div>
            <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-3 ${averageScore > 80 || (averageScore < 60 && averageScore > 0) ? 'text-rose-400/60' : 'text-slate-400'}`}>Combat Performance Score</h3>
            <div className="text-[100px] font-black tracking-tighter mb-4 italic leading-none drop-shadow-lg">{isBlanko ? '-' : averageScore || 0}</div>
            
            <div className={`inline-flex items-center justify-center gap-3 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-inner border ${averageScore > 80 ? 'bg-rose-900/50 text-amber-400 border-rose-500/30' : averageScore < 60 && averageScore > 0 ? 'bg-red-900/50 text-red-100 border-red-500/30' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
               {averageScore > 80 ? 'WORLD CLASS FIGHTER' : averageScore < 60 && averageScore > 0 ? 'NEEDS TACTICAL DRILL' : averageScore > 0 ? 'QUALIFIED ATHLETE' : isBlanko ? 'BLANKO RECORDING' : 'WAITING FOR DATA'}
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-200 flex-1 flex flex-col items-center">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.3em] text-center mb-8 italic">8-Axis Biokinetic Radar</h3>
             <div className="flex-1 w-full flex items-center justify-center min-h-[300px] bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
               <RadarChart data={activeRadarData} labels={activeLabels} isBlanko={isBlanko} />
             </div>
             <p className="text-[10px] font-black text-slate-400 text-center mt-6 uppercase tracking-[0.2em]">Red Polygon = Actual Capacity • Gray Line = Elite Standard</p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-700"></div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex justify-between items-center">
              <span>Distribusi Poin Total</span>
              <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-400">MAKS 100</span>
            </h3>
            {/* Hanya menampilkan 8 Tes Utama agar tidak kepanjangan di UI, tapi nilai rata-rata menghitung 15 parameter */}
            <div className="space-y-4">
              {activeLabels.map((label, idx) => {
                const val = activeRadarData[idx];
                return (
                  <div key={idx} className="flex items-center">
                    <span className="text-[10px] font-black text-slate-700 uppercase w-28 tracking-tighter">{label}</span>
                    {isBlanko ? (
                      <div className="flex-1 border-b-2 border-dotted border-slate-200 mx-4"></div>
                    ) : (
                      <div className="flex-1 flex justify-end items-center gap-4 ml-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${val >= 80 ? 'bg-rose-600' : val >= 60 ? 'bg-amber-400' : 'bg-rose-900'}`} style={{ width: `${val}%` }}></div>
                        </div>
                        <span className={`text-xs font-black w-8 text-right ${val >= 80 ? 'text-rose-600' : 'text-slate-500'}`}>{val}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
               <span className="text-[10px] font-black text-slate-300 tracking-[0.4em] uppercase">by fiqhipondaa9</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}