import React from 'react';
import ReactApexChart from 'react-apexcharts';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar'; 
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import '../Dashboard/dashboard.css'
import StockPage from '../Pages/StockPage/StockPage'; 

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57]
        },
        {
          name: 'Revenue',
          data: [76, 85, 101]
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
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
          categories: ['Feb', 'Mar', 'Apr'],
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
                options={this.state.options}
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

export default Dashboard;

