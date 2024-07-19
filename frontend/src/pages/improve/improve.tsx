import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Delta as TypeDelta, Sources } from "quill";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import {
  fetchOriginalContent,
  processContent,
  saveContent,
} from "@/lib/thunks/content";

const Enhance = () => {
  const dispatch = useAppDispatch();
  const { originalContent, processedContent, loading } = useAppSelector(
    (state) => state.Content
  );

  const { id } = useParams();
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchOriginalContent(parseInt(id)));
  }, []);
  useEffect(() => {
    if (processedContent !== "") {
      setContent(processedContent);
    }
  }, [processedContent]);

  const handleEnhance = () => {
    dispatch(
      processContent({
        content: originalContent.text,
        id: originalContent.id,
        document_id: originalContent.document_id,
      })
    );
  };

  const handleChange = (
    value: string,
    delta: TypeDelta,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setContent(value);
  };

  const handleSave = async () => {
    const resultAction = dispatch(
      saveContent({
        id: originalContent.id,
        text: content,
        document_id: originalContent.document_id,
      })
    );
    const result = await resultAction.unwrap();
    if (result) {
      setSuccess(true);
    }
  };
  return (
    <>
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Successfully saved</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <div className="grid h-screen w-full  ">
          <div className="flex flex-col">
            <main className="flex flex-1 gap-4 overflow-auto py-4 px-1 ">
              <div className="relative flex h-full min-h-[50vh]  rounded-xl bg-muted/50 p-4 w-1/2">
                <Badge
                  variant="outline"
                  className="absolute right-3 top-3 my-2 mr-8"
                >
                  Original content
                </Badge>
                <div className="h-full flex flex-col w-full gap-3">
                  <div className="flex-1">
                    <Textarea
                      id="message"
                      placeholder="original content should be shown here"
                      defaultValue={originalContent?.text}
                      className="h-full  border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Improve Document</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Improve this content?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          We will send you document to our AI to suggest and
                          make improvements
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleEnhance}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 w-1/2">
                <Badge
                  variant="outline"
                  className="absolute right-3 top-5 mr-10 z-10"
                >
                  Enhanced
                </Badge>
                <div className="flex flex-col h-full px-2">
                  {loading ? (
                    <div className="flex flex-col space-y-3  h-full w-full p-1">
                      <Skeleton className="h-1/2 w-full rounded-xl" />
                      <div className="space-y-2 h-1/4">
                        <Skeleton className="h-1/2 w-full" />
                        <Skeleton className="h-1/2 w-full" />
                      </div>
                    </div>
                  ) : (
                    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring h-full flex flex-col gap-2">
                      <ReactQuill
                        placeholder="You can Edit the document here..."
                        className="flex-1"
                        value={content}
                        onChange={handleChange}
                      />

                      <div className="flex gap-2 items-center p-3 pt-0 mt-10">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline">Save</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm</AlertDialogTitle>
                              <AlertDialogDescription>
                                we will save a new version of this document in
                                our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleSave}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <div
                          className="p-2 border rounded-lg cursor-pointer"
                          onClick={() => setContent("")}
                        >
                          Cancel
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enhance;
