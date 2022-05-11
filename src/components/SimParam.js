import ExtraParams from './ExtraParams'

function SimParam(props) {
    return (
        <div>
            <div className="inputs">
                <label>g<sub>K</sub></label>
                <input type="number" name="gK" value={props.vals.gK} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>g<sub>Na</sub></label>
                <input type="number" name="gNa" value={props.vals.gNa} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>g<sub>L</sub></label>
                <input type="number" name="gL" value={props.vals.gL} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>V<sub>K</sub></label>
                <input type="number" name="VK" value={props.vals.VK} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>V<sub>Na</sub></label>
                <input type="number" name="VNa" value={props.vals.VNa} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>V<sub>L</sub></label>
                <input type="number" name="VL" value={props.vals.VL} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>C<sub>m</sub></label>
                <input type="number" name="Cm" value={props.vals.Cm} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>I<sub>in</sub></label>
                <input type="number" name="Iin" value={props.vals.Iin} onChange={props.onChange}/>
            </div>

            <div className="inputs">
                <label>t (ms)</label>
                <input type="number" name="t" value={props.vals.t} onChange={props.onChange}/>
            </div>

            {props.type === "single" ? null : <ExtraParams onChange={props.onChange} vals={props.vals}/>}
        </div>
    )
}

export default SimParam;