import React from "react";
import {Bar , Line, Pie, Doughnut} from "react-chartjs-2";
import { CategoryScale,LinearScale,BarElement, LineElement, PointElement,ArcElement,Tooltip,Legend, Title, Chart as ChartJS } from "chart.js";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
  );

  const chartMap = {
    bar: Bar,
    line: Line,
    pie:  Pie,
    doughnut :Doughnut
  }


  const GenericChart  = ({ type = "bar", data, options}) => {
 
    const ChartComponent = chartMap[type];
    
    if(!ChartComponent) return <p>Invalid chart Type: {type}</p>

    if(!data) return <p>No Data provided</p>


    return <ChartComponent data ={data} options ={options}/>
};


export default GenericChart ;
