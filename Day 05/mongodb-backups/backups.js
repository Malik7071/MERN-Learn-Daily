const { exec } = require('child_process');

// Function to backup MongoDB database
function backupDatabase(dbName, backupPath) {
  const command = `mongodump --db ${dbName} --out ${backupPath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error backing up database: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Database backup successful: ${stdout}`);
  });
}

// Function to restore MongoDB database
function restoreDatabase(backupPath, dbName) {
  const command = `mongorestore --db ${dbName} ${backupPath}/${dbName}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restoring database: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Database restore successful: ${stdout}`);
  });
}

// Example usage
backupDatabase('myDatabase', './backups');
restoreDatabase('./backups', 'myDatabase');
