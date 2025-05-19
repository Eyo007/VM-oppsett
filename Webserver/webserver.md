# 🌐 Hvordan Opprette en IIS Nettside på Windows Server 2022

Denne veiledningen viser hvordan du setter opp en enkel nettside ved hjelp av Internet Information Services (IIS) på Windows Server 2022.

## ✅ Steg 1: Installer IIS (Internet Information Services)

1.  Åpne **Serverbehandling**.
2.  Klikk på **Administrer** > **Legg til roller og funksjoner**.
3.  Klikk **Neste** gjennom de første sidene til du kommer til **Serverroller**.
4.  Kryss av boksen for **Webserver (IIS)**.
5.  Klikk **Neste** og aksepter standardinnstillingene. På siden **Funksjoner**, la det være som det er.
6.  Klikk på **Installer**.
7.  Vent til installasjonen er fullført og klikk på **Lukk**.

## 🌍 Steg 2: Verifiser at IIS Kjører

1.  Åpne en nettleser på serveren.
2.  Skriv inn:

    ```
    http://localhost
    ```

    Du skal nå se standard velkomstsiden til IIS – dette bekrefter at IIS kjører.

## 📁 Steg 3: Opprett en Nettside

1.  Åpne **Filutforsker** og gå til standard IIS web-rot:

    ```
    C:\inetpub\wwwroot
    ```

2.  Slett `iisstart.htm` hvis du vil erstatte standard siden.
3.  Høyreklikk inne i mappen og velg **Ny** > **Tekstdokument**.
4.  Gi den navnet `index.html`.
5.  Høyreklikk på `index.html` > **Åpne med** > **Notisblokk**.
6.  Legg til denne enkle HTML-koden:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Min Første IIS Side</title>
    </head>
    <body>
        <h1>Hei fra IIS på Server 2022!</h1>
        <p>Dette er en tilpasset nettside servert med IIS.</p>
    </body>
    </html>
    ```

7.  Lagre filen.

## 🌐 Steg 4: Vis Nettsiden

1.  Åpne en nettleser på serveren eller en annen PC på samme nettverk.
2.  Gå til serverens IP-adresse:

    ```
    http://<din-server-ip>
    ```

    Eksempel:

    ```
    [http://192.168.1.10](http://192.168.1.10)
    ```

    Du skal nå se din tilpassede HTML-side!

## 🔐 Steg 5: Tillat Tilgang Gjennom Brannmuren (om nødvendig)

Hvis andre datamaskiner ikke får tilgang til serveren:

1.  Åpne **Windows Defender Brannmur**.
2.  Klikk på **Tillat en app eller funksjon gjennom Windows Defender Brannmur**.
3.  Sørg for at **World Wide Web Services (HTTP)** er tillatt (avkrysset) for **Privat** og **Offentlig** nettverk.

## 🧪 Valgfritt: Opprett Flere Nettsteder

Du kan hoste flere nettsteder på samme server:

1.  I **Serverbehandling**, åpne **IIS-behandling** (`inetmgr`).
2.  Høyreklikk på **Nettsteder** > **Legg til nettsted**.
3.  Sett:
    * **Nettstedsnavn:** `MittNettsted`
    * **Fysisk sti:** `C:\MittNettsted`
    * **Port:** f.eks. `8080` hvis port 80 er i bruk
4.  Opprett mappen `C:\MittNettsted` og legg til en `index.html`-fil der.
5.  Start det nye nettstedet og naviger til:

    ```
    din-server-ip
    ```