SCENARIO75 — Cyber Range Engineering Lab

Practical Assessment: Red vs Blue Security Lab

A self-contained cybersecurity training lab based on the scenario:

Cookies Reuse & MFA Bypass

The lab simulates a vulnerable corporate Admin Feedback System where a Red Team can abuse stored XSS, obtain a client-side administrative session cookie, and replay that session to bypass the intended MFA verification flow.

The same environment provides simulated Blue Team telemetry for log forensics and incident response.

The lab is designed to run on a single Linux VM and can be deployed in a controlled Proxmox environment.

1. Scenario

The vulnerable application is a Node.js/Express Admin Feedback System.

The intended attack chain is:

Reconnaissance
      |
      v
Discover Node.js
      |
      v
robots.txt
      |
      v
/api/verify-mfa
      |
      v
/dashboard
      |
      v
pre_mfa_session
      |
      v
Stored XSS
      |
      v
WAF blocks <script>
      |
      v
SVG event-handler bypass
      |
      v
Cookie keyword blocked
      |
      v
JavaScript bracket notation
      |
      v
fetch() cookie exfiltration
      |
      v
adm_sess
      |
      v
Session replay
      |
      v
MFA verification skipped
      |
      v
/dashboard
      |
      v
RED FLAG

2. Architecture

                         Linux VM
                            |
              +-------------+-------------+
              |                           |
         Node.js App                  SSH Server
           :3075                         :2275
              |                           |
       +------+-------+              analyst
       |              |
   React Frontend   Express API
                        |
                   PostgreSQL
                        |
                centa_company DB

       Blue Team Telemetry
              |
              v
       /opt/admin/logs/
          access.log
          error.log

3. Requirements

* Linux VM
* Docker
* Docker Compose
* Node.js application
* PostgreSQL container
* SSH server

Recommended deployment target:

* Proxmox Linux VM
* 2 CPU
* 4 GB RAM
* 20 GB disk
* Internal lab network

The application is exposed on HTTP port `3075`.

SSH is exposed on port `2275`.

4. Access

Web application:

http://<VM-IP>:3075

SSH:

ssh -p 2275 analyst@<VM-IP>

Credentials:

Username: analyst
Password: blue_team_rocks

Blue Team logs:

/opt/admin/logs/access.log
/opt/admin/logs/error.log

5. Deployment

Clone or copy the repository to the Linux VM.

Enter the project directory:

cd ~/PROJECT/Nauli-Data-Test

Make the provisioning script executable:

chmod +x scripts/provision_lab.sh

Run provisioning:

./scripts/provision_lab.sh

The provisioning script:

1. Creates the `analyst` Linux account.
2. Configures SSH on port `2275`.
3. Creates `/opt/admin/logs`.
4. Injects the simulated attack logs.
5. Builds the application Docker image.
6. Starts PostgreSQL and the Node.js application.
7. Exposes the web application on port `3075`.

Check the containers:

docker compose ps

Check the application:

curl -i http://127.0.0.1:3075/

Check robots.txt:

curl http://127.0.0.1:3075/robots.txt

6. Red Team Walkthrough

Phase 1 — Reconnaissance

Identify the backend technology from the HTTP response:

curl -i http://<VM-IP>:3075/

The response exposes:

X-Powered-By: Node.js

Flag:

SCENARIO75{Node.js}

Inspect:

http://<VM-IP>:3075/robots.txt

The file contains:

Disallow: /api/verify-mfa

Flag:

SCENARIO75{/api/verify-mfa}

The administrative interface is:

/dashboard

Flag:

SCENARIO75{/dashboard}

The HTML source contains an ASCII clue directing the attacker toward:

/robots.txt

Flag:

SCENARIO75{robots.txt}

After authentication initialization, the application issues:

pre_mfa_session=pending_mfa_verification

Flags:

SCENARIO75{pre_mfa_session}
SCENARIO75{pending_mfa_verification}

7. Phase 2 — WAF and XSS

The feedback submission endpoint accepts only:

POST /api/feedback

Flag:

SCENARIO75{POST}

A standard XSS payload such as:

<script>alert(1)</script>

is blocked by the WAF with:

HTTP 403

Flag:

SCENARIO75{403}

The WAF can be bypassed using an SVG event handler:

<svg onload=alert(1)>

Flag:

SCENARIO75{<svg>}

Direct cookie access using:

document.cookie

is blocked.

The bypass uses JavaScript bracket notation:

window['docu'+'ment']['coo'+'kie']

Flag:

SCENARIO75{window['docu'+'ment']['coo'+'kie']}

The pre-MFA cookie intentionally uses:

HttpOnly=false

Flag:

SCENARIO75{False}

The lab permits the browser `fetch()` API for the simulated exfiltration step.

Flag:

SCENARIO75{fetch}

8. Phase 3 — MFA Bypass and Session Replay

The authenticated administrative session uses the cookie:

adm_sess

Flag:

SCENARIO75{adm_sess}

The vulnerability is that a valid stolen administrative cookie is accepted directly by the authentication middleware.

The attacker does not need to call:

/api/verify-mfa

again.

Flag:

SCENARIO75{/api/verify-mfa}

The replayed administrative session can access:

/dashboard

The stored XSS payload is reflected inside:

<div class="xss-payload">

Flag:

SCENARIO75{xss-payload}

The final Red Team flag is embedded in the administrative dashboard:

SCENARIO75{RED_C00k13_MFA_Byp4ss_0wn3d}

9. Blue Team Walkthrough

Blue Team telemetry is stored in:

/opt/admin/logs/

Files:

/opt/admin/logs/access.log
/opt/admin/logs/error.log

Inspect both files:

sudo cat /opt/admin/logs/access.log
sudo cat /opt/admin/logs/error.log

