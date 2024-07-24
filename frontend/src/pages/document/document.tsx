import React, { useEffect } from "react";
import { SparklesIcon } from "lucide-react";

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
import { Link, useParams } from "react-router-dom";
import { getDocumentDetailsAndVersions } from "@/lib/thunks/documents";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { DocumentType, Content } from "@/@types/documents";

const Dashboard = () => {
  const { id } = useParams();
  const document: DocumentType = useAppSelector(
    (state) => state.Documents.document
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDocumentDetailsAndVersions(parseInt(id!)));
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>
                  Document Name: {document?.name.split("-").pop()}
                </CardTitle>
                <CardDescription>
                  Document content revision history
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Last modified</TableHead>
                    <TableHead className="">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {document.versions &&
                    document.versions.length > 0 &&
                    document.versions.map((document: Content) => (
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">
                            {document?.date?.split("T")[0]}{" "}
                            {document.date
                              ?.split("T")[1]
                              .split(".")[0]
                              .slice(0, -3)}
                          </div>
                        </TableCell>

                        <TableCell className="">
                          <Link to={`/dashboard/improve/${document.cont_id}`}>
                            <SparklesIcon className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
