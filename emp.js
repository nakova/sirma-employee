let txtArr = [];
let txtFile, lineLoop;
let personArr = [];
let errLogs = [];
// object that represents a line from text file
function EployeesObj(emp1, emp2, date1, date2, project) {
  this.emp1 = emp1;
  this.emp2 = emp2;
  this.startDate = date1;
  this.endDate = date2;
  this.project = project;
  this.compare = function (otherObj) {
    return this.emp1 === otherObj.emp1 && this.emp2 === otherObj.emp2;
  }
  // calculation days logic here
  this.timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
  // days difference
  this.diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24));

  if (this.startDate.getTime() == this.endDate.getTime()) {
    this.diffDays = 1;
  };
  this.printObject = function () {
    // console.log('Emp1: ' + this.emp1);
    //console.log('Emp2: ' + this.emp2);
    //console.log(this.diffDays);
  }
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
    
    for (let i = 0; i < txtArr.length; i++) {
      // create new Object of type EmployeesObj
      let empl1 = txtArr[i][0];
      let empl2 = txtArr[i][1];
      let project = txtArr[i][2];
      let dateFrom = txtArr[i][3];
      let startDate = new Date(dateFrom);
      let dateTo = txtArr[i][4];
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
      let obj = new EployeesObj(empl1, empl2, startDate, endDate, project);
      obj.printObject();
      personArr.push(obj);
    }

    if (errLogs.length !== 0) {
      document.getElementById("wrong-date").innerHTML = " You have a wrong data in rows: " + errLogs + " Please, correct it and upload the file again.";
    }

    personArr.forEach(el => {
      if (el.emp1 > el.emp2) {
        [el.emp1, el.emp2] = [el.emp2, el.emp1];
      }
    });
    
    let result = Object.values(personArr.reduce(function (res, currval) {
      let key = currval.emp1 + '|' + currval.emp2;
      if (!res[key]) {
        res[key] = currval;
      } else {
        res[key].diffDays += currval.diffDays;
      }
      return res;
    }, {}))
    result.sort((a, b) => (a.diffDays < b.diffDays) ? 1 : -1);
    let output = "Employee id: " + result[0].emp1 + " and Employee id: " + result[0].emp2 + " worked together " + result[0].diffDays + " days.";
    document.getElementById("show-calculation").innerHTML = output;
  }
  reader.readAsText(input.files[0]);
};