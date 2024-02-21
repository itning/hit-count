const express = require('express')
const redis = require("ioredis");
const {badgen} = require('badgen')

const app = express()
const port = 9000

const redisStore = new redis({
    port: 6379, // Redis instance port, redis实例端口
    host: "redis", // Redis instance host, redis实例host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: "", // Redis instance password, redis实例密码
    db: 0
});

const authorWhitelist = ["itning"];

app.get('/', (req, res) => {

    if (!req.query.u || !req.query.r) {
        res.sendStatus(404);
        return;
    }

    if (!authorWhitelist.includes(req.query.u)) {
        res.sendStatus(403);
        return;
    }

    redisStore.incr(`hitCount:${req.query.u}:${req.query.r}`, (e, num) => {
        if (e) {
            console.error(e);
            return;
        }
        // only `status` is required.
        const svgString = badgen({
            label: 'hit count',      // <Text>
            labelColor: '575757', // <Color RGB> or <Color Name> (default: '555')
            status: `${num}`,  // <Text>, required
            color: 'blue',     // <Color RGB> or <Color Name> (default: 'blue')
            style: 'flat',     // 'flat' or 'classic' (default: 'classic')
            //icon: 'data:image/svg+xml;base64,...', // Use icon (default: undefined)
            iconWidth: 13,     // Set this if icon is not square (default: 13)
            scale: 1           // Set badge scale (default: 1)
        })

        res.setHeader('pragma', 'no-cache');
        res.setHeader('expires', 0);
        res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
        res.setHeader('content-type', 'image/svg+xml');
        res.send(svgString);
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})