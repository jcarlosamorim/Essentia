import React from 'react';
import { IdentityProfile, DiscIndices } from '../types';

interface DashboardScreenProps {
  onNext: () => void;
  data: IdentityProfile | null;
}

// --- Micro Components ---

const IndexCard = ({ label, value, description }: { label: string, value: number, description: string }) => {
  // Simple heuristic for color coding: > 50 is High (Orange), < 20 is Low (Gray), else Normal (Green/Black)
  // Real logic would be more complex based on specific psychometrics
  let statusColor = "bg-emerald-500/20 text-emerald-700 border-emerald-500/30";
  if (value > 50) statusColor = "bg-rose-500/10 text-rose-700 border-rose-500/30";
  if (value < 15) statusColor = "bg-amber-500/10 text-amber-700 border-amber-500/30";

  return (
    <div className="flex flex-col p-4 bg-white border border-paper-accent hover:shadow-soft transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-sage">{label}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border font-medium ${statusColor}`}>
          {value}
        </span>
      </div>
      <div className="text-xs text-sage-light leading-snug">{description}</div>
    </div>
  );
};

const DonutChart = ({ factors }: { factors: { d: number, i: number, s: number, c: number } }) => {
  const total = factors.d + factors.i + factors.s + factors.c;
  
  // Calculate stroke-dasharray for svg circle
  // C = 2 * pi * r. Let r=16 (viewbox 32), C ~ 100
  const r = 15.9155;
  const circumference = 100;

  const dPct = (factors.d / total) * 100;
  const iPct = (factors.i / total) * 100;
  const sPct = (factors.s / total) * 100;
  const cPct = (factors.c / total) * 100;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
        {/* Ring Background */}
        <circle cx="21" cy="21" r={r} fill="transparent" stroke="#E6E2D6" strokeWidth="4" />
        
        {/* D Segment (Red/Clay) */}
        <circle cx="21" cy="21" r={r} fill="transparent" stroke="#C88D79" strokeWidth="4"
          strokeDasharray={`${dPct} ${circumference}`} strokeDashoffset="0" />
          
        {/* I Segment (Yellow/Sage) */}
        <circle cx="21" cy="21" r={r} fill="transparent" stroke="#6B705C" strokeWidth="4"
          strokeDasharray={`${iPct} ${circumference}`} strokeDashoffset={-dPct} />

        {/* S Segment (Blue/Void) */}
        <circle cx="21" cy="21" r={r} fill="transparent" stroke="#121214" strokeWidth="4"
          strokeDasharray={`${sPct} ${circumference}`} strokeDashoffset={-(dPct + iPct)} />
          
        {/* C Segment (Gray) */}
        <circle cx="21" cy="21" r={r} fill="transparent" stroke="#A5A58D" strokeWidth="4"
          strokeDasharray={`${cPct} ${circumference}`} strokeDashoffset={-(dPct + iPct + sPct)} />
      </svg>
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
         <span className="text-xs font-mono text-sage-light">PERFIL</span>
      </div>
    </div>
  );
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNext, data }) => {
  if (!data) return <div className="flex items-center justify-center h-screen text-sage">Carregando dados...</div>;

  const indices: DiscIndices = data.disc.indices;
  
  // Determine alerts (Mock logic)
  const hasHighPressure = indices.ips > 50;
  const hasHighAdaptation = Math.abs(data.disc.towerChart.natural.d - data.disc.towerChart.adapted.d) > 15;

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans">
      
      {/* Header Bar */}
      <header className="px-8 py-6 flex justify-between items-end border-b border-paper-accent bg-paper/80 backdrop-blur-sm sticky top-0 z-30">
        <div>
           <div className="text-[10px] font-mono text-sage-light uppercase tracking-widest mb-1">Dossiê Analítico</div>
           <h1 className="text-3xl font-display font-light text-void">
             {/* Mock Name since we don't have it in the file yet, usually comes from context */}
             Executivo de Alta Performance
           </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm text-sage">
           <span>Data: {new Date().toLocaleDateString('pt-BR')}</span>
           <span className="w-px h-4 bg-paper-accent"></span>
           <span>ID: #8829-X</span>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-4 md:space-y-6">
        
        {/* --- TOP ROW: ALERTS (Conditional) --- */}
        {(hasHighPressure || hasHighAdaptation) && (
          <div className="bg-amber-50 border-l-2 border-amber-500 p-4 flex items-start space-x-4 shadow-sm">
             <div className="text-amber-600 mt-1">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <div>
               <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">Atenção Necessária</h3>
               <p className="text-sm text-amber-800/80 mt-1">
                 {hasHighPressure && "Índice de Pressão (IPS) elevado indica estresse situacional agudo. "}
                 {hasHighAdaptation && "Forte dissonância entre perfil natural e adaptado detectada."}
               </p>
             </div>
          </div>
        )}

        {/* --- ROW 1: DISC CORE & INDICES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* DISC Composition Card */}
          <div className="lg:col-span-5 bg-white border border-paper-accent p-6 shadow-soft flex items-center justify-between relative overflow-hidden group">
             <div className="relative z-10">
                <div className="text-xs font-mono text-clay uppercase tracking-widest mb-2">Dominância</div>
                <div className="text-6xl font-display font-bold text-void tracking-tighter">
                  {data.disc.dominantProfile.split('-')[0].charAt(0)}
                </div>
                <div className="text-lg font-serif italic text-sage mt-1">
                  {data.disc.dominantProfile}
                </div>
             </div>
             
             <div className="flex items-center space-x-6 z-10">
               <div className="text-right space-y-1 text-xs font-mono text-sage-light">
                 <div>D <span className="text-void">{data.disc.factors.d}%</span></div>
                 <div>I <span className="text-void">{data.disc.factors.i}%</span></div>
                 <div>S <span className="text-void">{data.disc.factors.s}%</span></div>
                 <div>C <span className="text-void">{data.disc.factors.c}%</span></div>
               </div>
               <DonutChart factors={data.disc.factors} />
             </div>
             {/* Decorative BG */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-clay/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>

          {/* Indices Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3">
             <IndexCard label="A.E.M." value={indices.aem} description="Nível de energia externa" />
             <IndexCard label="A.P.F." value={indices.apf} description="Atividade física" />
             <IndexCard label="I.P.S." value={indices.ips} description="Pressão do meio (Estresse)" />
             <IndexCard label="I.D.A." value={indices.ida} description="Dispersão de foco" />
             <IndexCard label="I.P.M." value={indices.ipm} description="Potencial de mudança" />
             
             {/* Action / Context Card */}
             <div className="bg-void text-paper p-4 flex flex-col justify-center items-center text-center cursor-pointer group hover:bg-clay transition-colors">
                <span className="text-xs font-mono opacity-50 mb-1">ANÁLISE</span>
                <span className="text-sm font-display uppercase tracking-widest group-hover:scale-105 transition-transform">Ver Torres</span>
             </div>
          </div>
        </div>

        {/* --- ROW 2: DEEP DRIVERS (Anchors, Strengths, Language) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
           
           {/* Anchors */}
           <div className="bg-white border border-paper-accent p-6 shadow-soft flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-4 bg-clay"></div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-void">Âncoras de Carreira</h3>
              </div>
              <ul className="space-y-4 flex-1">
                {data.anchors.slice(0, 3).map((anchor, i) => (
                  <li key={i} className="group">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-medium text-void group-hover:text-clay transition-colors">{anchor.name}</span>
                      <span className="text-xs font-mono text-sage-light">{anchor.score}</span>
                    </div>
                    <div className="w-full h-px bg-paper-accent group-hover:bg-clay/30 transition-colors"></div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-paper-accent text-right">
                 <span className="text-[10px] font-mono text-sage uppercase cursor-help">Motivação Intrínseca</span>
              </div>
           </div>

           {/* Strengths */}
           <div className="bg-white border border-paper-accent p-6 shadow-soft flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-4 bg-sage"></div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-void">Top Forças (VIA)</h3>
              </div>
              <div className="flex flex-wrap gap-2 content-start flex-1">
                 {data.strengths.top5.slice(0, 3).map((strength, i) => (
                   <span key={i} className="inline-block px-3 py-1.5 bg-paper border border-paper-accent rounded-sm text-xs text-obsidian hover:border-sage transition-colors cursor-default">
                     {strength.name}
                   </span>
                 ))}
                 <span className="inline-block px-3 py-1.5 border border-dashed border-sage-light/50 rounded-sm text-xs text-sage-light">
                   +21 forças
                 </span>
              </div>
              <div className="mt-6 pt-4 border-t border-paper-accent text-right">
                 <span className="text-[10px] font-mono text-sage uppercase cursor-help">Recursos Naturais</span>
              </div>
           </div>

           {/* Languages */}
           <div className="bg-white border border-paper-accent p-6 shadow-soft flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-4 bg-obsidian"></div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-void">Linguagem Valor</h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4">
                 <div className="text-center">
                    <div className="text-xs font-mono text-sage-light uppercase mb-1">Principal (Trabalho)</div>
                    <div className="text-xl font-serif italic text-void">{data.values[0].language}</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-paper p-3 text-center">
                       <span className="block text-lg font-display text-clay">{data.values[0].scoreWork}</span>
                       <span className="text-[10px] text-sage uppercase">Work</span>
                    </div>
                    <div className="bg-paper p-3 text-center">
                       <span className="block text-lg font-display text-sage">{data.values[0].scoreHome}</span>
                       <span className="text-[10px] text-sage uppercase">Home</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </main>

      {/* --- BOTTOM ACTION BAR --- */}
      <footer className="bg-white border-t border-paper-accent p-6 md:px-12 md:py-8 sticky bottom-0 z-30 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
           
           <button className="text-xs font-medium text-sage-light hover:text-clay underline underline-offset-4 transition-colors">
             Ver dados brutos completos
           </button>

           <button 
             onClick={onNext}
             className="w-full md:w-auto bg-void hover:bg-clay text-paper px-8 py-4 flex items-center justify-center space-x-4 transition-all duration-300 shadow-float hover:-translate-y-1"
           >
              <span className="font-display font-medium uppercase tracking-[0.15em] text-sm">Iniciar Sessão Guiada</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
           </button>

        </div>
      </footer>

    </div>
  );
};