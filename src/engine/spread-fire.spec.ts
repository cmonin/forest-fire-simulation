import { describe, it, expect } from 'vitest'
import {
    nextForestState,
    treeIsInForest
} from "@/engine/spread-fire";
import type {ForestState} from "@/types/forest-state";

describe('Next forest state', (): void => {

    it('1 tree, burnProbability 0', () => {
        expectStatesToEqual(nextForestState([[0]], 0), [[0]]);
        expectStatesToEqual(nextForestState([[1]], 0), [[2]]);
        expectStatesToEqual(nextForestState([[2]], 0), [[2]]);
    })
    it('1 tree, burnProbability 1', () => {
        expectStatesToEqual(nextForestState([[0]], 1), [[0]]);
        expectStatesToEqual(nextForestState([[1]], 1), [[2]]);
        expectStatesToEqual(nextForestState([[2]], 1), [[2]]);
    })

    it('1 row 2 trees, burnProbability 0', () => {
        expectStatesToEqual(nextForestState([[0, 0]], 0), [[0, 0]]);
        expectStatesToEqual(nextForestState([[0, 1]], 0), [[0, 2]]);
        expectStatesToEqual(nextForestState([[0, 2]], 0), [[0, 2]]);
        expectStatesToEqual(nextForestState([[1, 1]], 0), [[2, 2]]);
        expectStatesToEqual(nextForestState([[1, 2]], 0), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 2]], 0), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 1]], 0), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 0]], 0), [[2, 0]]);
        expectStatesToEqual(nextForestState([[1, 0]], 0), [[2, 0]]);
    })

    it('1 row 2 trees, burnProbability 1', () => {
        expectStatesToEqual(nextForestState([[0, 0]], 1), [[0, 0]]);
        expectStatesToEqual(nextForestState([[0, 1]], 1), [[1, 2]]);
        expectStatesToEqual(nextForestState([[0, 2]], 1), [[0, 2]]);
        expectStatesToEqual(nextForestState([[1, 1]], 1), [[2, 2]]);
        expectStatesToEqual(nextForestState([[1, 2]], 1), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 2]], 1), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 1]], 1), [[2, 2]]);
        expectStatesToEqual(nextForestState([[2, 0]], 1), [[2, 0]]);
        expectStatesToEqual(nextForestState([[1, 0]], 1), [[2, 1]]);
    })

    it('2 rows 1 tree, burnProbability 0', () => {
        expectStatesToEqual(nextForestState([[0], [0]], 0), [[0], [0]]);
        expectStatesToEqual(nextForestState([[0], [1]], 0), [[0], [2]]);
        expectStatesToEqual(nextForestState([[0], [2]], 0), [[0], [2]]);
        expectStatesToEqual(nextForestState([[1], [1]], 0), [[2], [2]]);
        expectStatesToEqual(nextForestState([[1], [2]], 0), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [2]], 0), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [1]], 0), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [0]], 0), [[2], [0]]);
        expectStatesToEqual(nextForestState([[1], [0]], 0), [[2], [0]]);
    })

    it('2 rows 1 tree, burnProbability 1', () => {
        expectStatesToEqual(nextForestState([[0], [0]], 1), [[0], [0]]);
        expectStatesToEqual(nextForestState([[0], [1]], 1), [[1], [2]]);
        expectStatesToEqual(nextForestState([[0], [2]], 1), [[0], [2]]);
        expectStatesToEqual(nextForestState([[1], [1]], 1), [[2], [2]]);
        expectStatesToEqual(nextForestState([[1], [2]], 1), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [2]], 1), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [1]], 1), [[2], [2]]);
        expectStatesToEqual(nextForestState([[2], [0]], 1), [[2], [0]]);
        expectStatesToEqual(nextForestState([[1], [0]], 1), [[2], [1]]);
    })

    it('bigger forest, burnProbability 0', () => {
        expectStatesToEqual(nextForestState([
            [0, 2, 2, 1],
            [2, 0, 1, 1],
            [2, 2, 1, 0]
        ], 0), [
            [0, 2, 2, 2],
            [2, 0, 2, 2],
            [2, 2, 2, 0]
        ]);

        expectStatesToEqual(nextForestState([
            [0, 2, 2, 1],
            [0, 0, 1, 1],
            [2, 2, 1, 0]
        ], 0), [
            [0, 2, 2, 2],
            [0, 0, 2, 2],
            [2, 2, 2, 0]
        ]);
    })

    it('bigger forest, burnProbability 1', () => {
        expectStatesToEqual(nextForestState([
            [0, 2, 2, 1],
            [2, 0, 1, 1],
            [2, 2, 1, 0]
        ], 1), [
            [0, 2, 2, 2],
            [2, 1, 2, 2],
            [2, 2, 2, 1]
        ]);

        expectStatesToEqual(nextForestState([
            [0, 2, 2, 1],
            [0, 0, 1, 1],
            [2, 2, 1, 0]
        ], 1), [
            [0, 2, 2, 2],
            [0, 1, 2, 2],
            [2, 2, 2, 1]
        ]);
    })
})

function expectStatesToEqual(state1: ForestState, state2: ForestState): void {
    expect(state1.length).to.equal(state2.length, 'Forests do not have same number of rows');
    for (let i = 0; i < state1.length; i++) {
        expect(state1[i].length).to.equal(state2[i].length, 'Forests\' row (' + i + ') do not have same number of trees');
        for (let j = 0; j < state1[i].length; j++) {
            expect(state1[i][j]).to.equal(state2[i][j], 'Forests\' tree (' + i + ',' + j + ') do not have same value');
        }
    }
}
