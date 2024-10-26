import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GameState, initialState, updataPlayerPieceValueProps } from "./initialState";

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // reset the whole game or restart game 
    resetGame: () => initialState,
    // update single dice no with help of random number generator to display in the screen
    updateDiceNo: (state, action: PayloadAction<number>) => {
      state.diceNo = action.payload;
      state.isDiceRolled = true;
    },
    // pile selected when player get 6 and he can enable state
    enablePileSelection: (state, action: PayloadAction<number>) => {
      state.touchDiceBlock = true;
      state.pileSelectionPlayer = action.payload;
    },
    // if player have atleadt one dice in the cell, then cell number enable for each player
    enableCellSelection: (state, action: PayloadAction<number>) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = action.payload;
    },
    // when your pile move then it disable your all dice and touch function
    disableTouch: (state) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = -1;
      state.pileSelectionPlayer = -1;
    },
    // if player kill other player pile then it automically get chance again, so we again enable current player touchDiceBloack and enable is not rolledm reset current player...
    unfreezeDice: (state) => {
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    // if player each signle pife go to 57 or winner point then this state update
    updateFireworks: (state, action: PayloadAction<boolean>) => {
      state.fireworks = action.payload;
    },
    // announce winner, according to player arrangement
    announceWinner: (state, action: PayloadAction<any>) => {
      state.winner = action.payload;
    },
    // if current player play his/her chance then next chance automically move to next point..
    updatePlayerChance: (state, action: PayloadAction<number>) => {
      state.chancePlayer = action.payload;
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    updataPlayerPieceValue: (state, action: PayloadAction<updataPlayerPieceValueProps>) => {
      const { pieceId, playerNo, pos, travelCount } = action.payload;
      const playerPieces = state[playerNo];
      const piece = playerPieces.find((p: GameState) => p.id == pieceId);
      state.pileSelectionPlayer = -1;

      if (piece) {
        piece.pos = pos;
        piece.travelCount = travelCount;

        console.log(state.currentPositions);
        const currentPositionIndex = state.currentPositions.findIndex(p => piece.id === pieceId,
        );
        console.log(currentPositionIndex);

        if (pos === 0) {
          if (currentPositionIndex !== -1) {
            state.currentPositions.slice(currentPositionIndex, 1);
            console.log(state.currentPositions);

          }
        } else {
          if (currentPositionIndex !== -1) {
            state.currentPositions[currentPositionIndex] = {
              id: pieceId,
              pos: pos
            }
          }
        }
      }

    }
  },
});

export const {
  resetGame,
  updateDiceNo,
  announceWinner,
  disableTouch,
  enableCellSelection,
  enablePileSelection,
  unfreezeDice,
  updateFireworks,
  updatePlayerChance,
} = gameSlice.actions;

export default gameSlice.reducer;
