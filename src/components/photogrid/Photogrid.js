import React,{useEffect,useState} from 'react'
import './style.css'
import {fetchData} from '../../http'
import Modal from '../modal/index'

function Photogrid() {
    const [recent , setRecent] = useState([])
    const [modalData , setModalData] = useState('')
    const [modal , setModal] = useState(false);
    const [page, setPage] = useState(1)

    const closeModal = () => {
        setModal(false)
    }

    // let timer ;

    // const checkScroll = (e) => {
    // if(e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight){
    //             fetchRecent(page)
        
    // }
        
    // }

    const fetchRecent = (page) => {
        fetchData({option:'recent',page:page})
       .then(data =>  { 
           const recentResults = data.photos.photo.map( (item ) => {
           const srcPath = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
           return <div className="photoGrid-item" >
                        <img onClick={() =>  { setModalData(srcPath) 
                                                setModal(true) }} alt={item.title}  src={srcPath} />
                  </div>
       })
        setRecent(recent.concat(recentResults))
        setPage(page + 1)
     }) 
    }

    useEffect(() => {
        fetchRecent(1);        
    }, [])
    
    // useEffect(() => {
    //     document.querySelector('.photoGrid-container')
    //     .addEventListener('scroll',checkScroll);
    //     return () => {
    //         document.querySelector('.photoGrid-container')
    //         .removeEventListener('scroll',checkScroll); 
    //     }
    // }, [])

    
    return (    <>
                <div className="photoGrid-container">          
                    {recent}
                </div>
                {modalData && modal ? <Modal picData={modalData} closeModal={closeModal} /> : ''}
                <button className="loadMore" onClick={() => fetchRecent(page)}>Load More</button>
                </>
        
    )
}

export default Photogrid
