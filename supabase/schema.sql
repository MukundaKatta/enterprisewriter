-- EnterpriseWriter Database Schema
CREATE TABLE IF NOT EXISTS organizations (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, plan TEXT DEFAULT 'enterprise', settings JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, org_id UUID REFERENCES organizations(id), role TEXT DEFAULT 'user', department TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS model_configs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, provider TEXT NOT NULL, model_id TEXT NOT NULL, status TEXT DEFAULT 'active', config JSONB DEFAULT '{}', org_id UUID REFERENCES organizations(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS generations (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), prompt TEXT NOT NULL, output TEXT, model_id UUID REFERENCES model_configs(id), user_id UUID REFERENCES profiles(id), language TEXT DEFAULT 'en', tokens_used INTEGER DEFAULT 0, cost DECIMAL DEFAULT 0, compliance_status TEXT DEFAULT 'passed', metadata JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS compliance_rules (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, description TEXT, type TEXT NOT NULL, config JSONB DEFAULT '{}', status TEXT DEFAULT 'active', org_id UUID REFERENCES organizations(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS compliance_violations (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), generation_id UUID REFERENCES generations(id), rule_id UUID REFERENCES compliance_rules(id), description TEXT, severity TEXT DEFAULT 'low', created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS knowledge_sources (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, type TEXT NOT NULL, content TEXT, status TEXT DEFAULT 'active', org_id UUID REFERENCES organizations(id), created_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own generations" ON generations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own profile" ON profiles FOR ALL USING (auth.uid() = id);
