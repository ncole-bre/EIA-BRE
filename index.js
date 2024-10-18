const { useState } = React;
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } = Recharts;

const initialData = [
  { category: 'Direct Impact', value: 5.0, fill: '#8884d8', description: 'Initial expenditure' },
  { category: 'Indirect Impact', value: 2.5, fill: '#82ca9d', description: 'Business-to-business purchases' },
  { category: 'Induced Impact', value: 1.5, fill: '#ffc658', description: 'Household spending of labor income' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
        <p className="font-bold text-lg">{`${label}`}</p>
        <p className="text-blue-600">{`Impact: $${payload[0].value.toFixed(2)} million`}</p>
        <p className="text-sm italic">{payload[0].payload.description}</p>
      </div>
    );
  }
  return null;
};

const EconomicImpactDashboard = () => {
  const [data, setData] = useState(initialData);
  const totalImpact = data.reduce((sum, item) => sum + item.value, 0);
  const multiplier = (data[1].value + data[2].value) / data[0].value;

  const handleInputChange = (index, value) => {
    const newData = [...data];
    newData[index].value = parseFloat(value) || 0;
    setData(newData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Economic Impact Analysis: Cheech Marin Center for Chicano Art &amp; Culture</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Adjust Impact Values (in millions)</h3>
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center mb-2">
            <label className="w-1/3">{item.category}:</label>
            <input
              type="number"
              value={item.value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-20 p-1 border rounded"
            />
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category">
            <Label value="Impact Categories" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Economic Impact ($ Millions)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold">Total Economic Impact: ${totalImpact.toFixed(2)} million</p>
        <p className="text-lg font-medium mt-2 text-blue-600">Economic Multiplier: {multiplier.toFixed(2)}</p>
        <p className="text-md mt-2">For every $1 of direct spending, an additional ${multiplier.toFixed(2)} of economic activity is generated</p>
        <p className="text-sm mt-2 text-gray-600">Based on projected data for the first year of operation</p>
      </div>
    </div>
  );
};

ReactDOM.render(<EconomicImpactDashboard />, document.getElementById('root'));