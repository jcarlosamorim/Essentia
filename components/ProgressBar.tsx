import React from 'react';

interface ProgressBarProps {
  currentStep: number; // 1 to 15
  totalSteps: number;
  visitedSteps: number[]; // Array of step numbers (1-15) that have been visited
  onStepClick: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, visitedSteps, onStepClick }) => {
  return (
    <div className="w-full h-12 bg-white border-b border-paper-accent flex items-center px-6 relative z-10">
      <div className="flex-1 flex items-center space-x-1.5 h-full">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isVisited = visitedSteps.includes(stepNum);
          
          return (
            <button
              key={stepNum}
              onClick={() => onStepClick(stepNum)}
              className="group relative flex-1 h-8 flex items-center justify-center focus:outline-none"
              title={`Ir para Passo ${stepNum}`}
            >
              {/* Active Indicator (Top Triangle) */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-clay"></div>
              )}

              {/* The Bar Segment */}
              <div 
                className={`
                  w-full h-1.5 rounded-sm transition-all duration-300 ease-out relative overflow-hidden
                  ${isActive 
                    ? 'bg-clay h-2 shadow-[0_0_10px_-2px_rgba(200,141,121,0.5)]' 
                    : isVisited 
                      ? 'bg-clay/40 hover:bg-clay/60' 
                      : 'bg-paper-accent hover:bg-paper-accent/80'
                  }
                `}
              >
                 {/* Shine effect for active */}
                 {isActive && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                 )}
              </div>

              {/* Number Tooltip on Hover */}
              <span className={`
                absolute bottom-0 text-[9px] font-mono font-bold transition-all duration-200
                ${isActive ? 'opacity-100 text-clay translate-y-2' : 'opacity-0 group-hover:opacity-100 translate-y-1 text-sage'}
              `}>
                {stepNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};