import axios from 'axios';

export async function GET() {
  try {
    if (!import.meta.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN no está definido');
    }

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
    console.error('Error en la API de GitHub:', error);

    return new Response(JSON.stringify({ 
      error: 'Error fetching data', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
