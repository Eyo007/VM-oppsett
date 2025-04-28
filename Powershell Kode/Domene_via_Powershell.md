# Sette opp og konfigurere domenet via PowerShell

Denne veiledningen viser hvordan du setter opp og konfigurerer et nytt Active Directory-domene ved hjelp av PowerShell.

## Tips

- Sørg for at serveren har en **statisk IP-adresse** før du starter installasjonen.
- **Kjør PowerShell som administrator** for å unngå tillatelsesproblemer.


## Steg 1: Sjekk tilgjengelige Windows-funksjoner

1.  Åpne PowerShell ISE som administrator.
2.  Skriv inn følgende kommando og trykk Enter:
    ```powershell
    Get-WindowsFeature
    ```
    Dette viser en liste over alle tilgjengelige, installerte og manglende roller og funksjoner på serveren.

## Steg 2: Installer AD-Domain-Services

1.  Bla gjennom listen som ble vist i forrige steg til du finner funksjonen "AD-Domain-Services".
    
    ```powershell
    Install-WindowsFeature -Name AD-Domain-Services -IncludeAllSubFeature -IncludeManagementTools
    ```
    
4.  Du kan verifisere om domenet er installert ved å kjøre følgende kommando:
    ```powershell
    Get-WindowsFeature AD-Domain-Services
    ```
    Se etter at installasjonsstatusen er merket.

## Steg 3: Opprett en ny skog og installer DNS

For å gjøre dette enklere, anbefales det å bruke PowerShell Integrated Scripting Environment (ISE).

1.  Åpne PowerShell ISE.
2.  Kopier og lim inn følgende skript i ISE-vinduet:
    ```powershell
    $domain_navn = "Eyo.com"
    $netbiosnavn = "EYO"
    $passord = Read-Host "Skriv inn passord for Safe Mode Administrator" -AsSecureString
    Install-ADDSForest -DomainName $domain_navn -DomainNetbiosName $netbiosnavn -SafeModeAdministratorPassword $passord -InstallDns -Force
    ```
    * Erstatt `"Eyo.com"` med ønsket domenenavn.
    * Erstatt `"EYO"` med ønsket NetBIOS-navn for domenet.
    * Når du blir bedt om det, skriv inn et sikkert passord for Safe Mode Administrator-kontoen. Dette passordet er viktig for gjenoppretting av domenekontrolleren.
3.  Kjør skriptet ved å trykke på F5 eller klikke på "Kjør"-knappen i ISE.
4.  Datamaskinen vil starte på nytt etter at installasjonen er fullført. Etter omstart skal domenet være opprettet og DNS-serveren installert.

Etter omstart kan du logge på serveren med den nye domenekontoen du opprettet under installasjonen.
