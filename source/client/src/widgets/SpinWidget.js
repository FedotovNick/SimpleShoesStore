import React from 'react'

export default function SpinWidget(props) {
    return (
        <div className='mspin-widget-container'>
            <div className='mspin-widget'>
                <div className='mspin-widget-back-text'>
                    <button className='btn btn-danger' onClick={props.handler}>перейти</button>
                </div>
                
                <div className='mspin-widget-front-img'>
                    <img src={props.src} />
                </div>
                <div className='mspin-widget-front-text'>{props.frontText}</div>
            </div>
        </div>

    )
}