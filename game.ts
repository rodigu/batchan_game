type PieceOwner = 0 | 1;
type PieceSize = 0 | 1 | 2;
type CellID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Piece {
  owner: PieceOwner;
  size: PieceSize;
}

interface GameMove {
  cell: CellID;
  piece: Piece;
}

interface Player {
  pieces: Map<PieceSize, Piece[]>;
}

class GameCell {
  readonly pieces: Set<Piece>;
  private topPiece: Piece | undefined;

  constructor() {
    this.pieces = new Set();
  }

  canAddPiece(piece: Piece) {
    return (
      this.topPiece === undefined ||
      (this.topPiece.owner !== piece.owner && this.topPiece.size < piece.size)
    );
  }

  addPiece(piece: Piece) {
    if (!this.canAddPiece) return false;
    this.pieces.add(piece);
    this.topPiece = piece;
    return true;
  }
}

class BatchanGame {
  private boardCells: Map<CellID, GameCell>;
  private players: Player[];

  constructor(pieceCount: [number, number, number]) {
    this.boardCells = new Map();

    for (let i = 0; i < 9; i++)
      this.boardCells.set(i as CellID, new GameCell());

    this.players = [];

    this.players.push(BatchanGame.createPlayer(pieceCount, 0));
    this.players.push(BatchanGame.createPlayer(pieceCount, 1));
  }

  isGameOver(): bool {}

  validMoves(): GameMove[] {}

  isValidMove(): bool {}

  static createPlayer(
    pieceCount: [number, number, number],
    playerID: PieceOwner
  ): Player {
    const player = { pieces: new Map() } as Player;

    for (const [size, count] of pieceCount.entries()) {
      const pieceList: Piece[] = [];
      for (let i = 0; i < count; i++) {
        pieceList.push({
          owner: playerID,
          size: size,
        } as Piece);
      }
      player.pieces.set(size as PieceSize, pieceList);
    }

    return player;
  }
}
