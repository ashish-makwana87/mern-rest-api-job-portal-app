import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../components";
import { jobStatusArray, jobTypeArray } from "../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs", data);
    toast.success("Job created successfully");

    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function AddJob() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section>
      <Form method='post'>
        <h2>Add Job</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <FormRow name='company' type='text' />
          <FormRow name='position' type='text' />
          <FormRow name='jobLocation' type='text' labelText='location' />
          <FormRowSelect
            data={jobStatusArray}
            name='jobStatus'
            defaultValue='pending'
            labelText='Status'
          />
          <FormRowSelect
            data={jobTypeArray}
            name='jobType'
            defaultValue='full-time'
            labelText='Type'
          />
        </div>
        <button
          type='submit'
          className='form-btn w-40 mt-5'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </Form>
    </section>
  );
}

export default AddJob;
