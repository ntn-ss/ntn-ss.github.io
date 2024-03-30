const dadosHabilidadesPokemon = {};

// Fetch the CSV file
fetch('./js/db/Planilha_Habilidades.csv')
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data
    const rows = data.split('\n');

    // Parse each row of the CSV
    rows.forEach(row => {
      const [ID, Nome] = row.split(',');
      dadosHabilidadesPokemon[ID] = Nome;
    });
  })
  .catch(error => {
    console.error('Error fetching CSV file:', error);
  });