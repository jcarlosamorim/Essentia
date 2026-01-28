import React, { useState } from 'react';
import { StepData, IdentityProfile } from '../types';

interface StepScreenProps {
  step: StepData;
  stepNumber: number; // 1 to 15
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  profileData?: IdentityProfile | null;
  viewMode: 'study' | 'session';
}

// --- Visual Aid: DISC Cards ---
const DiscCards = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards = [
    { id: 'D', color: 'bg-[#C88D79]', label: 'Dominância', keyWords: 'Comando, Desafio, Resultado', desc: 'Orientado para tarefas e rapidez.' },
    { id: 'I', color: 'bg-[#E3B505]', label: 'Influência', keyWords: 'Pessoas, Otimismo, Comunicação', desc: 'Orientado para pessoas e interações.' },
    { id: 'S', color: 'bg-[#6B705C]', label: 'Estabilidade', keyWords: 'Planejamento, Cooperação, Ritmo', desc: 'Orientado para segurança e processos.' },
    { id: 'C', color: 'bg-[#A5A58D]', label: 'Conformidade', keyWords: 'Precisão, Análise, Regras', desc: 'Orientado para qualidade e dados.' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
          className={`
            relative p-4 text-left border transition-all duration-300 group overflow-hidden
            ${activeCard === card.id ? 'border-void shadow-md bg-paper-accent' : 'border-paper-accent bg-white hover:border-clay/50'}
          `}
        >
          <div className="flex justify-between items-start mb-2 relative z-10">
            <span className={`text-2xl font-display font-bold ${activeCard === card.id ? 'text-void' : 'text-sage-light'}`}>
              {card.id}
            </span>
            <div className={`w-3 h-3 rounded-full ${card.color}`}></div>
          </div>
          <div className="relative z-10">
            <span className="block text-sm font-bold text-void uppercase tracking-wide">{card.label}</span>
            {activeCard === card.id && (
               <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-[10px] uppercase tracking-widest text-clay mb-1">{card.keyWords}</p>
                  <p className="text-xs text-sage leading-relaxed">{card.desc}</p>
               </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

// --- Visual Aid: Pie Chart ---
const PieChart = ({ factors }: { factors: { d: number, i: number, s: number, c: number } }) => {
    // Calculate percentages for conic gradient
    const total = factors.d + factors.i + factors.s + factors.c;
    const dEnd = (factors.d / total) * 100;
    const iEnd = dEnd + (factors.i / total) * 100;
    const sEnd = iEnd + (factors.s / total) * 100;
    // C fills the rest

    return (
        <div className="flex flex-col items-center mt-6">
            <div 
                className="w-48 h-48 rounded-full shadow-lg relative"
                style={{
                    background: `conic-gradient(
                        #C88D79 0% ${dEnd}%, 
                        #E3B505 ${dEnd}% ${iEnd}%, 
                        #6B705C ${iEnd}% ${sEnd}%, 
                        #A5A58D ${sEnd}% 100%
                    )`
                }}
            >
                {/* Inner Circle for Donut effect */}
                <div className="absolute inset-4 bg-paper rounded-full flex items-center justify-center">
                    <span className="font-display font-bold text-void text-lg">DISC</span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#C88D79] rounded-full"></div>
                    <span className="text-xs font-mono text-sage">Dominância</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#E3B505] rounded-full"></div>
                    <span className="text-xs font-mono text-sage">Influência</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#6B705C] rounded-full"></div>
                    <span className="text-xs font-mono text-sage">Estabilidade</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#A5A58D] rounded-full"></div>
                    <span className="text-xs font-mono text-sage">Conformidade</span>
                </div>
            </div>
        </div>
    );
};

// --- Visual Aid: Tower Chart ---
const TowerChart = ({ natural, adapted }: { natural: any, adapted: any }) => {
    const factors = ['d', 'i', 's', 'c'];
    const colors: Record<string, string> = { d: '#C88D79', i: '#E3B505', s: '#6B705C', c: '#A5A58D' };
    
    return (
        <div className="mt-8 px-2">
            <div className="flex justify-between items-end h-40 space-x-4">
                {factors.map(f => (
                    <div key={f} className="flex-1 flex flex-col items-center space-y-1 h-full justify-end group">
                         {/* Adapted Bar (Meio) */}
                        <div className="w-full relative flex items-end justify-center">
                           <div 
                             className="w-3/4 bg-void/10 absolute bottom-0 transition-all duration-500" 
                             style={{ height: `${adapted[f]}%` }}
                             title={`Adaptado: ${adapted[f]}%`}
                           ></div>
                             {/* Natural Bar (Você) */}
                           <div 
                             className="w-1/2 z-10 transition-all duration-500 shadow-sm" 
                             style={{ height: `${natural[f]}%`, backgroundColor: colors[f] }}
                             title={`Natural: ${natural[f]}%`}
                           ></div>
                        </div>
                        <span className="text-xs font-display font-bold uppercase text-sage pt-2">{f}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-clay rounded-full"></div>
                    <span className="text-[10px] uppercase tracking-widest text-sage">Natural (Você)</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-void/10 rounded-full"></div>
                    <span className="text-[10px] uppercase tracking-widest text-sage">Exigência (Meio)</span>
                </div>
            </div>
        </div>
    )
}

// --- Visual Aid: Comparison Table ---
const ComparisonTable = () => {
    // Mock data if real data isn't passed ideally
    return (
        <div className="mt-6 border border-paper-accent rounded-sm overflow-hidden">
            <div className="grid grid-cols-2 bg-paper-accent/30 p-3">
                <div className="text-xs font-mono font-bold text-clay uppercase text-center">Pontos Fortes</div>
                <div className="text-xs font-mono font-bold text-void uppercase text-center">Pontos Limitantes</div>
            </div>
            <div className="divide-y divide-paper-accent/50">
                <div className="grid grid-cols-2 p-3 bg-white">
                    <div className="text-sm text-sage text-center">55%</div>
                    <div className="text-sm text-sage text-center">45%</div>
                </div>
                 <div className="p-4 text-center bg-white/50">
                    <p className="text-xs text-sage-light italic">
                        "O equilíbrio sugere saúde emocional. Discrepâncias indicam autocrítica excessiva ou narcisismo."
                    </p>
                </div>
            </div>
        </div>
    )
}

// --- Visual Aid: Anchors List ---
const AnchorsList = ({ anchors }: { anchors: any[] }) => {
    return (
        <div className="mt-6 space-y-2">
            {anchors.slice(0, 5).map((anchor, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-paper-accent rounded-sm">
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono font-bold text-clay w-4">{idx + 1}</span>
                        <span className="text-sm font-medium text-void">{anchor.name}</span>
                    </div>
                    <div className="h-1 w-16 bg-paper-accent rounded-full overflow-hidden">
                        <div className="h-full bg-clay" style={{ width: `${(anchor.score / 30) * 100}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// --- Visual Aid: Radar Chart ---
const RadarChart = ({ 
  natural, 
  adapted, 
  mode 
}: { 
  natural: { d: number, i: number, s: number, c: number }, 
  adapted: { d: number, i: number, s: number, c: number },
  mode: 'single' | 'overlay'
}) => {
  // Config
  const size = 300;
  const center = size / 2;
  const scale = (size / 2) - 40; // margin
  const maxVal = 100;

  // Helper to get coordinates
  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / 4 - Math.PI / 2;
    const r = (value / maxVal) * scale;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  // Points string generation
  const getPointsString = (data: { d: number, i: number, s: number, c: number }) => {
    return [
      getPoint(data.d, 0),
      getPoint(data.i, 1),
      getPoint(data.s, 2),
      getPoint(data.c, 3)
    ].join(' ');
  };

  const axes = ['D', 'I', 'S', 'C'];
  
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-full max-w-[300px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
           {/* Background Circles */}
           {[25, 50, 75, 100].map(r => (
             <circle key={r} cx={center} cy={center} r={(r / maxVal) * scale} fill="none" stroke="#E6E2D6" strokeDasharray="4 4" />
           ))}
           
           {/* Axes Lines */}
           {[0, 1, 2, 3].map(i => {
             const p = getPoint(100, i);
             return <line key={i} x1={center} y1={center} x2={p.split(',')[0]} y2={p.split(',')[1]} stroke="#E6E2D6" />;
           })}

           {/* Labels */}
           {axes.map((label, i) => {
             const p = getPoint(115, i);
             return (
               <text key={i} x={p.split(',')[0]} y={p.split(',')[1]} 
                 textAnchor="middle" dominantBaseline="middle" 
                 className="font-display font-bold fill-clay text-sm"
               >
                 {label}
               </text>
             )
           })}

           {/* Natural Polygon (Solid Line) */}
           {(mode === 'overlay' || mode === 'single') && (
             <polygon points={getPointsString(natural)} fill={mode === 'single' ? "none" : "rgba(18, 18, 20, 0.05)"} stroke="#121214" strokeWidth="2.5" className={mode === 'single' ? 'opacity-20' : 'opacity-100'} />
           )}

           {/* Adapted Polygon (Dashed/Dotted) */}
           <polygon points={getPointsString(adapted)} fill="none" stroke="#C88D79" strokeWidth="3" strokeDasharray="6 4" />
           
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex space-x-6 mt-4">
         <div className="flex items-center space-x-2">
           <span className="w-3 h-3 bg-obsidian rounded-full"></span>
           <span className="text-[10px] uppercase tracking-widest text-obsidian">Natural (Sólido)</span>
         </div>
         <div className="flex items-center space-x-2">
            <span className="w-3 h-3 border-2 border-clay border-dashed rounded-full"></span>
            <span className="text-[10px] uppercase tracking-widest text-clay">Adaptado (Pontilhado)</span>
         </div>
      </div>
    </div>
  );
}

// --- Visual Aid: SMART Diagram ---
const SmartDiagram = () => {
    return (
        <div className="mt-8 space-y-4">
           {[
             { l: 'S', t: 'Específico', d: 'O quê, onde e como?' },
             { l: 'M', t: 'Mensurável', d: 'Quanto? Qual indicador?' },
             { l: 'A', t: 'Atingível', d: 'Está ao seu alcance?' },
             { l: 'R', t: 'Relevante', d: 'Por que isso importa?' },
             { l: 'T', t: 'Temporal', d: 'Quando vai acontecer?' }
           ].map((item, i) => (
             <div key={i} className="flex items-center space-x-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-clay/10 border border-clay text-clay font-display font-bold text-lg rounded-sm group-hover:bg-clay group-hover:text-white transition-colors">
                   {item.l}
                </div>
                <div>
                   <span className="block text-sm font-bold text-obsidian uppercase tracking-wide">{item.t}</span>
                   <span className="text-xs text-sage-light font-serif italic">{item.d}</span>
                </div>
             </div>
           ))}
        </div>
    )
}

// --- Input Component: Improvement Selector ---
const ImprovementSelector = ({ limitations }: { limitations: string[] }) => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="flex flex-col space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 mb-2">Selecione o ponto focal:</span>
            {limitations.map((item, idx) => (
                <button
                   key={idx}
                   onClick={() => setSelected(idx)}
                   className={`
                     w-full text-left p-4 border rounded-sm transition-all duration-300 flex items-center justify-between group
                     ${selected === idx 
                        ? 'bg-clay border-clay text-white shadow-lg scale-[1.02]' 
                        : 'bg-white/5 border-white/10 text-paper hover:border-clay/50 hover:bg-white/10'}
                   `}
                >
                    <span className="font-display text-sm md:text-base">{item}</span>
                    {selected === idx && (
                       <svg className="w-5 h-5 animate-in zoom-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                    )}
                </button>
            ))}
        </div>
    );
};

// --- Input Component: SMART Form ---
const SmartForm = () => {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-clay">Específico (Ação)</label>
                <input type="text" placeholder="Qual a ação exata?" className="w-full bg-void border border-white/10 p-3 rounded-sm text-paper focus:border-clay focus:outline-none transition-colors text-sm font-sans" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-clay">Mensurável</label>
                    <input type="text" placeholder="Como saberei?" className="w-full bg-void border border-white/10 p-3 rounded-sm text-paper focus:border-clay focus:outline-none transition-colors text-sm font-sans" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-clay">Temporal</label>
                    <input type="text" placeholder="Quando?" className="w-full bg-void border border-white/10 p-3 rounded-sm text-paper focus:border-clay focus:outline-none transition-colors text-sm font-sans" />
                </div>
            </div>

             <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-clay">Celebração</label>
                <input type="text" placeholder="Como vou comemorar?" className="w-full bg-void border border-white/10 p-3 rounded-sm text-paper focus:border-clay focus:outline-none transition-colors text-sm font-sans" />
            </div>
        </div>
    );
};

// --- Input Component: Closing Input ---
const ClosingInput = () => {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Feedback Final</label>
            <textarea 
               placeholder="Escreva aqui a resposta do cliente..." 
               rows={6}
               className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-paper focus:border-emerald-500/50 focus:bg-emerald-500/5 focus:outline-none transition-all text-base font-serif leading-relaxed resize-none"
            />
        </div>
    );
}

// --- Dynamic Data Widget ---
const DataWidget = ({ step, profileData }: { step: StepData, profileData?: IdentityProfile | null }) => {
  
  // Interactive Widgets
  if (step.faz.valor === 'INTERACTIVE_SELECTION') {
      const limitations = profileData?.disc.limitations || ["Impaciência", "Baixa Escuta", "Centralização", "Resistência a Mudança"];
      return <ImprovementSelector limitations={limitations} />;
  }
  if (step.faz.valor === 'INTERACTIVE_SMART') return <SmartForm />;
  if (step.faz.valor === 'INTERACTIVE_CLOSING') return <ClosingInput />;

  // Values calculation
  let displayValue = step.faz.valor;
  let displayStatus = step.faz.status;

  // Generic Mock/Dynamic values based on keywords
  if (profileData) {
      if (step.faz.valor === 'DISC') displayValue = "Perfil"; // Contextual
      if (step.faz.valor === 'DYNAMIC_DOMINANT') displayValue = profileData.disc.dominantProfile.split('-')[0];
      if (step.faz.valor === 'DYNAMIC_TOWER_ANALYSIS') displayValue = "Em Análise"; 
      if (step.faz.valor === 'DYNAMIC_AEM') {
         displayValue = profileData.disc.indices.aem.toString();
         if (profileData.disc.indices.aem > 60) displayStatus = 'alerta';
         else displayStatus = 'neutro';
      }
      if (step.faz.valor === 'DYNAMIC_GAP') displayValue = "Alto"; // Mock logic
      if (step.faz.valor === 'DYNAMIC_APF') {
         displayValue = profileData.disc.indices.apf.toString();
         if (profileData.disc.indices.apf < 30) displayStatus = 'alerta';
         else displayStatus = 'positivo';
      }
      if (step.faz.valor === 'DYNAMIC_ANCHORS') displayValue = profileData.anchors[0]?.name || "-";
      if (step.faz.valor === 'DYNAMIC_IPS') {
          displayValue = profileData.disc.indices.ips.toString() + "%";
          if(profileData.disc.indices.ips < 85) displayStatus = 'alerta';
      }
      if (step.faz.valor === 'DYNAMIC_IDA') displayValue = profileData.disc.indices.ida.toString();
      if (step.faz.valor === 'DYNAMIC_BALANCE') displayValue = "Equilibrado";
      if (step.faz.valor === 'DYNAMIC_IPM') displayValue = profileData.disc.indices.ipm.toString();
  }

  const getStatusColor = (status: 'neutro' | 'alerta' | 'positivo') => {
    switch (status) {
      case 'alerta': return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
      case 'positivo': return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
      default: return 'text-paper border-paper-accent/30 bg-white/5';
    }
  };

  return (
    <div className={`flex items-center justify-between p-5 border rounded-sm ${getStatusColor(displayStatus)} backdrop-blur-md`}>
      <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 mb-1">
            {step.faz.dado}
          </span>
          <span className="text-2xl font-display font-medium">
            {displayValue}
          </span>
      </div>
      <div className="h-10 w-10 flex items-center justify-center rounded-full border border-current opacity-20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
      </div>
    </div>
  );
};


export const StepScreen: React.FC<StepScreenProps> = ({ step, stepNumber, onNext, onPrev, isLast, profileData, viewMode }) => {
  const isSessionMode = viewMode === 'session';

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-obsidian transition-all duration-500">
      
      {/* LEFT PANEL: ENSINA (Theory) */}
      <section className={`
         bg-paper text-void p-8 lg:p-12 overflow-y-auto border-r border-paper-accent relative transition-all duration-500 ease-in-out
         ${isSessionMode ? 'hidden lg:hidden w-0 opacity-0' : 'flex-1 w-full opacity-100'}
      `}>
        <div className="max-w-xl mx-auto flex flex-col h-full">
          
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
               <span className="inline-flex items-center justify-center px-3 py-1 bg-clay/10 border border-clay/20 text-clay text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
                 Fase {step.fase}
               </span>
               <span className="text-sage-light text-xs font-mono font-medium">
                 {String(stepNumber).padStart(2, '0')} / 15
               </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight text-void">
              {step.titulo}
            </h1>
          </div>

          <div className="flex-grow space-y-10">
             <div>
                <h3 className="flex items-center text-xs font-bold text-obsidian uppercase tracking-[0.2em] mb-3">
                  <span className="w-4 h-px bg-clay mr-2"></span>
                  {step.ensina.titulo}
                </h3>
                <p className="font-serif text-xl leading-relaxed text-obsidian/80">
                  {step.ensina.explicacao}
                </p>
             </div>

             {/* Dynamic Visual Aids */}
             {step.ensina.visualAid === 'disc-cards' && <DiscCards />}
             {step.ensina.visualAid === 'pie-chart' && profileData && <PieChart factors={profileData.disc.factors} />}
             {step.ensina.visualAid === 'tower-chart' && profileData && <TowerChart natural={profileData.disc.towerChart.natural} adapted={profileData.disc.towerChart.adapted} />}
             {step.ensina.visualAid === 'performance-map' && profileData && <RadarChart natural={profileData.disc.towerChart.natural} adapted={profileData.disc.towerChart.adapted} mode="single" />}
             {step.ensina.visualAid === 'map-overlay' && profileData && <RadarChart natural={profileData.disc.towerChart.natural} adapted={profileData.disc.towerChart.adapted} mode="overlay" />}
             {step.ensina.visualAid === 'anchors-list' && profileData && <AnchorsList anchors={profileData.anchors} />}
             {step.ensina.visualAid === 'comparison-table' && <ComparisonTable />}
             {step.ensina.visualAid === 'smart-diagram' && <SmartDiagram />}

             <div className="bg-white border border-paper-accent p-6 shadow-sm">
                <h4 className="text-xs font-mono text-sage uppercase tracking-widest mb-4 flex items-center">
                   <svg className="w-4 h-4 mr-2 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                   Como Interpretar
                </h4>
                <ul className="space-y-3">
                  {step.ensina.comoInterpretar.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-sage-light group">
                       <span className="text-clay mr-3 opacity-60 group-hover:opacity-100 transition-opacity">•</span>
                       <span className="group-hover:text-void transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
          
          <div className="hidden lg:block absolute bottom-4 left-4 text-[12rem] font-serif leading-none text-clay/5 select-none pointer-events-none -z-0">
             {step.fase}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: FAZ (Action) */}
      <section className={`
        flex flex-col relative z-10 bg-obsidian text-paper transition-all duration-500
        ${isSessionMode ? 'w-full h-full p-12 lg:p-24' : 'flex-1 p-8 lg:p-12 border-l border-white/5'}
        overflow-y-auto
      `}>
        <div className={`mx-auto w-full flex-grow flex flex-col ${isSessionMode ? 'max-w-4xl space-y-12' : 'max-w-xl space-y-8'}`}>

           {isSessionMode && (
              <div className="flex items-center space-x-4 mb-4 animate-in fade-in slide-in-from-top-4">
                 <span className="text-clay font-display text-4xl font-light">{String(stepNumber).padStart(2, '0')}</span>
                 <div className="h-8 w-px bg-white/10"></div>
                 <h2 className="text-3xl font-serif text-white/90">{step.titulo}</h2>
              </div>
           )}

           <div className={isSessionMode ? 'scale-110 origin-left mb-8' : ''}>
              <DataWidget step={step} profileData={profileData} />
           </div>

           <div className="space-y-2 group">
              <div className="flex items-center space-x-2 text-clay opacity-80">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
                 <span className="text-[10px] font-mono uppercase tracking-widest">Fale</span>
              </div>
              <div className={`
                 bg-void border-l-2 border-clay shadow-lg rounded-r-sm transition-all duration-300
                 ${isSessionMode ? 'p-10' : 'p-6 group-hover:translate-x-1'}
              `}>
                 <p className={`font-serif text-paper-accent leading-relaxed ${isSessionMode ? 'text-3xl' : 'text-lg'}`}>
                   "{step.faz.fale}"
                 </p>
              </div>
           </div>

           <div className="space-y-2 group">
              <div className="flex items-center space-x-2 text-sage-light opacity-80">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span className="text-[10px] font-mono uppercase tracking-widest">Pergunte</span>
              </div>
              <div className={`
                 bg-white/5 border border-white/10 rounded-sm transition-all duration-300
                 ${isSessionMode ? 'p-8' : 'p-6 group-hover:translate-x-1'}
              `}>
                 <p className={`font-sans text-paper leading-relaxed ${isSessionMode ? 'text-xl' : 'text-base'}`}>
                   "{step.faz.pergunte}"
                 </p>
              </div>
           </div>

           {step.faz.atencao && (
             <div className="mt-4 flex items-start space-x-3 p-4 bg-amber-900/20 border border-amber-500/30 rounded-sm">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                   <span className="block text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Atenção</span>
                   <p className="text-xs text-amber-200/80 leading-relaxed">
                      {step.faz.atencao}
                   </p>
                </div>
             </div>
           )}
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-8">
           <button 
             onClick={onPrev}
             className="text-sage-light hover:text-white transition-colors text-xs font-display uppercase tracking-widest flex items-center space-x-2 group"
           >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Anterior</span>
           </button>
           
           <button 
             onClick={onNext}
             className="bg-clay hover:bg-clay-dark text-white px-8 py-3 rounded-none font-display text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-float hover:-translate-y-0.5"
           >
             {isLast ? 'Concluir' : 'Próximo'}
           </button>
        </div>
      </section>
    </div>
  );
};