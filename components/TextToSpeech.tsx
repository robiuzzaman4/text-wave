"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { languages } from "@/lib/constants";

// form validation
const FormSchema = z.object({
  text: z.string().min(2, {
    message: "Text must be at least 2 characters.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

const TextToSpeech = () => {

  const [audio, setAudio] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("form data: ", data);

    // set loading state true
    setLoading(true);

    // fetch data from api route
    fetch(`/api/speech?text=${data.text}&lang=${data.language}`)
      .then((res) => res.arrayBuffer())
      .then((data) => {

        // create audio src
        const blob = new Blob([data], { type: "audio/mpeg" });
        const audioSrc = URL.createObjectURL(blob);
        console.log(audioSrc);

        // set audio src
        setAudio(audioSrc);

        // set loading state false
        setLoading(false);
      })
      .catch((error) => {
        // log error message
        console.log(error.message);

        // set loading state false
        setLoading(false);
      })
  }

  return (
    <section className="w-full grid lg:grid-cols-2 gap-4 overflow-hidden">

      {/* form */}
      <div className="border border-dashed border-border rounded-md p-4 lg:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* text area field */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Enter Your Text</FormLabel>
                  <FormControl>

                    {/* text area */}
                    <Textarea placeholder="I'm a hybrid designer and developer!" {...field} />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* combobox field */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0 max-h-[240px] overflow-y-auto">
                      <Command>
                        <CommandInput
                          placeholder="Search language..."
                          className="h-9"
                        />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value)
                              }}
                            >
                              {language.label}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {
                loading ? <Loader className="mr-2 animate-spin" size={20} /> : ""
              }
              Generate Audio
            </Button>
          </form>
        </Form>
      </div>

      {/* output audio */}
      <div className="border border-dashed border-border rounded-md p-4 lg:p-6">
        <h2 className="text-center text-2xl font-bold pb-4">
          Generated Audio File
        </h2>
        <div className="w-full max-w-[16rem] sm:max-w-sm mx-auto">
          <audio src={audio} controls autoPlay className="w-full"></audio>
        </div>
      </div>

    </section>
  );
};

export default TextToSpeech;