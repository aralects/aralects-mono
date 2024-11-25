import React from "react";
import { ArrowDownUp, FileSearch, Plus, Trash } from "lucide-react";
import {
  cn,
  Badge,
  Button,
  Flaggable,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputWithHistory,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  StatusSelect,
  POS_VALUES,
  POS_OPTIONS,
} from "@repo/ui";
import { AppFooter } from "./AppContainer";

import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ----------------------------------------
// Form Schema
// ----------------------------------------

const pronunciationSchema = z.object({
  pronunciation: z.string().min(1, { message: "Pronunciation is required" }),
  source: z.string().min(1, { message: "Source is required" }),
  orthoRoot: z.string().min(1, { message: "Ortho Root is required" }),
});

const formSchema = z.object({
  lemma: z.string().min(1, { message: "Lemma is required" }),
  concretePattern: z
    .string()
    .min(1, { message: "Concrete pattern is required" }),
  pattern: z.string().min(1, { message: "Pattern is required" }),
  msaCognate: z.string().min(1, { message: "MSA Cognate is required" }),
  pos: z
    .enum([...POS_VALUES, ""])
    .refine((val) => val.length > 0, { message: "POS is required" }),
  // features: featureSchema,

  pronunciation: z.array(pronunciationSchema),

  gloss: z.array(
    z.object({
      gloss: z.string().min(1, { message: "Gloss is required" }),
      example: z.string().min(1, { message: "Example is required" }),
      inflectionId: z.string().min(1, { message: "Inflection ID is required" }),
    }),
  ),

  inflections: z.array(
    z.object({
      pattern: z.string().min(1, { message: "Pattern is required" }),
      form: z.string().min(1, { message: "Form is required" }),
      status: z.string().min(1, { message: "Status is required" }),
      features: z.string().min(1, { message: "Features is required" }),
      concretePattern: z
        .string()
        .min(1, { message: "Concrete pattern is required" }),
      pronunciation: z.array(pronunciationSchema),
    }),
  ),
});

const NEW_PRONUNCIATION = {
  pronunciation: "",
  source: "",
  orthoRoot: "",
} satisfies LexemeFormSchema["pronunciation"][number];

const NEW_GLOSS = {
  example: "",
  gloss: "",
  inflectionId: "",
} satisfies LexemeFormSchema["gloss"][number];

const NEW_INFLECTION = {
  pattern: "",
  form: "",
  status: "",
  features: "",
  concretePattern: "",
  pronunciation: [NEW_PRONUNCIATION],
} satisfies LexemeFormSchema["inflections"][number];

const NEW_LEXEME = {
  lemma: "",
  concretePattern: "",
  pattern: "",
  msaCognate: "",
  pos: "",
  pronunciation: [NEW_PRONUNCIATION],
  gloss: [NEW_GLOSS],
  inflections: [],
} satisfies LexemeFormSchema;

export type LexemeFormSchema = z.infer<typeof formSchema>;

// ----------------------------------------
// Components
// ----------------------------------------

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
        <Flaggable fieldId="" className="ml-auto">
          <StatusSelect className="w-auto min-w-48" />
        </Flaggable>
        <Button size="sm">
          <FileSearch className="mr-2 h-[18px] w-[18px]" />
          Original Lexeme
        </Button>
      </div>
    );
  },
);
LexemeHeader.displayName = "LexemeHeader";

