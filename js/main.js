function unique(array) {
    return array.filter((v, i, self)=> self.indexOf(v)==i)
}
var json;
var array_debit = [["Divisi", "Debit"]]
var array_kredit = [["Divisi", "Kredit"]]
var pengeluaran = {}
var pendapatan = {}
fetch('data.json')
  .then(res => res.json())
  .then(data => json = data)
  .then(() =>{
    const divisi = unique(json.map(data=>data.divisi));
    const divisi_debit = divisi.map(div => {
      pengeluaran[div] = [["Program", "Pengeluaran"]];
      pendapatan[div] = [["Program", "Pendapatan"]];
      iterator_pendapatan = 1;
      iterator_pengeluaran = 1;
      const transactions = json.filter(data=>data.divisi==div);
      var debit = 0;
      var kredit = 0;
      transactions.forEach((v, i)=> {
          if (v.net < 0){
              debit -= v.net
              pengeluaran[div][iterator_pengeluaran] = [v.program, -v.net]
              iterator_pengeluaran++;
          } else {
              kredit += v.net
              pendapatan[div][iterator_pendapatan] = [v.program, v.net]
              iterator_pendapatan++;
          }
      })
      return [div? div : "non-divisi", debit]
    })
    const divisi_kredit = divisi.map(div => {
      const transactions = json.filter(data=>data.divisi==div);
      var debit = 0;
      var kredit = 0;
      transactions.forEach((v, i)=> {
          if (v.net < 0){
              debit -= v.net
          } else {
              kredit += v.net
          }
          
      })
      return [div? div : "non-divisi", kredit]
    })
    divisi_debit.forEach((v, i)=>{
      array_debit[i+1] = v;
    })
    divisi_kredit.forEach((v,i)=>{
      array_kredit[i+1] = v;
    })
  }).then(()=>{
    show(json);
  })
const drawChart = (array,id) => function() {
  var data = google.visualization.arrayToDataTable(array);

  var chart = new google.visualization.PieChart(
    document.getElementById(id));

  var options = { tooltip: { trigger: 'selection' }, width: 375};

  chart.draw(data, options);
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart(array_debit,"piechart-debit"));
google.charts.setOnLoadCallback(drawChart(array_kredit,"piechart-kredit"));

