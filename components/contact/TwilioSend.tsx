"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "./schema";
import { Toaster, toast } from "sonner";
import { useState } from "react";
export type ContactFormInputs = z.infer<typeof FormDataSchema>;
const ContactForm = () => {
  const [result, setResult] = useState<number>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log(data);
    const YesMessage = "Thank you for your feedback!";
    const NoMessage = "Sorry to hear that. We will try to improve.";
    const NewMessage = data.satisfied === "Yes" ? YesMessage : NoMessage;
    const NewData = { number:data.number, message:NewMessage };
    await fetch("/api/sendMessage", {
      method: "POST",
      body: JSON.stringify(NewData),
    }).then((Response) => {
      setResult(Response.status);
      // console.log(Response.status);
    });
    if (result === 500 || result == 401 || result == 400) {
      toast("Something went wrong!");
      return;
    }
    toast("SMS sent!");
    reset();
  };


  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="mx-auto flex flex-1 dark:text-white flex-col rounded-sm gap-4 text-gray-600 sm:w-2/3 pt-24"
      id="contact"
      name="ContactName"
    >
      <div>

        <input
          placeholder="Number"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("number")}
        />
        {errors.number?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.number.message}
          </p>
        )}
      </div>


      {/* <div>
        <input
          placeholder="email"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div> */}

      <div>
        <label htmlFor="satisfied">Are you satisfied ?</label>
        <select id="satisfied" className="w-full p-3 border-2 border-black rounded-lg" {...register("satisfied")}  required>
        <option selected disabled hidden>Choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    

      <div>
        <textarea
          rows={5}
          cols={5}
          placeholder="message"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-lg border w-full border-black bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <Toaster position="bottom-right" />
    </form>
  );
};

export default ContactForm;
