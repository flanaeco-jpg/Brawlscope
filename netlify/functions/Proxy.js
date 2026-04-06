const BRAWL_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZmODI1YzFiLWEzNjEtNDA1Yy1hZjliLWQ5MTlmYWYwY2Q1MiIsImlhdCI6MTc3NTQ2MDY0Nywic3ViIjoiZGV2ZWxvcGVyLzA5ZjQzNzk4LWE2NTAtNjBlZC01ZDg4LWE0OTJhODIyOGU2MSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzUuMTU3LjI2LjEzNSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.3A2v7nCqf1nZTgUawF2Hh8GrOimm5rRjs1aZvLVMKXY2aPKjUq5a5z6UUszoVq2afsGFaCOu4f5lU-VevLsMPQ';

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
