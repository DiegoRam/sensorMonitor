
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
                    var realSeries = this.series[0];
                    socket.on("publish", function(data){
                        console.log("from publish event: " + JSON.stringify(data));
                        realSeries.addPoint([data.x, data.y], true, true);
                        if(data.roomStatus){
                            $('#roomStatus').attr('class', 'btn btn-danger btn-lg');
                        } else {
                            $('#roomStatus').attr('class', 'btn btn-success btn-lg');
                        }

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
            name: 'Analog reading from microphone',
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
});