let txtArr = [];
let txtFile, lineLoop;
let personArr = [];
let errLogs = [];

// object that represents a line from text file
function EployeesObj(emp1, date1, date2, project) {
  this.emp1 = emp1;
  this.startDate = date1;
  this.endDate = date2;
  this.project = project;
  this.compare = function (otherObj) {
    return this.emp1 === otherObj.emp1;
  }
  // calculation days logic here
  this.timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
  // days difference
  this.diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24));

  if (this.startDate.getTime() == this.endDate.getTime()) {
    this.diffDays = 1;
  };
  //this.printObject = function () {
  //console.log('Emp1: ' + this.emp1);
  //console.log(this.diffDays);
 // }
}

// read txt file logic
if (window.XMLHttpRequest) {
  txtFile = new XMLHttpRequest();
};

let openFile = function (event) {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let text = reader.result;
    let lines = text.split('\r\n'); // values in lines[0], lines[1]...

    for (let i = 0; i < lines.length; i++) {
      lineLoop = lines[i];
      let str = lineLoop.replace(/\s/g, '');
      txtArr.push(str.split(','));
    };
    console.log(txtArr);
    for (let i = 0; i < txtArr.length; i++) {
      // create new Object of type EmployeesObj
      let empl1 = txtArr[i][0];
      let project = txtArr[i][1];
      let dateFrom = txtArr[i][2];
      let startDate = new Date(dateFrom);
      let dateTo = txtArr[i][3];
      if (dateTo === "null") {
        dateTo = new Date();
      }
      let endDate = new Date(dateTo);
      if (startDate.toString() === "Invalid Date" || endDate.toString() === "Invalid Date") {
        errLogs.push(i);
        continue;
      }
      if (startDate > endDate) {
        errLogs.push(i);
        continue;
      }
      
      let obj = new EployeesObj(empl1 , startDate, endDate, project);
      //obj.printObject();
      personArr.push(obj);
      personArr.sort((a, b) => (a.project > b.project) ? 1 : -1);
    }
    if (errLogs.length !== 0) {
      document.getElementById("wrong-date").innerHTML = " You have a wrong data in row/s: " + errLogs + " Please, correct it and upload the file again.";
    } 

let transformedData = [];
for ( let i = 0; i < personArr.length; i++) {
  let name = Object.values(personArr[i])
  transformedData.push(name);
}
let timeWorkedTogether;
let daysWorkedTogether;
let finalSort1 = [];
for(let i = 0; i < transformedData.length; i++){
 // console.log(transformedData[i]);
  for(let j = 0; j < transformedData[i].length; j++){
    if(transformedData[i][0] != transformedData [j][0] && transformedData[i][3] === transformedData [j][3]){
      if(transformedData[i][1] < transformedData [j][1] && transformedData[i][2] > transformedData [j][2]){
        // calculation days logic here
      timeWorkedTogether = Math.abs(transformedData[j][2].getTime() - transformedData[j][1].getTime());
      // days difference
      daysWorkedTogether = Math.ceil(timeWorkedTogether / (1000 * 3600 * 24));
      if(daysWorkedTogether === 0){
        daysWorkedTogether = 1;
      }
      let finalSort = [];
      finalSort.push(transformedData[i][0], transformedData [j][0], daysWorkedTogether);
      finalSort1.push(finalSort);
      console.log("Employee ID: " +transformedData[i][0] + " and employee ID: " + transformedData [j][0] + " are worked todether " + daysWorkedTogether + " day/s");
      }
      if(transformedData[i][1] < transformedData [j][1] && transformedData[i][2] < transformedData [j][2]){
        console.log(" They are not worked together on same projects");
      }
      if(transformedData[i][1] > transformedData [j][1] && transformedData[i][2] > transformedData [j][2]){
        console.log(" They are not worked together on same projects");
      }
    }
  }
}
  finalSort1.sort(function(a, b) {return b[2] - a[2]});
  let output = "Employee id: " + finalSort1[0][0] + " and Employee id: " + finalSort1[0][1] + " worked together " + finalSort1[0][2] + " days.";
  document.getElementById("show-calculation").innerHTML = output;
  }
  reader.readAsText(input.files[0]);
};
