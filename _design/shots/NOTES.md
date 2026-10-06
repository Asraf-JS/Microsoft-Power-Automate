# Screenshot capture notes

- 01-understand-power-automate, section 1.5, Find the three cloud-flow choices step 2: README describes five Start from blank tiles; the UI shows six, including Describe it to design it between Scheduled cloud flow and Desktop flow.

- 02-prepare-workspace, section 2.2 step 4: README specifies six fictional records; the existing training workbook has those six plus a seventh record for the signed-in user. Reused the workbook and preserved its contents.

- 03-save-email-attachments, section 3.2 step 7: saving a trigger-only flow now reports "Your flow should contain at least one trigger and one action." Completed the remaining actions before saving; final Flow checker has zero errors and warnings.
- 03-save-email-attachments, section 3.7 step 2: the run's detailed Parameters view renders the attachment-name token as an unknown token; switched Parameters view off to show expressionResult false and the skipped Create file action.

- 04-excel-summary, sections 4.4 and 4.8: reused the existing summary flow and aligned its headings, subject and row-count expression; the preserved workbook contains seven records, so the received report correctly states seven sessions. Retained its existing date formatting as dd/MM/yyyy.
- 04-excel-summary, section 4.7: the expression editor uses Monaco; keyboard input is required to update its model before Add. The expression screenshot rerun opens the saved token with an Update button.

- 05-weekly-reminders, section 5.2: the format selector is labelled Time unit instead of Format string; selected Full date/time pattern (short time) [f].
- 05-weekly-reminders, section 5.3: the Excel file picker requires selecting the folder's right-hand arrow (Navigate to Power Automate Training folder); clicking the folder name does not navigate.
- 05-weekly-reminders, section 5.5: To initially uses a people picker; its Settings menu > Use dynamic content exposes the Email-token editor. The screenshot script replays the saved final email with its formatted date expression. No tests were run; the flow is off.

- 06, section 6.1: Forms uses a large cover layout; switched to the compact layout and scrolled to show all four required questions together. Business reason is Multi Line Text (Long answer).
- 06, sections 6.5-6.9: Reused the existing disabled training approval flow, retaining the signed-in training account as approver and using approver@example.com for both Teams documentation recipients. Replaced email branches with Teams branches; checker reports zero errors/warnings. No form submission, test, approval or Teams post.

- 07, section 7.6: Selecting the Excel SessionDate token after changing the loop input caused an extra For each. Used items('Apply_to_each')?['SessionDate'] for both date comparisons instead, verified in Code view. UI operators say is greater or equal to / is less or equal to. The blank Add row is an editor placeholder, not a saved condition.
- 07, section 7.11: Fit view is named Zoom view to fit. The capstone is OFF, no tests were run, and checker reports zero errors/warnings.

- 08, sections 8.4-8.5: Calendar/email list tokens are body/value. Added explicit Apply to each loops because Increment variable alone does not supply an array. Used the right-click plus menu for Add a parallel branch. Test succeeded once to the signed-in training account, then the flow was turned OFF. The received-email screenshot masks the private meeting details and Outlook list preview; no third-party name is included.
- 09, sections 9.4-9.7: The second suggestion already had Recurrence, List rows, FilteredRows, Count and Send an email; it did not add Get file metadata using path. The final refinement kept the same five-step outline. Selected Cancel; no flow was created.

- 10, sections 10.3-10.8: Capstone is listed under From Dataverse. Adding it did not automatically include references; Advanced > Add required objects added its exact Excel and Outlook references, resulting in three objects. Used the existing Asraf publisher.
- 10, sections 10.10-10.12: Selected Next without global Publish all changes because the saved cloud-flow objects were already available. Captured Unmanaged export options, selected Cancel, and deleted only the unmanaged demonstration solution container. No export/import occurred; objects were preserved.

