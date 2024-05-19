import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useEffect, useState } from 'react';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const LineChart = () => {
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/requests');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRequests = requests.filter(request => request?.isApproved);
  const monthBorrowCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize an array to hold the counts for each month
  const monthPayCounts = [0,0,0,0,0,0,0,0,0,0,0,0]; 

for (let i = 0; i < filteredRequests.length; i++) {
  const dateString = filteredRequests[i].approvalDate;
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // JavaScript months are zero-based, so we add 1
  const paddedMonth = month < 10 ? '0' + month : month; // Pad single-digit months with leading zero if needed

  const monthInt = parseInt(paddedMonth, 10); // Parse the string to an integer using parseInt()

  var index = monthInt - 1; // Adjust index to start from 0
  if (filteredRequests[i]?.type === 'Mượn') {
    monthBorrowCounts[index]++
  } else {
    monthPayCounts[index]++
  }
}

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Các nhãn cho các tháng,
    datasets: [
      {
        label: 'Page Views',
        data: monthBorrowCounts,
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Users',
        data: monthPayCounts,
        yAxisID: 'y-axis-2',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          position: 'right',
          id: 'y-axis-2',
        },
      ],
    },
  };

  return (
    <div className='mx-auto bg-white mt-8 p-4 rounded-xl w-full h-full justify-center'>
      <h1>Example 2: Bar Chart</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LineChart; 
