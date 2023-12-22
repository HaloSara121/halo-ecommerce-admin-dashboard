"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useCreateStoreModal } from "@/hooks/use-create-store-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect } from "next/navigation";

const createStoreFormSchema = z.object({
  name: z.string().min(1),
});

type createStoreFormValues = z.infer<typeof createStoreFormSchema>;

export const CreateStoreModal = () => {
  const createStoreModal = useCreateStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<createStoreFormValues>({
    resolver: zodResolver(createStoreFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: createStoreFormValues) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products"
      isOpen={createStoreModal.isOpen}
      onClose={createStoreModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="E-commerce name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={createStoreModal.onClose}
                >
                  Cancel
                </Button>

                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