const PosFormField = () => {
  const { control } = useFormContext<LexemeFormSchema>();
  return (
    <FormField
      control={control}
      name="pos"
      render={({ field: { onChange, value, ref, ...field } }) => (
        <FormItem>
          <Select
            onValueChange={onChange}
            defaultValue={value ?? ""}
            value={value ?? ""}
            {...field}
          >
            <Flaggable fieldId="">
              <FormControl>
                <SelectTrigger ref={ref} className="min-w-48">
                  <SelectValue placeholder="Select a POS" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {POS_OPTIONS.map((pos) => (
                    <SelectItem key={pos.value} value={pos.value}>
                      {pos.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Flaggable>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type VariableFormFieldsProps = {
  index: number;
  onRemoveAt: (index: number) => void;
};

const PronunciationFormFields = ({
  index,
  onRemoveAt,
}: VariableFormFieldsProps) => {
  const { control } = useFormContext<LexemeFormSchema>();

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onRemoveAt(index);
  };

  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border p-4">
      <div className="flex w-fit flex-wrap items-center gap-4">
        <FormField
          control={control}
          name={`pronunciation.${index}.pronunciation`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Pronunciation"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`pronunciation.${index}.source`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Source"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`pronunciation.${index}.orthoRoot`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Ortho Root"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleRemove}
        disabled={index === 0}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

const GlossFormFields = ({ index, onRemoveAt }: VariableFormFieldsProps) => {
  const { control } = useFormContext<LexemeFormSchema>();

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onRemoveAt(index);
  };

  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border p-4">
      <div className="flex w-fit flex-wrap items-center gap-4">
        <FormField
          control={control}
          name={`gloss.${index}.gloss`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Gloss"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`gloss.${index}.example`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Example"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleRemove}
        disabled={index === 0}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

const InflectionFormFields = ({
  index,
  onRemoveAt,
}: VariableFormFieldsProps) => {
  const { control } = useFormContext<LexemeFormSchema>();

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onRemoveAt(index);
  };

  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border p-4">
      <div className="flex w-fit flex-wrap items-center gap-4">
        <FormField
          control={control}
          name={`inflections.${index}.pattern`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Pattern"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`inflections.${index}.form`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Form"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`inflections.${index}.concretePattern`}
          render={({ field }) => (
            <FormItem>
              <Flaggable fieldId="">
                <FormControl>
                  <InputWithHistory
                    placeholder="Concrete pattern"
                    {...field}
                    containerProps={{ className: "w-fit" }}
                    history="History"
                  />
                </FormControl>
              </Flaggable>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleRemove}
        disabled={index === 0}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

// ----------------------------------------
// Main exports
// ----------------------------------------

type LexemeFormProps = {
  // lexemeName: string;
} & React.HTMLAttributes<HTMLDivElement>;

const LexemeForm = React.forwardRef<HTMLDivElement, LexemeFormProps>(
  ({ className, ...props }, ref) => {
    const form = useForm<LexemeFormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: NEW_LEXEME,
    });
    const { reset, control } = form;
    const isFormDirty = form.formState.isDirty;

    const {
      fields: pronunciationFields,
      append: appendPronunciation,
      remove: removePronunciation,
    } = useFieldArray({
      control,
      name: "pronunciation",
    });

    const {
      fields: glossFields,
      append: appendGloss,
      remove: removeGloss,
    } = useFieldArray({
      control,
      name: "gloss",
    });

    const {
      fields: inflectionFields,
      append: appendInflection,
      remove: removeInflection,
    } = useFieldArray({
      control,
      name: "inflections",
    });

    // ----------------------------------------
    // Event handlers
    // ----------------------------------------

    function handleSubmit(data: LexemeFormSchema) {
      console.log(data);
    }

    const handleAddVariableFields = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      fields: "pronunciation" | "gloss" | "inflection",
    ) => {
      e.preventDefault();

      if (fields === "pronunciation") {
        appendPronunciation(NEW_PRONUNCIATION);
      } else if (fields === "gloss") {
        appendGloss(NEW_GLOSS);
      } else if (fields === "inflection") {
        appendInflection(NEW_INFLECTION);
      }
    };

    // ----------------------------------------
    // Render
    // ----------------------------------------

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden p-4", className)}
        {...props}
      >
        <Form {...form}>
          <form
            id="lexeme-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-4">
              <FormField
                control={form.control}
                name="lemma"
                render={({ field }) => (
                  <FormItem>
                    <Flaggable fieldId="">
                      <FormControl>
                        <InputWithHistory
                          placeholder="Lemma"
                          {...field}
                          containerProps={{ className: "w-fit" }}
                          history="History"
                        />
                      </FormControl>
                    </Flaggable>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concretePattern"
                render={({ field }) => (
                  <FormItem>
                    <Flaggable fieldId="">
                      <FormControl>
                        <InputWithHistory
                          placeholder="Concrete pattern"
                          {...field}
                          containerProps={{ className: "w-fit" }}
                          history="History"
                        />
                      </FormControl>
                    </Flaggable>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pattern"
                render={({ field }) => (
                  <FormItem>
                    <Flaggable fieldId="">
                      <FormControl>
                        <InputWithHistory
                          placeholder="Pattern"
                          {...field}
                          containerProps={{ className: "w-fit" }}
                          history="History"
                        />
                      </FormControl>
                    </Flaggable>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msaCognate"
                render={({ field }) => (
                  <FormItem>
                    <Flaggable fieldId="">
                      <FormControl>
                        <InputWithHistory
                          placeholder="MSA Cognate"
                          {...field}
                          containerProps={{ className: "w-fit" }}
                          history="History"
                        />
                      </FormControl>
                    </Flaggable>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PosFormField />
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2">
                {pronunciationFields.map((_, index) => (
                  <PronunciationFormFields
                    index={index}
                    onRemoveAt={removePronunciation}
                    key={index}
                  />
                ))}
              </div>
              <Button
                className="mt-4"
                onClick={(e) => handleAddVariableFields(e, "pronunciation")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Pronunciation
              </Button>
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2">
                {glossFields.map((_, index) => (
                  <GlossFormFields
                    index={index}
                    onRemoveAt={removeGloss}
                    key={index}
                  />
                ))}
              </div>
              <Button
                className="mt-4"
                onClick={(e) => handleAddVariableFields(e, "gloss")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Gloss
              </Button>
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2">
                {inflectionFields.map((_, index) => (
                  <InflectionFormFields
                    index={index}
                    onRemoveAt={removeInflection}
                    key={index}
                  />
                ))}
              </div>
              <Button
                className="ml-auto mt-4"
                onClick={(e) => handleAddVariableFields(e, "inflection")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Inflection
              </Button>
            </div>
          </form>
          <AppFooter
            className="-mx-4 -mb-4 mt-8 rounded-b-md border-none bg-transparent"
            show={isFormDirty}
          >
            <Button
              className="ml-auto"
              variant="destructive"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="lexeme-form">
              Save
            </Button>
          </AppFooter>
        </Form>
      </div>
    );
  },
);
LexemeForm.displayName = "LexemeForm";

export type LexemeDetailsProps = {
  lexeme: string | null;
} & React.HTMLAttributes<HTMLDivElement>;

const LexemeDetails = React.forwardRef<HTMLDivElement, LexemeDetailsProps>(
  ({ className, lexeme, ...props }, ref) => {
    if (!lexeme) return null;

    return (
      <div
        ref={ref}
        className={cn("bg-background rounded-lg border", className)}
        {...props}
      >
        <LexemeHeader lexemeName={lexeme} />
        <LexemeForm />
      </div>
    );
  },
);
LexemeDetails.displayName = "LexemeDetails";

export { LexemeDetails };