var pengeluaran = {"null":[["Program","Pengeluaran"],["Pajak",25382],["ADM Bank",10000],["ADM Bank",7500],["ATM",6500],["Pajak",34302],["ADM Bank",10000],["ADM Bank",7500],["Konsumsi RA",52000],["ATM",6500],["ATM",13000],["Pajak",27082],["ADM Bank",10000],["ADM Bank",7500],["ATM",6500],["ATM",6500],["Pajak",26077],["ADM Bank",10000],["ADM Bank",7500],["ATM",6500],["Pajak",25147],["ADM Bank",10000],["ADM Bank",7500],["ATM",6500],["Pajak",26412],["ADM Bank",10000],["ADM Bank",7500]],"Bendahara":[["Program","Pengeluaran"],[null,7000],[null,6000],["Minjem Dong",2000000],["Minjem Dong",30675000],[null,19800],[null,250000],["Goceng Doang Tiap Bulan",25000],[null,1000000]],"Sarana dan Prasarana":[["Program","Pengeluaran"],["KAS SARPRAS",78500],["KAS SARPRAS",68000],["AYA-keun",2950000],["AYA-keun",5500000],["BEJA-keun",7000],["BEJA-keun",24000],["AYA-keun",10000],["KAS SARPRAS",17400],["KAS SARPRAS",16000],["KAS SARPRAS",9500],["KAS SARPRAS",87500],["BENAH-keun",157700],["BENAH-keun",63000],[null,25000],[null,20000],["Ayakeun",82200],[null,24000],[null,15000],["Benerkeun",140000],[null,43000],["Benerkeun",18800],[null,20000],[null,160000],[null,82400]],"Ekstrakampus":[["Program","Pengeluaran"],["Muskerwil IHMSI di UIA Bekasi",300000],["Muskerwil IHMSI di UIA Bekasi",220000],["Munas IHMSI di Semarang",1400000]],"Keprofesian":[["Program","Pengeluaran"],["Algoritma",915625],["Algoritma",47375],["Career Talk Series ",4034875]],"Kekeluargaan":[["Program","Pengeluaran"],["SUKA ULTAH",275400],["SUKA ULTAH",19800],["Wisuda Juli",1000000]],"Kesejahteraan Anggota":[["Program","Pengeluaran"],["Beasiswa HIMATIKA",15500]],"Intrakampus":[["Program","Pengeluaran"],["Happy Birthday from HIMATIKA",602000]],"Pengabdian Masyarakat":[["Program","Pengeluaran"],["Forum Kakak Asuh HIMATIKA",39500]],"Pengaderan":[["Program","Pengeluaran"],["FOKUS",3000000]]}
var pendapatan = {"null":[["Program","Pendapatan"],["Bunga",126906],["Bunga",171506],["Bunga",135407],["Bunga",130385],[null,150000],["Bunga",125733],[null,95000],["Bunga",132059]],"Bendahara":[["Program","Pendapatan"],["Goceng Doang Tiap Bulan",200000],["Goceng Doang Tiap Bulan",200000],["Goceng Doang Tiap Bulan",210000],["Goceng Doang Tiap Bulan",160000],["Goceng Doang Tiap Bulan",250000],["Warisan",6409700],["Warisan",151631706],["Dana Abadi",30000000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",250000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",2500],["Goceng Doang Tiap Bulan",20000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",20000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",5000],["Goceng Doang Tiap Bulan",10000],[null,250000],["Goceng Doang Tiap Bulan",15000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",15000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",10000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",15000],["Goceng Doang Tiap Bulan",20000],["Goceng Doang Tiap Bulan",15000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",185000],["Goceng Doang Tiap Bulan",15000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",40000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",50000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",145000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",20000],["Goceng Doang Tiap Bulan",85000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",155000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",50000],["Goceng Doang Tiap Bulan",155000],["Goceng Doang Tiap Bulan",20000],["Goceng Doang Tiap Bulan",185000],["Goceng Doang Tiap Bulan",105000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",25000],["Goceng Doang Tiap Bulan",155000],[null,1000000]],"Sarana dan Prasarana":[["Program","Pendapatan"]],"Ekstrakampus":[["Program","Pendapatan"],["Muskerwil IHMSI di UIA Bekasi",50000]],"Keprofesian":[["Program","Pendapatan"],["Algoritma",874500],["Career Talk Series ",2887625]],"Kekeluargaan":[["Program","Pendapatan"],["Wisuda April",1000000]],"Kesejahteraan Anggota":[["Program","Pendapatan"],["Beasiswa HIMATIKA",650000],["Beasiswa HIMATIKA",2766840]],"Intrakampus":[["Program","Pendapatan"]],"Pengabdian Masyarakat":[["Program","Pendapatan"]],"Pengaderan":[["Program","Pendapatan"]]}
google.charts.setOnLoadCallback(drawChart(group(pendapatan["null"]),"piechart-kredit_non_div"));
google.charts.setOnLoadCallback(drawChart(group(pengeluaran["null"]),"piechart-debit_non_div"));
google.charts.setOnLoadCallback(drawChart(group(pendapatan["Bendahara"]),"piechart-kredit_bendahara"));
google.charts.setOnLoadCallback(drawChart(group(pengeluaran["Bendahara"]),"piechart-debit_bendahara"));
google.charts.setOnLoadCallback(drawChart(group(pendapatan["Keprofesian"]),"piechart-kredit_keprof"));
google.charts.setOnLoadCallback(drawChart(group(pengeluaran["Keprofesian"]),"piechart-debit_keprof"));
google.charts.setOnLoadCallback(drawChart(group(pendapatan["Sarana dan Prasarana"]),"piechart-kredit_sarpras"));
google.charts.setOnLoadCallback(drawChart(group(pengeluaran["Sarana dan Prasarana"]),"piechart-debit_sarpras"));


function show(json){
  json.forEach((v,i)=>{
    var table = document.getElementById(v.divisi)
    if(table) {
      var row = table.insertRow(-1)
      row.insertCell(0).innerHTML = v.tanggal;
      row.insertCell(1).innerHTML = v.program;
      row.insertCell(2).innerHTML = v.pj;
      row.insertCell(3).innerHTML = v.net;
      if (v.net<0){
        row.classList.add("table-danger");
      } else {
        row.classList.add("table-success")
      }
    }
  });
}

function group(array){
  obj = {}
  array.forEach(v=>{
    obj[v[0]] = obj[v[0]]?obj[v[0]]+v[1]:v[1];
  })
  arr = Object.keys(obj).map(function(key) {
    return [key=="null"?"Kurang Keterangan":key, obj[key]];
  });
  return arr;
}
google.charts.load('44', {
    callback: drawBackgroundColor,
    packages: ['corechart']
  });

function drawBackgroundColor(){
    c = [126906,101524,91524,84024,284024,484024,694024,854024,1104024,7513724,159145430,189145430,189066930,189059930,189053930,188753930,188747430,186747430,186918936,186884634,186874634,186867134,186892134,186942134,186722134,156047134,155995134,155927134,155011509,155005009,155010009,154734609,154719109,151769109,146269109,146279109,146529109,146539109,146549109,146559109,146564109,146569109,146571609,146591609,146596609,146621609,146631609,147506109,147499109,147475109,147465109,147447709,147431709,147422209,147334709,147177009,147114009,147124009,147134009,147086634,143051759,143038759,143018959,145906584,146041991,146014909,146004909,145997409,145972409,145952409,145870209,144470209,144463709,144473709,144493709,144498709,144508709,144513709,144523709,144533709,144538709,144548709,144528909,143926909,144926909,144920409,144896409,144881409,144741409,144491409,144741409,144701909,144658909,144789294,144763217,144753217,144745717,144760717,144770717,144785717,144795717,144805717,144830717,144845717,144865717,144880717,144905717,145090717,145105717,145130717,145170717,145195717,145220717,145245717,145270717,145320717,145345717,145370717,145520717,145545717,145570717,145595717,145620717,145645717,145670717,145815717,145840717,145860717,145835717,145829217,145914217,145939217,145964217,145989217,146014217,146039217,146064217,146089217,146114217,146269217,146294217,146344217,146499217,147149217,147274950,147249803,147239803,147232303,147252303,147233503,147418503,147398503,146398503,149165343,149270343,149110343,149135343,149230343,149255343,149410343,149327943,146327943,146321443,145321443,146321443,146453502,146427090,146417090,146409590]
    c = c.map((item, index) => [index, item])
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Transaction')
    data.addColumn('number', 'Saldo');
    data.addRows(c);

    var options = {
        hAxis: {
            title: 'Transaction'
        },
        vAxis: {
        title: 'Saldo'
        },
        backgroundColor: '#ffffff',
        height: 225
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechart'));
    chart.draw(data, options);
}