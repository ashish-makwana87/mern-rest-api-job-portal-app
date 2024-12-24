import React from 'react'

function SingleJob({company, position, jobStatus, jobType}) {

  return (
    <div>
     <h5>{company}</h5>
     <h5>{jobStatus}</h5>
    </div>
  )
}

export default SingleJob