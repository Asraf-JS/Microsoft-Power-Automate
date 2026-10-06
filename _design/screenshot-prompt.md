# Screenshot prompt for Codex

> **Red boxes and step numbers.** Codex captures clean screenshots. They're copied into `_design/shots/raw/`, and the red highlight boxes and numbers are drawn from `_design/shots/annotations.json` by the kit's `annotate-shots` command: `cd book && npm run annotate`. To move a box, edit its `[x0, y0, x1, y1, step]` numbers and run it again. After a recapture, copy the new clean image into `raw/` first.

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

---

## Gap-fill prompt (round 3)

**Optional.** Most of these gaps are now covered by crops of existing screenshots (Create or upload, the Insert tab, the + menu, the toolbar with Flow checker, Save and Test, the folder icon, the To gear, Edit and Turn on). Only items 9 and 10, the Chapter 8 calendar and email settings, still have no picture; the rest are small panels the text already describes. If you do run it, delete the items you don't need first. Claude adds the image lines and red boxes afterwards.

```text
Capture 11 new screenshots for this repo's Power Automate guide. Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, mask the account avatar. Keep output short. Save each clean capture to BOTH <chapter>/images/<file> and _design/shots/raw/<file>. Don't edit any README. Don't run, test or turn on any flow; open existing flows only to show a panel, then leave without saving.

1. 02-prepare-workspace/images/02-00-create-menu.png: OneDrive My files with the Create or upload menu open (Folder, Files upload, Excel workbook visible).
2. 02-prepare-workspace/images/02-05-insert-table.png: TrainingRegister in Excel for the web, Insert tab selected, the Create Table dialog open with "My table has headers" ticked. Cancel the dialog afterwards.
3. 03-save-email-attachments/images/03-00-add-action.png: in "PA - Save training PDF attachments", the Add an action panel open with "Apply to each" typed in its search box and results grouped by connector.
4. 03-save-email-attachments/images/03-05-folder-picker.png: same flow, Create file selected, the Folder Path folder browser open listing OneDrive folders with the > arrows visible.
5. 03-save-email-attachments/images/03-06-test-panel.png: same flow, the Test panel open with Manually selected and the Test button visible. Close it without testing.
6. 04-excel-summary/images/04-08-run-flow.png: "PA - Training register summary", after Test > Manually > Test, the Run flow panel showing the Run flow button. Close it WITHOUT selecting Run flow.
7. 05-weekly-reminders/images/05-06-use-dynamic.png: "PA - Weekly training reminders", Send an email (V2) selected, the gear menu beside To open showing "Use dynamic content".
8. 06-training-approval/images/06-00-forms-question.png: the Training Request form in edit mode with one question selected, showing its question type and the Required toggle. Change nothing.
9. 08-morning-briefing/images/08-04-calendar.png: "PA - My morning briefing", Get calendar view of events (V3) selected with Calendar Id, Start Time and End Time visible. Mask any real meeting titles.
10. 08-morning-briefing/images/08-05-get-emails.png: same flow, Get emails (V3) selected with Folder, Fetch Only Unread Messages, Importance and Top visible.
11. 11-extra-practice/images/11-05-turn-on.png: My flows with the ... menu open beside "PA - Power Platform news", showing Turn on. Close the menu without selecting it.

Then commit "Add round 3 gap-fill screenshots" and push. Reply with the files saved and anything that didn't match.
```

---

## Chapter 3 stage-by-stage prompt (round 4)

After the first class, people got lost in 3.2 to 3.4 because each screenshot showed the finished flow on the canvas, including steps they hadn't built yet. The crops hide that for now. This round recaptures those shots properly by building a throwaway copy of the flow one stage at a time, and adds the See more picker and the classic run view. Paste this into one Codex conversation.

