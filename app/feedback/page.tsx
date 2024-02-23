"use client";
import {
  Button,
  Group,
  TextInput,
  Box,
  Select,
  Radio,
  Textarea,
  Rating,
} from "@mantine/core";
// import { SubmitHandler, useForm } from "react-hook-form";
import { createFormContext } from "@mantine/form";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
// import { useForm } from "@mantine/form";
export interface FormSubmittion {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  feedback: string;
  rating: number;
  phoneNumber: string;
  satisfaction: string;
  location: string;
  typeofincident: string;
  policestation: string;
  feedbacktype: string;
}
const [FormProvider, useFormContext, useForm] =
  createFormContext<FormSubmittion>();

function ContextField() {
  const form = useFormContext();
  return (
    <>
      <TextInput
        label="Name"
        placeholder="Name"
        withAsterisk
        {...form.getInputProps("fullName")}
      />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Phone Number"
        placeholder="Phone Number"
        withAsterisk
        mt="md"
        {...form.getInputProps("phoneNumber")}
      />

      <TextInput
        label="Your age"
        placeholder="Your age"
        withAsterisk
        mt="md"
        {...form.getInputProps("age")}
      />
      <Radio.Group
        label="Select your gender"
        // description="This is anonymous"
        withAsterisk
        mt="md"
        {...form.getInputProps("gender")}
      >
        <Group mt="xs">
          <Radio value="Male" label="Male" />
          <Radio value="Female" label="Female" />
          <Radio value="Other" label="Other" />
        </Group>
      </Radio.Group>

      {/* address */}
      <Textarea
        label="Address"
        placeholder="Address"
        mt="md"
        {...form.getInputProps("address")}
      />
      <TextInput
        label="Location of Incident"
        placeholder="Location of Incident"
        withAsterisk
        mt="md"
        {...form.getInputProps("location")}
      />
      <Select
        label="Type of Incident"
        placeholder="Type of Incident"
        data={["Theft", "Assault", "Accident", "Cyber", "other"]}
        defaultValue="React"
        withAsterisk
        {...form.getInputProps("typeofincident")}
        clearable
      />

      <Select
        label="Enter Police Station near Incident Happen:"
        placeholder="Enter Police Station near Incident Happen:"
        data={[
          "Banipark police station",
          "Bhakrota police station",
          "Chitrakoot police station",
          "Chomu police station",
          "Sikar Rd police station",
          "Kalwar Rd police station",
        ]}
        defaultValue="React"
        withAsterisk
        {...form.getInputProps("policestation")}
        clearable
      />

      <Select
        label="Enter Feedback Type:"
        placeholder="Enter Feedback Type:"
        data={["Compliment", "Complaint", "Suggestion"]}
        defaultValue="React"
        withAsterisk
        {...form.getInputProps("feedbacktype")}
        clearable
      />
      {/* feedback */}
      <Textarea
        label="Feedback"
        placeholder="Feedback"
        withAsterisk
        mt="md"
        {...form.getInputProps("feedback")}
      />

      <Select
        label="Satisfaction"
        placeholder="Choose Option"
        data={["Yes", "No"]}
        defaultValue="React"
        withAsterisk
        {...form.getInputProps("satisfaction")}
        clearable
      />

      <Group mt="md">
        <Box className="font-bold">
          Please give rating for the service provided
        </Box>
        <Rating {...form.getInputProps("rating")} />
        {/* <Rating  onClick={(e) => setValue()}/> */}
      </Group>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </>
  );
}

// export type FormSubmittion = z.infer<typeof FormSubmissionSchema>;
const FeedbackForm = () => {
  const [sendMessage, setSendMessage] = useState<number>();
  const [saveMessage, setSaveMessage] = useState<number>();
  const processForm: SubmitHandler<FormSubmittion> = async (data) => {
    console.log(data);
    const YesMessage = "Thank you for your feedback!";
    const NoMessage = "Sorry to hear that. We will try to improve.";
    const NewMessage = data.satisfaction === "Yes" ? YesMessage : NoMessage;
    const NewData = { number: data.phoneNumber, message: NewMessage };

    // console.log(Responseconsole.log(Sendmessage)
    await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((Response) => {
      setSaveMessage(Response.status);
      console.log(Response.status);
    });
    if (
      saveMessage === 500 ||
      saveMessage == 401 ||
      saveMessage == 400 ||
      saveMessage == 404 ||
      saveMessage == 403
    ) {
      toast("Something went wrong!");
      return;
    } else if (saveMessage === 409) {
      console.log("user already exists!");
      toast("user already exists!");
      return;
    }
    // reset();
    else {
      form.reset();
      toast("Feedback saved!"); //mantine reset

      await fetch("/api/sendMessage", {
        method: "POST",
        body: JSON.stringify(NewData),
      }).then((Response) => {
        setSendMessage(Response.status);
        // console.log(Response);
      });
      if (
        sendMessage === 500 ||
        sendMessage == 401 ||
        sendMessage == 400 ||
        sendMessage == 404 ||
        sendMessage == 403
      ) {
        toast("Something went wrong!");
        return;
      }
    }
  };

  // const form = useFormContext();

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      age: 0,
      address: "",
      feedback: "",
      rating: 0,
      satisfaction: "",
      location: "",
      typeofincident: "",
      policestation: "",
      feedbacktype: "",
    },
    validate: {
      fullName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) =>
        value < 18 ? "You must be at least 18 to register" : null,
      phoneNumber: (value) =>
        value.length === 10 ? null : "Phone number must have 10 digits",
      gender: (value) =>
        value.length < 4 ? "Please select your Gender" : null,
      // address: (value) => (value.length < 10 ? 'Address must have at least 10 letters' : null),
      feedback: (value) =>
        value.length < 10 ? "Feedback must have at least 10 letters" : null,
      rating: (value) =>
        value < 1 ? "Please give rating for the service provided" : null,
      satisfaction: (value) =>
        value.length < 1 ? "Please choose an option" : null,
    },
  });

  return (
    <FormProvider form={form}>
      <Toaster />
      <form
        onSubmit={form.onSubmit(processForm)}
        className="lg:mx-auto mx-4 w-full max-w-xl pt-16"
      >
        <ContextField />
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;
