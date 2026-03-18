# EnterpriseWriter

> Enterprise-Grade AI Content Generation with Compliance and Governance

EnterpriseWriter is a secure, multi-model AI writing platform built for organizations. Generate content with built-in PII detection, compliance checking, multi-language support, audit trails, and departmental usage governance.

## Features

- **AI Content Generator** -- Multi-model text generation with templates and adjustable parameters
- **Model Management** -- Configure and monitor GPT-4o, Claude, Llama, Mistral, and custom models
- **Compliance Checker** -- PII detection, content safety, data residency, and IP protection rules
- **Knowledge Graph** -- Ground AI responses in company-specific documents and context
- **Multi-Language Support** -- Generate content in 8+ languages with quality scoring
- **Governance Dashboard** -- Department usage tracking, quotas, and cost monitoring
- **Deployment Options** -- Cloud, on-premise, hybrid, and private cloud configurations
- **Audit Trail** -- Full logging of all AI interactions for compliance auditing

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase SSR
- **State Management:** Zustand
- **Notifications:** react-hot-toast
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add SUPABASE_URL, SUPABASE_ANON_KEY, and OPENAI_API_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx          # Full application with 8 tabbed sections
    api/ai/           # AI generation API routes
  components/         # UI components
  lib/                # Supabase client, utilities
```

## License

MIT
