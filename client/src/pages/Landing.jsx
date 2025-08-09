import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {

  
  return (
    <section className="bg-[#f5f5f5] h-[100vh]">
      <nav className='bg-[#e0e0e0] py-6'>
        <div className='alignment'>
          <Logo />
        </div>
      </nav>
      <div className="alignment grid items-center md:grid-cols-2 gap-y-4 gap-x-10 my-10 md:my-16">
      <div className='order-2 md:order-1'>
        <h1 className='text-3xl md:text-4xl'>Job portal app</h1>
        <p className="text-base lg:text-lg mt-4">
          Some of the libraries used are Bcryptjs, cloudinary, jsonwebtoken, cookie-parser, multer, helmet, express-validator, dayjs, recharts, axios, react-router, react-toastify, tailwind css and so on. 
        </p>
        <div className='flex items-center gap-x-4 mt-4 md:mt-6' >
          <Link to='/register' className='btn'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
      </div>
      <div className='order-1 '>
        <img src="https://res.cloudinary.com/ddulynvdq/image/upload/v1738769549/job-5382501_1920_dgqv7c.jpg" alt="job" className="h-52 md:h-64 lg:h-[22rem] w-full object-cover rounded-md"  />
      </div>
      </div>
    </section>
  );
}

export default Landing;
