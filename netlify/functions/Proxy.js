const BRAWL_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdjY2QxZTJiLTM0NGQtNDFmNS1hMzZiLWVjZWMxZWRiYWRjNSIsImlhdCI6MTc3NTQyMzM1Mywic3ViIjoiZGV2ZWxvcGVyLzA5ZjQzNzk4LWE2NTAtNjBlZC01ZDg4LWE0OTJhODIyOGU2MSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTcyLjcxLjIzMi42NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.05zhEp_d0I8e7_uNNQZYoY9dVHhwSzAtV7HJJKUU-GKUB1uTLqMU1kGOR9vcii1waWZQiCanzVcb5S_gg60EJQ';

exports.handler = async (event) => {
  const tag = event.queryStringParameters?.tag;
  if (!tag) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing tag' }) };
  }

  const encodedTag = encodeURIComponent(tag);
  const response = await fetch(`https://api.brawlstars.com/v1/players/${encodedTag}`, {
    headers: {
      'Authorization': `Bearer ${BRAWL_TOKEN}`,
      'Accept': 'application/json',
    },
  });

  const data = await response.text();
  return {
    statusCode: response.status,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    body: data,
  };
};
