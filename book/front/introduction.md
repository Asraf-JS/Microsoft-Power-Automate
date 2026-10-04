## How to use this book

This book collects the notes and copy-paste values from the two-day Microsoft Power Automate for End Users course in one place, so you can follow along offline and keep it at your desk afterwards.

Each chapter matches one chapter of the course and has two parts:

- **Notes** explain the concepts and walk you through each build step, with checkpoints and troubleshooting.
- **Hands-on exercises** give you every flow name, expression and text value you type, ready to copy.

For screenshots of each step, use the participant manual PDF that comes with the course. This book follows the same section numbers, so section 3.4 here is section 3.4 there.

Look out for the coloured boxes. Blue boxes are notes, teal boxes are tips, purple boxes are things to try, and orange boxes are key points and warnings.

Prefer to copy expressions rather than retype them? Everything in this book is also online at **github.com/Asraf-JS/Microsoft-Power-Automate**, where each grey box has a copy button. Copying from there is safer than copying from a PDF, which can add line breaks or change quotation marks.

## Course scenario

Throughout the course you automate the work of one training coordinator.

> **You coordinate training for a small organisation.** Course materials arrive by email, session details live in an Excel register, requests need approval, and participants need reminders.

Each chapter turns one of those manual tasks into a flow:

| Stage | What happens |
|-------|-------------|
| Plan | Learn how flows work and write a plan before building anything |
| Prepare | Set up the OneDrive folders, Excel register, test email, Forms and Teams destinations |
| Collect | Save PDF attachments from training emails to OneDrive automatically |
| Report | Send the coordinator a one-click summary table from the Excel register |
| Remind | Send weekly reminders to every participant on a schedule |
| Approve | Route a training request form through an approval and post the result to Teams |
| Refine | Filter reminders to upcoming incomplete sessions, count them and summarise the week |
| Design | Use Copilot to plan a flow, then review and correct its suggestion |
| Release | Package the finished flow in a solution and export it for another environment |

## Ground rules

> **Important:** Use only fictional data. Keep flows turned off until your trainer asks you to test them, and only send test emails to addresses your trainer has approved. Testing a flow can create files, send messages, start approvals or change shared data.

## Sample files

Four practice files come with the course. All of them are fictional.

| File | Used in | What it is |
|------|---------|-----------|
| TrainingRegister.xlsx | Chapters 2 to 7 | A ready-made register with the tblTraining table and six records. Use it only if your trainer says so |
| CourseOutline.pdf | Chapters 2 and 3 | The attachment the Chapter 3 flow should save |
| TrainerPhoto.jpg | Chapters 2 and 3 | The attachment the Chapter 3 flow should skip |
| SessionNotes.docx | Chapter 3 | Used in the independent practice |

Download them from the course repository: **github.com/Asraf-JS/Microsoft-Power-Automate**.

{{program-flow}}
