"use client";
import { TextInput, TextInputProps, ActionIcon, rem } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchPrompt } from "./Scheme";
import { z } from "zod";
import { useState } from "react";
interface ConversationProp {
  Question: string;
  Answer: string;
}
export type SearchInputType = z.infer<typeof SearchPrompt>;
export function InputWithButton(props: TextInputProps) {
  const [Conversation, setConversation] = useState<ConversationProp[]>([]);
  const acceptresponse = async (data: SearchInputType) => {
    const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'X-RapidAPI-Key': '668861233amsha611215f790fc80p100097jsn30b9788a22f4',
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      body: {
        messages: [
          {
            role: "user",
            content: data,
          },
        ],
        web_access: false,
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
      },
    };

    try {
      const request = await fetch(url, {
        ...options,
        body: JSON.stringify(options.body),
      });
      const result = await request.json();
      // console.log({result});
      setConversation([
        ...Conversation,
        { Question: data.search, Answer: result.result || "" },
      ]);
      // return {result};
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputType>();
  const processForm: SubmitHandler<SearchInputType> = async (data) => {
    acceptresponse(data);

    reset();
  };

  return (
    <main className="flex flex-col justify-between h-screen">
      <div className="h-[500px] pt-14">
        {Conversation.map((item, index) => {
          return (
            <div key={index}>
              {/* design below question and answer */}

              <div className="flex justify-start">
                <div className="flex flex-col items-start">
                  <div className="bg-red-600 rounded-xl my-1 p-2">
                    <p className="text-sm">{item.Question}</p>
                  </div>
                  <div className="bg-blue-600 rounded-xl my-1 p-2">
                    <p className="text-sm">{item.Answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <TextInput
          radius="xl"
          size="md"
          placeholder="Search questions"
          rightSectionWidth={42}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              variant="filled"
              onClick={handleSubmit(processForm)}
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
          {...props}
          {...register("search")}
        />
      </form>
    </main>
  );
}
