import Plot from 'react-plotly.js';

function Plots(props) {

    return (
        <div class="plots">
                <Plot
                data={[
                    {
                    x: props.data.ts,
                    y: props.data.I,
                    },
                ]}
                layout={ {width: 500, height: 250, title: 'Input Current', yaxis: {title: {text: "Current (\u03BCA)"}, range: [0, 50]}, margin: {t: 40, b: 40}} }
                />
            
                <Plot
                data={[
                    {
                    x: props.data.ts,
                    y: props.data.V,
                    marker: {color: 'red'},
                    },
                ]}
                layout={ {width: 500, height: 250, title: 'Voltage', margin: {t: 40, b: 40}, yaxis: {title: {text: "Voltage (mV)"}}} }
                />

                <Plot
                data={[
                    {
                        x: props.data.ts,
                        y: props.data.n,
                        name: 'n',
                    },
                    {
                        x: props.data.ts,
                        y: props.data.m,
                        name: 'm',
                    },
                    {
                        x: props.data.ts,
                        y: props.data.h,
                        name: 'h',
                    }
                ]}
                layout={ {width: 500, height: 250, title: 'Gating Parameters', margin: {t: 40, b: 40}} }
                />
        
                <Plot
                    data={[
                        {
                            x: props.data.ts,
                            y: props.data.GNa,
                            name: 'G'+'Na'.sub()
                        },
                        {
                            x: props.data.ts,
                            y: props.data.GK,
                            name: "G"+"K".sub()
                        },
                    ]}
                    layout={ {width: 500, height: 250, title: 'Conductances', margin: {t: 40, b: 40}} }
                    />
        </div>
      );
}

export default Plots;