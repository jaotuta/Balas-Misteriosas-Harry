export interface CandyOption {
  id: number;
  color: string;
  name: string;
  hex: string;
  textColor: string;
  quantity: number;
}

export interface RouletteState {
  isSpinning: boolean;
  rotation: number;
  result: CandyOption | null;
  history: CandyOption[];
}
