import { useJobsContext } from '../pages/AllJobs';
import SingleJob from './SingleJob';


function JobsContainer() {
  
 const {allJobs, totalJobs} = useJobsContext();
 

 if (allJobs.length < 1) {
  return <section className='mt-10'>
   <h2>No jobs found</h2>
  </section>
 }


  return (
    <section className='mt-8 md:mt-10'>
     <hr className='mb-6' />
     <h4 className='font-medium'>total {totalJobs} job{allJobs.length > 1 && 's'}</h4>
     <div className='mt-6 grid md:grid-cols-2 gap-x-6 gap-y-6'>
      {allJobs.map((job) => {
       return <SingleJob key={job._id} {...job} />
      })}
     </div>
    </section>
  )
}

export default JobsContainer;