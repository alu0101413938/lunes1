import net from 'net';
import { argv } from 'process';
if (argv.length < 3) {
    console.log('Please, provide a command.');
}
else {
    const client = net.connect({ port: 60300 });
    const jsonCommand = JSON.stringify({ 'type': 'command', 'command': argv[2], 'argvs': argv[3], 'file': argv[4] });
    client.write(jsonCommand);
    client.on('data', (dataJson) => {
        const message = JSON.parse(dataJson.toString());
        console.log(message);
        client.end();
    });
    client.on('end', () => {
        console.log('Disconnected from server.');
    });
}
