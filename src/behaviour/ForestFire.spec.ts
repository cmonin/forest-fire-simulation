import { describe, it, expect } from 'vitest'
import {
    fireCanSpread,
    nextForestState,
    treeIsInForest
} from "@/behaviour/ForestFire";
import {TreeState} from "@/types/TreeState";

describe('ForestFire', (): void => {
    it('should find burnable trees', () => {
        expect(fireCanSpread([])).to.be.false
        expect(fireCanSpread([[0]])).to.be.false
        expect(fireCanSpread([[1]])).to.be.false
        expect(fireCanSpread([[2]])).to.be.false
    })

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