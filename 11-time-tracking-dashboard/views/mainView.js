const root = document.getElementById("root");

function mainViewInit (dataObj) {
    console.log("mainViewInit");
    console.log("mainViewInit dataObj: ", dataObj);
    root.innerHTML = "<h1>Hello World</h1>";
    
}

export default mainViewInit;