- 11B, step 3: The default Text input name is Text rather than Input; renamed it Message.
- 11B, step 5: One permitted manual test failed. The action reports that the Power Automate mobile app was retired on August 31, 2026 and notifications no longer have a destination. Kept the lesson action for documentation and turned the flow OFF.
- 11C, step 6: One fictional [PA SAVE] Booking confirmation email was sent to the signed-in account. Run succeeded; Create file returned /Power Automate Training/Reports/[PA SAVE] Booking confirmation.eml (4369 bytes). Flow turned OFF.
- 11D: Configured the supplied public feed and self-addressed email; saved and turned OFF without Test/Run. The new designer shows one action's parameters at a time.
- 11A: To Do connection required manual sign-in, completed by the user. Captured Tasks, Follow up: Subject, and From sender token. Checker reports zero errors/warnings; flow saved and turned OFF. No flagged-email test was performed.
- Round two, 08: The saved meetings loop already follows only Get calendar view of events (V3). Busy day waits for Apply to each, Get current weather and Apply to each 1, each Succeeded. Re-selected the two side-branch dependencies and saved; checker reports 0 errors and 0 warnings. The current designer still routes the side-branch lines toward the meetings loop instead of displaying three lines into Busy day. 08-07 shows the expanded Run after settings documenting the correct dependencies. Flow remains OFF; no test.
- Round two, 11B: Replaced the retired mobile notification with Teams Post message in a chat or channel, Flow bot / Chat with Flow bot, recipient the signed-in training account, and Reminder: followed by the trigger Message token. Saved and verified OFF without testing. This supersedes the round-one mobile action noted above.

- Round four, 03-04-see-more.png and 03-04-search-name.png: expected the email-trigger group in the dynamic content picker; the UI also lists a Parameters group above it, and the trigger link reads See more (39).
- Round four, 03-04-condition.png: expected one filled comparison; the UI adds an empty comparison placeholder row and truncates the Attachments Name token label.
- Round four, 03-05-create-file.png: expected full Attachments Name and Attachments Content labels; the UI truncates both token chips with ellipses, while their picker labels confirm the selected values.
- Round four, 03-08-classic-view.png: expected True and False branches; the classic run view labels them If yes and If no and marks the skipped Create file with a grey skip icon.

- Round five, 02-04-draft-email.png: Outlook uses New rather than New mail; the JPG appears as a thumbnail attachment above the body instead of a compact chip. Its menu offers Move image to the message body, confirming it is not inline.
- Round five, 02-02-workbook-rows.png and 02-05-insert-tab.png: Excel's clipboard bridge dropped the paste; entered the supplied headers and six sample rows with keyboard input, then used Auto Fit Column Width to show every value.
- Round five, 04-04-select.png: Select adds a blank Map placeholder after the four filled rows.

- Round six, 06-03-so-far.png and 06-04-so-far.png: the Form Id dropdown lists two Training Request forms with internal IDs; selected the same form used by the existing training approval flow.
- Round six, condition checkpoints: the editor retains an empty comparison placeholder that reappears after Delete; the SessionDate expressions display as items(...) chips rather than SessionDate.
- Round six, 11-b-so-far.png and 11-d-so-far.png: recipient lookup returned no suggestion; accepted the signed-in address as a custom value and masked it.

- Round seven, Forms: the app redirects to forms.cloud.microsoft and opens a Draft with Copilot pane; closed the pane. Before the first question, the question-type picker is labelled Quick start with instead of Add new question.
- Round seven, 06-01-form.png: used 85% display zoom to fit all four required questions in the 1600x900 viewport; kept the default theme.
- Round seven, Forms cleanup: Delete is available under My forms; Recent offers Remove from Recent instead. Deleted only the form created for these captures and preserved the older Training Request form.

- Chapter 8 Scope revision: grouped the three parallel branches inside Gather briefing data, with variables before it and Busy day after it. Busy day Run after lists only the Scope with Is successful selected. Refreshed 17 designer captures and fitted canvas checkpoints; masked the account avatar and recipient address.
- Chapter 8 Scope validation: Flow checker reported 0 errors and 0 warnings; a manual test succeeded with all three branches successful and Busy day false. Deleted only the separate validation flow after testing; the existing demo flow remains off.
