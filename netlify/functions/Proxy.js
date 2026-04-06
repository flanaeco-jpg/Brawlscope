const BRAWL_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIzNjlkZjFiLWI2ODAtNGJiMy1iNzhlLTk4MzllMzdiZjVkNCIsImlhdCI6MTc3NTQ2MTE5OCwic3ViIjoiZGV2ZWxvcGVyLzA5ZjQzNzk4LWE2NTAtNjBlZC01ZDg4LWE0OTJhODIyOGU2MSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTguMjI1Ljc3LjgxIl0sInR5cGUiOiJjbGllbnQifV19.rnV9N6eorpMslh8QICWiWbXty6tXCFY5hMBxx4J83MtPv_rKCPUSujocinraPK06SGrwaZJrANpf6wI3QAVOBg';

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
