# Columbus Trips
Progetto finale del corso "Basi di Dati" @ LT Ingegneria e Science Informatiche, UniBO, Campus di Cesena


## Sintesi del progetto
> Link alla bozza: [Google Docs](https://docs.google.com/document/d/1j8iErA8hUOX79HmMjhbMxyUXvszD3qsm9O617dG7VbU/edit?usp=sharing) 

L'obiettivo del progetto è realizzare un'applicazione che permette agli utenti di creare, condividere e scoprire itinerari di viaggio personalizzati. Un utente ha la possibilità di creare un nuovo itinerario da zero o selezionarne uno tra quelli resi pubblici dalla community.

Una volta creato, è possibile decidere se tenere l’itinerario privato oppure pubblico. Un itinerario reso pubblico comporta la possibilità da parte di altri utenti di recensirlo.

Ogni itinerario è composto da tappe, che rappresentano luoghi di interesse come musei, parchi, mostre, punti ristoro etc…. Le tappe possono appartenere a una o più categorie tematiche, come ad esempio Storia, Scienze o Arte.

Sia gli itinerari pubblici che le singole tappe possono essere recensiti dagli utenti, consentendo alla community di valutare e commentare le esperienze vissute.

Alcune tappe sono già presenti al primo avvio dell’applicazione, ma gli utenti possono aprire una richiesta per aggiungerne di nuove. Le richieste vengono valutate dagli admin del sito, che possono accettarle o rifiutarle. In caso di approvazione, l'utente viene riconosciuto come "contributor" per l'aggiunta.

Gli utenti possono inoltre creare gruppi per condividere un itinerario con più persone. Per ogni gruppo vi sarà un referente che avrà il compito di amministrare il gruppo. Se un utente che non è referente desidera apportare una modifica all'itinerario condiviso, questa non viene applicata immediatamente, ma viene notificata al referente, che può approvarla o rifiutarla.

Vi saranno infine due tipologie di gruppi: privati, in cui solo il referente del gruppo potrà invitare i partecipanti, oppure pubblico, in cui gli utenti della community potranno liberamente entrare senza richiesta. Un gruppo pubblico ha in automatico tutti i suoi itinerari resi pubblici.

#### Funzionalità offerte dalla piattaforma
- Registrare un nuovo utente
- Creazione di nuovi itinerari personalizzati da parte degli utenti
- Possibilità di recensire e valutare sia gli itinerari che le singole tappe
- Richiesta di aggiunta di nuove tappe alla mappa
- Creazione di gruppi di utenti

#### Informazioni aggregate consultabili
- Ottenere un elenco degli itinerari più popolari, (itinerari meglio e più recensiti)
- Ottenere un elenco delle tappe disponibili a seconda della categoria tematica di appartenenza in una determinata zona (Città / Nazione)
- Storico delle recensioni e valutazioni di un determinato itinerario o tappa
- Elenco dei gruppi pubblici disponibili con possibilità di fare richiesta di accesso
- Ottenere una classifica di utenti “collaboratori” con le migliori tappe aggiunte

#### Cosa potrà fare l’amministratore
- Approvare o rifiutare le richieste di aggiunta di nuove tappe alla mappa
- Moderare le recensioni degli utenti per evitare contenuti inappropriati
- Gestire la visibilità degli itinerari pubblici in base alla qualità dei contenuti

## Tecnologie adottate - [*ancora non definitive*]

Per il lato **front-end**:
- ReactJS
- Bootstrap

Per il lato **back-end**
- C#
