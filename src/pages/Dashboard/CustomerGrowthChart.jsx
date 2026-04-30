import Chart from "react-apexcharts";

export const CustomerGrowthChart = () => {
  const customerData = [
    { month: "Jan", count: 20 },
    { month: "Feb", count: 35 },
    { month: "Mar", count: 28 },
    { month: "Apr", count: 45 },
    { month: "May", count: 60 },
    { month: "Jun", count: 55 },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    colors: ["#004b63"],
    xaxis: {
      categories: customerData.map((d) => d.month),
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Customers`,
      },
    },
  };

  const series = [
    {
      name: "New Customers",
      data: customerData.map((d) => d.count),
    },
  ];

  return (
    <div className="chart_card">
      <div className="chart_header">
        <h6>Customer Overview</h6>
      </div>
      <Chart options={options} series={series} height={270} />
    </div>
  );
};
