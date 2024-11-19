import {
  Badge,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputWithHistory,
  Separator,
  StatusSelect,
} from "@repo/ui";
import { ArrowDownUp } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "~/lib/utils";
import { posSchema, PosSelect } from "./PosSelect";

export type LexemeHeaderProps = {
  lexemeName: string;
} & React.HTMLAttributes<HTMLDivElement>;

const LexemeHeader = React.forwardRef<HTMLDivElement, LexemeHeaderProps>(
  ({ className, lexemeName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-4 p-4", className)}
        {...props}
      >
        <Badge size="lg" variant="outline" className="flex-shrink-0">
          Lexeme {lexemeName}
        </Badge>
        <Separator orientation="vertical" className="h-4" />
        <Button size="sm">
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Change Root
        </Button>
        <StatusSelect className="ml-auto w-auto min-w-48" />
      </div>
    );
  },
);
LexemeHeader.displayName = "LexemeHeader";

export type LexemeFormProps = {
  lexemeName: string;
} & React.HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  lemma: z.string().min(1, { message: "Lemma is required" }),
  concretePattern: z
    .string()
    .min(1, { message: "Concrete pattern is required" }),
  pattern: z.string().min(1, { message: "Pattern is required" }),
  msaCognate: z.string().min(1, { message: "MSA Cognate is required" }),
  pos: posSchema,
  // features: featureSchema,
  pronunciation: z.string().min(1, { message: "Pronunciation is required" }),
  source: z.string().min(1, { message: "Source is required" }),
  orthoRoot: z.string().min(1, { message: "Ortho Root is required" }),
});

const NEW_LEXEME = {
  lemma: "",
  concretePattern: "",
  pattern: "",
  msaCognate: "",
  pos: "adj",
  pronunciation: "",
  source: "",
  orthoRoot: "",
} satisfies LexemeFormSchema;

export type LexemeFormSchema = z.infer<typeof formSchema>;

const LexemeForm = React.forwardRef<HTMLDivElement, LexemeFormProps>(
  ({ className, lexemeName, ...props }, ref) => {
    const form = useForm<LexemeFormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: NEW_LEXEME,
    });

    function onSubmit(data: LexemeFormSchema) {
      console.log(data);
    }

    return (
      <div ref={ref} className={cn("p-4", className)} {...props}>
        <Form {...form}>
          <form id="lexeme-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-wrap items-center gap-4">
              <FormField
                control={form.control}
                name="lemma"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Lemma"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concretePattern"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Concrete pattern"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pattern"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Pattern"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msaCognate"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="MSA Cognate"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pos"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <PosSelect onValueChange={onChange} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pos"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <PosSelect onValueChange={onChange} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-fit flex-wrap items-center gap-4 rounded-lg bg-slate-800 p-4">
              <FormField
                control={form.control}
                name="pronunciation"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Pronunciation"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Source"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orthoRoot"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <FormControl>
                      <InputWithHistory
                        placeholder="Ortho Root"
                        {...field}
                        containerProps={{ className: "w-fit" }}
                        history="History"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    );
  },
);
LexemeForm.displayName = "LexemeForm";

export type LexemeDetailsProps = {
  lexemeName: string;
} & React.HTMLAttributes<HTMLDivElement>;

const LexemeDetails = React.forwardRef<HTMLDivElement, LexemeDetailsProps>(
  ({ className, lexemeName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-lg border", className)} {...props}>
        <LexemeHeader lexemeName={lexemeName} />
        <LexemeForm lexemeName={lexemeName} />
      </div>
    );
  },
);
LexemeDetails.displayName = "LexemeDetails";

export { LexemeDetails };
