import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    LinearScale,
    LineElement,
    PointElement
)

const LineChart = () => {

    const [chart, setChart] = useState([])

    var baseUrl = "https://api.coinranking.com/v2/coins?limit=10"
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var apiKey = 'coinrankingdb557ab684f74dfe9c3d1717548962eac6886366cf1fa78d'

    useEffect(() => {
        const fetchCoins = async () => {
          await fetch(`${proxyUrl}${baseUrl}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': `${apiKey}`,
              'Access-Control-Allow-Origin': "*"
            }
          })
            .then((response) => {
              if (response.ok) {
                response.json().then((json) => {
                  console.log(json.data);
                  setChart(json.data)
                });
              }
            }).catch((error) => {
              console.log(error);
            });
        };
        fetchCoins()
      }, [baseUrl, proxyUrl, apiKey])
    
      console.log("chart", chart);
      var data = {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
          label: `${chart?.coins?.length} Coins Available`,
          data: chart?.coins?.map(x => x.price),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      };
    
      var options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }
    
      return (
        <div>
          <Line
            data={data}
            height={400}
            options={options}
    
          />
        </div>
      )
    }
    
    export default LineChart