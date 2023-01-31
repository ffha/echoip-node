import express from 'express';
import { Reader } from '@maxmind/geoip2-node';
import * as fs from 'fs';
const app = express();
const port = process.env.PORT || '3000';

app.enable('trust proxy');
app.disable('x-powered-by');

app.get('/', function (req, res){
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    res.send(req.ip);
});

app.get('/details', function (req, res){
    const cityDb = fs.readFileSync('data/City.mmdb');
    const cityReader = Reader.openBuffer(cityDb);
    const countryDb = fs.readFileSync('data/Country.mmdb');
    const countryReader = Reader.openBuffer(countryDb);
    const asnDb = fs.readFileSync('data/ASN.mmdb');
    const asnReader = Reader.openBuffer(asnDb);
    res.json({
        "ip": req.ip,
        "country": countryReader.country(req.ip).country?.names.en,
        "country-in-chinese": countryReader.country(req.ip).country?.names['zh-CN'],
        "countryISOCode": countryReader.country(req.ip).country?.isoCode,
        "isInEU": countryReader.country(req.ip).country?.isInEuropeanUnion,
        "city": cityReader.city(req.ip).city?.names.en,
        "city-in-chinese": cityReader.city(req.ip).city?.names['zh-CN'],
        "asn": asnReader.asn(req.ip).autonomousSystemNumber?.toString(),
        "asnOrg": asnReader.asn(req.ip).autonomousSystemOrganization,
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});