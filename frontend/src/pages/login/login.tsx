import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginService } from "@/lib/thunks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isSuccessful, loading, errOccurred, message } =
    useAppSelector((state) => state.Authentication);

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    const resultAction = dispatch(loginService(values));
    const result = await resultAction.unwrap();

    if (!result.token) {
      setOpen(true);
    } else {
      return navigate("/dashboard");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>An Error Occured </DialogTitle>
            <DialogDescription>
              Server responded with: {message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="py-10 w-full bg-neutral-100 min-h-screen">
        <Card className="mx-auto max-w-sm ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignIn)}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="johndoe@gmail.com"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
