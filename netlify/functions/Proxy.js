exports.handler = async (event) => {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};
