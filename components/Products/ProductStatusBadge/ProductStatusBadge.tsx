import { Badge } from "@/components/ui/badge";

export default function ProductStatusBadge({
  available,
}: {
  available: boolean;
}) {
  return (
    <Badge variant={available ? "success" : "destructive"}>
      {available ? "Dostępny" : "Niedostępny"}
    </Badge>
  );
}
