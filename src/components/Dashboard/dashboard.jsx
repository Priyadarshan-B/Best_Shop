import React from 'react';
import ReactApexChart from 'react-apexcharts';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar'; 
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import '../Dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom';

const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handleGraphClick = (index) => {
    console.log('Graph clicked');
    const pages = ['/inventory', '/products', '/enquiries'];
    navigate(pages[index]);
  };

  return <Dashboard handleGraphClick={handleGraphClick} />;
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        { name: 'Price of the Product', "data": [
          "0",
          "0",
          "251669"
        ], yaxis: 0 },
        { name: 'Product Count', data: [1303, 8500, 1010], yaxis: 1 },
        { name: 'Rate of the Product', data: [350, 410, 306], yaxis: 2 }
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
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Greater than 300 days', 'Less than 150-90 days', 'Less than 90-30 days'],
        },
        yaxis: [
          { show: false,min: 0, max: 1000000},
          { show: false, min: 0, max: 10000 },
          { show: false, min: 0, max: 500 },
        ],
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      },
    };
  }

  render() {
    return (
      <div className="dashboard-container">
        <HorizontalNavbar />
        <div className="vandc-container">
          <VerticalNavbar />
          <div className="dashboard-body">
            <div className="chart-container">
              <ReactApexChart
                height={"95%"}
                width={"100%"}
                options={this.state.options}
                series={this.state.series}
                type="bar"
                events={{
                  click: (event, chartContext, config) => {
                    console.log('Graph clicked');
                    console.log(config.dataPointIndex);
                    console.log(config.seriesIndex);
                    this.props.handleGraphClick(config.seriesIndex);
                  },
                }}
              />
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default DashboardWrapper;
