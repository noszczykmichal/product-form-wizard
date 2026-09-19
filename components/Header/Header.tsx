import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-6 flex w-full justify-between items-center">
      <div>
        <h1 className="font-semibold text-xl leading-normal">Produkty</h1>
        <p className="text-sm leading-normal text-muted-foreground">
          produktów w katalogu
        </p>
      </div>
      <Button className="hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer duration-150 rounded-full bg-blue-600 px-4 py-2 text-sm leading-normal font-medium gap-1.5 h-9">
        <Plus className="size-4"></Plus>
        Dodaj produkt
      </Button>
    </header>
  );
}
