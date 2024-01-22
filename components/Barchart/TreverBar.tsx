"use client";
import { BarChart, Card, Subtitle, Title } from "@tremor/react";

const chartdata = [
  {
    name: "Banipark police station",
    "Average Ratings Obtained": 2.7,
  },
  {
    name: "Bhakrota police station",
    "Average Ratings Obtained": 4.2,
  },
  {
    name: "Chitrakoot police station",
    "Average Ratings Obtained": 3.6,
  },
  {
    name: "Chomu police station",
    "Average Ratings Obtained": 2.5,
  },
  {
    name: "Sikar Rd police station",
    "Average Ratings Obtained": 4.7,
  },
  {
    name: "Kalwar Rd police station",
    "Average Ratings Obtained": 3,
  },
  
];

const valueFormatter = (number: number | bigint) =>
  `* ${new Intl.NumberFormat("us").format(number).toString()}`;

const BarChartX = () => (
  <Card className="pt-[100px]">
    <Title>Police Station Statastics</Title>
    <Subtitle>
      This graph is plotted on the basis of number of the ratings given by the user.
    </Subtitle>
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Average Ratings Obtained"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={30}
    />
  </Card>
);

export default BarChartX;
