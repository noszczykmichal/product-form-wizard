import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export default function ProductFooter({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: Props) {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 lg:mt-0 lg:flex-row lg:justify-between lg:border-t lg:bg-gray-50 lg:px-4 lg:py-3">
      <p className="text-xs text-muted-foreground">
        Strona {page} z {totalPages} · {totalItems} produktów
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Wstecz"
              aria-disabled={page === 1}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={n === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(n);
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              text="Dalej"
              aria-disabled={page === totalPages}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
