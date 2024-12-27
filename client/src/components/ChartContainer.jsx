import React from 'react'
import BarChartContainer from './BarChart'

function ChartContainer({data}) {

  return (
    <section className='mt-12'>
      <div>
      <h2 className='text-center'>Monthly Applications</h2>
      <BarChartContainer data={data} />
      </div>
    </section>
  )
}

export default ChartContainer