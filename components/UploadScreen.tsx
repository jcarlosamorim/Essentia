import React, { useState } from 'react';
import { analyzeFiles } from '../services/geminiService';

interface UploadScreenProps {
  onComplete: () => void;
}

type FileType = 'disc' | 'anchors' | 'strengths' | 'values';

interface UploadSlot {
  id: FileType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const SLOTS: UploadSlot[] = [
  {
    id: 'disc',
    label: 'Perfil DISC Gerencial',
    description: 'Relatório comportamental completo',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    id: 'anchors',
    label: 'Âncoras de Carreira',
    description: 'Inventário de motivações',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13.586V10a7 7 0 00-14 0v3.586l-1.707 1.707A.996.996 0 003 16a3 3 0 003 3h3.5a1 1 0 001-1v-1a2 2 0 114 0v1a1 1 0 001 1h3.5a3 3 0 003-3 .996.996 0 00-.293-.707L19 13.586z" />
        <circle cx="12" cy="19" r="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'strengths',
    label: 'Forças Pessoais',
    description: 'Mapeamento de talentos (VIA)',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'values',
    label: 'Linguagem de Valorização',
    description: 'Preferências de reconhecimento',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

export const UploadScreen: React.FC<UploadScreenProps> = ({ onComplete }) => {
  const [files, setFiles] = useState<Partial<Record<FileType, File>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState<FileType | null>(null);

  const handleDrag = (e: React.DragEvent, id: FileType | null) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (id) setDragActive(id);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, id: FileType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
         setFiles(prev => ({ ...prev, [id]: file }));
      } else {
         alert('Por favor, carregue apenas arquivos PDF.');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, id: FileType) => {
     if (e.target.files && e.target.files[0]) {
       const file = e.target.files[0];
       if (file.type === 'application/pdf') {
         setFiles(prev => ({ ...prev, [id]: file }));
       } else {
         alert('Por favor, carregue apenas arquivos PDF.');
       }
     }
  };

  const handleRemove = (id: FileType) => {
    const newFiles = { ...files };
    delete newFiles[id];
    setFiles(newFiles);
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
        // Trigger the service call. In a real app we would pass 'files'.
        // The service (in mock mode) will return data that we might store in context,
        // but for now we just wait for it to finish.
        await analyzeFiles(files);
        onComplete();
    } catch (error) {
        console.error("Extraction failed", error);
        alert("Erro ao processar arquivos. Tente novamente.");
    } finally {
        setIsProcessing(false);
    }
  };

  const allUploaded = SLOTS.every(slot => !!files[slot.id]);

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-clay/20">
      <div className="max-w-4xl w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-block relative">
             <h1 className="font-display text-5xl md:text-6xl font-light text-void tracking-tight relative z-10">EssentIA</h1>
             <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-clay to-transparent opacity-50"></div>
          </div>
          <p className="text-lg md:text-xl text-sage-light font-serif italic max-w-2xl mx-auto">
            "Para reconstruir a identidade, primeiro precisamos reunir as peças."
          </p>
        </div>

        {/* Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SLOTS.map((slot) => {
            const isFilled = !!files[slot.id];
            const isActive = dragActive === slot.id;

            return (
              <div
                key={slot.id}
                onDragEnter={(e) => handleDrag(e, slot.id)}
                onDragOver={(e) => handleDrag(e, slot.id)}
                onDragLeave={(e) => handleDrag(e, null)}
                onDrop={(e) => handleDrop(e, slot.id)}
                className={`
                  relative h-48 group transition-all duration-500 ease-out overflow-hidden
                  border ${isActive 
                    ? 'border-clay bg-clay/5 scale-[1.02]' 
                    : isFilled 
                      ? 'border-solid border-paper-accent bg-white shadow-soft' 
                      : 'border-dashed border-sage-light/40 bg-white/40 hover:border-clay/40 hover:bg-white'}
                `}
              >
                {/* File Input is enabled only when empty or via drag */}
                {!isFilled && (
                  <input
                    type="file"
                    accept="application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    onChange={(e) => handleFileSelect(e, slot.id)}
                  />
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-10">
                  {isFilled ? (
                    <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                       <div className="w-12 h-12 bg-clay text-white rounded-full flex items-center justify-center mb-3 shadow-md">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                       </div>
                       <span className="font-display text-void font-medium text-lg">{slot.label}</span>
                       <span className="text-xs text-sage font-mono mt-1 max-w-[90%] truncate px-2">
                         {files[slot.id]?.name}
                       </span>
                       
                       <button 
                         className="pointer-events-auto mt-4 text-xs font-medium text-clay hover:text-clay-dark underline decoration-clay/30 underline-offset-4 transition-colors"
                         onClick={(e) => {
                            e.preventDefault();
                            handleRemove(slot.id);
                         }}
                       >
                         Substituir arquivo
                       </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3 transition-opacity duration-300 group-hover:opacity-100 opacity-80">
                      <div className={`text-sage-light group-hover:text-clay transition-colors duration-300`}>
                        {slot.icon}
                      </div>
                      <div>
                        <span className="block font-display text-void font-medium text-lg">{slot.label}</span>
                        <span className="block text-xs text-sage-light font-serif italic mt-1">{slot.description}</span>
                      </div>
                      <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="inline-block px-3 py-1 border border-clay/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-clay bg-clay/5">
                          Arraste o PDF aqui
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={handleProcess}
            disabled={!allUploaded || isProcessing}
            className={`
              relative overflow-hidden group w-full md:w-auto min-w-[320px] py-5 px-8 transition-all duration-500 ease-out
              ${allUploaded && !isProcessing
                ? 'bg-void text-paper hover:shadow-float hover:-translate-y-1' 
                : 'bg-paper-accent/50 text-sage-light/70 cursor-not-allowed'}
            `}
          >
            <div className="relative z-10 flex items-center justify-center space-x-3 font-display text-sm font-medium tracking-[0.2em] uppercase">
              {isProcessing ? (
                <>
                   <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                   <span>Analisando Dados...</span>
                </>
              ) : (
                <>
                  <span>Processar Dossiê</span>
                  <svg className={`w-4 h-4 transition-transform duration-500 ${allUploaded ? 'group-hover:translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </div>
            {allUploaded && !isProcessing && (
              <div className="absolute inset-0 bg-clay transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -z-0"></div>
            )}
          </button>
        </div>

        <div className="text-center space-y-2">
            <p className="text-[10px] text-sage-light/60 font-mono uppercase tracking-widest">
            Ambiente Seguro • Criptografia AES-256
            </p>
        </div>

      </div>
    </div>
  );
};