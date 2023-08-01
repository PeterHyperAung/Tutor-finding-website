"use client";
import React from "react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Label,
  Input,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  RadioGroup,
  RadioGroupItem,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

enum GenderEnum {
  female = "f",
  male = "m",
  other = "o",
}

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Email is not valid"),
    phoneNumbers: z.array(
      z.object({
        phoneNumber: z
          .string()
          .min(11, "Phone number must be at least 11 characters"),
      })
    ),
    dob: z.string(),
    gender: z.enum(["m", "f", "o"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

function SignupForm() {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      username: "",
      email: "",
      phoneNumbers: [
        {
          phoneNumber: "",
        },
      ],
      dob: new Date().toDateString(),
      gender: GenderEnum.male,
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fields: phoneNumbersFields,
    append,
    remove,
  } = useFieldArray({
    name: "phoneNumbers",
    control: form.control,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Card className="max-w-[500px] mx-auto my-5">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Please provide your information here</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <CardContent>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your name</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your gender</FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          onValueChange={field.onChange}
                          name="gender"
                          className="flex gap-5 mt-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={GenderEnum.male} id="r1" />
                            <Label htmlFor="r1">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={GenderEnum.female} id="r2" />
                            <Label htmlFor="r2">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={GenderEnum.other} id="r3" />
                            <Label htmlFor="r3">Other</Label>
                          </div>
                        </RadioGroup>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your date of birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        type="date"
                        placeholder="example@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm your password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password Confirmation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel>Phone Numbers</FormLabel>
              <div className="mt-1">
                {phoneNumbersFields.map((field, index) => (
                  <div className="flex items-center mb-3 gap-3" key={field.id}>
                    <Input
                      type="text"
                      placeholder="Enter your phone number"
                      className=""
                      {...form.register(`phoneNumbers.${index}.phoneNumber`)}
                      // {...field}
                    />
                    {index > 0 && (
                      <FiMinusCircle
                        onClick={() => remove(index)}
                        className="text-xl text-primary cursor-pointer"
                      />
                    )}
                  </div>
                ))}
                {phoneNumbersFields.length < 5 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ phoneNumber: "" })}
                    className="text-slate-500 flex gap-2"
                  >
                    <FiPlusCircle className="text-xl cursor-pointer" />{" "}
                    <p>Add an another number</p>
                  </Button>
                ) : null}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm">
              Have an account?{" "}
              <Link href="/login" className="text-link">
                Login
              </Link>
            </div>
            <Button type="submit">Sign Up</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default SignupForm;
