# Screenshot prompt for Codex

Codex works in a local clone of this repository, drives a real browser with Playwright, and saves each screenshot straight into the chapter's `images` folder. No uploading.

## One-time setup

1. Clone the repo and switch to the working branch:
   ```
   git clone https://github.com/Asraf-JS/Microsoft-Power-Automate
   cd Microsoft-Power-Automate
   git checkout claude/compassionate-maxwell-evreqg
   ```
2. Open Codex in that folder.
3. Use your **training** Microsoft 365 account. You'll sign in once, by hand, in the browser window Codex opens. The sign-in is kept in `.pa-profile/`, which git ignores, so it never reaches GitHub.

## How to run it

Paste the prompt below into Codex, **one chapter per conversation**, changing `CHAPTER` each time. Run the chapters in order (01 to 11), because later chapters build on earlier ones. Chapter 7 copies the Chapter 5 flow, for example.

| Chapter | Shots | Tests allowed |
|---|---|---|
| 01-understand-power-automate | 4 | |
| 02-prepare-workspace | 4 | |
| 03-save-email-attachments | 9 | Yes, emails yourself |
| 04-excel-summary | 9 | Yes, emails yourself |
| 05-weekly-reminders | 8 | No |
| 06-training-approval | 8 | No, and don't submit the form |
| 07-capstone | 10 | No |
| 08-morning-briefing | 10 | Yes, emails yourself |
| 09-plan-with-copilot | 5 | No, ends with Cancel |
| 10-environments-and-solutions | 4 | No, stops at the export panel |
| 11-extra-practice | 4 | B and C only |

Check progress any time with `node _design/check-screenshots.mjs`.

---

## The prompt

```text
CHAPTER = 03-save-email-attachments

Capture the screenshots for one chapter of a Power Automate training guide in this repo. Keep output short: no explanations or summaries while working.

Read only these files: CHAPTER/README.md, CHAPTER/copy-paste.md, and _design/shots/ if it exists. Don't read other chapters.

Setup:
- Use Playwright for Node with a persistent, headed Chromium context: user data dir ./.pa-profile, viewport 1600x900, deviceScaleFactor 1. Install playwright in _design/ if it isn't there.
- Open https://make.powerautomate.com. If it shows a sign-in page, wait (up to 5 minutes) for me to sign in by hand, then continue. Never type a password yourself.

Capture:
- Write one script, _design/shots/CHAPTER.mjs, that follows the numbered steps in README.md in order, using the values from copy-paste.md. Prefer getByRole / getByLabel / getByText locators.
- Every image line in README.md, ![description](./images/FILE.png), is a screenshot. Skip images inside "Going further" boxes. When the screen matches the description, save page.screenshot({ path: 'CHAPTER/images/FILE.png', mask: [the signed-in account button/avatar at the top right] }). Close pickers and tooltips first unless the description mentions them.
- To save tokens: never print page HTML or the accessibility tree in full. When a locator fails, take one small screenshot to look, fix that locator, and rerun from the failing step.
- Once a flow exists, reuse it on reruns instead of creating duplicates.

Rules:
- Only select Test / Run flow when CHAPTER is 03, 04, 08 or 11 (11: exercises B and C only). Never send anything to anyone but the signed-in account.
- Never submit a form, approve a request, or export or import a solution.
- 09: select Cancel at the end. 10: stop at the export panel, select Cancel, then delete the solution "Power Automate Training Migration".
- If a screen would show real people's names, emails or meetings other than mine, stop and ask me first.
- If a step doesn't match the UI (a renamed button, a missing field), use the closest equivalent and add one line to _design/shots/NOTES.md: chapter, step, what the README says, what the UI shows.

Finish:
- Run node _design/check-screenshots.mjs and fix anything still missing for CHAPTER.
- git add CHAPTER/images _design/shots && git commit -m "Add CHAPTER screenshots" && git push
- Reply with only: files saved, and the NOTES.md lines you added.
```

---

## Recapture prompt (round 2)

Five shots need redoing after review. Paste this into one Codex conversation.

```text
Recapture 5 screenshots for this repo's Power Automate guide. Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, mask the account avatar. Keep output short. Read only 08-morning-briefing/README.md, 11-extra-practice/README.md and _design/shots/.

Before capturing, fix two flows (leave both turned OFF, don't test):
A. "PA - My morning briefing": the meetings Apply to each currently has Run after set to the weather and email branches, so the branches join too early. Remove those extra Run after entries from the meetings Apply to each. Then on the "Busy day" condition, Settings > Run after, select: Get current weather, the meetings Apply to each, and the email Apply to each 1 (each "Is successful"). Confirm on the canvas that three lines lead into Busy day. Save; Flow checker 0 errors.
B. "PA - Send me a note": delete "Send me a mobile notification". Add Microsoft Teams "Post message in a chat or channel": Post as Flow bot, Post in Chat with Flow bot, Recipient = the signed-in account, Message = "Reminder: " then the trigger's Message token. Save.

Capture (overwrite the files). For canvas shots, zoom in until action names are readable (designer zoom about 100%) and pan so the named part fills the canvas; the left parameter panel may be closed:
1. 08-morning-briefing/images/08-02-variables.png: first Initialize variable selected, parameters panel open, the four Initialize variable actions visible on the canvas.
2. 08-morning-briefing/images/08-05-meetings-branch.png: the meetings branch (Current time, Get future time, Get calendar view of events, Apply to each with Increment variable and Append to string variable) readable.
3. 08-morning-briefing/images/08-06-three-branches.png: the three branches side by side, from the split down to the end of each branch.
4. 08-morning-briefing/images/08-07-join.png: Busy day selected with Settings > Run after open, and the three incoming lines visible on the canvas.
5. 11-extra-practice/images/11-02-input.png: trigger selected showing the Message input; canvas shows the Teams action below it.

Then: node _design/check-screenshots.mjs, commit "Recapture briefing and note screenshots", push. Reply with the files saved and anything that didn't match.
```
