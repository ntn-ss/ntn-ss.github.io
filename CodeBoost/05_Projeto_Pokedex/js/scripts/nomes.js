const dadosNomesPokemon = {};

// Fetch the CSV file
fetch('./js/db/Planilha_Nomes.csv')
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data
    const rows = data.split('\n');

    // Parse each row of the CSV
    rows.forEach(row => {
      const [ID, Nome] = row.split(',');
      dadosNomesPokemon[ID] = Nome;
    });
  })
  .catch(error => {
    console.error('Error fetching CSV file:', error);
  });