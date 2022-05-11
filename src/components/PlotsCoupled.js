import CurrPlot from './CurrPlot'
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

function PlotsCoupled(props) {

    return (
        <div className="plots-coupled">
                
                <CurrPlot ts={props.data.ts} I={props.data.I} />
                {/* <Plot className="mt" layout={ {width: 500, height: 250} }/>
                <Plot className="mt" layout={ {width: 500, height: 250} }/> */}
                <Plot
                data={[
                    {
                    x: props.data.ts,
                    y: props.data.V0,
                    marker: {color: 'red'},
                    name: "<b>V"+'0'.sub()+"</b>"
                    },
                    {
                    x: props.data.ts,
                    y: props.data.V1,
                    marker: {color: 'green'},
                    name: "<b>V"+'1'.sub()+"</b>"
                    },
                ]}
                layout={ {width: 500, height: 250, title: '<b>Voltage</b>', margin: {t: 40, b: 40}, yaxis: {title: {text: "<b>Voltage (mV)</b>"}}} }
                />

        </div>
      );
}

export default PlotsCoupled;