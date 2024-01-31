import {TreeState} from "@/types/TreeState";
import type {StatesCount} from "@/types/StatesCount";
import type {ForestState} from "@/types/ForestState";

/**
 * Count living, burning and dead trees in a forest state
 * @param forestState
 */
export function countStates(forestState: ForestState): StatesCount {
    const statesCount: StatesCount = {
        'alive': 0,
        'burning': 0,
        'dead': 0
    }
    for (let i = 0; i < forestState.length; i++) {
        for (let j = 0; j < forestState[i].length; j++) {
            switch (forestState[i][j]) {
                case TreeState.ALIVE:
                    statesCount.alive++
                    break
                case TreeState.BURNING:
                    statesCount.burning++
                    break
                case TreeState.DEAD:
                    statesCount.dead++
                    break
            }
        }
    }
    return statesCount;
}