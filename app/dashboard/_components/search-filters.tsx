"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { debounce } from "@/utils/debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const Schema = z.object({
  q: z
    .string()
    .min(4, "At least 5 characters are needed to perform search")
    .optional(),
});

export function SearchFiltersComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") ?? "active";

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { q: "" },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof Schema>) => {
      if (values.q && values.q.length > 3) {
        const params = new URLSearchParams(searchParams);
        console.log("search with query:", values.q, " on tab:", currentTab);
        params.set("q", values.q);
        router.replace(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams, pathname, router],
  );

  const handleOnChange = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (!value || value === "") {
        params.delete("q");
        form.reset({ q: "" });
        router.replace(`${pathname}?${params.toString()}`);
      } else {
        void onSubmit({ q: value });
      }
    }, 300), // 300ms debounce time
    [onSubmit],
  );

  useEffect(() => {
    const value = form.watch("q") ?? "";
    handleOnChange(value);
  }, [form.watch("q"), handleOnChange]);

  return (
    <Form {...form}>
      <form className={"mb-4"} onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset>
          <FormField
            name={"q"}
            render={({ field }) => {
              return (
                <FormItem className={"relative"}>
                  <FormControl className={"relative"}>
                    <div>
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type={"search"}
                        placeholder="Search recommendations, descriptions, reasons..."
                        className={"pl-10"}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className={"text-right"} />
                </FormItem>
              );
            }}
          />
          <button
            aria-label={"submit search"}
            type="submit"
            className="sr-only"
          />
        </fieldset>
      </form>
    </Form>
  );
}
