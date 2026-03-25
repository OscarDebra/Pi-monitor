# Etisk refleksjon – Pi Monitor

## Innledning
Pi Monitor er et system som samler inn og viser sanntidsdata om en Raspberry Pi. Systemet kun opererer på et lokalt nettverk, her skal jeg reflektere over de etiske og juridiske aspektene ved utvikling og drift av et slikt system.

## Personvern og GDPR
Selv om Pi Monitor ikke samler inn personopplysninger direkte, logger Nginx 
HTTP-forespørsler som inneholder IP-adresser. IP-adresser regnes som 
personopplysninger under GDPR. 

Tiltak som er gjort:
- Tilgang til dashbordet krever autentisering
- All trafikk er kryptert med HTTPS
- Systemet opererer kun på lokalt nettverk

## Universell utforming
I henhold til norsk lov skal digitale løsninger følge prinsippene for universell 
utforming. I Pi Monitor er følgende hensyn tatt:
- Tilstrekkelig fargekontrast mellom tekst og bakgrunn
- Semantisk HTML-struktur
- Responsivt design som fungerer på ulike skjermstørrelser

Forbedringer som kan gjøres:
- Støtte for skjermlesere (ARIA-attributter)
- Alternativ tekstrepresentasjon av grafiske elementer

## Sikkerhet
Følgende sikkerhetstiltak er implementert:
- HTTPS med SSL-sertifikat
- HTTP basic autentisering
- Docker-isolasjon mellom tjenester
- Nettverksisolasjon — systemet er kun tilgjengelig på lokalt nettverk

Et selvsignert sertifikat er brukt i stedet for et sertifikat fra en 
tiltrodd sertifikatmyndighet. I en produksjonssetting burde Let's Encrypt 
brukes for å gi brukere full tillit til tilkoblingen.