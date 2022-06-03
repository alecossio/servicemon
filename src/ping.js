const { spawn } = require('node:child_process');

function pingIp(ipAddress){
    const ping = spawn('ping',['-n', '1', '192.168.100.20']);
    ping.stdout.on('data', (data) => {  
        r = data.toString();
        console.log(r);
        if(r.includes('could not find host'))
            throw new Error('host not found');
        else if(r.includes('host unreachable'))
            throw new Error('host unreachable');
        r = r.split('time')[1];
        r = r.split('ms')[0];
        if(r === '<1')
            r = 0;
        console.log(r);
    });
    
    ping.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        throw new Error("ping failed");
    });
    
    ping.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    pingIp
};