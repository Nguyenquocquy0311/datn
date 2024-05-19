import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useEffect, useState } from 'react';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const LineChart = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');

  const fetchRequests = async () => {
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

  const fetchAssets = async () => {
    try {
      const response = await fetch('http://localhost:4000/assets');
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchAssets();
  }, []);

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  const filteredRequests = requests.filter(
    (request) => request.isApproved && (selectedAsset === '' || request.assetName === selectedAsset)
  );

  const monthBorrowCounts = Array(12).fill(0);
  const monthPayCounts = Array(12).fill(0);

  for (let i = 0; i < filteredRequests.length; i++) {
    const date = new Date(filteredRequests[i].approvalDate);
    const month = date.getMonth(); // JavaScript months are zero-based
    if (filteredRequests[i].type === 'Mượn') {
      monthBorrowCounts[month]++;
    } else {
      monthPayCounts[month]++;
    }
  }

  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Lượt mượn',
        data: monthBorrowCounts,
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Lượt trả',
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
    <div className='bg-white mt-8 p-8 rounded-xl w-full h-[85vh]'>
      <div className='flex'>
        <p className='text-[20px]'>Số lượt mượn/trả {selectedAsset}</p>
        <div className='fixed right-10'>
          <label htmlFor="asset-select" className='text-blue-500 text-[16px]'>Chọn tài sản</label>
          <select id="asset-select" value={selectedAsset} onChange={handleAssetChange} className='mx-4 border border-blue-500 text-neutral-400 p-1 rounded-md'>
            <option value="">Tất cả tài sản</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LineChart;
