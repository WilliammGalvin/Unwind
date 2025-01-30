interface WritingPromptCategory {
  prompts: string[];
}

const writingPrompts: Record<string, WritingPromptCategory> = {
  gratitude: {
    prompts: [
      "What are three things you're grateful for today?",
      "What’s one simple pleasure that made you smile this week?",
    ],
  },
  "short-story": {
    prompts: [
      "Write a short story about a character who discovers an unexpected talent.",
      "Describe a day in the life of someone who wakes up in a world where everything is reversed.",
    ],
  },
  "self-reflection": {
    prompts: [
      "Reflect on a recent challenge and how you overcame it.",
      "What’s one habit you’d like to cultivate and why?",
    ],
  },
  poetry: {
    prompts: [
      "Write a poem about the feeling of nostalgia.",
      "Create a poem inspired by a specific season or time of day.",
    ],
  },
  "philosophical-nonsense": {
    prompts: [
      "If you could have dinner with any philosopher, dead or alive, who would it be and why?",
      "Can time travel ever be possible? Write your thoughts.",
    ],
  },
};

export default writingPrompts;
