async function getData() {
  var data = [];
  try {
    const response = await fetch("http://localhost:7205/songs");
    var data = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    console.log(data);
    data = data.map((row) => {
      row.valid = true;
      return row;
    });
    return data;
  }
}

export default getData;
