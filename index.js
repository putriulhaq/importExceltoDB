$("#button-upload").on("click", function () {
  let fileInput = document.getElementById("excelFile");
  let file = fileInput.files[0];

  let reader = new FileReader();

  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);

    var workbook = XLSX.read(data, { type: "array" });

    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log(worksheet)
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 2 });

    fetch("http://localhost:5000/api/employe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", 
      credentials: "same-origin",
      body: JSON.stringify(jsonData),
    }) .then((res) => {
      if(res.ok) {
        return
      }
    }) .then((data) => {
      console.log(data)
    })
  };

  reader.readAsArrayBuffer(file);
});
