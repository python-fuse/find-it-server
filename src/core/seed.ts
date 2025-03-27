import prisma from "../utils/prisma";

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        title: "Two Sum",
        content:
          "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        testCases: [
          JSON.stringify({ input: [[2, 7, 11, 15], 9], output: [0, 1] }),
          JSON.stringify({ input: [[3, 2, 4], 6], output: [1, 2] }),
        ],
        difficulty: "EASY",
      },
      {
        title: "Reverse Linked List",
        content:
          "Given the head of a singly linked list, reverse the list and return its head.",
        testCases: [
          JSON.stringify({ input: [1, 2, 3, 4, 5], output: [5, 4, 3, 2, 1] }),
          JSON.stringify({ input: [1, 2], output: [2, 1] }),
        ],
        difficulty: "MEDIUM",
      },
      {
        title: "Valid Parentheses",
        content:
          "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        testCases: [
          JSON.stringify({ input: "()", output: true }),
          JSON.stringify({ input: "()[]{}", output: true }),
          JSON.stringify({ input: "(]", output: false }),
        ],
        difficulty: "EASY",
      },
      {
        title: "Merge Intervals",
        content:
          "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.",
        testCases: [
          JSON.stringify({
            input: [
              [
                [1, 3],
                [2, 6],
                [8, 10],
                [15, 18],
              ],
            ],
            output: [
              [1, 6],
              [8, 10],
              [15, 18],
            ],
          }),
          JSON.stringify({
            input: [
              [
                [1, 4],
                [4, 5],
              ],
            ],
            output: [[1, 5]],
          }),
        ],
        difficulty: "MEDIUM",
      },
      {
        title: "Word Search",
        content:
          "Given an m x n grid of characters and a word, find if the word exists in the grid.",
        testCases: [
          JSON.stringify({
            input: [
              ["A", "B", "C", "E"],
              ["S", "F", "C", "S"],
              ["A", "D", "E", "E"],
            ],
            word: "ABCCED",
            output: true,
          }),
          JSON.stringify({
            input: [
              ["A", "B"],
              ["C", "D"],
            ],
            word: "ABCD",
            output: false,
          }),
        ],
        difficulty: "HARD",
      },
    ],
  });
  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
