import Image from "next/image";
import { db } from "~/server/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: "https://utfs.io/f/9f0a7caa-2c83-48af-b0da-575e7daec2cc-kgw41r.png",
      },
    ],
    type: "website",
    url: "https://prabhupada-vyasapuja-2024-book.vercel.app/",
    title: "Srila Prabhupada Vyasapuja Offerings 2024",
    description: "Offerings to Srila Prabhupada by disciples and well wishers.",
    siteName: "Prabhupada Vyasapuja Offerings 2024 Book",
  },
  twitter: {
    images: [
      {
        url: "https://utfs.io/f/9f0a7caa-2c83-48af-b0da-575e7daec2cc-kgw41r.png",
      },
    ],
    creator: "@IskconInc",
    site: "https://prabhupada-vyasapuja-2024-book.vercel.app/",
    title: "Srila Prabhupada Vyasapuja Offerings 2024",
    description: "Offerings to Srila Prabhupada by disciples and well wishers.",
  },
};

interface IOfferings {
  id: number;
  name: string;
  city: string;
  category: string;
  image_url: string | null;
  offeringText: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

const DisplayOfferingsComponent = ({
  offerings,
}: {
  offerings: IOfferings[];
}) => {
  return (
    <div>
      {offerings.map((offering) => (
        <div key={offering.id} className="px-8">
          <h3 className="text-2xl font-semibold">{offering.name}</h3>
          <h4 className="pb-2 text-xl font-medium">{offering.category}</h4>
          {offering.offeringText
            ?.split(/\s{2,}/)
            .filter((paragraph) => paragraph.trim() !== "")
            .map((paragraph, index) => (
              <div key={index}>
                <p className="pb-3 text-justify leading-snug">{paragraph}</p>
              </div>
            ))}
          <Image
            alt="offering rose flower"
            src={
              "https://utfs.io/f/2696a0f5-9df0-4918-8c79-0e0bbb0d28cb-d4wrrv.png"
            }
            className="mx-auto my-0"
            height={30}
            width={60}
          ></Image>
        </div>
      ))}
    </div>
  );
};

export default async function HomePage() {
  const offerings = (await db.query.offerings.findMany()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const prabhupadaDisciplesOfferings = offerings.filter(
    (item) => item.category.toLowerCase() == "prabhupada disciple",
  );
  const congregationOfferings = offerings.filter(
    (item) => item.category.toLowerCase() == "congregation",
  );
  const youthOfferings = offerings.filter(
    (item) => item.category.toLowerCase() == "youth",
  );
  const kidsOfferings = offerings.filter(
    (item) => item.category.toLowerCase() == "kids",
  );

  const itemsToBeRendered = [];

  if (prabhupadaDisciplesOfferings.length) {
    itemsToBeRendered.push(
      <div className="mx-auto my-0 grid max-w-4xl">
        <div className="flex h-screen break-inside-avoid items-center justify-center text-center text-5xl">
          Prabhupada Disciples
        </div>
        <DisplayOfferingsComponent offerings={prabhupadaDisciplesOfferings} />
      </div>,
    );
  }

  if (congregationOfferings.length) {
    itemsToBeRendered.push(
      <div className="mx-auto my-0 grid max-w-6xl">
        <div className="flex h-screen break-inside-avoid items-center justify-center text-center text-5xl">
          Congregation
        </div>
        <DisplayOfferingsComponent offerings={congregationOfferings} />
      </div>,
    );
  }

  console.log({ youthOfferings: youthOfferings.length });
  if (youthOfferings.length) {
    itemsToBeRendered.push(
      <div className="mx-auto my-0 grid max-w-6xl">
        <div className="flex h-screen break-inside-avoid items-center justify-center text-center text-5xl">
          Youth
        </div>
        <DisplayOfferingsComponent offerings={youthOfferings} />
      </div>,
    );
  }

  if (kidsOfferings.length) {
    itemsToBeRendered.push(
      <div className="mx-auto my-0 grid max-w-6xl">
        <div className="flex h-screen break-inside-avoid items-center justify-center text-center text-5xl">
          Kids
        </div>
        <DisplayOfferingsComponent offerings={kidsOfferings} />
      </div>,
    );
  }

  return <>{itemsToBeRendered.map((item) => item)}</>;
}
