import clsx from "cn/lite";

export default function FormSteps() {
  const statuses = [
    { title: "Informacje", description: "Dane podstawowe" },
    { title: "Cena", description: "Dane cenowe" },
    { title: "Dostępność", description: "Stany magazynowe" },
  ];

  return (
    <header className="border-t border-b px-4 py-5 flex w-full">
      {statuses.map((item, index) => (
        <div
          key={item.title}
          className={clsx("flex gap-3 items-center", index !== 0 ? "px-4" : "")}
        >
          {index !== 0 && (
            <div className="hidden md:block h-px w-16.75 bg-separators" />
          )}
          <div className="rounded-full h-8 w-8 bg-blue-600 flex items-center justify-center text-white shrink-0">
            {index + 1}
          </div>
          <div>
            <dt className="font-medium">{item.title}</dt>
            <dd className="text-muted-foreground text-xs">
              {item.description}
            </dd>
          </div>
        </div>
      ))}
    </header>
  );
}
