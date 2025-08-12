import { useGlobalContext } from "../pages/DashboardLayout";
import { FaAlignLeft } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const {user, toggleSidebar, logoutUser } = useGlobalContext();

  return (
    <section className='flex sticky top-0 justify-center items-center bg-[#f2f2f2] py-4 md:py-6 '>
      {/* navbar container */}
      <div className='flex w-[95%] justify-between'>
        <button type='button' onClick={toggleSidebar}>
          <FaAlignLeft className='w-6 h-6 text-[#181818]' />
        </button>

        {/* hiding title in mobile version to avoid space issue */}
        <h2 className='hidden md:block text-2xl font-semibold tracking-wider uppercase text-[#181818]'>
          DASHBOARD
        </h2>
        <div className='flex items-center gap-x-3 text-[#181818]'>
        <div className='flex items-center gap-x-2'>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt='avatar'
                className='rounded-full object-cover w-5 h-5 md:h-7 md:w-7'
              />
            ) : (
              <FaUserCircle className='w-4 h-4 md:h-7 md:w-7' />
            )}
            <p className=' capitalize'>Hello, {user.name}</p>
          </div>
          <button type='button' className="btn" onClick={logoutUser}>Logout</button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
