import React, { useState, useEffect } from 'react';
import { UploadScreen } from './components/UploadScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { StepScreen } from './components/StepScreen';
import { OutputScreen } from './components/OutputScreen';
import { ProgressBar } from './components/ProgressBar';
import { AppScreen, IdentityProfile } from './types';
import { getStepData } from './constants';
import { analyzeFiles } from './services/geminiService';

const App: React.FC = () => {
  // State Initialization with local storage check
  const [currentScreen, setCurrentScreen] = useState<number>(() => {
    const saved = localStorage.getItem('essentia_current_screen');
    return saved ? parseInt(saved, 10) : AppScreen.UPLOAD;
  });

  const [profileData, setProfileData] = useState<IdentityProfile | null>(() => {
    const saved = localStorage.getItem('essentia_profile_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [visitedScreens, setVisitedScreens] = useState<number[]>(() => {
    const saved = localStorage.getItem('essentia_visited_screens');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewMode, setViewMode] = useState<'study' | 'session'>('study');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('essentia_current_screen', currentScreen.toString());
    // Add current screen to visited list if it's a Step (Screen 2-16)
    if (currentScreen >= 2 && currentScreen <= 16) {
       const stepNum = currentScreen - 1;
       setVisitedScreens(prev => {
          if (!prev.includes(stepNum)) {
             const newVisited = [...prev, stepNum];
             localStorage.setItem('essentia_visited_screens', JSON.stringify(newVisited));
             return newVisited;
          }
          return prev;
       });
    }
  }, [currentScreen]);

  useEffect(() => {
    if (profileData) {
      localStorage.setItem('essentia_profile_data', JSON.stringify(profileData));
    } else {
      localStorage.removeItem('essentia_profile_data');
    }
  }, [profileData]);


  // Navigation Handlers
  const handleNext = () => {
    setCurrentScreen(prev => Math.min(prev + 1, AppScreen.OUTPUTS));
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentScreen(prev => Math.max(prev - 1, AppScreen.DASHBOARD));
    window.scrollTo(0, 0);
  };

  const handleJumpToStep = (stepNumber: number) => {
     // stepNumber is 1-15. Corresponds to Screen 2-16.
     const targetScreen = stepNumber + 1;
     setCurrentScreen(targetScreen);
     window.scrollTo(0, 0);
  };

  const handleUploadComplete = async () => {
    if (!profileData) {
       const data = await analyzeFiles({}); // Fetch mock data
       setProfileData(data);
    }
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const handleRestart = () => {
    // Clear State
    setProfileData(null);
    setVisitedScreens([]);
    setCurrentScreen(AppScreen.UPLOAD);
    
    // Clear Local Storage
    localStorage.removeItem('essentia_profile_data');
    localStorage.removeItem('essentia_visited_screens');
    localStorage.setItem('essentia_current_screen', AppScreen.UPLOAD.toString());
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'study' ? 'session' : 'study');
  };

  // Render logic
  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.UPLOAD:
        return <UploadScreen onComplete={handleUploadComplete} />;
      
      case AppScreen.DASHBOARD:
        return (
          <DashboardScreen 
            onNext={handleNext} 
            data={profileData}
          />
        );
      
      case AppScreen.OUTPUTS:
        return <OutputScreen onRestart={handleRestart} />;
      
      default:
        // Screens 2 to 16 map to Steps 1 to 15
        if (currentScreen >= 2 && currentScreen <= 16) {
          const stepData = getStepData(currentScreen);
          const stepIndex = currentScreen - 1; // 1-based index for UI
          
          return (
            <div className="flex flex-col h-screen overflow-hidden">
               {/* Fixed Header */}
               <header className="h-16 bg-paper flex items-center justify-between px-6 border-b border-paper-accent z-20 shrink-0 shadow-soft relative">
                  <div className="flex items-center space-x-4">
                     <span className="text-clay font-display font-bold text-lg tracking-tighter cursor-pointer" onClick={() => setCurrentScreen(AppScreen.DASHBOARD)}>EssentIA</span>
                     <span className="h-4 w-px bg-sage-light/30"></span>
                     
                     {/* View Mode Toggle */}
                     <button 
                        onClick={toggleViewMode}
                        className="flex items-center space-x-2 bg-white border border-paper-accent rounded-full px-1 py-1 pr-3 hover:border-clay/50 transition-colors focus:outline-none"
                     >
                        <div className="relative w-8 h-4 bg-paper-accent rounded-full transition-colors duration-300">
                           <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${viewMode === 'session' ? 'translate-x-4 bg-clay' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sage">
                           {viewMode === 'study' ? 'Modo Estudo' : 'Modo Sessão'}
                        </span>
                     </button>
                  </div>

                  {/* Step Counter */}
                  <div className="text-xs font-mono text-sage font-medium">
                     PASSO {stepIndex} / 15
                  </div>
               </header>
               
               {/* Interactive Progress Bar */}
               <ProgressBar 
                  currentStep={stepIndex} 
                  totalSteps={15} 
                  visitedSteps={visitedScreens}
                  onStepClick={handleJumpToStep}
               />

               {/* Main Content Area - Scrollable */}
               <div className="flex-1 overflow-hidden relative">
                  <StepScreen 
                    step={stepData} 
                    stepNumber={stepIndex}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isLast={currentScreen === 16}
                    profileData={profileData}
                    viewMode={viewMode}
                  />
               </div>
            </div>
          );
        }
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="antialiased text-void selection:bg-clay/20 selection:text-clay-dark">
      {renderScreen()}
    </div>
  );
};

export default App;