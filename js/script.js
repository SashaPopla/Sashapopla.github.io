"use strict";

document.addEventListener("DOMContentLoaded", () => {

  function conectExelSheets(url){
    axios
    .get(url)
    .then((response) => {
      let csvData = response.data;
      let jsonData = Papa.parse(csvData, { header: true }).data;

      for (let key in jsonData) {
        let name = jsonData[key]["Людина яка проходила"];

        if (name == "") {
          let temp = jsonData[--key];

          let data = [
            { name: "Очаровуючий маніпулятор", value: +temp['Очаровуючий маніпулятор'] },
            { name: "Творчий мрійник", value: +temp['Творчий мрійник'] },
            { name: "Надреагуючий ентузіаст", value: +temp['Надреагуючий ентузіаст'] },
            { name: "Відповідальний роботоголік", value: +temp['Відповідальний роботоголік'] },
            { name: "Блискучий скептик", value: +temp['Блискучий скептик'] },
            { name: "Грайливий опозиціонер", value: +temp['Грайливий опозиціонер'] },
          ];

          function createDiagram(){
            let colors = [
              "#1f77b4",
              "#ff7f0e",
              "#2ca02c",
              "#d62728",
              "#9467bd",
              "#8c564b",
            ];
          
            // Визначення ширини, висоти та відступів
            let width = 800;
            let height = 500;
            let margin = { top: 60, right: 30, bottom: 2000, left: 80 };
          
            // Створення SVG елементу
            let svg = d3
              .select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
            // Створення шкали X
            let x = d3
              .scaleBand()
              .range([0, width])
              .domain(
                data.map(function (d) {
                  return d.name;
                })
              )
              .padding(0.2);
          
            svg
              .append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end")
              .style("font-size", "18px");
          
            // Створення шкали Y
            let y = d3.scaleLinear().domain([0, 10]).range([height, 0]);
          
            svg.append("g").call(d3.axisLeft(y));
          
            // Створення барів для гістограми
            svg
              .selectAll("mybar")
              .data(data)
              .enter()
              .append("rect")
              .attr("x", function (d) {
                return x(d.name);
              })
              .attr("y", function (d) {
                return y(d.value);
              })
              .attr("width", x.bandwidth())
              .attr("height", function (d) {
                return height - y(d.value);
              })
              .attr("fill", function (d, i) {
                return colors[i % colors.length];
              });
          }

          createDiagram();
          break;
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBS7G30Q-tDn9El7OKHYNn_Im8AGbOmbq9kn42FDMCU8kpuQXQN_U7z3iGw7SHgcIDJ8-bi0sCcGDW/pub?gid=1077253836&single=true&output=csv";

  conectExelSheets(url);
});