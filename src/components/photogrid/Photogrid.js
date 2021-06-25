import React,{useEffect,useState} from 'react'
import './style.css'
import {fetchData} from '../../http'
import Modal from '../modal/index'

function Photogrid() {
    const [recent , setRecent] = useState([])
    const [showItems , setShowItems] = useState([])
    const [items , setItems] = useState(0);
    const [scroll, setscroll] = useState(0)
    const [hasmore, sethasmore] = useState(true)
    const [modalData , setModalData] = useState('')
    const [modal , setModal] = useState(false)


    window.onscroll = function(){
        if((window.scrollY > window.innerHeight + scroll) && hasmore ){
            loadMore();
            setscroll(window.scrollY)
        }
    }
    const closeModal = () => {
        setModal(false)
    }
    useEffect(() => {
       fetchData('recent')
       .then(data =>  { const recentResults = data.photos.photo.map( (item , i) => {
           const srcPath = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
           return <div className="photoGrid-item" key={item.id}>
                        <img onClick={() =>  { setModalData(srcPath) 
                                                setModal(true) }} alt={item.title}  src={srcPath} />
                  </div>
       })
        setRecent(recentResults)
        let arr = []
        for (let i = items; i < items + 20; i++) {
            arr.push(recentResults[i])
        }
        setShowItems(arr)
        setItems(20)
             })  
    }, [items])

    const loadMore  = () => {
        if(items === 100){
           return sethasmore(false)
        }else{
            let arr = []
            for (let i = items; i < items + 20; i++) {
                arr.push(recent[i])
            }
            setShowItems(showItems.concat(arr))
            setItems(items + 20)
        }
    }
    return (    <>
                <div className="photoGrid-container">          
                    {showItems}
                </div>
                {modalData && modal ? <Modal picData={modalData} closeModal={closeModal} /> : ''}
                </>
        
    )
}

export default Photogrid
