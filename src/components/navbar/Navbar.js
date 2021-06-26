import React,{useRef,useEffect,useState} from 'react'
import './style.css'
import {fetchData} from '../../http'

function Navbar() {

    const input = useRef(null)
    const [results, setresults] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [list , setList] = useState(false)
    const [tags , setTags] = useState([])
    const [totalResult,setTotalResults] = useState(false)
    const [loading , setLoading] = useState(false)

    let timer ;
    const debounce = ( func , delay) => {
        (function(){
            clearTimeout(timer);
            timer = setTimeout(func , delay );
        })()
    }

    useEffect(() => {
        input.current.focus();
        if(localStorage.getItem('searchTags')){
            setTags(JSON.parse(localStorage.getItem('searchTags')))
        }
    }, [])

    const updateSearch = () => {
        const searchTerm = input.current.value;
        let updateSearchTags = null ;
        setLoading(true)
        fetchData({option:'search',searchTerm})
        .then(data => {setresults(data.photos.photo);
                        updateSearchTags=searchTerm
                        updateSearchHistory(updateSearchTags) })
        .catch( error => console.error(error))
        setSearchTerm(searchTerm)
        setTotalResults(false)
        setLoading(false)
        
    }

    const updateSearchHistory =  (updateSearchTags) => {

        if(localStorage.getItem('searchTags') && updateSearchTags){
            let oldSearchTags = JSON.parse(localStorage.getItem('searchTags'))
            if(!oldSearchTags.find( ele => ele === updateSearchTags)){
                oldSearchTags.unshift(updateSearchTags)
                localStorage.setItem('searchTags',JSON.stringify(oldSearchTags))
            }
            setTags(oldSearchTags)
        }else if(updateSearchTags){
            localStorage.setItem('searchTags',JSON.stringify([updateSearchTags]))
            setTags([updateSearchTags])
        }
    }

    // const truncate =  (str,n) => {
    //     return str.length > n ? str.substr(n-1) + '...' : str 
    // } 

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Search Photos</h1>
            <input type="search" className="navbar-searchBar"
             placeholder="Search" ref={input} 
             onChange={ () => debounce(updateSearch , 2000 )}
             onClick={() => setList(!list)}
             />
             { results.length > 0 ? list && searchTerm.length > 0 &&
                <div className="searchResults" >
                    <ul>
                    {!totalResult && results.map( (data, index) =>{ if( index < 5 ) 
                        return <li className="searchResults-list-item" key={index}>{data.title}</li> })} 
                    {totalResult && results.map( (data, index) => <li className="searchResults-list-item" key={index}>{data.title}</li> )}    
                    </ul>
                    { !totalResult && <div className="results-length"
                     onClick={(e) => { setTotalResults(true)
                                        e.stopPropagation()
                                       setList(true)  } }>More than {results.length} results</div>}
                </div> :
                list && searchTerm.length > 0 && !loading && <div className="searchResults">
                    No results
                </div>  }
              { <div className="navbar-tags">
                    {tags.map(( item, index ) => {
                        return  <div className="tags" key={index}>
                                    {item}
                                </div>
                    })}
                </div>}  
        </div>
    )
}

export default Navbar
