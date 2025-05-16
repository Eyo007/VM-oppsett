# Windows 10 Nettverksdistribusjon med WDS og MDT

Denne guiden viser deg hvordan du setter opp **Windows Deployment Services (WDS)** og **Microsoft Deployment Toolkit (MDT)** for å installere **Windows 10** over nettverket.

## 📋 Innholdsfortegnelse


- [Steg 1: Installer nødvendige roller og funksjoner](#steg-1-installer-nødvendige-roller-og-funksjoner)
- [Steg 2: Konfigurer WDS](#steg-2-konfigurer-wds)
- [Steg 3: Opprett et Deployment Share i MDT](#steg-3-opprett-et-deployment-share-i-mdt)
- [Steg 4: Importer operativsystem](#steg-4-importer-operativsystem)
- [Steg 5: Opprett en Task Sequence](#steg-5-opprett-en-task-sequence)
- [Steg 6: Oppdater Deployment Share](#steg-6-oppdater-deployment-share)
- [Steg 7: Legg til Boot Image i WDS](#steg-7-legg-til-boot-image-i-wds)
- [Steg 8: PXE-boot en klientmaskin](#steg-8-pxe-boot-en-klientmaskin)
- [Valgfrie tilpasninger](#valgfrie-tilpasninger)


---

## ✅ Hva du trenger

- Windows Server 2019 eller 2022
- ISO-fil for Windows 10
- Domenemiljø 
- Nettverk som støtter PXE-boot
- Administratorrettigheter

---

## 🛠 Steg 1: Installer nødvendige roller og funksjoner

### Installer WDS
1. Åpne **Server Manager** > Administrer > **Legg til roller og funksjoner**
2. Velg **Windows Deployment Services**
   - Inkluder **Deployment Server** og **Transport Server**
3. Fullfør installasjonen

### Installer MDT og ADK
1. Last ned og installer [Microsoft Deployment Toolkit (MDT)](https://www.microsoft.com/en-us/download/details.aspx?id=54259)
2. Last ned og installer:
   - [Windows ADK](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install)
   - WinPE-tillegg for ADK

---

## 🌐 Steg 2: Konfigurer WDS

1. Åpne **Windows Deployment Services**
2. Høyreklikk på servernavnet > **Konfigurer server**
3. Velg **Integrert med Active Directory** (hvis i domene)
4. Velg mappe for RemoteInstall (f.eks. `C:\RemoteInstall`)
5. Aktiver oppstart for alle klienter via PXE

---

## 🗂 Steg 3: Opprett et Deployment Share i MDT

1. Åpne **Deployment Workbench**
2. Høyreklikk **Deployment Shares** > **New Deployment Share**
   - Eksempelsti: `D:\DeploymentShare`
   - Navn: `DeploymentShare$`
3. Godta standardvalg

---

## 💽 Steg 4: Importer operativsystem

1. Høyreklikk **Operating Systems** > **Import Operating System**
2. Velg "Full set of source files"
3. Bla til montert eller pakket ut Windows 10 ISO
4. Fullfør veiviseren

---

## 👤 Steg 5: Opprett en Task Sequence

1. Høyreklikk **Task Sequences** > **New Task Sequence**
2. Fyll inn:
   - ID: `W10`
   - Navn: `Windows 10 Distribusjon`
   - Mal: **Standard Client Task Sequence**
3. Velg importert Windows 10-versjon
4. Angi produktnøkkel eller la stå tom
5. Angi administratorpassord

---

## 🔧 Steg 6: Oppdater Deployment Share

1. Høyreklikk på deployment share > **Update Deployment Share**
2. Velg å regenerere oppstartsbilder
3. Dette oppretter `.wim`-filer i:
   - `D:\DeploymentShare\Boot\LiteTouchPE_x64.wim`

---

## 🖥 Steg 7: Legg til Boot Image i WDS

1. Åpne **WDS-konsollen**
2. Høyreklikk **Boot Images** > **Add Boot Image**
3. Bla til:
   - `D:\DeploymentShare\Boot\LiteTouchPE_x64.wim`
4. Navngi bildet, f.eks. `MDT LiteTouch x64`

---

## ⚙️ Steg 8: PXE-boot en klientmaskin

1. Start en klient-PC fra nettverk (PXE)
2. WDS sender ut MDT-boot image
3. MDT Deployment Wizard starter
4. Velg Task Sequence og installer Windows 10

---

## 🧪 Valgfrie tilpasninger

- Tilpass `CustomSettings.ini` og `Bootstrap.ini`
- Legg til drivere, apper og skript i MDT

---
## 📄Her er rules og Bootstrap.ini som du kan legge til 

- Rules
[Settings]
Priority=Default
Properties=MyCustomProperty
 
[Default]
SkipComputerName=YES
SkipDomainMembership=YES
OSDComputername=PC-#Right("%SerialNumber%",5)#
MachineObjectOU=OU=newWindows10_Users,DC=hmehq,DC=dm
 
;Set local admin details
SkipAdminPassword=YES
AdminPassword=Skole1234
 
;Specify the domain to join and credentials
JoinDomain=hmehq.dm
DomainAdmin=Administrator
DomainAdminDomain=hmehq.dm
DomainAdminPassword=IMKuben1337!
 
;Set the task sequence
SkipTaskSequence=YES
TaskSequenceID=003
 
;Set the name at the top dynamically
_SMSTSORGNAME=%TaskSequenceName% on %OSDComputername%
 
;Set the location and time zone
KeyboardLocale=0414:00000414
UserLocale=nb-NO
UILanguage=nb-NO
TimeZoneName=W. Europe Standard Time
 
;Skip screens that arent required
SkipComputerBackup=YES
OSInstall=YES
SkipAppsOnUpgrade=NO
SkipProductKey=YES
SkipUserData=YES
SkipLocaleSelection=YES
SkipTimeZone=YES
SkipApplications=YES
SkipSummary=YES
SkipCapture=YES
SkipFinalSummary=YES
HideShell=YES
 
;Apply best practice security policies onto the machine
ApplyGPOPack=YES
 
;Enable Bitlocker Config
SkipBitLocker=YES
BDEInstallSuppress=NO
BDEWaitForEncryption=FALSE
BDEInstall=TPM
BDERecoveryKey=AD
 
;Set the final action
FinishAction=REBOOT

- Bootstrap.ini
[Settings]
Priority=Default
 
[Default]
DeployRoot=\\SERVER22\DeploymentShare_W11
UserDomain=hmehq.dm
UserID=Administrator
UserPassword=IMKuben1337!
SkipBDDWelcome=YES

---



