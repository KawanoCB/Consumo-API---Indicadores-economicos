let dados = new Array();

  fetch('https://www.econdb.com/api/series/IPUS/?format=json')
  .then((response) => response.json())
  //.then((data) => console.log(data));
  
  //----------------------organização de gráfico-----------------------------
  .then(response => {
  for (i=0; i<response.data.dates.length; i++){
    //console.log(response.data.dates[i] +"-"+ response.value[i])
    dados.push([response.data.dates[i], response.data.values[i]]); 
  }
  
  //----------------------gráfico google-------------------------------------
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(drawBasic);

  function drawBasic() {
    if (dados.length > 0) {

      var data = google.visualization.arrayToDataTable([
        ['Dates', 'Values'],
        ...dados

    ]);

    var options = {
        title: 'United States - Industrial production',
        curveType: 'function',
        legend: { position: 'bottom' },

        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Production'
        }
    };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
    } });