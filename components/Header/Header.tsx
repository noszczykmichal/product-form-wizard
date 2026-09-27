import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Header({
  itemsCount,
  onClick,
}: {
  itemsCount: number;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  const buttonClickHandler = () => {
    onClick(true);
  };

  return (
    <header className="mb-6 flex w-full justify-between items-center">
      <div>
        <h1 className="font-semibold text-xl leading-normal">Produkty</h1>
        <p className="text-sm leading-normal text-muted-foreground">
          <span>{itemsCount}&nbsp;</span>produktów w katalogu
        </p>
      </div>
      <Button
        className="transition-colors cursor-pointer duration-150 rounded-full px-4 py-2 text-sm leading-normal font-medium gap-1.5"
        onClick={buttonClickHandler}
        size="lg"
      >
        <Plus className="size-4"></Plus>
        Dodaj produkt
      </Button>
    </header>
  );
}
