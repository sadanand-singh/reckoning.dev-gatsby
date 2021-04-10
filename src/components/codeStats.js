import React, { Component } from 'react';
import axios from 'axios';
import { LazyPlot } from './plotly'

export default class CodeStats extends Component {
  state = {
    loading: false,
    error: false,
    xps: {
      total_xp: '',
      lang_data: '',
      days_summary: ''
    }
  };

  componentDidMount() {
    this.getCodeStats();
  }

  render() {
    const {
      total_xp,
      lang_data,
      days_summary
    } = this.state.xps;

    var days_data = [{
      type: "pie",
      values: days_summary.xps,
      labels: days_summary.days,
      textinfo: "label+percent",
      textposition: "inside",
      automargin: true
    }]

    var langs_data = [{
      type: "pie",
      values: lang_data[1],
      labels: lang_data[0],
      textinfo: "label+percent",
      textposition: "inside",
      automargin: true
    }]

    var layout = {
      showlegend: false,
      margin: { t: 0, r: 0, b: 0, l: 0 },
      font: { size: 12 },
      responsive: true,
      legend: { "orientation": "h" },
    }

    var currentdate = new Date().toLocaleString();
    var config = { displayModeBar: false, };

    return (
      <div>
        {this.state.loading ? (
          <p>Please hold on, data is loading!</p>
        ) : total_xp ? (
          <>
            <br />
            <h4>Code:Stats</h4>
            <span className="text-xs">Last Updated at: {currentdate}</span>
            <div class="grid grid-cols-1 md:grid-cols-2">
              <LazyPlot {...{ 'data': days_data, 'layout': layout, 'config': config, "id": "days_stats_plot" }} />
              <LazyPlot {...{ 'data': langs_data, 'layout': layout, 'config': config, "id": "langs_stats_plot" }} />
            </div>
          </>
        ) : (
          <p>Oh noes, error fetching data! <span role="img" aria-label="sad">😔</span></p>
        )}
      </div>
    );
  }

  summaryDays = data => {
    const dates = Object.keys(data).sort();
    var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var day_ids = [];
    dates.forEach((a, i) => day_ids.push({ day: day_names[new Date(a).getDay()], xp: data[a] }));

    var result = day_ids.reduce(function (result, item) {
      result[item.day] = (result[item.day] || []).concat(item.xp);
      return result;
    }, {});

    var sum_data = function (d) {
      var vals = [];
      Object.keys(d).forEach(function (k) {
        vals.push({ name: k, y: d[k].reduce((a, b) => a + b) });
      });
      return vals;
    };

    result = sum_data(result);
    var days_xp = [];
    var days = [];
    result.forEach((a, i) => days_xp.push(a.y));
    result.forEach((a, i) => days.push(a.name));
    return { 'days': days, 'xps': days_xp };
  };

  summaryLanguages = lang_data => {
    Object.keys(lang_data).forEach(function (key, index) {
      lang_data[key] = lang_data[key]['xps'];
      return;
    });
    // merge markdown like langs
    lang_data['Markdown'] = lang_data['Markdown'] + lang_data['MDX'];
    delete lang_data['MDX'];
    // merge js like langs
    lang_data['JavaScript'] = lang_data['JavaScript'] + lang_data['TypeScript'] + lang_data['TypeScript (JSX)'] + lang_data['Vue'];
    delete lang_data['TypeScript'];
    delete lang_data['TypeScript (JSX)'];
    delete lang_data['Vue'];
    // merge shell scripts
    lang_data['Shell'] = lang_data['Shell Script'] + lang_data['Terminal (Zsh)'] + lang_data['fish'];
    delete lang_data['Shell Script'];
    delete lang_data['Terminal (Zsh)'];
    delete lang_data['fish'];
    // merge CSS like langs
    lang_data['CSS'] = lang_data['CSS'] + lang_data['SCSS'];
    delete lang_data['SCSS'];

    var sortable = [];
    for (var lang in lang_data) {
      sortable.push([lang, lang_data[lang]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    var tops = sortable.slice(0, 5);
    var rest = sortable.slice(5);
    var res_xps = rest.map(x => x[1]);
    const rest_sum = res_xps.reduce((a, b) => a + b);
    var lang_names = tops.map(x => x[0]);
    var xp_values = tops.map(x => x[1]);
    lang_names.push('Others');
    xp_values.push(rest_sum);
    return [lang_names, xp_values];
  };

  getCodeStats = () => {
    this.setState({ loading: true });
    axios
      .get(`https://codestats.net/api/users/sadanand-singh`)
      .then(xps => {
        const {
          data: { total_xp, languages: langs, dates: dates_data }
        } = xps;
        const lang_data = this.summaryLanguages(langs);
        const days_summary = this.summaryDays(dates_data);
        this.setState({
          loading: false,
          xps: {
            ...this.state.xps,
            total_xp,
            lang_data,
            days_summary
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}
