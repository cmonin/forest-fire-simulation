import type {ForestState} from "@/types/ForestState";
import {TreeState} from "@/types/TreeState";

type TreeCoordinates = {
    x: number;
    y: number;
}

/**
 * Compute next forest state, given current state, and global burnProbability between 0 and 1
 * @param forestState
 * @param burnProbability
 */
export function nextForestState(forestState: ForestState, burnProbability: number): ForestState {
    const res: ForestState = cloneForestState(forestState);
    for (let i = 0; i < forestState.length; i++) {
        for (let j = 0; j < forestState[i].length; j++) {
            res[i][j] = nextTreeState(forestState[i][j], () => burntByNeighbours(computeBurningNeighboursCount({x: i, y: j}, forestState), burnProbability))
        }
    }
    return res;
}
function nextTreeState(currentTreeState: TreeState, treeBurntByNeighbours: () => boolean): TreeState {
    switch(currentTreeState) {
        case TreeState.ALIVE:
            return treeBurntByNeighbours() ? TreeState.BURNING : TreeState.ALIVE
        case TreeState.BURNING:
        case TreeState.DEAD:
            return TreeState.DEAD
        default:
            throw new Error('TreeState not supported: ' + currentTreeState)
    }
}

/**
 * Try to burn a tree, given a probability to be burnt for each burning tree in the neighbourhood
 * @param burningNeighboursCount
 * @param flammability
 */
function burntByNeighbours(burningNeighboursCount: number, flammability: number) {
    let i = 0
    while (i < burningNeighboursCount) {
        if (Math.random() < flammability) {
            return true;
        }
        i++
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

/**
 * Count burning neighbours of a tree in a forest
 * @param treeCoordinates
 * @param forestState
 */
function computeBurningNeighboursCount(treeCoordinates: TreeCoordinates, forestState: ForestState): number {
    const burningNeighbours: TreeCoordinates[] = getNeighboursCoordinates(treeCoordinates, forestState)
        .filter((neighbourCoord: TreeCoordinates) => {
            return forestState[neighbourCoord.x][neighbourCoord.y] === TreeState.BURNING;
        });
    return burningNeighbours.length;
}

/**
 * Return coordinates of all trees in the neighbourhood of a tree in a forest
 * @param treeCoordinates
 * @param forestState
 */
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