export const About = () => {
  return (
    <div className="flex">
      <div style={{ padding: "0px 250px" }} className="container flex-c">
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ marginBottom: "8px" }} className="font-size-14 font-alt no-bold h3-color">
            ABOUT ME
          </h3>
          <h2 className="font-main h2-size">
            CREATIVE. ENERGETIC.
            <span className="muted-color">
              <br />& SOMETIMES SUPERFLUOUS.
            </span>
          </h2>
        </div>
        <p style={{ lineHeight: "32px" }} className="font-alt font-size-14 no-bold main-text-color">
          A senior designer with 6+ years of proven industry experience, holding a pixel-perfect mindset, prominent with all of the related design software. With a B.A focused in Instructional Design
          from HIT, 
          <span className="less-muted-color">
            <br />
            and a weak spot for gummy bears.
          </span>
        </p>
      </div>
    </div>
  );
};
