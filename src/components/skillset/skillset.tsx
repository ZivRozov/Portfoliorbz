import './skillset.css';

export const Skillset = () => {
  const pillSpeed = 25;
  const pillData = [
   {array:[{text:'WEB DESIGN', class:''},{text:'HI-FI MOCKUPS', class:''},{text:'MICROCOPY', class:''},{text:'FIGMA MASTER', class:'sp-alt'}], speed:10, startX:-1200, endX:-88},
   {array:[{text:'WEB DESIGN', class:''},{text:'USER TESTING', class:''},{text:'RESEARCH', class:''},{text:'INTERVIEWS', class:'sp-alt'}], speed:11, startX:-200, endX:-1245},
   {array:[{text:'WEB DESIGN', class:''},{text:'HI-FI MOCKUPS', class:''},{text:'MICROCOPY', class:''},{text:'FIGMA MASTER', class:'sp-alt'}], speed:10, startX:-1000, endX:110},
   {array:[{text:'WEB DESIGN', class:''},{text:'HI-FI MOCKUPS', class:''},{text:'MICROCOPY', class:''},{text:'MIDJOURNEY', class:'sp-alt'}], speed:1, startX:-900, endX:-2000}
  ]

  const dupAmount = 6;

  for (let i=0;i<pillData.length;i++) {
    const arrayToDup = pillData[i].array;
    const length = arrayToDup.length;
    
    for(let n=0;n<dupAmount;n++) {
      for(let r=0;r<length;r++) {
        arrayToDup.push(arrayToDup[r]);
      }
    }
  }

  return (
    <div className="flex-c">
      <h3 style={{ marginBottom: "8px" }} className="font-size-14 font-alt no-bold h3-color">
        SKILLSET
      </h3>
      <div style={{ marginBottom: "48px" }}>
        <h2 className="font-main h2-size">SIX<span className="muted-color">+</span> YEARS OF EXPERIENCE WITH <br/> A JUNOR'S ENTHUSIASM</h2>
      </div>
      <div className='all-pills relative'>
      <div className='fade-to-black'/>
      <div className='fade-to-black opposite'/>
        {
          pillData.map((pills, i)=>{
            const animationSpeed = (Math.abs(pills.endX - pills.startX)/pillSpeed);
            //@ts-ignore
            return <div key={"marqueeHolder"+i} style={{"--start":`${pills.startX}px`,"--end":`${(pills.endX)}px`, animation:`marquee ${1*animationSpeed}s linear infinite`}} className='pills-holder'>
              {pills.array.map((pill, p) => {
                  const hoverClass = pill.class.length>0?'hover-blue':'hover-purp';
                  return <div key={"pill"+p} className={`skill-pill font-alt ${pill.class} ${hoverClass}`}>{pill.text}</div>
              })}
            </div>
          })
        }
          <div className='shadow-realm-pills'>
        {
          pillData.map((pills, m)=>{
            const animationSpeed = (Math.abs(pills.startX - pills.endX)/pillSpeed);
            //@ts-ignore
            return <div key={"shadowHolder"+m} style={{"--start":`${pills.endX}px`,"--end":`${(pills.startX)}px` , animation:`marquee ${1*animationSpeed}s linear infinite`}} className='pills-holder'>
              {pills.array.map((pill, p) => {
                  return <div key={"shadowPill"+p} className={`skill-pill font-alt ${pill.class}`}>{pill.text}</div>
              })}
            </div>
          })
        }
        </div>
      </div>
    </div>
  );
};
