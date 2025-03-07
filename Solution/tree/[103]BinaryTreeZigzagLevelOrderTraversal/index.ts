/*
 * @lc app=leetcode id=103 lang=typescript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// ======================== Approach 1 ======================== //
function zigzagLevelOrder1(root: TreeNode | null): number[][] {
    if (root === null) {
        return [];
    }

    const result: number[][] = [[root.val]];
    const queue: TreeNode[] = [root];
    let directiveFlag: boolean = true;

    while (queue.length) {
        const size: number = queue.length;
        const currLevel: number[] = [];

        for (let i = 0; i < size; ++i) {
            if (directiveFlag) {
                const { left, right } = queue.pop()!;

                if (right !== null) {
                    currLevel.push(right.val);
                    queue.unshift(right);
                }
                if (left !== null) {
                    currLevel.push(left.val);
                    queue.unshift(left);
                }
            } else {
                const { left, right } = queue.shift()!;

                if (left !== null) {
                    currLevel.push(left.val);
                    queue.push(left);
                }
                if (right !== null) {
                    currLevel.push(right.val);
                    queue.push(right);
                }
            }
        }

        currLevel.length && result.push(currLevel);

        directiveFlag = !directiveFlag;
    }

    return result;
}

// ======================== Approach 2 ======================== //
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (root === null) {
        return [];
    }

    const result: number[][] = [[root.val]];
    const queue: TreeNode[] = [root];
    let directiveFlag: boolean = true;

    while (queue.length) {
        const size: number = queue.length;
        const currLevel: number[] = [];

        for (let i = 0; i < size; ++i) {
            const { left, right } = queue.shift()!;

            if (left !== null) {
                currLevel.push(left.val);
                queue.push(left);
            }
            if (right !== null) {
                currLevel.push(right.val);
                queue.push(right);
            }
        }

        directiveFlag && currLevel.reverse();
        currLevel.length && result.push(currLevel);

        directiveFlag = !directiveFlag;
    }

    return result;
}
// @lc code=end
