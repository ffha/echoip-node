import express from 'express';
import * as query from './query.js';
const app = express();
const port = process.env.PORT || '3000';

app.enable('trust proxy');
app.disable('x-powered-by');

app.get('/', function (req, res) {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send(req.ip);
});

app.get('/country', function (req, res) {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send(query.country(req.ip));
});

app.get('/country-iso', function (req, res) {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send(query.countryISOCode(req.ip));
});

app.get('/city', function (req, res) {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send(query.city(req.ip))
});

app.get('/asn', function (req, res) {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send(query.asn(req.ip))
})

app.get('/json', function (req, res) {
    const ip = req.ip;
    res.json({
        "ip": ip,
        "country": query.country(ip),
        "country_iso": query.countryISOCode(ip),
        "city": query.city(ip),
        "asn": query.asn(ip),
        "asnOrg": query.asnOrg(ip),
        "user_agent": req.headers['user-agent']
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});