```text
Recapture Chapter 3 screenshots for this repo's Power Automate guide. Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, deviceScaleFactor 1, mask the account avatar. Keep output short. Read only 03-save-email-attachments/README.md, 03-save-email-attachments/copy-paste.md and _design/shots/NOTES.md. Save each clean capture to BOTH 03-save-email-attachments/images/<file> and _design/shots/raw/<file> (overwrite). Don't edit any README or annotations.json.

Part 1: build a throwaway flow, NEVER save it.
Create a new automated cloud flow named "PA - Shots stage build" with the trigger When a new email arrives (V3), following README sections 3.1 to 3.5 with the copy-paste values. Do not select Save at any point (an unsaved flow can't trigger on real email). For canvas shots, keep designer zoom about 100% and pan so every action on the canvas is visible. The canvas must show ONLY what has been built so far.

1. 03-02-trigger.png: after 3.2. Trigger selected, Parameters tab showing Include Attachments Yes, Folder Inbox, Subject Filter PA TRAINING, Only with Attachments Yes. Canvas shows the trigger alone.
2. 03-03-add-action.png: start of 3.3. The + below the trigger selected, Add an action panel open with "Apply to each" typed in the search box and Apply to each visible under Control.
3. 03-03-apply-to-each.png: end of 3.3. Apply to each selected, Attachments token in "Select an output from previous steps". Canvas shows the trigger and an EMPTY Apply to each, nothing else.
4. 03-04-see-more.png: during 3.4. Condition added inside Apply to each, cursor in the left "Choose a value" box, dynamic content picker open with the When a new email arrives (V3) group visible and its "See more" link showing. Don't type in the search box for this one.
5. 03-04-search-name.png: same moment, "name" typed in the picker's search box so Attachments Name is listed. Then select Attachments Name.
6. 03-04-condition.png: end of 3.4. Condition selected, Attachments Name / ends with / .pdf filled in. Canvas shows trigger, Apply to each, Condition with EMPTY True and False.
7. 03-05-create-file.png: end of 3.5 step 5. Create file selected with Folder Path /Power Automate Training/Attachments, File Name = Attachments Name, File Content = Attachments Content. Canvas shows Create file in True, False empty.

Then leave the designer WITHOUT saving (Back, then Leave or Discard if asked). Confirm "PA - Shots stage build" is not in My flows; if it is, delete it.

Part 2: classic run view (no new tests).
8. 03-08-classic-view.png: open the existing "PA - Save training PDF attachments" run history, open the latest successful run that processed 2 attachments, turn the "New view" toggle (top right) OFF. Expand Apply to each, step to the iteration whose Condition is false, and expand Condition so the false result and the skipped Create file are both visible. Turn New view back ON afterwards.
9. 03-08-new-view-toggle.png: the same run page with New view ON, used only to show where the toggle sits; any state is fine.

If a screen doesn't match the description, use the closest equivalent and add one line to _design/shots/NOTES.md (shot, what you expected, what the UI showed).

Then run node _design/check-screenshots.mjs, commit "Recapture Chapter 3 stage-by-stage screenshots", and push. Reply with only the files saved and any NOTES.md lines you added.
```

When Codex is done, tell Claude: it adds the red boxes and numbers in `annotations.json`, drops the temporary crops for 03-02, 03-03 and 03-04, and adds the new images (add-action, see-more, search-name, classic view) to the README.

---

## Whole-course stage-by-stage prompt (round 5)

An audit of every chapter found more shots taken from a finished flow or a later state. Most are now fixed by cropping the canvas out or a small patch, but these need a real recapture. Paste this into one Codex conversation.

