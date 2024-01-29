import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import '../Dashboard/dashboard.css';

import apiHost from '../../utils/api';

const DashboardWrapper = () => {
  return <Dashboard />;
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Price of the Product', data: [0, 0, 0], yaxis: 0 },
      { name: 'Product Count', data: [0, 0, 0], yaxis: 1 },
      { name: 'Rate of the Product', data: [0, 0, 0], yaxis: 2 },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: '5px 5px 0px 0px',
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Greater than 300 days',
          'Less than 150-90 days',
          'Less than 90-30 days',
        ],
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: [
        { show: false },
        { show: false  },
        { show: false  },
    
      ],
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '₹ ' + val ;
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost}/dashboard-data`);
        const apiData = await response.json();

        setChartData((prevChartData) => ({
          ...prevChartData,
          series: apiData.series.map((apiSeries, index) => ({
            name: apiSeries.name,
            data: apiSeries.data.map((value) => parseFloat(value)),
            yaxis: index,
          })),
        }));
      } catch (error) {
        console.error('Error fetching or updating chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">
            <ReactApexChart
              height={'95%'}
              width={'100%'}
              options={chartData.options}
              series={chartData.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
