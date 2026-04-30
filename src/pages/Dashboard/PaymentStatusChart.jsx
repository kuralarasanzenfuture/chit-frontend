import Chart from "react-apexcharts";

export const PaymentStatusChart = () => {
  const options = {
    chart: { type: "donut" },
    labels: ["Paid", "Pending", "Overdue"],
    colors: ["#22c55e", "#facc15", "#ef4444"],
    legend: { position: "bottom" },
  };

  const series = [65, 25, 10];

  return (
    <div className="chart_card">
      {/* HEADER */}
      <div className="chart_header">
        <h6>Payment Overview</h6>
      </div>

      {/* CHART */}
      <Chart options={options} series={series} type="donut" height={280} />
    </div>
  );
};
