import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import LazyPlot from './plotly'

export default class ClientFetchingExample extends Component {
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

    const days_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Days of Week'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: days_summary
        }
      ]
    };

    const lang_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Programming Languages'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: lang_data
        }
      ]
    };

    return (
          <div>
            {this.state.loading ? (
              <p>Please hold on, data is loading!</p>
            ) : total_xp ? (
              <>
                <br />
                <h2>Usage Pattern</h2>
                <div class='chart-container'>
                  <div class='chart-container__left'>
                    <div id='chart'>
                      <HighchartsReact highcharts={Highcharts} options={lang_options} />
                    </div>
                  </div>
                  <div class='chart-container__right'>
                    <div id='chart'>
                      <HighchartsReact highcharts={Highcharts} options={days_options} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Oh noes, error fetching data! 😔</p>
            )}
          </div>
    );
  }

  summaryDays = data => {
    const dates = Object.keys(data).sort();
    var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var day_ids = [];
    dates.forEach((a, i) => day_ids.push({ day: day_names[new Date(a).getDay()], xp: data[a] }));

    var result = day_ids.reduce(function(result, item) {
      result[item.day] = (result[item.day] || []).concat(item.xp);
      return result;
    }, {});

    var sum_data = function(d) {
      var vals = [];
      Object.keys(d).forEach(function(k) {
        vals.push({ name: k, y: d[k].reduce((a, b) => a + b) });
      });
      return vals;
    };

    result = sum_data(result);
    return result;
  };

  summaryLanguages = lang_data => {
    const data = Object.keys(lang_data).map(function(key, index) {
      lang_data[key] = lang_data[key]['xps'];
    });
    var sortable = [];
    for (var lang in lang_data) {
      sortable.push([lang, lang_data[lang]]);
    }

    sortable.sort(function(a, b) {
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
    var data_new = [];
    lang_names.forEach((a, i) => data_new.push({ name: a, y: xp_values[i] }));
    return data_new;
  };

  getCodeStats = () => {
    this.setState({ loading: true });
    axios
      .get(`https://codestats.net/api/users/sadanand-singh`)
      .then(xps => {
        const {
          data: { total_xp: total_xp, languages: langs, dates: dates_data }
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
