const points = 20
const x_axis = Array.from(Array(points), (e, i) => i + 1)
const power_two = Array.from(Array(points), (e, i) => Math.pow(2, i + 1))
const n_square = Array.from(Array(points), (e, i) => Math.pow(i + 1, 2))
var fibonacci_series = function (n) {
    if (n === 1) {
        return [0, 1];
    }
    else {
        var s = fibonacci_series(n - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s;
    }
};
const fib_series = fibonacci_series(points).slice(1)

var trace1 = {
    x: x_axis,
    y: fib_series,
    mode: 'lines+markers',
    name: 'Fibonacci(n)',
    line: { shape: 'linear' },
    type: 'scatter'
};

var trace2 = {
    x: x_axis,
    y: power_two,
    mode: 'lines+markers',
    name: 'Pow(2, n)',
    line: { shape: 'linear' },
    type: 'scatter'
};

var trace3 = {
    x: x_axis,
    y: n_square,
    mode: 'lines+markers',
    name: 'Pow(n, 2)',
    line: { shape: 'linear' },
    type: 'scatter'
};

var data = [trace1, trace2, trace3];

var layout = {
    margin: { t: 0, r: 40, b: 0, l: 40 },
    title: {
        text: 'Fibonacci Numbers',
        font: {
            size: 21
        },
        xref: 'paper',
        x: 0.5,
        y: 0.95,
    },
    modebar: {
        orientation: "v",
    },
    legend: {
        x: 0.2,
        font: { size: 16 },
        yref: 'paper',
        orientation: "h",
    },
    xaxis: {
        range: [0.9, 20.2],
        nticks: 20,
    },
    yaxis: {
        type: 'log',
        autorange: true,
        nticks: 16,
    }
};

const props = {
    data: data,
    layout: layout
}

export default props