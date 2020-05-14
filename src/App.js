import React, { useState, useEffect } from 'react';
import { generate as id } from 'shortid';

import data from './assets/data.json';
import JobBoard from './components/job-board.component';

function App() {
	const [ jobs, setJobs ] = useState([]);
	const [ filters, setFilters ] = useState([]);

	useEffect(() => setJobs(data), []);

	const filterByTags = ({ languages, role, tools, level }) => {
		if (filters.length === 0) {
			return true;
		}

		const tags = [ role, level ];

		if (languages) tags.push(...languages);
		if (tools) tags.push(...tools);

    return filters.every(filter => tags.includes(filter))
	};

	const handleTagClick = (tag) => {
		if (filters.includes(tag)) return;

		setFilters([ ...filters, tag ]);
	};

	const handleRemoveFilter = (filterToRemove) => {
		setFilters(filters.filter((item) => item !== filterToRemove));
	};

	const handleClearFilters = () => {
		setFilters([]);
	};

	const filteredJobs = jobs.filter(filterByTags);

	return (
		<>
			<header className="bg-blue-500 mb-12">
				<img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-desktop" />
			</header>
      <div className="container m-auto">
			{filters.length > 0 && (
				<div className="flex bg-white shadow-lg -mt-16 mx-10 p-6 rounded z-10 relative">
					{filters.map((filter) => (
						<span
							className="cursor-pointer font-bold mr-4 mb-4 lg:mb-0"
							key={id()}
							onClick={() => handleRemoveFilter(filter)}
						>
							<span className="text-blue-500 rounded-r-none rounded bg-blue-100 p-2">{filter}</span>
							<span className="rounded-l-none rounded bg-blue-500 text-white p-2">&#10005;</span>
						</span>
					))}
					<span
						className="ml-auto text-blue-500 cursor-pointer border-b border-solid border-blue-500"
						onClick={() => handleClearFilters()}
					>
						Clear
					</span>
				</div>
			)}
			{jobs.length === 0 ? (
				<p>Jobs fetching</p>
			) : (
				filteredJobs.map((job) => <JobBoard job={job} key={job.id} handleTagClick={handleTagClick} />)
			)}
		</div>
    </>
	);
}

export default App;
