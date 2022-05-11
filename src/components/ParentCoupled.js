import {useState, useEffect} from 'react';
import {solve} from '../coupledSim';
import SimB from './SimB';
import SimParam from './SimParam'
import PlotsCoupled from './PlotsCoupled'

function ParentCoupled(props) {
    const [params, setParams] = useState(
        {k01: 0.1, k10: 0.1, t: 150, gK: 36, gNa: 120, gL: 0.3, VK: -12, VNa: 115, VL: 10.613, Cm: 1.0, Iin: 10}
    );
    
    var V0, V1, I, ts;

    function initSim() {
        [V0, V1, ts, I] = solve(params.t, params.k01, params.k01, params.gK, params.gNa, params.gL,
            params.VK, params.VNa, params.VL, params.Cm, params.Iin);
        setData({"V0": V0, "V1": V1, "ts": ts, "I": I})
    }

    const [data, setData] = useState({"V0": [], "V1": [], "ts": [], "I": []});
    useEffect(() => {
        initSim()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    const reSimulate = () => {
        [V0, V1, ts, I] = solve(params.t, params.k01, params.k01, params.gK, params.gNa, params.gL,
            params.VK, params.VNa, params.VL, params.Cm, params.Iin);
        setData({"V0": V0, "V1": V1, "ts": ts, "I": I})
    }

    // useEffect(()=>{
    //     reSimulate()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[props.type])

    const handleChange = (event) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <div className="params">
                <SimParam onChange={handleChange} vals={params} type="coupled"/>
                <SimB onClick={reSimulate} />
            </div>
            <PlotsCoupled data={data} params={params} />
        </div>
     );
}

export default ParentCoupled;