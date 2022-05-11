function ExtraParams(props) {
    return (
        <div>
        <div className="inputs">
            <label>k<sub>01</sub></label>
            <input type="number" name="k01" value={props.vals.k01} onChange={props.onChange}/>
        </div>

        <div className="inputs">
            <label>k<sub>10</sub></label>
            <input type="number" name="k10" value={props.vals.k10} onChange={props.onChange}/>
        </div>
        </div>
    )
}

export default ExtraParams;