# Konfigurere en Delt Nettverksmappe med Tilgangskontroll



## 🛠 Steg 1: Opprett og Del Mappen på Serveren

1.  Logg inn på filserveren din (f.eks. FS01).

2.  Opprett en mappe:

    ```
    Eksempel: C:\CompanyShare
    ```

3.  Høyreklikk på mappen → **Egenskaper** → fanen **Deling**.

4.  Klikk på **Avansert deling**.

5.  Kryss av for "**Del denne mappen**".

6.  Navngi den: `CompanyShare`

7.  Klikk på **Rettigheter**.

8.  Fjern **Alle**.

9.  Legg til din sikkerhetsgruppe (f.eks. `Domain Users` eller `SalesGroup`).

10. Gi enten **Les** eller **Full kontroll** etter behov.

11. Klikk **OK** for å dele.

## 🔐 Sett NTFS-Rettigheter:

1.  Gå til fanen **Sikkerhet**.

2.  Klikk på **Rediger**.

3.  Fjern unødvendige brukere.

4.  Legg til din sikkerhetsgruppe (f.eks. `SalesGroup`).

5.  Gi de riktige rettighetene (f.eks. **Les** eller **Endre**).

## 🛠 Steg 2: Opprett en Sikkerhetsgruppe i AD (hvis ikke allerede gjort)

1.  Åpne **Active Directory Users and Computers**.

2.  Opprett en ny sikkerhetsgruppe (f.eks. `SalesGroup`).

3.  Legg til brukere som skal ha tilgang.

## 🛠 Steg 3: Opprett en GPO for å Tilordne Stasjonen for Den Gruppen

1.  Åpne **Group Policy Management Console (GPMC)**.

2.  Høyreklikk på din OU (eller domene) → **Opprett en GPO her og koble den sammen...** (f.eks. `Tilordne Fellesområde`).

3.  Høyreklikk på den nye GPO-en → **Rediger**.

4.  Gå til:

    ```
    Brukerkonfigurasjon
    → Innstillinger
    → Windows-innstillinger
    → Stasjonstilordninger
    ```

5.  Høyreklikk → **Ny** → **Tilordnet stasjon**.

6.  Konfigurer:

    * **Plassering:** `\\FS01\CompanyShare`
    * **Stasjonsbokstav:** Velg (f.eks. `Z:`).
    * **Etikett som:** `Fellesområde`
    * **Handling:** `Opprett` eller `Erstatt`

7.  🧠 Under fanen "**Felles**":
    * Kryss av for "**Kjør i den påloggede brukerens sikkerhetskontekst**".
    * Kryss av for "**Elementmålretting**".
    * Klikk på **Målretting...**.
    * Klikk på **Legg til** → **Sikkerhetsgruppe**.
    * Velg `SalesGroup` eller din tilpassede gruppe.

## ✅ Resultat

* Mappen er kun delt med brukere i din sikkerhetsgruppe.
* GPO-en sikrer at kun brukere i den gruppen får en tilordnet nettverksstasjon til mappen.