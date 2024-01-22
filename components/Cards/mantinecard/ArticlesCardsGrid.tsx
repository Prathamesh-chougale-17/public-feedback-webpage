"use client"
import { SimpleGrid, Card, Text, Container, AspectRatio } from "@mantine/core";
import classes from "./ArticlesCardsGrid.module.css";
import Image from "next/image";
import feedbackk from "@/public/feedbacklog.jpeg"
import Analytics from "@/public/analytics.jpg"
import contactus from "@/public/sampark.jpeg"
import catt from "@/public/manjar.jpeg"
import Link from "next/link";

const mockdata = [
  {
    title: "Feedback",
    image: feedbackk,
    link : "/feedback"
  },
  {
    title: "Social Media Platform",
    image: catt,
    link : "https://rj-social-media.vercel.app"
  },
  {
    title: "Analytics",
    image: Analytics,
    link: '/barchart'
  },
  {
    title: "Contact Us",
    image: contactus,
    link: "/contactus"
  },
];

export function ArticlesCardsGrid() {
  const cards = mockdata.map((article) => (
    <Link href={article.link} key={article.link} >
    <Card
      key={article.title}
      radius="md"
      component="a"
      className={classes.card}
      >
      {/* <AspectRatio ratio={1920 / 1080}> */}
        <Image
          src={article.image}
          alt="Card Image"
          className="h-[14rem] w-auto"
          priority
          />
      {/* </AspectRatio> */}
      <Text className={classes.title}>{article.title}</Text>
    </Card>
          </Link>
  ));

  return (
    <div className="flex justify-between m-5">
      <SimpleGrid spacing="xl" cols={{ sm: 4 }}>
        {cards}
      </SimpleGrid>
    </div>
  );
}