import React, { useEffect } from "react";
import { ArrowUpRight, Activity, SquarePen, Archive, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Link } from "react-router-dom";
import { getAllDocuments } from "@/lib/thunks/documents";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { DocumentsType } from "@/@types/documents";

const Dashboard = () => {
  const { documents } = useAppSelector((state) => state.Documents);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDocuments());
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Documents
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <SquarePen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Archived</CardTitle>
              <Archive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Documents</CardTitle>
                <CardDescription>Your recent documents</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="documents">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Upload Date</TableHead>
                    <TableHead className="">Last modified</TableHead>
                    <TableHead className="">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents &&
                    documents.length > 0 &&
                    documents.map((document: DocumentsType) => (
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">{document.name}</div>
                        </TableCell>
                        <TableCell className="">{document.status}</TableCell>
                        <TableCell className="">
                          {document.upload_date.slice(0, 16).replace("T", " ")}
                        </TableCell>
                        <TableCell className="">
                          {document.updated_at.slice(0, 16).replace("T", " ")}
                        </TableCell>
                        <TableCell className="">
                          <Link to={`improve/${document.document_id}`}>
                            <Eye className="h-4 w-4 text-muted-foreground" />
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
