import type {Flammability} from "@/commons/Flammability";
import type {TreeState} from "@/enums/TreeState";

export function nextTreeState(state: TreeState, isTouchedByFire: boolean, flammability: Flammability): TreeState {
    if (isTouchedByFire) {
        switch(state) {
            case TreeState.alive:
                if (Math.random() < flammability) {
                    return TreeState.burning
                }
                return state
            case TreeState.burning:
                return TreeState.dead
            case TreeState.dead:
            default:
                return state
        }
    }
    return state;
}