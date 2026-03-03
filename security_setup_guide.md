# External Security Setup Guide

To achieve a full 100/100 security score and protect your organization's reputation, you must configure the following records with your Domain/DNS Provider (e.g., Namecheap, GoDaddy, Cloudflare).

## 1. DNS Security (DNSSEC)
**Action**: Enable DNSSEC in your domain registrar's dashboard.
**Why**: This cryptographically signs your DNS records, preventing hackers from redirecting your users to a malicious clone of your site (DNS Spoofing).

## 2. Email Security (DMARC, DKIM, SPF)
These records prevent unauthorized people from sending emails using your `@booksandtrunks.org` domain (Phishing protection).

### A. SPF (Sender Policy Framework)
Add a **TXT** record:
- **Host/Name**: `@`
- **Value**: `v=spf1 include:_spf.google.com ~all` (Update this if you use another email provider like Outlook or Zoho).

### B. DKIM (DomainKeys Identified Mail)
**Action**: Log in to your Email Provider (Google Workspace / Microsoft 365) to generate a DKIM key.
**Value**: It will look like a long string of characters. Add it as a **TXT** record with the host `google._domainkey`.

### C. DMARC (Domain-based Message Authentication)
Add a **TXT** record to tell email servers what to do if SPF or DKIM fails:
- **Host/Name**: `_dmarc`
- **Value**: `v=DMARC1; p=quarantine; adkim=r; aspf=r`
- **Note**: This will put unauthorized emails into the recipient's spam folder.

## 3. Web Application Firewall (WAF)
**Action**: If you are using Vercel Pro, enable the **Vercel Firewall**.
**Alternative**: Route your traffic through **Cloudflare** (Free tier) to get a world-class WAF that blocks SQL injection and DDOS attacks automatically.

---

## Technical Headers Implemented
The following headers have been coded into your application via `vercel.json`:
- **Content-Security-Policy**: Prevents XSS by only allowing trusted sources.
- **X-Frame-Options**: Prevents Clickjacking.
- **X-Content-Type-Options**: Prevents MIME-sniffing.
- **Referrer-Policy**: Protects user privacy during navigation.
- **Permissions-Policy**: Disables unused hardware access (Camera/Mic).
