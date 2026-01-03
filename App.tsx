import React, { useState, useCallback, useRef, useEffect } from "react";
import Wheel from "./components/Wheel";
import ColorManager from "./components/ColorManager";
import { CandyOption } from "./types";
import {
  DEFAULT_CANDY_OPTIONS,
  CANDY_OPTIONS_KEY,
  SPIN_DURATION,
} from "./constants";
import { getRandomMessage } from "./services/harryPotterMessages";

const App: React.FC = () => {
  const [candyOptions, setCandyOptions] = useState<CandyOption[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<CandyOption | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<CandyOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showColorManager, setShowColorManager] = useState(false);

  const rotationRef = useRef(0);

  // Carregar cores do localStorage ou usar padrão
  useEffect(() => {
    const saved = localStorage.getItem(CANDY_OPTIONS_KEY);
    if (saved) {
      try {
        setCandyOptions(JSON.parse(saved));
      } catch {
        setCandyOptions(DEFAULT_CANDY_OPTIONS);
      }
    } else {
      setCandyOptions(DEFAULT_CANDY_OPTIONS);
    }
  }, []);

  const handleSaveCandyOptions = (newOptions: CandyOption[]) => {
    setCandyOptions(newOptions);
    localStorage.setItem(CANDY_OPTIONS_KEY, JSON.stringify(newOptions));
    setShowColorManager(false);
  };

  const handleSpin = useCallback(() => {
    // Filtrar apenas cores com quantidade > 0
    const availableCandies = candyOptions.filter((c) => c.quantity > 0);
    if (isSpinning || availableCandies.length === 0) return;

    setIsSpinning(true);
    setResult(null);
    setMessage(null);
    setShowModal(false);

    // 1. Calcular o resultado IMEDIATAMENTE antes do giro começar
    const extraDegrees = Math.floor(Math.random() * 360);
    const newRotation = rotationRef.current + 2880 + extraDegrees;

    // Calcular qual segmento vai cair
    const normalizedRotation = (360 - (newRotation % 360)) % 360;
    const segmentAngle = 360 / availableCandies.length;
    const index = Math.floor(normalizedRotation / segmentAngle);
    const landed = availableCandies[index];

    // 3. Iniciar animação
    rotationRef.current = newRotation;
    setRotation(newRotation);

    // 4. Agendar a exibição do modal para o fim exato da animação
    setTimeout(() => {
      setResult(landed);
      setIsSpinning(false);
      setMessage(getRandomMessage());
      setHistory((prev) => [landed, ...prev.slice(0, 9)]);
      setShowModal(true);

      // Decrementar quantidade (não remover)
      setCandyOptions((prevOptions) => {
        const updated = prevOptions.map((candy) => {
          if (candy.id === landed.id) {
            return { ...candy, quantity: Math.max(0, candy.quantity - 1) };
          }
          return candy;
        });

        // Salvar no localStorage (mantendo cores com quantidade 0)
        localStorage.setItem(CANDY_OPTIONS_KEY, JSON.stringify(updated));

        return updated;
      });
    }, SPIN_DURATION);
  }, [isSpinning, candyOptions.length]);

  // Verificar se há cores com quantidade disponível
  const availableCandiesForDisplay = candyOptions.filter((c) => c.quantity > 0);

  if (availableCandiesForDisplay.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:p-12 bg-[#1a130c]">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-[#f3e5ab] magical-glow leading-tight">
            TESTE SUA MAGIA
          </h1>
          <p className="text-[#f3e5ab]/70 text-base sm:text-lg">
            Configure as cores da roleta para começar
          </p>
          <button
            onClick={() => setShowColorManager(true)}
            className="px-8 py-3 bg-[#689F38] text-white font-bold rounded-lg hover:bg-[#558B2F] transition-colors text-lg uppercase tracking-wide"
          >
            Configurar Cores
          </button>
        </div>
        {showColorManager && (
          <ColorManager
            candies={candyOptions}
            onSave={handleSaveCandyOptions}
            onClose={() => setShowColorManager(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-8 px-4 sm:p-12 overflow-x-hidden">
      {/* Header */}
      <header className="text-center space-y-4 max-w-2xl floating mb-4">
        <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-[#f3e5ab] magical-glow leading-tight">
          TESTE SUA MAGIA
        </h1>
        <div className="h-0.5 sm:h-1 w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#f3e5ab] to-transparent mx-auto"></div>
        <p className="text-[#f3e5ab]/70 text-xs sm:text-base font-medium tracking-[0.2em] uppercase px-4">
          Descubra o sabor através do destino
        </p>
      </header>

      {/* Main Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl py-4">
        <Wheel
          rotation={rotation}
          onSpin={handleSpin}
          isSpinning={isSpinning}
          candyOptions={availableCandiesForDisplay}
        />

        {/* Settings Button */}
        <button
          onClick={() => setShowColorManager(true)}
          className="mt-8 px-4 py-2 bg-[#433422] text-[#f3e5ab] rounded-lg hover:bg-[#2D2418] transition-colors text-sm font-bold uppercase tracking-widest"
        >
          ⚙ Gerenciar Cores ({availableCandiesForDisplay.length}/
          {candyOptions.length})
        </button>

        {/* History on main layout (subtle) */}
        {!isSpinning && !showModal && (
          <div className="mt-12 w-full max-w-xs animate-in fade-in duration-700">
            <h3 className="text-[10px] font-black text-[#f3e5ab]/30 uppercase tracking-[0.4em] mb-3 text-center">
              Invocados Recentemente
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {history.map((h, i) => (
                <div
                  key={`${h.id}-${i}`}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#f3e5ab]/10"
                  style={{ backgroundColor: h.hex }}
                  title={h.name}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Result Modal */}
      {showModal && result && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="parchment p-6 sm:p-10 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,1)] border-l-8 border-[#433422] relative max-w-md w-full animate-in zoom-in duration-500 slide-in-from-bottom-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-2xl text-[#433422] font-bold hover:scale-110 transition-transform"
            >
              ×
            </button>

            <h2 className="text-[#433422] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border-b border-[#433422]/20 pb-2">
              O Oráculo Proclamou:
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] border-2 border-[#433422]/30"
                  style={{ backgroundColor: result.hex }}
                />
                <div className="flex-1">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold tracking-tight">
                    Cromatismo Destinado
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#433422] leading-tight">
                    {result.name}
                  </h3>
                </div>
              </div>

              <div className="min-h-[80px] flex items-center">
                <p className="text-[#433422] font-serif text-lg sm:text-xl leading-relaxed italic border-l-2 border-[#433422]/20 pl-4 py-2">
                  "{message}"
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-[#433422]/10">
                <span className="text-[9px] font-black uppercase text-[#433422]/40 tracking-widest text-center sm:text-left">
                  Prove agora ou cale-se para sempre
                </span>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-6 py-2 bg-[#433422] text-[#f2e8c9] text-xs font-bold uppercase tracking-widest hover:bg-[#2D2418] transition-colors rounded-none"
                >
                  Aceitar Destino
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Color Manager Modal */}
      {showColorManager && (
        <ColorManager
          candies={candyOptions}
          onSave={handleSaveCandyOptions}
          onClose={() => setShowColorManager(false)}
        />
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-[#f3e5ab]/20 text-[8px] sm:text-[10px] uppercase tracking-[0.5em] flex flex-col items-center gap-2">
        <div className="w-32 sm:w-64 h-px bg-gradient-to-r from-transparent via-[#f3e5ab]/10 to-transparent mb-2"></div>
        <p>Mistérios do Sabor • Alquimia Digital</p>
        <p className="text-[7px] sm:text-[9px] font-semibold tracking-wider">
          Desenvolvido por João Lucas Cruz
        </p>
      </footer>
    </div>
  );
};

export default App;
