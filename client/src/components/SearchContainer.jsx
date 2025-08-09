import React from "react";
import { FormRow, FormRowSelect, SearchRow } from "../components";
import { jobStatusArray, jobTypeArray, sortArray } from "../utils/constants";
import { Form, useNavigation, Link, useSubmit } from "react-router-dom";
import { useJobsContext } from "../pages/AllJobs";


function SearchContainer() {
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const {searchValues} = useJobsContext();
  const {search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  
  const debounce = () => {
    let timeoutId;

   return (e) => {
    const form = e.currentTarget.form;
    
    clearTimeout(timeoutId);

    timeOutId = setTimeout(() => {
      submit(form)
    }, 2000)
   }
  }

  return (
    <section>
      <Form>
        <h2>Search Jobs</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-10'>
          <SearchRow defaultValue={search} onChange={debounce()} />
          <FormRowSelect
            data={["all", ...jobStatusArray]}
            name='jobStatus'
            defaultValue={jobStatus}
            labelText='Status'
            onChange={debounce()}
          />
          <FormRowSelect
            data={["all", ...jobTypeArray]}
            name='jobType'
            defaultValue={jobType}
            labelText='Type'
            onChange={debounce()}
          />
          <FormRowSelect
            data={sortArray}
            name='sort'
            defaultValue={sort}
            labelText='sort'
            onChange={debounce()}
          />
        </div>
        <Link to='/dashboard/all-jobs' className='form-btn'>
          Reset values
        </Link>
      </Form>
    </section>
  );
}

export default SearchContainer;
