import { spawnSync } from 'child_process';
import net from 'net';

net.createServer((connection) => {
  console.log('A client has connected.');

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
  
  connection.on('data', (dataJson) => {
    const message = JSON.parse(dataJson.toString());
    let command;
    
    if (message.argvs) {
      command = spawnSync(message.command, [message.argvs], {encoding: 'utf-8'});
    } else {
      command = spawnSync(message.command, {encoding: 'utf-8'})
    }
    
    const commandResult = JSON.stringify(command.stdout)

    if (commandResult == 'null') {
      connection.write(JSON.stringify('Command not found'))
    } else {
      connection.write(commandResult)
    }
    console.log('Command has been send to client.');
  })

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
