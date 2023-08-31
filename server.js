'use strict';
import { exec } from 'child_process';

const startMainJs = () => {
  const child = exec('node dist/main.js');

  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

startMainJs();
