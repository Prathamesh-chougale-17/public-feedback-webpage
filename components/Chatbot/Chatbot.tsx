"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchPrompt } from "./Scheme";
import { z } from "zod";
import { ActionIcon, Avatar, TextInput, rem } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

import SpeechBubble from "../Cards/speechbubble/SpeechBubble";
import { useSession } from "next-auth/react";
interface ConversationProp {
  Question: string;
  Answer: string;
}
export type SearchInputType = z.infer<typeof SearchPrompt>;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Conversation, setConversation] = useState<ConversationProp[]>([]);
  const acceptresponse = async (data: SearchInputType) => {
    const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a2c06249a6mshc71ccc69f40c689p180715jsnfb50284c97c6",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
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
  const { register, handleSubmit, reset } = useForm<SearchInputType>();
  const processForm: SubmitHandler<SearchInputType> = async (data) => {
    acceptresponse(data);

    reset();
  };
  const { data: session } = useSession();
  return (
    <div className="z-[500]">
      <div
        className={`fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer ${
          isOpen ? "hidden" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Chat</span>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit(processForm)}>
          <div className="fixed bottom-4 right-4 w-auto h-[500px] lg:w-96 lg:h-[550px] bg-white border border-gray-300 rounded shadow flex flex-col">
            <div className="bg-blue-500 text-white py-2 font-bold text-center">
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </span>
              ChatBot
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {Conversation.map((item, index) => {
                return (
                  <div key={index}>
                    {/* design below question and answer */}

                    <div className="flex justify-start">
                      <div className="flex flex-col items-start">
                        <div className=" rounded-xl my-1 p-2 flex">
                          <Avatar src={session?.user?.image} />
                          <SpeechBubble>{item.Question}</SpeechBubble>
                        </div>
                        <div className=" rounded-xl my-1 p-2 flex">
                          {/* create a pointer to the avatar for the anwer */}
                          <Avatar src="favicon-16x16.png" alt="police" />
                          <SpeechBubble>{item.Answer}</SpeechBubble>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-300 flex items-center">
              <TextInput
                radius="xl"
                size="md"
                placeholder="Search questions"
                className="w-full"
                leftSection={<IconSearch stroke={1.5} />}
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
                {...register("search")}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chatbot;
