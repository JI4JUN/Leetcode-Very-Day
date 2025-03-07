/*
 * @lc app=leetcode id=211 lang=typescript
 *
 * [211] Design Add and Search Words Data Structure
 */

// @lc code=start
class WordDictionary {
	private children: Map<string, WordDictionary>;
	private wordEnd: boolean;

	constructor() {
		this.children = new Map();
		this.wordEnd = false;
	}

	addWord(word: string): void {
		let current: WordDictionary = this;

		for (const letter of word) {
			if (!current.children.has(letter)) {
				current.children.set(letter, new WordDictionary());
			}

			current = current.children.get(letter)!;
		}

		current.wordEnd = true;
	}

	// ======================== Approach 1 ======================== //
	search1(word: string): boolean {
		let current: WordDictionary = this;

		const dfs = (currWord: string, currNode: WordDictionary): boolean => {
			for (let i = 0; i < currWord.length; ++i) {
				const letter: string = currWord[i];

				if (letter === '.') {
					for (const childLetter of currNode.children.values()) {
						if (dfs(currWord.slice(i + 1), childLetter)) {
							return true;
						}
					}

					return false;
				} else {
					if (!currNode.children.has(letter)) {
						return false;
					}

					currNode = currNode.children.get(letter)!;
				}
			}

			return currNode.wordEnd;
		};

		return dfs(word, current);
	}

	// ======================== Approach 2 ======================== //
	search(word: string): boolean {
		const queue: [WordDictionary, number][] = [[this, 0]];

		while (queue.length > 0) {
			const [currentNode, index] = queue.shift()!;

			if (index !== word.length) {
				const currentLetter: string = word[index];

				if (currentLetter === '.') {
					for (const childLetter of currentNode.children.values()) {
						queue.push([childLetter, index + 1]);
					}
				} else {
					if (currentNode.children.has(currentLetter)) {
						queue.push([
							currentNode.children.get(currentLetter)!,
							index + 1
						]);
					}
				}
			} else {
				if (currentNode.wordEnd) {
					return true;
				}
			}
		}

		return false;
	}
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end
