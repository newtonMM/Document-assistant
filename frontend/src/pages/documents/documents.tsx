import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sparkles, Trash2, EyeIcon } from "lucide-react";
import { deleteDocument, getAllDocuments } from "@/lib/thunks/documents";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { DocumentsType } from "@/@types/documents";
import { Link } from "react-router-dom";

const documents = () => {
  const { documents } = useAppSelector((state) => state.Documents);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDocuments());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    dispatch(deleteDocument(id));
  };
  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Documents</CardTitle>
            <CardDescription>All documents</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Upload Date</TableHead>
                <TableHead className="">Last modified</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents &&
                documents.length > 0 &&
                documents.map((document: DocumentsType) => (
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">
                        {document?.name.split("-").pop()}
                      </div>
                    </TableCell>
                    <TableCell className="">{document.status}</TableCell>
                    <TableCell className="">
                      {document.upload_date.slice(0, 16).replace("T", " ")}
                    </TableCell>
                    <TableCell className="">
                      {document.updated_at.slice(0, 16).replace("T", " ")}
                    </TableCell>
                    <TableCell className="">
                      <div className="flex gap-2 items-center">
                        <Trash2
                          onClick={() => handleDelete(document.id)}
                          className="h-6 w-6 cursor-pointer"
                        />
                        <Link to={`/dashboard/document/${document.id}`}>
                          <EyeIcon className="h-6 w-6" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default documents;
