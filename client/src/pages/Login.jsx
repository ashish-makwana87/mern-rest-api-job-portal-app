import { FormRow } from "../components";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errObj = { msg: "" };

  if (data.password.length < 6) {
    errObj.msg = "Password must be of at least 6 characters";
    return errObj;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Welcome");
    return redirect("/dashboard");
  } catch (error) {
    errObj.msg = error?.response?.data?.msg;
    return errObj;
  }
};

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errObj = useActionData();
  const navigate = useNavigate();

  const testLogin = async () => {
   
    try {
      await customFetch.post('/auth/login', {email: "test@gmail.com", password: "test1234"});
      toast.success('Welcome, test user');
       navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      console.log(error);
    }
  }

  return (
    <section className='alignment my-20'>
      <Form
        method='post'
        className='flex flex-col gap-y-4 shadow-2xl p-8 justify-center mx-auto md:w-96'
      >
        <h2 className='text-center mb-4'>Login</h2>
        {errObj?.msg && (
          <p className='text-center text-red-600 mb-2'>{errObj.msg}</p>
        )}
        <FormRow type='email' name='email' labelText='your email' />
        <FormRow type='password' name='password' labelText='password' />
        <button type='submit' className='btn mt-2'>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <button type='button' className='btn mt-2' onClick={testLogin}>
          Explore the app
        </button>
      </Form>
    </section>
  );
}

export default Login;