```text
Recapture screenshots for this repo's Power Automate guide. Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, deviceScaleFactor 1, mask the account avatar. Keep output short. Save each clean capture to BOTH <chapter>/images/<file> and _design/shots/raw/<file> (overwrite). Don't edit any README or _design/shots/annotations.json. Read only the README.md and copy-paste.md of the chapters named below, plus _design/shots/NOTES.md.

Golden rule: every screenshot shows ONLY what a learner has done up to that step. Nothing from later steps on the canvas, in any field, or in any list.

Part A, Chapter 2 (OneDrive and Outlook, sandboxed):
In OneDrive My files create a temporary folder "PA Shots", and inside it a folder "Power Automate Training" containing only "Attachments" and "Reports". Work only inside PA Shots.
1. 02-prepare-workspace/images/02-01-folders.png: inside PA Shots > Power Automate Training, showing only Attachments and Reports.
2. 02-prepare-workspace/images/02-02-workbook-rows.png: a new workbook TrainingRegister.xlsx in that folder, opened in Excel for the web, with the header row and the six sample rows from 02-prepare-workspace/copy-paste.md pasted in. Plain cells, NOT yet formatted as a table.
3. 02-prepare-workspace/images/02-05-insert-tab.png: same workbook, a cell in the data selected, the Insert tab open with the Table button visible. Before creating the table.
4. 02-prepare-workspace/images/02-03-table-name.png: after Insert > Table with defaults (My table has headers ticked), renamed tblTraining, the Table Design tab showing the name.
5. 02-prepare-workspace/images/02-04-draft-email.png: in Outlook on the web, a NEW draft to the signed-in account, subject from copy-paste.md, CourseOutline.pdf and TrainerPhoto.jpg (from 02-prepare-workspace/test-files) attached as attachment chips under the subject (not inline), body exactly as the README says. Do NOT send. Discard the draft afterwards.
Then delete the PA Shots folder (and empty it from the recycle bin is not needed).

Part B, Chapter 4 (throwaway flow, NEVER save):
Create an instant cloud flow "PA - Shots Excel build" with Manually trigger a flow, and follow 4.3 to 4.6 using the REAL Power Automate Training/TrainingRegister.xlsx. Do not select Save. The canvas must show only what has been built so far.
6. 04-excel-summary/images/04-03-list-rows.png: end of 4.3, List rows present in a table selected, fields filled, DateTime Format ISO 8601 visible.
7. 04-excel-summary/images/04-04-select.png: end of 4.4, Select selected, From = body/value, four Map rows with plain tokens (SessionDate is the plain green token, no expression).
8. 04-excel-summary/images/04-05-html-table.png: end of 4.5, Create HTML table selected, From = Output.
9. 04-excel-summary/images/04-06-email.png: end of 4.6, Send an email (V2) selected, To = signed-in account, Subject filled, Body = "Here is the current training register." and the Output token on the next line. NO count sentence.
Leave without saving (Back, then Leave/Discard). Confirm the flow isn't in My flows.

Part C, Chapter 5 (throwaway, NEVER save):
Create a scheduled flow "PA - Shots reminders build" and follow 5.1 to 5.5. Do not save.
10. 05-weekly-reminders/images/05-06-email.png: end of 5.5, email inside Apply to each selected, body with the plain SessionDate token (no expression).
11. 05-weekly-reminders/images/05-07-format-date.png: 5.6 at step 5: SessionDate token removed from the body, expression editor open with formatDateTime(...SessionDate..., 'dd MMM yyyy') typed and the Add button visible (not Update).
Leave without saving.

Part D, Chapter 8 (throwaway, NEVER save):
Create a scheduled flow "PA - Shots briefing build" and follow 8.1 to 8.4 (weather branch and meetings branch only). Do not save.
12. 08-morning-briefing/images/08-04-add-parallel.png: the + between the last Initialize variable and Get current weather open, with "Add a parallel branch" visible. Canvas shows only Recurrence, the four variables and Get current weather.
13. 08-morning-briefing/images/08-05-meetings-branch.png: canvas only, after 8.4: the weather branch and the meetings branch side by side (Current time, Get future time, Get calendar view of events, Apply to each with Increment variable and Append to string variable). No email branch, no Busy day, no join lines. Designer zoom about 100%.
Leave without saving.

Part E, existing flows (open, look, don't change):
14. 06-training-approval/images/06-03-trigger.png: "PA - Training request approval", trigger selected, Form Id visible, wait until no "Loading connection" spinner shows.
15. 11-extra-practice/images/11-05-turn-on.png: My flows with the ... menu open beside "PA - Power Platform news" showing Turn on, no warning banner. Close the menu without selecting.

If something doesn't match the README, use the closest equivalent and add one line to _design/shots/NOTES.md. Then run node _design/check-screenshots.mjs, commit "Recapture stage-by-stage screenshots (round 5)", and push. Reply with only the files saved and any NOTES.md lines you added.
```

When Codex is done, tell Claude: it removes the temporary patches and crops for these files, re-sets the red boxes, and checks each one against its step.

---

## "Your flow so far" checkpoints (round 6)

