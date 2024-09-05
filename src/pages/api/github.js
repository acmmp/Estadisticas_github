import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.github.com/users/acmmp', {
      headers: {
        Authorization: `token ${import.meta.env.GITHUB_TOKEN}`
      }
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
