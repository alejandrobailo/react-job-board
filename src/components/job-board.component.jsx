import React from 'react';
import { generate as id } from 'shortid';

const JobBoard = ({
	job: { company, logo, isNew, featured, position, role, level, postedAt, contract, location, languages, tools },
	handleTagClick
}) => {
	const tags = [ role, level ];

	if (languages) tags.push(...languages);
	if (tools) tags.push(...tools);

	return (
		<div
			className={`flex flex-col bg-white shadow-lg rounded my-16 mx-10 p-8 ${featured &&
				'border-l-4 border-gray-700 border-solid'} lg:flex-row lg:my-8`}
		>
			<div>
				<img className="-mt-16 mb-4 w-18 h-18 lg:my-0 lg:w-24 lg:h-24 lg:mr-6" src={logo} alt={company} />
			</div>
			<div className="flex flex-col justify-between">
				<h3 className="font-bold text-blue-500">
					{company}
					{isNew && (
						<span className="font-bold m-2 py-1 px-2 text-blue-100 rounded-full bg-blue-500 uppercase text-xs">
							New
						</span>
					)}
					{featured && (
						<span className="font-bold m-2 py-1 px-2 text-white rounded-full bg-gray-700 uppercase text-xs">
							Featured
						</span>
					)}
				</h3>
				<h2 className="font-bold text-xl text-gray-800 my-4 lg:my-0">{position}</h2>
				<p className="text-gray-500">
					{postedAt} &middot; {contract} &middot; {location}
				</p>
			</div>
			<div className="flex flex-wrap items-center mt-4 pt-4 border-t border-gray-400 border-solid lg:ml-auto lg:border-0 lg:pt-0 lg:mt-0 ">
				{tags ? (
					tags.map((tag) => (
						<span
							className="font-bold mr-4 mb-4 p-2 text-blue-500 rounded bg-blue-100 lg:mb-0 cursor-pointer"
							onClick={() => handleTagClick(tag)}
							key={id()}
						>
							{tag}
						</span>
					))
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default JobBoard;
