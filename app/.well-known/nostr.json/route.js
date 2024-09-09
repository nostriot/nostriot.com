// app/api/.well-known/nostr.json/route.js

export async function GET(request) {
    // Parse the query parameters
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    // Check if the query parameter 'name' is provided and equals 'nostriot'
    if (name === 'nostriot') {
        // Return the JSON response
        return new Response(
            JSON.stringify({
                names: {
                    nostriot: "7ab1ed7ab5dfa8e26f067700aab1e25aa2d86f2129888edda83e949df8e15275",
                },
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                    'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS requests
                    'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
                },
            }
        );
    } else {
        // Return a 404 Not Found if the name is not provided or is incorrect
        return new Response(
            JSON.stringify({ error: 'Name not found' }),
            {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                    'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS requests
                    'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
                },
            }
        );
    }
}
