# Screenshot prompt for Copilot

Paste the prompt below into Copilot on Windows, **one chapter per conversation**. Change the two values in the first line each time. Short conversations keep token use down, because Copilot only ever reads one chapter page.

Run the chapters in order (01 to 11). Later chapters build on earlier ones. Chapter 7 copies the Chapter 5 flow, for example.

| Chapter | Folder | Shots | Notes |
|---|---|---|---|
| 01 | 01-understand-power-automate | 4 | |
| 02 | 02-prepare-workspace | 4 | Creates the OneDrive folder and workbook the later chapters need |
| 03 | 03-save-email-attachments | 9 | Test allowed: emails yourself |
| 04 | 04-excel-summary | 9 | Test allowed: emails yourself |
| 05 | 05-weekly-reminders | 8 | No test |
| 06 | 06-training-approval | 8 | No test, don't submit the form |
| 07 | 07-capstone | 10 | No test |
| 08 | 08-morning-briefing | 10 | Test allowed: emails yourself |
| 09 | 09-plan-with-copilot | 5 | Ends with Cancel |
| 10 | 10-environments-and-solutions | 4 | Stop at the export panel, then delete the solution |
| 11 | 11-extra-practice | 4 | Tests B and C allowed |

When a chapter is done, upload its `images` folder into the same chapter folder on GitHub (**Add file** > **Upload files**), then run `node _design/check-screenshots.mjs` or ask Claude to check which images are still missing.

---

## The prompt

```text
CHAPTER = 03-save-email-attachments   SAVE TO = C:\PA-Screens\03-save-email-attachments\images\

You are capturing screenshots for a Power Automate training guide. Be brief: don't explain what you see, don't summarise, just do the steps and save the files.

1. Open this page and read it once: https://github.com/Asraf-JS/Microsoft-Power-Automate/blob/claude/compassionate-maxwell-evreqg/<CHAPTER>/README.md
2. In a second Edge tab, open https://make.powerautomate.com (already signed in with my training account). Set browser zoom to 100% and the window to about 1600 x 900.
3. Follow the numbered steps on the page in order, doing exactly what they say. Use the values on the chapter's copy-paste page (same folder, copy-paste.md).
4. Every image line on the page, like ![description](./images/FILENAME.png), is a screenshot to take. When the screen matches its description, capture the browser page content only (no taskbar, no browser toolbar) and save it to SAVE TO with exactly that FILENAME. One image per line. Skip images inside "Going further" boxes.
5. Make sure the thing the description names is visible and not covered by a panel or tooltip. Close the dynamic content picker before capturing unless the description mentions it.

Rules:
- Never select Test or Run flow unless the CHAPTER is 03, 04, 08 or 11. Never send anything to anyone except my own address.
- Never submit a form, approve a request, export or import a solution.
- If a screen shows real people's names, emails or meetings other than mine, stop and ask me before capturing.
- If a step doesn't match what you see (a button has a different name, a field is missing), take the closest equivalent, note it in one line, and carry on.
- Chapter 09: select Cancel at the end. Chapter 10: stop at the export panel, select Cancel, then delete the solution "Power Automate Training Migration".
- When finished, reply with only: the list of files saved, and any steps that didn't match.
```
