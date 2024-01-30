import type {ForestState} from "@/types/ForestState";
import {TreeState} from "@/types/TreeState";
import type {StatesCount} from "@/types/StatesCount";

type TreeCoordinates = {
    x: number;
    y: number;
}

/**
 * Compute next forest state, given current state, and global flammability between 0 and 1
 * @param forestState
 * @param flammability
 */
export function nextForestState(forestState: ForestState, flammability: number): ForestState {
    const res: ForestState = cloneForestState(forestState);
    for (let i = 0; i < forestState.length; i++) {
        for (let j = 0; j < forestState[i].length; j++) {
            const treeCoord: TreeCoordinates = {x: i, y: j};
            if (treeIsBurning(treeCoord, forestState)) {
                res[i][j] = TreeState.DEAD;
            } else if (treeIsAlive(treeCoord, forestState)) {
                if (burntByNeighbours(computeBurningNeighboursCount(treeCoord, forestState), flammability)) {
                    res[i][j] = TreeState.BURNING;
                }
            }
        }
    }
    return res;
}

export function computeStatesCount(forestState: ForestState): StatesCount {
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

function burntByNeighbours(burningNeighboursCount: number, flammability: number) {
    for (let i = 0; i < burningNeighboursCount; i++) {
        if (Math.random() < flammability) {
            return true;
        }
    }
    return false
}


function cloneForestState(forestState: ForestState): ForestState {
    const res: ForestState = [];
    for (let i = 0; i < forestState.length; i++) {
        const row: TreeState[] = []
        for (let j = 0; j < forestState[i].length; j++) {
            row.push(forestState[i][j])
        }
        res.push(row);
    }
    return res;
}

function treeIsBurnable(treeCoordinates: TreeCoordinates, forestState: ForestState): boolean {
    return treeIsAlive(treeCoordinates, forestState) && burningNeighboursCount(treeCoordinates, forestState);
}

function treeIsBurning(treeCoordinates: TreeCoordinates, forestState: ForestState): boolean {
    return forestState[treeCoordinates.x][treeCoordinates.y] === TreeState.BURNING;
}

function treeIsAlive(treeCoordinates: TreeCoordinates, forestState: ForestState): boolean {
    return forestState[treeCoordinates.x][treeCoordinates.y] === TreeState.ALIVE;
}
function computeBurningNeighboursCount(treeCoordinates: TreeCoordinates, forestState: ForestState): number {
    const burningNeighbours: TreeCoordinates[] = getNeighboursCoordinates(treeCoordinates, forestState).filter((neighbourCoord: TreeCoordinates) => {
        return forestState[neighbourCoord.x][neighbourCoord.y] === TreeState.BURNING;
    });
    return burningNeighbours.length;
}

function getNeighboursCoordinates(treeCoordinates: TreeCoordinates, forestState: ForestState): TreeCoordinates[] {
    const res: TreeCoordinates[] = [];
    const treeTop: TreeCoordinates = {
        x: (treeCoordinates.x - 1),
        y: treeCoordinates.y
    };
    const treeRight: TreeCoordinates = {
        x: treeCoordinates.x,
        y: (treeCoordinates.y + 1)
    };
    const treeBottom: TreeCoordinates = {
        x: (treeCoordinates.x + 1),
        y: treeCoordinates.y
    };
    const treeLeft: TreeCoordinates = {
        x: treeCoordinates.x,
        y: (treeCoordinates.y - 1)
    };

    [treeTop, treeRight, treeBottom, treeLeft].forEach((treeCoord: TreeCoordinates): void => {
        if (treeIsInForest(treeCoord, forestState)) {
            res.push(treeCoord);
        }
    })

    return res;
}

function treeIsInForest(treeCoordinates: TreeCoordinates, forestState: ForestState): boolean {
    return treeCoordinates.x >= 0
        && treeCoordinates.x < forestState.length
        && treeCoordinates.y >= 0
        && treeCoordinates.y < forestState[treeCoordinates.x].length;
}