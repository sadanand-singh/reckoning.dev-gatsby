import React from "react"

const ResultsTable = ({ data, id }) => {
    const headingData = data[0]
    const results = data.slice(1)
    const num_keys = headingData.results_keys.length
    return (
        <div id={id} className="mb10 block mb-4 bg-white rounded">
            <div className="text-sm divide-y border p-2 border-opacity-50 border-dashed rounded">
                <div className=" flex flex-row font-semibold">
                    <div className="text-sm w-48 md:w-64 mr-16 md:mr-3 pb-1">
                        {headingData.primary_key}
                    </div>
                    <div className={`flex-grow grid grid-cols-${num_keys}`}>
                        {headingData.results_keys.map((tag, index) => (
                            <span key={index} className="font-semibold">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {results.map((res_data, index) => (
                    <div key={index} className="flex flex-row">
                        <div className="h-32 overflow-y-scroll flex-grow ">
                            {res_data.results.map((res_model_data, index) => (
                                <div key={index} className="flex flex-row">
                                    <div className="text-sm w-48 md:w-64 mr-3">{res_model_data[headingData.primary_key]}</div>
                                    <div className={`flex-grow grid grid-cols-${num_keys}`}>
                                        {headingData.results_keys.map((k, index) => (
                                            <span key={index} className="font-semibold">
                                                {(res_model_data[k] !== undefined ? res_model_data[k] : '--')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ div>
    )
}

export default ResultsTable
