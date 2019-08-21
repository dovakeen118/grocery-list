import React from 'react'

import { Chart } from 'react-google-charts'

const PieChart = (props) => {
  let categories = props.categories
  let items = props.items

  let data = [["Category", "Items"]]
  let options = {
    pieHole: 0.2,
    slices: [
      { color: "#ba4945" },
      { color: "#42530e" },
      { color: "#FFE049" },
      { color: "#B1693A" },
      { color: "#F8DE98" },
      { color: "#77173B" },
      { color: "#D1A18F" },
      { color: "#7b9235" },
      { color: "#ED9A46" },
      { color: "#A02524" },
      { color: "#1779BA" },
      { color: "#b5b5b5" },
      { color: "#7190B1" },
      { color: "#6A425D" },
    ]
  }

  let pieSections = categories.map((category) => {
    let numItems = items.filter(item => item.category === category)
    numItems = numItems.length
    let newData = [category, numItems]
    data.push(newData)
  })

  return(
    <div className="callout chart">
      <Chart
        chartType="PieChart"
        graph_id="PieChart"
        width={"100%"}
        height={"250px"}
        data={data}
        options={options}
      />
    </div>
  )
}

export default PieChart;
