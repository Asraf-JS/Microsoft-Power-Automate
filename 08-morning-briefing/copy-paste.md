# 08 - My Morning Briefing: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Everything on this page is **text**, typed or pasted straight into a field.

---

## Flow name (text, section 8.1)

```text
PA - My morning briefing
```

## Variable names (text, section 8.2)

```text
MeetingCount
```

```text
MeetingList
```

```text
EmailList
```

```text
BriefingSubject
```

Starting value for BriefingSubject:

```text
Your day ahead
```

## Weather location (text, section 8.3)

```text
Kuala Lumpur
```

## Start of each list line (text, sections 8.4 and 8.5)

Paste, then insert **Subject** after it. For 8.5, then type ` (from `, insert **From**, and type `)`.

```text
<br>• 
```

For 8.5 only, after **Subject**:

```text
 (from 
```

Then insert **From** and finish with:

```text
)
```

## Condition name (text, section 8.6)

```text
Busy day
```

## Busy day subject (text, section 8.7)

Paste, insert **MeetingCount** (lightning bolt, under *Variables*), then type ` meetings`.

```text
Busy day ahead: 
```

## Briefing email body (text, section 8.8)

Paste, then replace each `[Name]` with the matching dynamic content token: delete the `[Name]` text, leave the cursor there, select the lightning bolt (or type `/` and choose **Insert dynamic content**) and pick the value. Conditions and Temperature are under *Get current weather*. The rest are under *Variables*.

```text
Good morning,

Weather in Kuala Lumpur: [Conditions], [Temperature]°C

Meetings in the next 12 hours ([MeetingCount]):[MeetingList]

Important unread email:[EmailList]
```
