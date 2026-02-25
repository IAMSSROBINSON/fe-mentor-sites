async function getData () {
    try {
        const response = await fetch('../database/data.json');
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data: ", data);
    }
    catch (err) {
        console.log(err.message);
    }
}
getData();