Attacker identification

The attacker originates from:

10.10.14.50

User-Agent:

Mozilla/5.0

Flags:

SCENARIO75{10.10.14.50}
SCENARIO75{Mozilla/5.0}

Baseline traffic

Legitimate administrative traffic originates from:

192.168.1.100

Flag:

SCENARIO75{192.168.1.100}

Attacker subnet

The attacker belongs to:

10.10.14.0/24

Flag:

SCENARIO75{10.10.14.0/24}

The first WAF block occurs at:

18:50:15

The blocked payload contains:

<script>

Flags:

SCENARIO75{<script>}
SCENARIO75{18:50:15}

Successful dashboard access

The attacker successfully accesses:

/dashboard

with HTTP status:

200

at:

18:51:55

Flags:

SCENARIO75{200}
SCENARIO75{18:51:55}

MFA endpoint verification

The logs show that the attacker never reaches:

/api/verify-mfa

Flag:

SCENARIO75{No}

This demonstrates that the authentication bypass occurs through replay of the already-issued administrative session.

X-Forwarded-For analysis

The suspicious log entry contains:

X-Forwarded-For="UEhBTlRPTXtCTFVFX0wwZ19IdW50M3JfTTRzdDNyfQ=="

The string is a Base64-style encoded value.

The assessment specifies:

SCENARIO75{Base64}

and:

SCENARIO75{44}

for the encoding and expected length.

Cookie reuse detection

Cookie reuse events are marked:

CRITICAL

Flag:

SCENARIO75{CRITICAL}

At:

18:53:10

the application records:

Authentication bypass anomaly

Flags:

SCENARIO75{18:53:10}
SCENARIO75{Authentication bypass anomaly}

The same event identifies reuse of:

adm_sess

from:

10.10.14.0/24

10. Blue Team Flag

The assessment provides the Base64 investigation clue and specifies the final Blue Team flag:

SCENARIO75{BLUE_L0G_HUnt3r_M4st3r}

11. Attack Timeline

18:49:58
Baseline dashboard request from 192.168.1.100

18:50:15
WAF blocks <script> from 10.10.14.50

18:50:32
SVG-based feedback payload accepted

18:50:48
Cookie access pattern blocked

18:51:02
SVG event-handler bypass accepted

18:51:55
Successful administrative dashboard access

18:52:11
Stored XSS payload reflected

18:52:19
Cookie exfiltration telemetry received

18:53:10
Authentication bypass anomaly
Cookie reuse detected

12. Embedded Flags

Red Team

SCENARIO75{Node.js}
SCENARIO75{/api/verify-mfa}
SCENARIO75{/dashboard}
SCENARIO75{robots.txt}
SCENARIO75{pre_mfa_session}
SCENARIO75{pending_mfa_verification}
SCENARIO75{POST}
SCENARIO75{403}
SCENARIO75{<svg>}
SCENARIO75{window['docu'+'ment']['coo'+'kie']}
SCENARIO75{False}
SCENARIO75{fetch}
SCENARIO75{adm_sess}
SCENARIO75{xss-payload}
SCENARIO75{RED_C00k13_MFA_Byp4ss_0wn3d}

Blue Team

SCENARIO75{/opt/admin/logs}
SCENARIO75{10.10.14.50}
SCENARIO75{Mozilla/5.0}
SCENARIO75{200}
SCENARIO75{18:51:55}
SCENARIO75{192.168.1.100}
SCENARIO75{10.10.14.0/24}
SCENARIO75{<script>}
SCENARIO75{18:50:15}
SCENARIO75{No}
SCENARIO75{Base64}
SCENARIO75{44}
SCENARIO75{CRITICAL}
SCENARIO75{18:53:10}
SCENARIO75{Authentication bypass anomaly}
SCENARIO75{BLUE_L0G_HUnt3r_M4st3r}

13. Security Findings

The simulated application contains the following intentional weaknesses:

1. Administrative session cookies are accessible to client-side JavaScript.
2. The pre-MFA session cookie is not protected with HttpOnly.
3. Stored XSS is possible through a weak WAF.
4. The WAF can be bypassed using HTML5 event handlers.
5. Cookie access filtering can be bypassed using JavaScript obfuscation.
6. A valid administrative session can be replayed without repeating MFA.
7. Session validation does not bind the administrative session to the original authentication context.

14. Defensive Recommendations

A production system should:

* Set `HttpOnly` on authentication cookies.
* Set `Secure` when using HTTPS.
* Use an appropriate `SameSite` policy.
* Implement output encoding and contextual HTML escaping.
* Remove stored XSS vulnerabilities.
* Use a real WAF as defense in depth rather than keyword filtering.
* Rotate sessions after successful MFA.
* Bind authorization to a server-side authentication state.
* Invalidate pre-MFA sessions after MFA completion.
* Detect suspicious session reuse.
* Correlate authentication events with source IP and device information.
* Alert on administrative session anomalies.

15. Presentation Plan

Recommended 15–20 minute demonstration:

Part 1 — Architecture

Show:

Linux VM
Docker Compose
Node.js
PostgreSQL
SSH 2275
HTTP 3075
/opt/admin/logs

Part 2 — Red Team

Demonstrate:

Recon
robots.txt
MFA endpoint discovery
pre_mfa_session
WAF 403
SVG bypass
cookie obfuscation
fetch
adm_sess
session replay
dashboard
Red flag

Part 3 — Blue Team

Show:

access.log
error.log
attacker IP
WAF event
dashboard access
cookie exfiltration
CRITICAL cookie reuse
Authentication bypass anomaly
Base64 clue
Blue flag

16. Safety

This lab is intentionally vulnerable and is designed for an isolated cybersecurity assessment environment.

Do not expose the application or its vulnerable configuration to an untrusted production network.
