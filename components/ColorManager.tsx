import React, { useState } from "react";
import { CandyOption } from "../types";

interface ColorManagerProps {
  candies: CandyOption[];
  onSave: (candies: CandyOption[]) => void;
  onClose: () => void;
}

const ColorManager: React.FC<ColorManagerProps> = ({
  candies,
  onSave,
  onClose,
}) => {
  const [editingCandies, setEditingCandies] = useState<CandyOption[]>(
    JSON.parse(JSON.stringify(candies))
  );
  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#FF0000",
    textColor: "#ffffff",
    quantity: 2,
  });

  const handleAddColor = () => {
    if (!newColor.name.trim()) {
      alert("Por favor, insira um nome para a cor");
      return;
    }

    const maxId = Math.max(...editingCandies.map((c) => c.id), 0);
    const addedColor: CandyOption = {
      id: maxId + 1,
      name: newColor.name,
      color: newColor.name.toLowerCase(),
      hex: newColor.hex,
      textColor: newColor.textColor,
      quantity: Math.max(1, newColor.quantity),
    };

    setEditingCandies([...editingCandies, addedColor]);
    setNewColor({
      name: "",
      hex: "#FF0000",
      textColor: "#ffffff",
      quantity: 2,
    });
  };

  const handleRemoveColor = (id: number) => {
    setEditingCandies(editingCandies.filter((c) => c.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setEditingCandies(
      editingCandies.map((c) => (c.id === id ? { ...c, quantity } : c))
    );
  };

  const handleSave = () => {
    if (editingCandies.length === 0) {
      alert("É necessário ter pelo menos uma cor na roleta");
      return;
    }
    onSave(editingCandies);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="parchment p-6 sm:p-10 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,1)] border-l-8 border-[#433422] relative max-w-2xl w-full animate-in zoom-in duration-500 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-[#433422] font-bold hover:scale-110 transition-transform"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-black text-[#433422] mb-6 tracking-tight">
          Gerenciador de Cores
        </h2>

        {/* Seção para adicionar nova cor */}
        <div className="bg-[#2D2418]/10 p-4 rounded-md mb-8 border border-[#433422]/30">
          <h3 className="font-bold text-[#433422] mb-4 text-sm uppercase tracking-wider">
            Adicionar Nova Cor
          </h3>

          <div className="space-y-3">
            {/* Nome da cor */}
            <div>
              <label className="block text-xs font-bold text-[#433422] mb-1 uppercase tracking-widest">
                Nome
              </label>
              <input
                type="text"
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
                }
                placeholder="Ex: Vermelho com pintas verdes"
                className="w-full px-3 py-2 text-sm border border-[#433422]/50 rounded bg-white text-[#433422] placeholder-[#433422]/50 focus:outline-none focus:border-[#433422]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Cor */}
              <div>
                <label className="block text-xs font-bold text-[#433422] mb-1 uppercase tracking-widest">
                  Cor
                </label>
                <input
                  type="color"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className="w-full h-10 border border-[#433422]/50 rounded cursor-pointer"
                />
              </div>

              {/* Cor do texto */}
              <div>
                <label className="block text-xs font-bold text-[#433422] mb-1 uppercase tracking-widest">
                  Texto
                </label>
                <input
                  type="color"
                  value={newColor.textColor}
                  onChange={(e) =>
                    setNewColor({ ...newColor, textColor: e.target.value })
                  }
                  className="w-full h-10 border border-[#433422]/50 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#433422] mb-1 uppercase tracking-widest">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                value={newColor.quantity}
                onChange={(e) =>
                  setNewColor({
                    ...newColor,
                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-full px-3 py-2 text-sm border border-[#433422]/50 rounded bg-white text-[#433422] focus:outline-none focus:border-[#433422]"
              />
            </div>

            <button
              onClick={handleAddColor}
              className="w-full mt-3 px-4 py-2 bg-[#D32F2F] text-white font-bold rounded hover:bg-[#B71C1C] transition-colors text-sm uppercase tracking-wide"
            >
              + Adicionar Cor
            </button>
          </div>
        </div>

        {/* Lista de cores */}
        <div className="space-y-3">
          <h3 className="font-bold text-[#433422] text-sm uppercase tracking-wider mb-4">
            Cores da Roleta ({editingCandies.length})
          </h3>

          {editingCandies.length === 0 ? (
            <p className="text-center text-[#433422]/50 py-8 italic">
              Nenhuma cor adicionada ainda
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {editingCandies.map((candy) => (
                <div
                  key={candy.id}
                  className="flex items-center gap-3 p-3 bg-[#f3e5ab]/20 border border-[#433422]/30 rounded hover:bg-[#f3e5ab]/40 transition-colors"
                >
                  {/* Amostra de cor */}
                  <div
                    className="w-8 h-8 rounded border-2 border-[#433422]/30 flex-shrink-0"
                    style={{ backgroundColor: candy.hex }}
                    title={`Texto: ${candy.textColor}`}
                  />

                  {/* Info da cor */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#433422] text-sm truncate">
                      {candy.name}
                    </p>
                    <p className="text-xs text-[#433422]/60 font-mono">
                      {candy.hex}
                    </p>
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          candy.id,
                          Math.max(1, candy.quantity - 1)
                        )
                      }
                      className="w-6 h-6 bg-[#2D2418] text-[#f3e5ab] rounded hover:bg-[#433422] transition-colors text-sm font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={candy.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          candy.id,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-10 px-1 py-1 text-center text-sm border border-[#433422]/50 rounded bg-white text-[#433422] font-bold focus:outline-none focus:border-[#433422]"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(candy.id, candy.quantity + 1)
                      }
                      className="w-6 h-6 bg-[#2D2418] text-[#f3e5ab] rounded hover:bg-[#433422] transition-colors text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => handleRemoveColor(candy.id)}
                    className="px-3 py-1 bg-[#D32F2F]/20 text-[#D32F2F] border border-[#D32F2F] rounded hover:bg-[#D32F2F] hover:text-white transition-colors text-xs font-bold flex-shrink-0"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-[#433422]/30">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#433422]/20 text-[#433422] font-bold rounded hover:bg-[#433422]/40 transition-colors text-sm uppercase tracking-wide"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-[#689F38] text-white font-bold rounded hover:bg-[#558B2F] transition-colors text-sm uppercase tracking-wide"
          >
            Salvar Mudanças
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorManager;
