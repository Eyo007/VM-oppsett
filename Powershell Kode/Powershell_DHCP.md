# 🖧 Oppsett av DHCP med PowerShell

## 📌 Hva du trenger klart
- Windows Server installert
- PowerShell kjøres som administrator

---

## 1. Installer DHCP-serverrollen

```powershell
Install-WindowsFeature -Name DHCP -IncludeManagementTools -IncludeAllSubFeature
```

Sjekk at DHCP-rollen er installert:

```powershell
Get-WindowsFeature DHCP
```

---

## 2. Lag et nytt DHCP-scope

```powershell
Add-DhcpServerV4Scope -Name "Hovedscope" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0 -State Active
```

---

## 3. Sett standard gateway

```powershell
Set-DhcpServerV4OptionValue -ScopeId 192.168.1.0 -OptionId 3 -Value 192.168.1.1
```

- `OptionId 3`: Default gateway
- `ScopeId`: Nettverks-ID for scopen

---

## 4. Sett DNS-servere

```powershell
Set-DhcpServerV4OptionValue -ScopeId 192.168.1.0 -OptionId 6 -Value 192.168.1.10,192.168.1.11
```

- `OptionId 6`: DNS-servere (primær og sekundær)

---

## 5. Start og aktiver DHCP-tjenesten

```powershell
Set-Service -Name DHCPServer -StartupType Automatic
Restart-Service -Name DHCPServer
```

---

## 6. Verifiser DHCP-konfigurasjonen

```powershell
Get-DhcpServerV4Scope
Get-DhcpServerV4OptionValue -ScopeId 192.168.1.0
```

---

## 7. Reservér IP-adresser (Exclusion Range)

```powershell
Add-DhcpServerV4ExclusionRange -ScopeId 192.168.1.0 -StartRange 192.168.1.1 -EndRange 192.168.1.30
```

Disse IP-adressene blir **ikke** delt ut av DHCP, og kan brukes til statisk IP-konfigurasjon.

---
