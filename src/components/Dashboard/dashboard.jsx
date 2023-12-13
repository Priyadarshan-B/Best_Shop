import React from 'react';
import ReactApexChart from 'react-apexcharts';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar'; 
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import '../Dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom';

const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handleGraphClick = () => {
    console.log('Graph clicked');
    navigate('/inventory');
  };

  return (
    <Dashboard handleGraphClick={handleGraphClick} />
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Price of the Product',
          data: [44, 55, 57]
        },
        {
          name: 'Product Count',
          data: [76, 85, 101]
        },
        {
          name: 'Rate of the Product',
          data: [35, 41, 36]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          events: {
            click: function(event, chartContext, config) {
              console.log('ery')
              console.log(config.dataPointIndex)
              props.handleGraphClick()
              console.log(config.seriesIndex)
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'top', // You can adjust the position as needed
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
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
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
                options={{
                  ...this.state.options,
                  plotOptions: {
                    ...this.state.options.plotOptions,
                    bar: {
                      ...this.state.options.plotOptions.bar,
                      onClick: ()=>{
                        console.log(
                          'fgvh'
                        )
                      },
                    },
                  },
                }}
                series={this.state.series}
                type="bar"
              />
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default DashboardWrapper;
