# Tank
Tank is a tool to for project managers to understand current and planned workloads.

# What it Does
Tank requires three inputs:
1. Project Managers / Staff Members
2. Projects
3. Project stages (e.g., 'Pipeline', 'Active/In Progress', 'Closed')

As project managers are assigned to projects, their capacity to take new projects changes based on a "stress" score, which can be refined with options.

As new, unassigned projects are added to Tank, Tank recommends project members who can be assigned to the new projects, and suggests which project managers can use a break (or are at risk of doing too much.)

Additional options can be attributed to the inputs noted above in order to help refine the understanding of workload.

Additional features will be added in the future.

# Options
The following options are in the process of being added to the API:
```
projectManager: {
  ** // all Required **
  name: String
  team: String
  title: String,
  experience: Float
}
```

```
project: {
  ** // Required **
  name: String
  status: String,
  startDate: Date,
  endDate: Date,
  assigned: Boolean,
  ** // Optional **
  additionalOptions: {
    ...Object
  }
}
```
```
phase: {
  ** // Required **
  name: String
  ** // Optional **
  additionalOptions: {
    ...Object
  }
}
```



# Framework
Tank is built on the following tools:
* [React](https://reactjs.org/)
* [React-Router](https://reacttraining.com/react-router/)

For data persistence, we use a simple [Airtable](https://airtable.com/) database to manage our projects (planned and active). Tank is built to work with Airtable out-of-the-box. However, we'll provide support for additional data-structures in the future.

# Installation
`npm install`