At the end of each build section the guide shows a checkpoint: the whole screen, with the settings panel of the action just added open on the left and the flow so far on the canvas. Claude draws the big box around the panel, the box on the card and the arrow. Chapters 3, 4 and 5.5 are done from earlier captures. Paste this into one Codex conversation.

```text
Capture "flow so far" checkpoint screenshots for this repo's Power Automate guide. Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, deviceScaleFactor 1. Mask the account avatar AND anything that shows the signed-in email address (To chips with your address, "Connected to <email>" lines). Keep output short. Save each capture to BOTH <chapter>/images/<file> and _design/shots/raw/<file>. Don't edit any README or _design/shots/annotations.json. Read only the README.md and copy-paste.md of the chapters below, plus _design/shots/NOTES.md.

What every checkpoint shows:
- The whole designer, not cropped.
- On the left, the settings panel of the action named below, open (select its card).
- On the canvas, ONLY what the learner has built up to the end of that section, with every card readable (designer zoom about 100%; if the flow is taller than the screen, zoom out just enough to fit it, or pan so the selected card and everything above it in its branch is visible).
- No dropdowns, pickers or tooltips open.

Build each chapter in a throwaway flow, following its README step by step, and capture at the end of each listed section. NEVER save a throwaway flow (an unsaved flow can't run). At the end of each chapter leave without saving and confirm it isn't in My flows.

Chapter 5, new scheduled flow "PA - Shots reminders build":
1. 05-weekly-reminders/images/05-01-so-far.png: end of 5.1, Recurrence selected.
2. 05-weekly-reminders/images/05-02-so-far.png: end of 5.2, Convert time zone selected.
3. 05-weekly-reminders/images/05-03-so-far.png: end of 5.3, List rows present in a table selected.
4. 05-weekly-reminders/images/05-04-so-far.png: end of 5.4, Apply to each selected (empty loop).

Chapter 6, new automated flow "PA - Shots approval build" (Forms trigger, Training Request form). Do not submit the form or approve anything:
5. 06-training-approval/images/06-03-so-far.png: end of 6.3, trigger selected.
6. 06-training-approval/images/06-04-so-far.png: end of 6.4, Get response details selected.
7. 06-training-approval/images/06-05-so-far.png: end of 6.5, Start and wait for an approval selected.
8. 06-training-approval/images/06-06-so-far.png: end of 6.6, Condition selected (True and False empty).
9. 06-training-approval/images/06-07-so-far.png: end of 6.7, the Teams action in True selected (False still empty).
10. 06-training-approval/images/06-08-so-far.png: end of 6.8, the Teams action in False selected.

Chapter 7: on My flows, Save As "PA - Weekly training reminders" with the name "PA - Shots capstone build" (the copy stays off). Open the copy and follow 7.2 to 7.10. Never select Save or Test in it.
11. 07-capstone/images/07-02-so-far.png: end of 7.2, Filter array (renamed Filter out completed training) selected.
12. 07-capstone/images/07-03-so-far.png: end of 7.3, Get future time selected.
13. 07-capstone/images/07-04-so-far.png: end of 7.4, Initialize variable (ReminderCount) selected.
14. 07-capstone/images/07-05-so-far.png: end of 7.5, Apply to each selected.
15. 07-capstone/images/07-06-so-far.png: end of 7.6, the date Condition selected, Send an email (V2) inside True.
16. 07-capstone/images/07-07-so-far.png: end of 7.7, Increment variable selected.
17. 07-capstone/images/07-08-so-far.png: end of 7.8, the summary Condition selected.
18. 07-capstone/images/07-09-so-far.png: end of 7.9, Send coordinator summary selected.
19. 07-capstone/images/07-10-so-far.png: end of 7.10, the False-branch action selected.
Then leave without saving and DELETE "PA - Shots capstone build".

Chapter 8, new scheduled flow "PA - Shots briefing build":
20. 08-morning-briefing/images/08-01-so-far.png: end of 8.1, Recurrence selected.
21. 08-morning-briefing/images/08-02-so-far.png: end of 8.2, the last Initialize variable selected.
22. 08-morning-briefing/images/08-03-so-far.png: end of 8.3, Get current weather selected.
23. 08-morning-briefing/images/08-04-so-far.png: end of 8.4, Append to string variable selected.
24. 08-morning-briefing/images/08-05-so-far.png: end of 8.5, the email branch's Append to string variable selected.
25. 08-morning-briefing/images/08-06-so-far.png: end of 8.6, Busy day selected.
26. 08-morning-briefing/images/08-07-so-far.png: end of 8.7, Set variable selected.
27. 08-morning-briefing/images/08-08-so-far.png: end of 8.8, Send an email (V2) selected.

Chapter 11, one throwaway flow per exercise, each named "PA - Shots 11X":
28. 11-extra-practice/images/11-a-so-far.png: end of exercise A, Add a to-do (V3) selected.
29. 11-extra-practice/images/11-b-so-far.png: end of exercise B, the Teams action selected.
30. 11-extra-practice/images/11-c-so-far.png: end of exercise C, Create file selected.
31. 11-extra-practice/images/11-d-so-far.png: end of exercise D, Send an email (V2) selected.

If something doesn't match the README, use the closest equivalent and add one line to _design/shots/NOTES.md. Then commit "Add flow-so-far checkpoints (round 6)" and push. Reply with only the files saved and any NOTES.md lines you added.
```

