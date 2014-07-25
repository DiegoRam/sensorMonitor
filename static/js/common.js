
$(document).ready(function() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var socket = io();
    var chart;
    var chartvu;

    $('#containersound').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function() {
                    var series = this.series[0];
                    socket.on("info", function(data){
                        console.log(data);
                        series.addPoint([data.x,data.y], true, true);
                    });
                }
            }
        },
        title: {
            text: 'real time noise levels'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'decibels'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'decibels @ raspberryPi',
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            })()
        }]
    });
    $('#containervu').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'movement<br>averages',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'movement average',
            innerSize: '50%',
            data: [
                ['occupied',   45.0],
                ['idle',       26.8],
                ['empty', 28.8],
                {
                    name: 'Others',
                    y: 0.7,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });

});