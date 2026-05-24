# 🛡️ SentinelPulse

<div align="center">

![SentinelPulse Banner](https://img.shields.io/badge/SentinelPulse-AI--Powered%20DeFi%20Monitoring-00FFB2?style=for-the-badge&logo=shield)

[![Powered by Xiaomi MiMo V2.5](https://img.shields.io/badge/Powered_by-Xiaomi_MiMo_V2.5-FF6B00?style=flat-square&logo=xiaomi&logoColor=white)](https://mimo.ccode.dev)
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

*AI-powered DeFi security, always watching.*

</div>

---

## 🌟 Overview

**SentinelPulse** is a real-time DeFi protocol monitoring platform powered by **Xiaomi MiMo V2.5** multi-agent intelligence. It combines public blockchain data with AI-driven analysis to detect anomalies, track whale movements, and provide actionable security insights.

### ✨ Key Features

- **🔍 Real-Time TVL Monitoring** — Track Total Value Locked across 100+ DeFi protocols and 15+ chains via DeFiLlama
- **🐋 Whale Watch** — Monitor large transactions with risk scoring and flash loan detection
- **⚠️ Anomaly Explorer** — AI-detected anomalies with full reasoning chains from MiMo agents
- **📊 Intelligence Reports** — Automated synthesis reports from the multi-agent pipeline
- **🤖 Multi-Agent MiMo Pipeline** — 4 specialized AI agents working in concert
- **💰 Live Price Feeds** — Token prices from CoinGecko with 15-second refresh

---

## 🤖 MiMo V2.5 Agent Pipeline

SentinelPulse uses a **multi-agent architecture** powered by **Xiaomi MiMo V2.5**, a state-of-the-art language model accessible via OpenAI-compatible API.

```
┌─────────────────────────────────────────────────────────────┐
│                    External Data Sources                     │
│              CoinGecko · DeFiLlama · RPC Nodes              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Data Ingestion Layer                       │
│              Next.js API Routes (polling, cached)            │
└──────┬──────────────────┼──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  WATCHTOWER  │  │   VALIDATOR  │  │    ALERT     │
│              │  │              │  │              │
│ • TVL delta  │  │ • Block      │  │ • Whale      │
│ • Pool drains│  │   reorgs     │  │   tracking   │
│ • APY drops  │  │ • Oracle     │  │ • Flash loans│
│              │  │   drift      │  │ • Suspicious │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                ┌─────────────────┐
                │    ANALYST      │
                │                 │
                │ • Correlate     │
                │ • Risk scoring  │
                │ • Reports       │
                │ • Explanations  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  Dashboard UI   │
                │  (Next.js 16)   │
                └─────────────────┘
```

### Agent Roles

| Agent | Role | Monitors |
|-------|------|----------|
| **Watchtower** | TVL & liquidity monitoring | Protocol drains, pool imbalances, APY drops |
| **Validator** | Chain integrity verification | Block reorgs, oracle drift, consensus errors |
| **Alert** | Threat detection | Whale movements, flash loans, suspicious transactions |
| **Analyst** | Intelligence synthesis | Risk scoring, report generation, NL explanations |

### MiMo API Configuration

```typescript
const MIMO_API_URL = "https://mimo.ccode.dev/v1";
const MIMO_MODEL = "mimo-v2.5";
```

---

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State:** Zustand + React Query
- **Icons:** Lucide React
- **AI Engine:** Xiaomi MiMo V2.5

### Data Sources

| Source | Data | Refresh |
|--------|------|---------|
| [CoinGecko](https://coingecko.com) | Token prices, market caps | 15s |
| [DeFiLlama](https://defillama.com) | TVL, protocol data, chain data | 30s |
| [MiMo V2.5](https://mimo.ccode.dev) | AI agent analysis | On-demand |

### Project Structure

```
sentinelpulse/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── tvl/route.ts          # DeFiLlama TVL data
│   │   │   ├── prices/route.ts       # CoinGecko prices
│   │   │   ├── protocols/route.ts    # Protocol listing
│   │   │   ├── agents/route.ts       # Agent status
│   │   │   ├── alerts/route.ts       # Alert generation
│   │   │   └── agents/reports/       # Report generation
│   │   ├── page.tsx                  # Dashboard
│   │   ├── tvl/page.tsx              # TVL Monitor
│   │   ├── whales/page.tsx           # Whale Watch
│   │   ├── anomalies/page.tsx        # Anomaly Explorer
│   │   ├── reports/page.tsx          # Agent Reports
│   │   ├── agents/page.tsx           # Agent Logs
│   │   ├── settings/page.tsx         # Settings
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── SideNav.tsx               # Navigation sidebar
│   │   ├── TopBar.tsx                # Header bar
│   │   ├── RiskGauge.tsx             # Threat level gauge
│   │   ├── MetricCard.tsx            # Metric display card
│   │   ├── TvlChart.tsx              # TVL area chart
│   │   ├── ChainMap.tsx              # Chain distribution chart
│   │   ├── ActivityFeed.tsx          # Real-time alert feed
│   │   ├── SeverityBadge.tsx         # Severity indicator
│   │   ├── PulseDot.tsx              # Live status dot
│   │   └── AgentStatusIndicator.tsx  # Agent health display
│   └── lib/
│       ├── utils.ts                  # Utility functions
│       ├── store.ts                  # Zustand state store
│       └── mimo.ts                   # MiMo API client
├── tailwind.config.ts                # Design tokens
├── next.config.ts                    # Next.js config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ferah1223/sentinelpulse.git
cd sentinelpulse

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

SentinelPulse uses a dark, mission-control-inspired design with neon accents:

### Color Palette

```
Background:     #0A0A0F (void-black)
Surface:        #161822 (panel-gray)
Cards:          #1C1F2E (card-gray)

Safe:           #00FFB2 (sentinel-green)
Danger:         #FF3B5C (threat-red)
Warning:        #FFB800 (warning-amber)
Info:           #00D4FF (info-cyan)
```

### Typography

- **Headings:** Inter (700)
- **Body:** Inter (400)
- **Data/Mono:** JetBrains Mono (400)

---

## 📊 Pages

| Page | Description |
|------|-------------|
| **Dashboard** | Overview with threat level, TVL, alerts, and agent status |
| **TVL Monitor** | Sortable protocol table with chain filtering |
| **Whale Watch** | Large transaction feed with risk scoring |
| **Anomaly Explorer** | AI-detected anomalies with MiMo reasoning chains |
| **Reports** | Generated intelligence reports from Analyst agent |
| **Agent Logs** | Real-time log stream from all agents |
| **Settings** | Monitoring config, agent params, notifications |

---

## 🔒 Accessibility

- WCAG 2.1 AA compliant color contrast
- Full keyboard navigation
- Screen reader support with `aria-label` on charts
- `prefers-reduced-motion` support
- Focus indicators on all interactive elements

---

## 📜 License

MIT License

---

<div align="center">

**Built with 🛡️ by SentinelPulse**

[![Powered by Xiaomi MiMo V2.5](https://img.shields.io/badge/Powered_by-Xiaomi_MiMo_V2.5-FF6B00?style=for-the-badge&logo=xiaomi&logoColor=white)](https://mimo.ccode.dev)

*AI-powered DeFi security, always watching.*

</div>
