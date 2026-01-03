import { CandyOption } from "./types";

export const DEFAULT_CANDY_OPTIONS: CandyOption[] = [
  {
    id: 1,
    name: "Amarelo Pintado",
    color: "banana",
    hex: "#E8C14D",
    textColor: "#433422",
    quantity: 2,
  },
  {
    id: 2,
    name: "Cinza Escuro Pintado",
    color: "pimenta",
    hex: "#333333",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 3,
    name: "Azul Esverdeado",
    color: "meleca",
    hex: "#4D8B31",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 4,
    name: "Rosa Chiclete",
    color: "algodao",
    hex: "#F06292",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 5,
    name: "Vermelho Vibrante",
    color: "cereja",
    hex: "#D32F2F",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 6,
    name: "Bordô Profundo",
    color: "canela",
    hex: "#8B0000",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 7,
    name: "Marrom Terra",
    color: "sujeira",
    hex: "#5D4037",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 8,
    name: "Creme Pálido",
    color: "cera",
    hex: "#F5F5DC",
    textColor: "#433422",
    quantity: 2,
  },
  {
    id: 9,
    name: "Verde Grama",
    color: "grama",
    hex: "#689F38",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 10,
    name: "Verde Floresta",
    color: "sabao-v",
    hex: "#1B5E20",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 11,
    name: "Branco Marmorizado",
    color: "tutti-f",
    hex: "#FFF9C4",
    textColor: "#433422",
    quantity: 2,
  },
  {
    id: 12,
    name: "Amarelo Pálido",
    color: "vomito",
    hex: "#FBC02D",
    textColor: "#433422",
    quantity: 2,
  },
  {
    id: 13,
    name: "Marrom Avermelhado",
    color: "salsicha",
    hex: "#A1887F",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 14,
    name: "Azul Acinzentado",
    color: "sabao-a",
    hex: "#90A4AE",
    textColor: "#ffffff",
    quantity: 2,
  },
  {
    id: 15,
    name: "Laranja com Pintas",
    color: "tutti-o",
    hex: "#FFB74D",
    textColor: "#433422",
    quantity: 2,
  },
  {
    id: 16,
    name: "Rosa com Pintas",
    color: "melancia",
    hex: "#FF8A80",
    textColor: "#433422",
    quantity: 2,
  },
];

// Será usar DEFAULT_CANDY_OPTIONS no localStorage
export const CANDY_OPTIONS_KEY = "candyOptions";

// Legacy constant
export let CANDY_OPTIONS: CandyOption[] = DEFAULT_CANDY_OPTIONS;

export const WHEEL_SIZE = 500;
export const SPIN_DURATION = 5000;
