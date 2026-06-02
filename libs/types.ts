export interface ScoresValues {
  player: number;
  draw: number;
  computer: number;
}

export interface Counts<T> {
  easy: T;
  medium: T;
  hard: T;
}

export type Scores = Counts<ScoresValues>;
export type Games = Counts<number>;
export type GameCounts = Counts<number>;

export type Board = ("X" | "O" | null)[];

export type GameLevel = "easy" | "medium" | "hard";
