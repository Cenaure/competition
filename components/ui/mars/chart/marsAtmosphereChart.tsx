import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function MarsAtmosphereChart() {
  const data = {
    labels: [
      "CO₂ (Вуглекислий газ)",
      "N₂ (Азот)",
      "Ar (Аргон)",
      "O₂ (Кисень)",
      "Інші",
    ],
    datasets: [
      {
        label: "Склад атмосфери Марса",
        data: [95, 2.85, 2, 0.13, 0.02],
        backgroundColor: [
          "#D14A28",
          "#6B8E23",
          "#E0A800",
          "#7D9EC0",
          "#8B5A2B",
        ],

        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += `${context.raw}%`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
}
