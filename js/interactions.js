const filters = [
  { id: "all", label: "All", isActive: true },
  { id: "female", label: "Women", isActive: false },
  { id: "male", label: "Men", isActive: false },
];

const populateFilters = (data) => {

  d3.select("#filters")
    .selectAll(".filter")
    .data(filters)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (event, selection) => {

        // Handle buttons active state
        d3.selectAll(".filter")
          .classed("active", d => selection.id === d.id ? true : false);

        // If user clicked on a button that is not yet active
        if (!selection.isActive) {

          // Call the function to filter the histogram
          filterHistogram(selection.id, data);

          // Update isActive states in the filters array
          filters.forEach(filter => {
            filter.isActive = selection.id === filter.id ? true : false;

          });
        }

      });

};

const filterHistogram = (selectedOption, data) => {
  
  // Filter the original data based on the selected option
  let updatedData = selectedOption === "all"
    ? data
    : data.filter(item => item.gender === selectedOption);

  // Update the bins
  const binGenerator = d3.bin()
    .value(d => d.salary);
  const bins = binGenerator(updatedData);

  // Update the histogram
  d3.selectAll("#histogram rect")
    .data(bins)
    .transition()
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));

};