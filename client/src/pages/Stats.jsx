import React from "react";
import { useGlobalContext } from "./DashboardLayout";
import { useLoaderData, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { StatsContainer } from "../components";
import { ChartContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Stats() {
  const { monthlyApplications, defaultStats } = useLoaderData();

  return (
    <section>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </section>
  );
}

export default Stats;
