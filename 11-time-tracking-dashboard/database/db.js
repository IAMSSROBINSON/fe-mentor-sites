async function getData () {
        const response = await fetch('/database/data.json');
        if (!response.ok) {
            throw new Error("Could not fetch data. Please try again later.");
        }
        return await response.json();
    }

export default getData;