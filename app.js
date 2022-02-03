const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const { exit } = require('process');
const { Console } = require('console');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


var timestampOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

var mydb = new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        console.log("[WARN] sqlite3 db not found, creating...");
        createDatabase();
        return;
        } else if (err) {
            console.log("[ERROR] " + err);
            process.exit();
    }
    console.log("[INFO] sqlite3 active");
});

function createDatabase() {
    var newdb = new sqlite3.Database('mcu.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(db) {
    db.exec(`
        CREATE TABLE dx_servers(
            server_id INT PRIMARY KEY NOT NULL,
            server_name TEXT NOT NULL,
            reachable BOOLEAN NOT NULL,
            latency INT NOT NULL,
            cards_min INT NOT NULL
        );
        INSERT INTO dx_servers(server_id, server_name, reachable, latency, cards_min)
        VALUES(1, 'PS01', TRUE, 94, 23);
    `, ()=> { console.log("[INFO] Created tables")})   
};

/*
* An array where each element is a server object with each row being a property
*/
function runQuery(req, res, db) {
    let retArray = [];
    db.all(`SELECT server_id, server_name, reachable, latency, cards_min FROM dx_servers WHERE server_id = ?;`,1, 
    (err, rows)=>{
        rows.forEach(row =>{
            let iServer = {
                iId: row.server_id,
                iName: row.server_name,
                iReachable: row.reachable,
                iLatency: row.latency,
                iCardsMin: row.cards_min
            };
            retArray.push(iServer);
        });
        res.render('monitor', {
            serverId: retArray[0].iId,
            serverName: retArray[0].iName,
            serverReach: "a",
            serverLat: "a",
            serverCards: "a"
        });
    }); 
}

app.get('/monitor', (req, res)=>{
    runQuery(req, res, mydb);
})

app.get('/stats', (req, res)=>{
    res.render('stats', {
    });
})


app.get('/settings', (req, res)=>{
    res.render('settings',{
    });
})
app.listen(3000, ()=>{
    console.log('Server now listening on port 3000.');
})

