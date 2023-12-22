"use client";

import { useEffect } from "react";

import { useCreateStoreModal } from "@/hooks/use-create-store-modal";

const SetupPage = () => {
  const onOpen = useCreateStoreModal((state) => state.onOpen);
  const isOpen = useCreateStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
