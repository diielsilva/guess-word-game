import {Word} from "./word";
import {MatchState} from "../enums/match-state";

export interface Match {
  attempts: number;
  selected: Word;
  remaining: Word[];
  state: MatchState;
}
