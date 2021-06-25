import React from 'react'
import './style.css'

function index({ picData,closeModal} ) {
    return (
        <div className="modal-container" onClick={() => closeModal()}>
            <img   src={picData} />
        </div>
    )
}

export default index
