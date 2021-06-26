const apiKey = '72cede6a9c2b1adf4a0ca77b55928f74'
const baseURL = 'https://www.flickr.com/services/rest/'
let queryParams = ''

export  const fetchData = async ({option,searchTerm,page}) => {
    switch(option){
        case 'search': queryParams = `?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&format=json&nojsoncallback=1`
            break;
        
        case 'recent': queryParams = `?method=flickr.photos.getRecent&api_key=${apiKey}&page=${page}&format=json&nojsoncallback=1`
            break; 
        default:       
    }
    
    let response = await fetch(`${baseURL}${queryParams}`)
    let data =  await response.json()
    return  data
}