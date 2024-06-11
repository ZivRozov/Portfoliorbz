import './contact.css';
import {UilFacebookF, UilLinkedin} from "@iconscout/react-unicons";

export const Contact = ()=> {
    return <div className="container pr-48">
              <h3 style={{ marginBottom: "8px" }} className="font-size-14 font-alt no-bold h3-color">
        CONTACT ME
      </h3>
      <div style={{marginBottom:'48px'}}>
        <h2 className="font-main h2-size">WANNA HAVE A QUICK CHAT?
        <span className="muted-color"><br/>I’M BETTER IN PERSON...</span></h2>
      </div>
      <div className="contact-holder flex flex-gap-24">
        <div className="contact-box"><h3 className='font-size-14 font-alt no-bold h3-color'>EMAIL ME</h3>
        <img className='contact-img' src="email_me.png"/>
        <img className='envelope1 z-1' src='envelope.png'/>
        <img className='envelope2 z-1' src='envelope.png'/>
        </div>
        <div className="contact-box"><h3 className='font-size-14 font-alt no-bold h3-color'>CALL ME</h3>
        <img className='contact-img' src="call_me.png"/>
        </div>
        <div className="flex-c flex-gap-24 side-contact">
          <div className="contact-box alt social social-split">
            <h3 className='font-size-14 font-alt no-bold h3-color'>FIND ME ON SOCIAL</h3>
            <div className='flex social-pills-holder'>
              <div className='social-pill'><UilFacebookF size="24" color="#ffffff" /></div>
              <div className='social-pill'><UilLinkedin size="24" color="#ffffff" /></div>
            </div>
          </div>
          <div className="contact-box alt music-split"><h3 className='font-size-14 font-alt no-bold h3-color'>JUDGE MY MUSIC TASTE</h3>
          <img className='contact-img img-alt' src="judge_me.png"/>
          </div>
        </div>
      </div>
    </div>
}