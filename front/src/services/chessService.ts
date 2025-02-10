export const getRandomProblem = async () => {
    try {
        const response = await fetch('https://chesskingdomthebackend.vercel.app/chess/random-problem');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching problems:', error);
        return null;
    }
};
