const dadosTiposPokemon = {};

// Fetch the CSV file
async function fetchPokeTypes () {
  await fetch('./js/db/Planilha_Tipos.csv')
    .then(response => response.text())
    .then(data => {
      // Parse the CSV data
      const rows = data.split('\n');

      // Parse each row of the CSV
      rows.forEach(row => {
        const [ID, Nome] = row.split(',');
        dadosTiposPokemon[ID] = Nome;
      });
    })
    .catch(error => {
      console.error('Error fetching CSV file:', error);
    });
}

fetchPokeTypes()