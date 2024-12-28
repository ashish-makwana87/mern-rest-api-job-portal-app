import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";


export const loader = async ({request}) => {
 
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  console.log(params);
  
  try {
    const { data } = await customFetch.get("/jobs", {params});
    return {data, searchValues: {...params}};
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const JobsContext = createContext();

function AllJobs() {
  const { data: {allJobs, totalJobs, totalPages, currentPage}, searchValues } = useLoaderData();

  return (
    <JobsContext.Provider value={{ allJobs, totalJobs, totalPages, currentPage,searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </JobsContext.Provider>
  );
}

export const useJobsContext = () => {
  return useContext(JobsContext);
};

export default AllJobs;
