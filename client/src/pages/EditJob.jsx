import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { FormRow, FormRowSelect } from "../components";
import { jobStatusArray, jobTypeArray } from "../utils/constants";

export const loader = async ({params}) => {

 try {
  const {data} = await customFetch.get(`/jobs/${params.id}`)
  return data; 
 } catch (error) {
  toast.error(error?.response?.data?.msg)
  return redirect('/dashboard/all-jobs')
 }
}

export const action = async ({request, params}) => {
 
  const formData = await request.formData(); 
  const data = Object.fromEntries(formData);

try {
  await customFetch.patch(`/jobs/${params.id}`, data)
  toast.success('Job updated successfully')
  return redirect('/dashboard/all-jobs');
} catch (error) {
  toast.error(error?.response?.data?.msg);
  return redirect('/dashboard/all-jobs');
}
}

function EditJob() {
 const {job} = useLoaderData();
 const {company, position, jobType, jobLocation, jobStatus} = job;

 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';

  return <section>
  <Form method='post'>
    <h2>Edit Job</h2>
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
      <FormRow name='company' type='text' defaultValue={company} />
      <FormRow name='position' type='text' defaultValue={position} />
      <FormRow name='jobLocation' type='text' labelText='location' defaultValue={jobLocation} />
      <FormRowSelect
        data={jobStatusArray}
        name='jobStatus'
        defaultValue={jobStatus}
        labelText='Status'
      />
      <FormRowSelect
        data={jobTypeArray}
        name='jobType'
        defaultValue={jobType}
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
}

export default EditJob