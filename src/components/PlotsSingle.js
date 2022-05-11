import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import CurrPlot from './CurrPlot';

const Plot = createPlotlyComponent(Plotly);

function Plots(props) {

    return (
        <div className="plots">
                
                <CurrPlot ts={props.data.ts} I={props.data.I} />
                <Plot
                data={[
                    {
                    x: props.data.ts,
                    y: props.data.V,
                    marker: {color: 'red'},
                    },
                ]}
                layout={ {width: 500, height: 250, title: '<b>Voltage</b>', margin: {t: 40, b: 40}, yaxis: {title: {text: "<b>Voltage (mV)</b>"}}} }
                />

                <Plot
                data={[
                    {
                        x: props.data.ts,
                        y: props.data.n,
                        name: '<b>n</b>',
                    },
                    {
                        x: props.data.ts,
                        y: props.data.m,
                        name: '<b>m</b>',
                    },
                    {
                        x: props.data.ts,
                        y: props.data.h,
                        name: '<b>h</b>',
                    }
                ]}
                layout={ {width: 500, height: 250, title: '<b>Gating Parameters</b>', margin: {t: 40, b: 40}} }
                />
        
                <Plot
                    data={[
                        {
                            x: props.data.ts,
                            y: props.data.GNa,
                            name: '<b>G'+'Na'.sub()+'</b>'
                        },
                        {
                            x: props.data.ts,
                            y: props.data.GK,
                            name: "<b>G"+"K".sub()+'</b>'
                        },
                    ]}
                    layout={ {width: 500, height: 250, title: '<b>Conductances</b>', margin: {t: 40, b: 40}} }
                    />
        </div>
      );
}

export default Plots;