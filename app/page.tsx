
import { ArticlesCardsGrid } from "@/components/Cards/mantinecard/ArticlesCardsGrid";
import React from "react";
import Image from "next/image";
import Policeparade from "@/public/police-parade.jpg";

const Home = () => {
  return (
    <div className="pt-12">
      {/* write code for background image */}
      <div className="relative h-[800px]">
        <Image
          // src={Policeparade}
          src="https://images.unsplash.com/photo-1585802540745-bb23da2d6246?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Police Parade"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-yellow-400 text-center mb-5">Welcome to Rajasthan Police</h1>

                  <ArticlesCardsGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

