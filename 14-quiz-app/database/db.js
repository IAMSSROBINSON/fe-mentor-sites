async function getTheData () {
    try {
          const response = await fetch('./database/data.json');

        if (!response.ok) {
            throw new Error("Could not fetch data, please try again later..");
        }

        return await response.json();
    }
    catch (err) {
        console.log("Error fetching data..");
    }
    return {data: [], error: "Error fetching data.."}
}

export default getTheData;