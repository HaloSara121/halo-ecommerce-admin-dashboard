"use client";

import { BillboardClient } from "./components/billboard-client";

const BillBoardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillBoardsPage;
