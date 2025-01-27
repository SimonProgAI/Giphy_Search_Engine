//GLOBAL VARIABLE
let outputArea = document.getElementById('outputArea');
let searchBar = document.getElementById('searchBar');
//ONLOAD
window.onload = function onLoad(){
    outputArea;
} 
//EVENTS LISTENERS
searchBar.addEventListener('keypress', function(event){
    if(event.key === 'Enter') {
        console.log(event.key);
        event.preventDefault();
        document.getElementById('searchBtn').click();
    }
});
document.addEventListener('click', function(event){
    if(event.target.tagName === "BUTTON"){
        event.preventDefault();
        handleUserInput(event);
    }
});
//FUNCTIONS
function imageRenderer(result) {
    return `<a href="${result.images.original.url}" target="_blank">
                <img src="${result.images.original.url}" class="giphyImages">
            </a>`;
}
function handleUserInput(event){
    let clickValue = event.target.value;
    let apiKey = "4tKwhKPWWq390IPqlgoNcXivYLWIiQxq";
    let userInput = document.getElementById('searchBar').value;
    let baseUrl = `https://api.giphy.com/v1/gifs/${clickValue}?api_key=${apiKey}`;
    let endpointUrl;
    if ((userInput===""&&clickValue ==="search")||(userInput===""&&clickValue==="translate")){
        outputArea.innerText = "Please enter a search term.";
        return;
    }
    else if(clickValue === "search"){
        endpointUrl = `&q=${userInput}&limit=25`;
    }else if (clickValue === "translate"){
        endpointUrl = `&s=${userInput}`;
    }else if (clickValue === "random"){
        endpointUrl = `&tag`;
    };
    let url = baseUrl + endpointUrl;
    let fetchStem = fetch(url).then(rawObject => rawObject.json());
    let errorAlert = 'Something went wrong while fetching your request. Please try again.';
    if (clickValue ==="search"){
        fetchStem
            .then(parsedObject => parsedObject.data)
            .then(arrayFrom_parsedObject => {
                let processedResult = arrayFrom_parsedObject
                    .map(result => imageRenderer(result))
                    outputArea.innerHTML = processedResult;
                    console.log(processedResult);
                    console.log(url);
            })
            .catch((error) => alert(errorAlert));
    }else if (clickValue==="translate"||clickValue==="random"){
        fetchStem
            .then(parsedObject => {
                let processedResult = imageRenderer(parsedObject.data);
                outputArea.innerHTML = processedResult;
                console.log(processedResult);
                console.log(url);
            })
            .catch((error) => alert(errorAlert));
    }
}




