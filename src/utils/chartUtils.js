// utils/chartUtils.js

export const formBillData = (utilities) => {
    const labels = utilities.map((item) => item.bill_month);
    const usageData = utilities.map((item) => item.usage_units);
  
    return {
      data: {
        labels,
        datasets: [
          {
            label: "Usage Units",
            data: usageData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Utility Usage per Month",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Units Used',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Bill Month',
            },
          },
        },
      },
    };
  };
  