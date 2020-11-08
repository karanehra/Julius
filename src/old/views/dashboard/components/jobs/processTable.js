import React from 'react'

const ProcessTable = props => {
  const { jobs } = props
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, i) => (
          <tr key={i}>
            <td>{job.processName}</td>
            <td>{job.type}</td>
            <td>{job.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProcessTable
