import { Reader } from '@maxmind/geoip2-node';
import * as fs from 'fs';

export function asn(ip: string): any{
    const db = fs.readFileSync('data/ASN.mmdb');
    const reader = Reader.openBuffer(db);
    const response = reader.asn(ip);
    return response.autonomousSystemNumber;
}

export function countryISOCode(ip: string): any{
    const db = fs.readFileSync('data/Country.mmdb');
    const reader = Reader.openBuffer(db);
    const response = reader.country(ip);
    return response.country.isoCode;
}

export function asnOrg(ip: string): any{
    const db = fs.readFileSync('data/ASN.mmdb');
    const reader = Reader.openBuffer(db);
    const response = reader.asn(ip);
    return response.autonomousSystemOrganization;
}

export function city(ip: string): any{
    const db = fs.readFileSync('data/City.mmdb');
    const reader = Reader.openBuffer(db);
    const response = reader.city(ip)
    return response.city.names.en;
}

export function country(ip: string): any{
    const db = fs.readFileSync('data/Country.mmdb');
    const reader = Reader.openBuffer(db);
    const response = reader.country(ip);
    return response.country.names.en;
}