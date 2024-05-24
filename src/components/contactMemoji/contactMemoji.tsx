import { useEffect } from 'react';
import './contactMemoji.css';

export const ContactMemoji = ()=> {
    useEffect(()=>{
     
    }, []);
    return <div className='contact-memoji'>
        <div className='contact-me-div'>
            <img className='memoji' src='./contact_memoji.png' />
        </div>
    <div className='rotating-text-holder'>
    <img src='./rotating_text.png'/>
    </div>

    </div>
}