When Codex is done, tell Claude: it adds the checkpoint boxes and arrows and puts each image at the end of its section.

---

## Chapter 6 Forms step-by-step prompt (round 7)

Section 6.1 builds the Microsoft Form with only one picture, of the finished form. This round adds one screenshot per step. Codex builds a temporary copy of the form and deletes it at the end, so the forms list and the Chapter 6 flow's Form Id picker aren't left with an extra "Training Request". Paste this into one Codex conversation.

```text
Capture step-by-step screenshots for section 6.1 of this repo's Power Automate guide (building a Microsoft Form). Same setup as before: Playwright, persistent context ./.pa-profile, viewport 1600x900, deviceScaleFactor 1. Mask the account avatar and anything showing the signed-in email address. Keep output short. Save each capture to BOTH 06-training-approval/images/<file> and _design/shots/raw/<file> (overwrite). Don't edit any README or _design/shots/annotations.json. Read only 06-training-approval/README.md, 06-training-approval/copy-paste.md and _design/shots/NOTES.md.

Rules:
- Work at https://forms.office.com with the default theme. Don't change the theme, share the form, collect responses or submit it.
- Each screenshot shows ONLY what the steps have done so far. Close menus and tooltips unless the description mentions them.
- Use the exact values from copy-paste.md.

Follow 6.1 step by step and capture:
1. 06-training-approval/images/06-01-new-form.png: the Forms home page with the New Form button visible (before selecting it).
2. 06-training-approval/images/06-01-title.png: the new form with the title "Training Request" and the description from copy-paste.md entered. No questions yet.
3. 06-training-approval/images/06-01-add-question.png: + Add new question selected, with the question types (Choice, Text, Rating, Date and so on) showing.
4. 06-training-approval/images/06-01-requester.png: the Text question "Requester name" being edited, with the Required switch on and visible.
5. 06-training-approval/images/06-01-course.png: the Choice question "Course" being edited, with the three options from copy-paste.md and Required on.
6. 06-training-approval/images/06-01-date.png: the Date question "Preferred date" being edited, with Required on.
7. 06-training-approval/images/06-01-reason.png: the Text question "Business reason" being edited, with Long answer and Required both on and visible.
8. 06-training-approval/images/06-01-form.png: the finished form, nothing selected, all four questions showing their red required asterisk, default theme, no responses badge.

Then go back to the Forms home page and DELETE the form you just made (... > Delete). Only delete the form you created in this conversation. Keep any older "Training Request" form, because the Chapter 6 flow uses it.

If something doesn't match the README, use the closest equivalent and add one line to _design/shots/NOTES.md. Then commit "Add Chapter 6 form screenshots (round 7)" and push to claude/compassionate-maxwell-evreqg. Reply with only the files saved and any NOTES.md lines you added.
```

When Codex is done, tell Claude: it adds the red boxes and numbers and places each screenshot under its step in 6.1.
