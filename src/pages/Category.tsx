import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router/dist";
import writingPrompts from "../prompts";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [isOutOfPrompts, setIsOutOfPrompts] = useState(false);
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");

  const fetchPrompt = (i: number) => {
    const prompts = writingPrompts[category].prompts;

    if (i >= prompts.length) {
      setIsOutOfPrompts(true);
      return;
    }

    setPrompt(prompts[i]);
  };

  const getPositiveMessage = () => {
    const messages = [
      "Good job!",
      "I'm so proud of you!",
      "Keep it up!",
      "You're awesome!",
      "You're doing great!",
      "You're amazing!",
      "You're the best!",
    ];

    return messages[Math.floor(Math.random() * messages.length)] + " :)";
  };

  useEffect(() => {
    const fetchIndex = async (): Promise<number> => {
      return await window.electron
        .getCategoryIndex(category)
        .then(async (i) => {
          if (i == undefined) {
            await window.electron.setCategoryIndex(category, 0);
            setPromptIndex(0);
            return 0;
          }

          setPromptIndex(i);
          return i;
        });
    };

    const init = async () => {
      await fetchIndex().then((i) => {
        fetchPrompt(i);
      });
    };

    init();
  }, [category]);

  const onPromptCompleted = () => {
    toast(getPositiveMessage(), {
      icon: "🩷",
    });

    setPromptIndex((prevIndex) => {
      const i = prevIndex + 1;
      window.electron.setCategoryIndex(category, i);
      fetchPrompt(i);

      return i;
    });
  };

  const getCategoryName = () => {
    let str = category;
    str = str.replace(/-/g, " ");
    str = str.replace(/\b\w/g, (l) => l.toUpperCase());

    return str;
  };

  return (
    <section className="p-4 relative">
      <button onClick={() => navigate(-1)} className="mb-3">
        Back
      </button>

      <h1 className="text-neutral-600 text-3xl">{getCategoryName()}</h1>

      <div className="mt-4 mb-8">
        <span className="text-neutral-600">Your prompt</span>

        <div className="p-2 mt-1 rounded-lg border-2 border-neutral-200 max-w-[450px]">
          {isOutOfPrompts ? (
            <p>You've completed all prompts in this category!</p>
          ) : (
            <p>{prompt}</p>
          )}
        </div>
      </div>

      {!isOutOfPrompts && (
        <button
          onClick={onPromptCompleted}
          className="py-2 px-6 bg-primary text-white rounded-lg hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
        >
          Complete
        </button>
      )}
    </section>
  );
}
