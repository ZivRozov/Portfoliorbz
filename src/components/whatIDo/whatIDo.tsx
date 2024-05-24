import './whatIDo.css';

export const WhatIDo = () => {
  return (
    <div className="flex-c">
      <h3 style={{ marginBottom: "8px" }} className="font-size-14 font-alt no-bold h3-color">
        WHAT I DO
      </h3>
      <div style={{marginBottom:'48px'}}>
        <h2 className="font-main h2-size">I HELP GROWTH-STAGE COMPANIES INCREASE REVENUE BY UTILIZING BUSINESS-CENTRIC DESIGNS.CREATIVE. ENERGETIC.</h2>
      </div>

      <div style={{width:'80%'}} className='work-button-container'>
      <div className="work-button">
        <div className='work-button-inner'></div>
      </div>

      <div className='left'>
      <h4 className='font-alt'>Snappy</h4>
      <p className='font-main'>How I took a leading role in reshaping the main core of our product.</p>
      </div>
      </div>

      <div style={{width:'80%', gap:'12px'}} className='flex'>

      <div style={{width:'60%'}} className='work-button-container'>
      <div className="work-button">
        <div className='work-button-inner'></div>
      </div>

      <div className='left'>
      <h4 className='font-alt'>Snappy</h4>
      <p className='font-main'>How I helped raising signup conversion rate by ~32%</p>
      </div>
      </div>

      <div style={{width:'40%'}} className='work-button-container'>
      <div className="work-button">
        <div className='work-button-inner'></div>
      </div>
      <div className='left'>
      <h4 className='font-alt'>Watchful</h4>
      <p className='font-main'>How I built a product and a brand</p>
      </div>
      </div>

</div>

<div style={{width:'80%', gap:'12px'}} className='flex'>

<div style={{width:'40%'}} className='work-button-container'>
<div className="work-button">
  <div className='work-button-inner'></div>
</div>

<div className='left'>
<h4 className='font-alt'>Comigo</h4>
<p className='font-main'>How I made our internal teams work faster</p>
</div>
</div>

<div style={{width:'60%'}} className='work-button-container'>
<div className="work-button">
  <div className='work-button-inner'></div>
</div>
<div className='left'>
<h4 className='font-alt'>Maccabi Buddy</h4>
<p className='font-main'>How we helped Maccabi Health-Care improve line traffic</p>
</div>
</div>

</div>

    </div>
  );
};
