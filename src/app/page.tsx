import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockOfferings = [
  {
    name: "Jyoti Ranjan Sharma",
    offeringText:
      "Jai Srila Prabhupada Jai Srila Prabhupada Jai Srila Prabhupada Jai Srila Prabhupada Jai Srila Prabhupada Jai Srila Prabhupada",
    offeringPhoto: "",
    category: "youth",
  },
  {
    name: "Roshan Panigrahy",
    offeringText:
      "Jai Srila Prabhupada for 2024 Vyasapuja Jai Srila Prabhupada for 2024 Vyasapuja Jai Srila Prabhupada for 2024 Vyasapuja Jai Srila Prabhupada for 2024 Vyasapuja Jai Srila Prabhupada for 2024 Vyasapuja",
    offeringPhoto: "",
    category: "youth",
  },
  {
    name: "Santosh Krsna Das",
    offeringText:
      "Jai Srila Prabhupada for 2024 Vyasapuja by Santosh Jai Srila Prabhupada for 2024 Vyasapuja by Santosh Jai Srila Prabhupada for 2024 Vyasapuja by Santosh Jai Srila Prabhupada for 2024 Vyasapuja by Santosh",
    offeringPhoto: "",
    category: "congregation",
  },
  {
    name: "Debasis Lenka",
    offeringText:
      "Jai Srila Prabhupada for 2024 Vyasapuja by Debasis Jai Srila Prabhupada for 2024 Vyasapuja by Debasis Jai Srila Prabhupada for 2024 Vyasapuja by Debasis",
    offeringPhoto: "",
    category: "congregation",
  },
];

const mockData = mockOfferings
  .map((data, index) => {
    return {
      id: index + 1,
      ...data,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export default async function HomePage() {
  const offerings = (await db.query.offerings.findMany()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  console.log(offerings);
  return (
    <main>
      <div className="mx-auto my-0 grid max-w-6xl grid-cols-2">
        {offerings.map((offering) => (
          <Card key={offering.id}>
            <CardHeader>
              <CardTitle>{offering.name}</CardTitle>
              <CardDescription>{offering.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p key={offering.id} className="line-clamp-1">
                {offering.offeringText}
              </p>
            </CardContent>
          </Card>
        ))}
        {mockData.map((data) => (
          <Card key={data.id}>
            <CardHeader>
              <CardTitle>{data.name}</CardTitle>
              <CardDescription>{data.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p key={data.id} className="line-clamp-1">
                {data.offeringText}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
