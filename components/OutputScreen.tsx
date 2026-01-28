import React from 'react';

interface OutputScreenProps {
  onRestart: () => void;
}

const OutputCard = ({ 
  icon, 
  title, 
  items, 
  delay 
}: { 
  icon: React.ReactNode, 
  title: string, 
  items: string[], 
  delay: string 
}) => (
  <button className={`
    flex flex-col text-left p-8 bg-white/5 border border-white/10 rounded-sm 
    hover:border-clay hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden
    animate-in fade-in slide-in-from-bottom-4 fill-mode-both
  `} style={{ animationDelay: delay }}>
    
    <div className="w-12 h-12 flex items-center justify-center bg-void border border-white/20 text-clay rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>

    <h3 className="text-xl font-display font-medium text-white mb-4 group-hover:text-clay transition-colors">
      {title}
    </h3>

    <ul className="space-y-3 mb-6 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-sm text-sage-light">
          <span className="mr-2 text-clay opacity-60">•</span>
          {item}
        </li>
      ))}
    </ul>

    <div className="flex items-center text-[10px] font-mono uppercase tracking-widest text-clay opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
      <span>Processar Download</span>
      <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </button>
);

export const OutputScreen: React.FC<OutputScreenProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen bg-obsidian text-paper flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-clay/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-void rounded-full blur-[120px] border border-white/5"></div>
      </div>

      <div className="max-w-5xl w-full text-center space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center p-3 border border-clay/30 rounded-full mb-4 animate-in fade-in zoom-in duration-700">
             <svg className="w-6 h-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-light text-white tracking-tight">
            Devolutiva Concluída
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-clay to-transparent mx-auto opacity-50"></div>
          <p className="text-sage-light font-serif italic text-2xl max-w-2xl mx-auto leading-relaxed">
            "A clareza precede a maestria."
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Card 1: PDF Summary */}
           <OutputCard 
             delay="100ms"
             title="Gerar PDF Resumo"
             icon={
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             }
             items={[
               "Resumo executivo (1 página)",
               "Índices de alerta destacados",
               "Contrato SMART definido"
             ]}
           />

           {/* Card 2: Slides */}
           <OutputCard 
             delay="200ms"
             title="Gerar Apresentação"
             icon={
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
               </svg>
             }
             items={[
               "15 slides sequenciais",
               "Gráficos nativos editáveis",
               "Roteiro de fala incluso"
             ]}
           />

           {/* Card 3: Notes */}
           <OutputCard 
             delay="300ms"
             title="Salvar Anotações"
             icon={
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
               </svg>
             }
             items={[
               "Respostas do pesquisado",
               "Observações do consultor",
               "Próximos passos"
             ]}
           />
        </div>
        
        {/* Restart Action */}
        <div className="pt-8 animate-in fade-in duration-1000 delay-500">
           <button 
              onClick={onRestart}
              className="group flex items-center justify-center space-x-3 mx-auto text-sm text-sage hover:text-white transition-colors duration-300"
           >
              <svg className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="uppercase tracking-[0.2em] font-medium">Nova Devolutiva</span>
           </button>
        </div>

      </div>
    </div>
  );
};