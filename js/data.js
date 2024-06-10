"use strict";

function buildHtmlTable(data) {
    let slicedData = data.slice(18);
    let table = `<table>`;
    table += `<th>Користувач</th><th>Очаровуючий маніпулятор</th><th>Творчий мрійник</th><th>Надреагуючий ентузіаст</th><th>Відповідальний роботоголік</th><th>Блискучий скептик</th><th>Грайливий опозиціонер</th></tr>`;

    console.log(slicedData);

    for (let key in slicedData) {
        let name = slicedData[key]['Людина яка проходила'];
        if(name != ""){
            let temp = slicedData[key];

            table += `<tr>
                  <td>${temp['Людина яка проходила']}</td>
                  <td>${temp['Очаровуючий маніпулятор']}</td>
                  <td>${temp['Творчий мрійник']}</td>
                  <td>${temp['Надреагуючий ентузіаст']}</td>
                  <td>${temp['Відповідальний роботоголік']}</td>
                  <td>${temp['Блискучий скептик']}</td>
                  <td>${temp['Грайливий опозиціонер']}</td>
                </tr>`;   
        }
    }
    table += `</table>`;

    document.querySelector(".data-persone").innerHTML = table; 
  }

function conectExelSheets(url) {
    axios
        .get(url)
        .then((response) => {
        let csvData = response.data;
        let jsonData = Papa.parse(csvData, { header: true }).data;
        //console.log(jsonData);
        buildHtmlTable(jsonData);
  })
  .catch((error) => {
    console.error(error);
  });
}
   
const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBS7G30Q-tDn9El7OKHYNn_Im8AGbOmbq9kn42FDMCU8kpuQXQN_U7z3iGw7SHgcIDJ8-bi0sCcGDW/pub?gid=1077253836&single=true&output=csv";

conectExelSheets(url);