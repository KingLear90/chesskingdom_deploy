export const getRandomProblem = async () => {
    const initialUrl = import.meta.env.VITE_API_URL as string; 
    console.log("URL usada en fetch:", `${initialUrl}`);
    try {
        const response = await fetch(`${initialUrl}problem/get`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching problems:', error);
        return null;
    }
};
