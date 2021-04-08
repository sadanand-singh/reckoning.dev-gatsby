import React from 'react'
import Loadable from 'react-loadable'
import { FoldingSpinner } from './spinners'

const Plotly = Loadable({
  loader: () => import(`react-plotly.js`),
  loading: ({ timedOut }) =>
    timedOut ? (
      <blockquote>Error: Loading Plotly timed out.</blockquote>
    ) : (
      <FoldingSpinner />
    ),
  timeout: 10000,
})

export const LazyPlot = ({ layout, style, config, id, ...rest }) => {
  return (
    <div id={id} className="mb10 block mb-4">
      <div className="text-sm border p-2 border-opacity-50 border-dashed rounded">
        <div className="bg-white rounded p-2">
          <Plotly
            layout={{
              margin: { t: 0, r: 52, b: 0, l: 0 },
              font: {
                color: `black`,
                size: 16,
              },
              // The next 3 options make the plot responsive.
              autosize: true,
              ...layout,
            }}
            style={{ width: `100%`, ...style }}
            useResizeHandler
            config={{
              displayModeBar: true,
              showTips: true,
              displaylogo: false,
              ...config,
            }}
            {...rest}
          />
        </div>
      </div>
    </div>
  )
}
