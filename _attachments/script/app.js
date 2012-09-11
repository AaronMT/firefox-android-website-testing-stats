$(document).ready(function() {
    google.setOnLoadCallback(function() {
        $(function() {
            $.couch.db('topsites').allDocs({
                success : function(data) {
                  $('#topsite-stats-header').text("Submitted Results: " + data.total_rows);
                }
            });
            $.couch.db('topsites').view("Comments/Comments", {
                success : function(data) {
                    var chartData = new google.visualization.DataTable();
                    chartData.addColumn('string', 'Website URL');
                    chartData.addColumn('string', 'Comments');

                    data.rows.map(function(row) {
                        chartData.addRow(new Array(row.key, row.value));
                    });

                    var chart = new google.visualization.Table(document.getElementById('topsite-stats-charts-table-a'));
                    chart.draw(chartData, {
                        page: 'enable',
                        pageSize: 20
                    });
                }
            });
            $.couch.db('topsites').view("Mixed_Functional/Mixed_Functional", {
                success : function(data) {
                    var chartData = new google.visualization.DataTable();
                    chartData.addColumn('string', 'Website URL');
                    chartData.addColumn('string', 'Does the site work correctly?');

                    data.rows.map(function(row) {
                        chartData.addRow(new Array(row.key, row.value));
                    });

                    var chart = new google.visualization.Table(document.getElementById('topsite-stats-charts-table-b'));
                    chart.draw(chartData, {
                        page: 'enable'
                    });
                }
            });
            $.couch.db('topsites').view("Mixed_Layout/Mixed_Layout", {
                success : function(data) {
                    var chartData = new google.visualization.DataTable();
                    chartData.addColumn('string', 'Website URL');
                    chartData.addColumn('string', 'Does the site layout look correct?');

                    data.rows.map(function(row) {
                        chartData.addRow(new Array(row.key, row.value));
                    });

                    var chart = new google.visualization.Table(document.getElementById('topsite-stats-charts-table-c'));
                    chart.draw(chartData, {
                        page: 'enable'
                    });
                }
            });
            $.couch.db('topsites').view("Functional_Bad/Functional_Bad", {
                success : function(data) {
                    var chartData = new google.visualization.DataTable();
                    chartData.addColumn('string', 'Website URL');
                    chartData.addColumn('number', 'Total Reported Functional Issues');

                    data.rows.map(function(row) {
                        chartData.addRow(new Array(row.key, row.value));
                    });

                    chartData.sort([{column: 1, desc: true}]);

                    var formatter = new google.visualization.ColorFormat();
                    formatter.addRange(4, 100, 'red', 'white');
                    formatter.format(chartData, 1);

                    var chart = new google.visualization.Table(document.getElementById('topsite-stats-charts-table-d'));
                    chart.draw(chartData, {
                        page: 'enable',
                        allowHtml: true
                    });
                },
                reduce: 'true',
                group: 'true',
            });
            $.couch.db('topsites').view("Layout_Bad/Layout_Bad", {
                success : function(data) {
                    var chartData = new google.visualization.DataTable();
                    chartData.addColumn('string', 'Website URL');
                    chartData.addColumn('number', 'Total Reported Layout Issues');

                    data.rows.map(function(row) {
                        chartData.addRow(new Array(row.key, row.value));
                    });

                    chartData.sort([{column: 1, desc: true}]);

                    var formatter = new google.visualization.ColorFormat();
                    formatter.addRange(4, 100, 'red', 'white');
                    formatter.format(chartData, 1);

                    var chart = new google.visualization.Table(document.getElementById('topsite-stats-charts-table-e'));
                    chart.draw(chartData, {
                        page: 'enable',
                        allowHtml: true
                    });
                },
                reduce: 'true',
                group: 'true',
            });
        });
    })
});