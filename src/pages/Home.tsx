import useTime from "../hooks/TimeHook";

export default function HomePage() {
  const { getTimeOfDay } = useTime();

  const writingCategories = [
    "Gratitude",
    "Short story",
    "Self reflection",
    "Philosophical nonsense",
  ];

  const getGreeting = (): string => {
    return `Good ${getTimeOfDay()} :)`;
  };

  return (
    <section className="p-4 relative">
      <div className="py-6">
        <h2 className="font-semibold text-2xl">{getGreeting()}</h2>
        <h3 className="text-lg text-neutral-500">
          What do you want to write about today?
        </h3>

        <ul className="flex flex-col gap-y-3 mt-6 max-w-[225px]">
          {writingCategories.map((category, i) => {
            return (
              <li key={i} className="w-full flex">
                <CategoryButton category={category} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const CategoryButton = ({ category }: { category: string }) => {
  const getCategoryLink = (category: string): string => {
    let link = category.toLocaleLowerCase();
    link = link.replace(/\s+/g, "-");

    return `#/categories/${link}`;
  };

  return (
    <a
      href={getCategoryLink(category)}
      className="py-2 px-4 w-full bg-foreground rounded-lg shadow hover:bg-primary hover:text-white hover:scale-105 hover:shadow-xl transition duration-150 ease-in-out"
    >
      {category}
    </a>
  );
};
