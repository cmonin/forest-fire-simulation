import { describe, it, expect } from 'vitest'
import {
    nextForestState,
    treeIsInForest
} from "@/engine/ForestFire";
import {TreeState} from "@/types/TreeState";

describe('ForestFire', (): void => {


    it('should get to next forest state', () => {
        expect(nextForestState([[0]], 0)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0]], 1)[0][0]).to.equal(TreeState.ALIVE)

        expect(nextForestState([[1]], 0)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1]], 1)[0][0]).to.equal(TreeState.DEAD)

        expect(nextForestState([[2]], 0)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[2]], 1)[0][0]).to.equal(TreeState.DEAD)

        expect(nextForestState([[0, 0]], 0)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 0]], 1)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 0]], 0)[0][1]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 0]], 1)[0][1]).to.equal(TreeState.ALIVE)

        expect(nextForestState([[0, 1]], 0)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 1]], 1)[0][0]).to.equal(TreeState.BURNING)
        expect(nextForestState([[0, 1]], 0)[0][1]).to.equal(TreeState.DEAD)
        expect(nextForestState([[0, 1]], 1)[0][1]).to.equal(TreeState.DEAD)

        expect(nextForestState([[0, 2]], 0)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 2]], 1)[0][0]).to.equal(TreeState.ALIVE)
        expect(nextForestState([[0, 2]], 0)[0][1]).to.equal(TreeState.DEAD)
        expect(nextForestState([[0, 2]], 1)[0][1]).to.equal(TreeState.DEAD)

        expect(nextForestState([[1, 1]], 0)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 1]], 1)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 1]], 0)[0][1]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 1]], 1)[0][1]).to.equal(TreeState.DEAD)

        expect(nextForestState([[1, 2]], 0)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 2]], 1)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 2]], 0)[0][1]).to.equal(TreeState.DEAD)
        expect(nextForestState([[1, 2]], 1)[0][1]).to.equal(TreeState.DEAD)

        expect(nextForestState([[2, 2]], 0)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[2, 2]], 1)[0][0]).to.equal(TreeState.DEAD)
        expect(nextForestState([[2, 2]], 0)[0][1]).to.equal(TreeState.DEAD)
        expect(nextForestState([[2, 2]], 1)[0][1]).to.equal(TreeState.DEAD)
    })
})