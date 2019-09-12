let txtArr =[];
let txtFile, lineLoop;
let personArr = [];

 // object that represents a line from text file
 function eployeesObj(emp1, emp2, date1, date2, project) {
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
    this.diffDays =  Math.ceil(this.timeDiff / (1000 * 3600 * 24)); 
    if(this.startDate.getTime() == this.endDate.getTime()){
      this.diffDays = 1;
    };
    this.printObject = function () {
    // console.log('Emp1: ' + this.emp1);
    //console.log('Emp2: ' + this.emp2);
    //console.log(this.diffDays);
    }
}

// read txt file logic
if (window.XMLHttpRequest){
	txtFile = new XMLHttpRequest();
 };
 
let openFile = function(event) {		
    let input = event.target;
	let reader = new FileReader();
    reader.onload = function() {
        let text = reader.result;
        let lines = text.split('\r\n'); // values in lines[0], lines[1]...
		for(let i = 0; i < lines.length; i++){
            lineLoop = lines[i];
            let str = lineLoop.replace(/\s/g,'');
            txtArr.push(str.split(','));
        };
        currVal = 0;
        //console.log(txtArr);
        for(let i = 0; i < txtArr.length; i++){
        // create new Object of type employeesObj
           let empl1 = txtArr[i][currVal];
           let empl2 = txtArr[i][currVal + 1];
           let project = txtArr[i][currVal + 2];
           let dateFrom = txtArr[i][currVal + 3];
           let startDate = new Date(dateFrom);
           let dateTo = txtArr[i][currVal + 4];
           let endDate = new Date(dateTo);
           let today = new Date();
           let oneDay = 1;
            if(dateTo == "null") {
                endDate = today;
            };
            try {
              if(endDate > startDate);
            } catch(err) {
              alert("The start Date should be smaller that end Date. Please insert correct data")
            }
          let obj = new eployeesObj(empl1, empl2, startDate, endDate, project);
          obj.printObject();  
          personArr.push(obj);
        };
    console.log(personArr);
let result = Object.values(personArr.reduce(function(r, e) {
  let key = e.emp1 + '|' + e.emp2;
    if (!r[key]){
      r[key] = e;
    } else {
    r[key].diffDays += e.diffDays;
    }
      return r;
}, {})) 
 console.log(result)
    result.sort((a, b) => (a.diffDays < b.diffDays) ? 1 : -1);
    // alert("Emoloyee id: " + result[0].emp1 + " and Employee id: " + result[0].emp2 + " worked together " + result[0].diffDays + " days.");
     
    let output = "Emoloyee id: " + result[0].emp1 + " and Employee id: " + result[0].emp2 + " worked together " + result[0].diffDays + " days.";
    document.getElementById("show-calculation").innerHTML = output;
    }  
    reader.readAsText(input.files[0]);
};   

