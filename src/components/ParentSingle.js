import {useState, useEffect} from 'react';
import {solve} from '../sim';
import SimB from './SimB';
import SimParam from './SimParam'
import Plots from './PlotsSingle'

function ParentSingle() {
    const [params, setParams] = useState(
        {t: 150, gK: 36, gNa: 120, gL: 0.3, VK: -12, VNa: 115, VL: 10.613, Cm: 1.0, Iin: 10}
    );
    
    var V, n, m, h, ts, I, GK, GNa;

    function initSim() {
        [V, n, m, h, ts, I] = solve(params.t, params.gK, params.gNa, params.gL,
            params.VK, params.VNa, params.VL, params.Cm, params.Iin);
        GK = multVector(powVector(n, 4), params.gK);
        GNa = multVector(multVectors(powVector(m, 3), h), params.gNa);
        setData({"V": V, "n": n, "m": m, "h": h, "ts": ts, "I": I, "GNa": GNa, "GK": GK})
    }
    const [data, setData] = useState({"V": [], "n": [], "m": [], "h": [], "ts": [], "I": [], "GNa": [], "GK": []});
    useEffect(() => {
        initSim()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )
    function multVector(a,b) {
        if (typeof a !== 'undefined') {
            return a.map((e) => e * b);
        } else {return null}
    }

    function multVectors(a,b) {
        if (typeof a !== 'undefined') {
            return a.map((e, i) => e * b[i]);
        } else {return null}
    }

    function powVector(a, pow) {
        if (typeof a !== 'undefined') {
            return a.map((num) => num ** pow);
        } else {return null}
    }

    const reSimulate = () => {
        [V, n, m, h, ts, I] = solve(params.t, params.gK, params.gNa, params.gL,
            params.VK, params.VNa, params.VL, params.Cm, params.Iin);
        GK = multVector(powVector(n, 4), params.gK);
        GNa = multVector(multVectors(powVector(m, 3), h), params.gNa);
        setData({"V": V, "n": n, "m": m, "h": h, "ts": ts, "I": I, "GK": GK, "GNa": GNa})
    }

    const handleChange = (event) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <div className="params">
                <SimParam onChange={handleChange} vals={params} type="single"/>
                <SimB onClick={reSimulate} />
            </div>
            <Plots data={data} params={params} />
        </div>
     );
}

export default ParentSingle;