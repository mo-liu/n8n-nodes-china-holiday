# n8n-nodes-china-holiday

[![npm version](https://img.shields.io/npm/v/n8n-nodes-china-holiday.svg)](https://www.npmjs.com/package/n8n-nodes-china-holiday)

[n8n](https://n8n.io/) community node for querying Chinese public holidays and workday adjustments via [timor.tech API](https://timor.tech/api/holiday/).

## Features

| Feature | Description |
| ------- | ----------- |
| Get Year Holidays | Query all public holidays and workday adjustments for a given year |

## Installation

### Via n8n UI (recommended)

1. Open n8n, go to **Settings** → **Community nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-china-holiday`, click Install
4. Restart n8n

### Via npm

```bash
npm install n8n-nodes-china-holiday
```

## Usage

1. Add a **China Holiday** node to your workflow
2. Select **Resource**: `Holiday`
3. Select **Operation**: `Get Year Holidays`
4. Set **Year** (defaults to current year)
5. Execute — the node returns the full holiday data for that year

## Response Format

```json
{
  "code": 0,
  "holiday": {
    "01-01": {
      "holiday": true,
      "name": "元旦",
      "wage": 3,
      "date": "2026-01-01",
      "rest": 29
    },
    "10-01": {
      "holiday": true,
      "name": "国庆节",
      "wage": 3,
      "date": "2026-10-01",
      "rest": 3
    }
  }
}
```

| Field | Type | Description |
| ----- | ---- | ----------- |
| `holiday` | boolean | `true` = holiday, `false` = workday adjustment |
| `name` | string | Holiday name |
| `wage` | number | `1` = makeup workday, `2` = non-core holiday, `3` = core holiday |
| `date` | string | Full date (YYYY-MM-DD) |
| `rest` | number | Days from today |
| `after` | boolean | (optional) Whether this is a post-holiday makeup day |
| `target` | string | (optional) Which holiday this makeup day belongs to |

## Compatibility

- n8n >= 1.0.0
- Node.js >= 18
- No credentials required (public API)

## Links

- [timor.tech Holiday API](https://timor.tech/api/holiday/)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/#community-nodes)
