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
} from "./ui";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

enum GenderEnum {
  female = "f",
  male = "m",
  other = "o",
}

// type Inputs = {
//   username: string;
//   email: string;
//   phoneNumbers: { phoneNumber: string }[];
//   dob: Date;
//   gender: GenderEnum;
//   password: string;
//   passwordConfirm: string;
// };

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
    dob: z
      .date()
      .min(new Date("1900-01-01"), "Date of birth must be after 1900")
      .max(new Date(), "Date must at least be before today"),
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
  const { register, handleSubmit, formState, control, watch } = useForm<
    z.infer<typeof schema>
  >({
    defaultValues: {
      username: "",
      email: "",
      phoneNumbers: [
        {
          phoneNumber: "",
        },
      ],
      dob: new Date(),
      gender: GenderEnum.male,
      password: "",
      passwordConfirm: "",
    },
    // resolver: zodResolver(schema),
  });

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const watchGender = watch("gender");
  console.log("Gender", watchGender);

  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Card className="max-w-[500px] mx-auto my-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Please provide your information here</CardDescription>
      </CardHeader>
      <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <div className="mb-5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username")}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              // defaultValue={GenderEnum.male}
              className="flex gap-5 mt-1"
              {...register("gender")}
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
          </div>
          <div className="mb-5">
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              type="date"
              id="dob"
              placeholder="Date of birth"
              {...register("dob", {
                valueAsDate: true,
              })}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="passwordConfirm">Confirm your password</Label>
            <Input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm your password"
              {...register("passwordConfirm")}
            />
          </div>
          <div className="form-control">
            <Label htmlFor="phoneNumbers">Phone Numbers</Label>
            <div>
              {fields.map((field, index) => (
                <div className="flex items-center mb-3 gap-3" key={field.id}>
                  <Input
                    type="text"
                    placeholder="Enter your phone number"
                    className=""
                    {...register(`phoneNumbers.${index}.phoneNumber`)}
                  />
                  {index > 0 && (
                    <FiMinusCircle
                      onClick={() => remove(index)}
                      className="text-xl text-primary cursor-pointer"
                    />
                  )}
                </div>
              ))}
              {fields.length < 5 ? (
                <Button
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
          <Button>Sign Up</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignupForm;
