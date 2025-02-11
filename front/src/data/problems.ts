import { ChessProblemProps } from "../types/interfaces";

export const problems: ChessProblemProps[] = [
    {
      FEN: 'r1b1k2r/pp3pp1/2p4b/4p3/2B3n1/NPN2QPq/P4P1P/3R1RK1 w - - 1 21',
      Moves: ['f3f7'],
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '2r5/pR5p/5p1k/4p3/4R3/B4nPP/PP3P2/1K6 b - - 0 27',
      Moves: ['f3d2','b1a1', 'c8c1'],
      Themes: 'Mate en 2 jugadas',
    },
    {
      FEN: '5r1k/pp4pp/5p2/1BbQp1r1/7K/7P/1PP3P1/3R3R b - - 3 26',
      Moves: ['c5f2', 'g2g3', 'f2g3'],
      Themes: 'Mate en 2 jugadas'
    },
    {
      FEN: '3q1rk1/5pbp/5Qp1/8/8/2B5/5PPP/6K1 w - - 0 1', 
      Moves: ['f6g7'], 
      Themes: 'Mate en 1 jugada'
    },
    {
      FEN: '2r2bk1/5p1p/6p1/2q3N1/4P2Q/8/PPP5/2KR4 w - - 0 1',
      Moves: ['h4h7'], 
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '1r6/pp2kppQ/2n1p1n1/3p2P1/5P2/2PqP3/PP1N4/2KR3R b - - 4 27',
      Moves: ['c6b4', 'c3b4', 'b8c8', 'd2c4', 'c8c4'],
      Themes: 'Mate en 3 jugadas',
    },
    {
      FEN: 'r1bqk2r/pp1nb1p1/2p1Q2p/8/2BP4/1PN3P1/P4P1P/3R1RK1 w - - 1 21',
      Moves: ['e6f7'], 
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '8/3pk3/R7/1R2PK1p/2PPn1r1/8/8/8 b - - 0 43',
      Moves: ['e4g3'], 
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '3r4/R7/2p5/p1P2p2/1p4k1/nP2K3/P3NP2/8 b - - 4 41',
      Moves: ['a3c2'], 
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: 'r2r2k1/2q1bpp1/3p3p/1ppn4/1P1BP3/P5Q1/4RPPP/R5K1 w - - 0 21',
      Moves: ['g3g7'],
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '2q3k1/4br2/6pQ/1p1n2p1/7P/1P4P1/1B2PP2/6K1 w - - 0 28',
      Moves: ['h6h8'],
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: '8/3B2pp/p5k1/6P1/1ppp1K2/8/1P6/8 w - - 0 39',
      Moves: ['d7e8'],
      Themes: 'Mate en 1 jugada',
    },
    {
      FEN: 'r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1PP1/PP4P1/R1B2R1K b kq - 0 17',
      Moves: ['g6h5'],
      Themes: 'Mate en 1 jugada',
    },
  ];