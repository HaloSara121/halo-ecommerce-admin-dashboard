import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface BillboardClientProps {}

export const BillboardClient: React.FC<BillboardClientProps> = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards ${"(0)"}`}
          description="Manage billboards for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
    </div>
  );
};
