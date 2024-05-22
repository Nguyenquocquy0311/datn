import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const LineChart = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [fileFormat, setFileFormat] = useState('pdf');

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

  const handleFileFormatChange = (event) => {
    setFileFormat(event.target.value);
  };

  const handleExport = () => {
    if (fileFormat === 'pdf') {
      exportPDF();
    } else if (fileFormat === 'word') {
      exportWord();
    }
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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Number of times borrowed and returned ' + (selectedAsset || 'all assets'), 10, 10);
    doc.addImage(document.getElementById('chart').toDataURL(), 'JPEG', 10, 20, 180, 150);
    doc.save('report.pdf');
  };

  const exportWord = async () => {
    const doc = new Document();
    const chartImage = document.getElementById('chart').toDataURL();
    const imageBuffer = await fetch(chartImage).then(res => res.arrayBuffer());

    doc.addSection({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Số lượt mượn/trả ' + (selectedAsset || 'Tất cả tài sản'),
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: {
                width: 600,
                height: 300,
              },
            }),
          ],
        }),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'report.docx');
    });
  };

  return (
    <div className='bg-white mt-5 px-8 pt-4 rounded-xl w-full h-[89vh]'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <p className='text-[20px]'>Số lượt mượn, trả {selectedAsset && 'của ' + selectedAsset}</p>
        </div>
        <div className='flex items-center'>
          <label htmlFor="asset-select" className='text-[16px]'>Chọn tài sản:</label>
          <select id="asset-select" value={selectedAsset} onChange={handleAssetChange} className='mx-4 border text-neutral-400 p-1 rounded-md'>
            <option value="">Tất cả tài sản</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.name}>
                {asset.name}
              </option>
            ))}
          </select>
          <label htmlFor="file-format-select" className=' text-[16px]'>Định dạng file:</label>
          <select id="file-format-select" value={fileFormat} onChange={handleFileFormatChange} className='mx-4 border text-neutral-400 p-1 rounded-md'>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
          </select>
          <button onClick={handleExport} className='bg-blue-500 hover:bg-blue-400 text-white py-1 px-2 rounded-md'>Xuất báo cáo</button>
        </div>
      </div>
      <Bar id="chart" data={data} options={options} />
    </div>
  );
};

export default LineChart;
