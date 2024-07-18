import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { uploadDocument } from "@/lib/thunks/documents";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Upload = () => {
  const dispatch = useAppDispatch();

  const formSchema = z.object({
    document: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleUpload = async (values: z.infer<typeof formSchema>) => {
    console.log("this are the values", values.document[0]);
    const file = values.document[0];
    const resultAction = dispatch(uploadDocument(file));
    const result = await resultAction.unwrap();
    console.log("this is the oasis", result);
  };
  const fileRef = form.register("document");
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Uploads</h1>
        </div>
        <div className=" w-full m items-start gap-6 ">
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle>Upload document </CardTitle>
                <CardDescription>select a document to process</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleUpload)}
                  >
                    <FormField
                      control={form.control}
                      name="document"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Document</FormLabel>
                          <FormControl>
                            <Input {...fileRef} type="file" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
