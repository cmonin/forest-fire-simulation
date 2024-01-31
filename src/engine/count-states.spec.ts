import { describe, it, expect } from 'vitest'
import {countStates} from "@/engine/count-states";
import type {StatesCount} from "@/types/states-count";

describe('Forest states count', (): void => {

    it('1 tree', () => {
        expectCountsToEqual(countStates([[0]]), {alive: 1, burning: 0, dead: 0});
        expectCountsToEqual(countStates([[1]]), {alive: 0, burning: 1, dead: 0});
        expectCountsToEqual(countStates([[2]]), {alive: 0, burning: 0, dead: 1});
    })

    it('1 row 2 trees', () => {
        expectCountsToEqual(countStates([[0, 0]]), {alive: 2, burning: 0, dead: 0});
        expectCountsToEqual(countStates([[0, 1]]), {alive: 1, burning: 1, dead: 0});
        expectCountsToEqual(countStates([[0, 2]]), {alive: 1, burning: 0, dead: 1});
        expectCountsToEqual(countStates([[1, 1]]), {alive: 0, burning: 2, dead: 0});
        expectCountsToEqual(countStates([[1, 2]]), {alive: 0, burning: 1, dead: 1});
        expectCountsToEqual(countStates([[2, 2]]), {alive: 0, burning: 0, dead: 2});
        expectCountsToEqual(countStates([[2, 1]]), {alive: 0, burning: 1, dead: 1});
        expectCountsToEqual(countStates([[2, 0]]), {alive: 1, burning: 0, dead: 1});
        expectCountsToEqual(countStates([[1, 0]]), {alive: 1, burning: 1, dead: 0});
    })

    it('2 rows 1 tree', () => {
        expectCountsToEqual(countStates([[0], [0]]), {alive: 2, burning: 0, dead: 0});
        expectCountsToEqual(countStates([[0], [1]]), {alive: 1, burning: 1, dead: 0});
        expectCountsToEqual(countStates([[0], [2]]), {alive: 1, burning: 0, dead: 1});
        expectCountsToEqual(countStates([[1], [1]]), {alive: 0, burning: 2, dead: 0});
        expectCountsToEqual(countStates([[1], [2]]), {alive: 0, burning: 1, dead: 1});
        expectCountsToEqual(countStates([[2], [2]]), {alive: 0, burning: 0, dead: 2});
        expectCountsToEqual(countStates([[2], [1]]), {alive: 0, burning: 1, dead: 1});
        expectCountsToEqual(countStates([[2], [0]]), {alive: 1, burning: 0, dead: 1});
        expectCountsToEqual(countStates([[1], [0]]), {alive: 1, burning: 1, dead: 0});
    })

    it('bigger forest', () => {
        expectCountsToEqual(countStates([
            [0, 2, 2, 1],
            [2, 0, 1, 1],
            [2, 2, 1, 0]
        ]), {alive: 3, burning: 4, dead: 5});
    })

})

function expectCountsToEqual(count1: StatesCount, count2: StatesCount): void {
    expect(count1.alive).to.equal(count2.alive)
    expect(count1.burning).to.equal(count2.burning)
    expect(count1.dead).to.equal(count2.dead)
}