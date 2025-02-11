export const getRandomProblem = async () => {
    const initialUrl = import.meta.env.VITE_API_CHESS_URL as string 
    try {
        const response = await fetch(`${initialUrl}random-problem`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching problems:', error);
        return null;
    }
};
