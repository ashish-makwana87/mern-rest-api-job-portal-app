import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { FormRow } from "../components";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import { response } from "express";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = await Object.fromEntries(formData);

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
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section>
      <Form method='post'>
        <h2>Add Job</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <FormRow type='text' name='company' />
          <FormRow type='text' name='position' />
          <FormRow type='text' name='jobLocation' labelText='location' />
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
