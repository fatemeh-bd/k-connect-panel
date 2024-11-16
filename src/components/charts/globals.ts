export const chartOptions = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          family: "IRANSansWeb",
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};
