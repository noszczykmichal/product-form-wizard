import clsx from "cn/lite";

export default function FormSteps({ step }: { step: number }) {
  const statuses = [
    { title: "Informacje", description: "Dane podstawowe" },
    { title: "Cena", description: "Dane cenowe" },
    { title: "Dostępność", description: "Stany magazynowe" },
  ];

  return (
    <header className="w-full border-t border-b">
      <div className="px-4 py-3 flex w-full justify-between md:w-fit">
        {statuses.map((item, index) => (
          <div
            key={item.title}
            className={clsx(
              "flex flex-col gap-3 items-center md:flex-row md:justify-center",
              index == 0 ? "pr-4" : "",
            )}
          >
            {index !== 0 && (
              <div
                className={clsx(
                  "hidden md:block h-px w-16.75 ",
                  index <= step ? "bg-blue-600" : "bg-separators ",
                )}
              />
            )}
            <div className="flex flex-col gap-3 md:flex-row">
              <div
                className={clsx(
                  "rounded-full h-8 w-8 flex items-center justify-center shrink-0",
                  index <= step
                    ? "bg-blue-600 text-white"
                    : "bg-accent border-border border text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              <div>
                <dt className="font-medium">{item.title}</dt>
                <dd className="text-muted-foreground text-xs">
                  {item.description}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
