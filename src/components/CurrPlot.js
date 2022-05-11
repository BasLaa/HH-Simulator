import Plot from 'react-plotly.js';

function CurrPlot(props) {
    return (
        <Plot
            data={[
                {
                x: props.ts,
                y: props.I,
                },
            ]}
            layout={ {width: 500, height: 250, title: '<b>Input Current</b>', yaxis: {title: {text: "<b>Current (\u03BCA)</b>"}}, margin: {t: 40, b: 40}} }
        />
    )
}

export default CurrPlot;