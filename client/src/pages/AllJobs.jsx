import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const JobsContext = createContext();

function AllJobs() {
  const { allJobs, totalJobs } = useLoaderData();
  console.log(allJobs);

  return (
    <JobsContext.Provider value={{ allJobs, totalJobs }}>
      <SearchContainer />
      <JobsContainer />
    </JobsContext.Provider>
  );
}

export const useJobsContext = () => {
  return useContext(JobsContext);
};

export default AllJobs;
