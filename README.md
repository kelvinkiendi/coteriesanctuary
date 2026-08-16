# COTERIE Sanctuary POS

**Stack:** PostgreSQL · Supabase Edge Functions · MPesa Daraja API · JWT/RBAC · React · TypeScript

Full-stack point-of-sale system for COTERIE Nail Sanctuary, a premium nail studio in Kilimani, Nairobi. 
This repo contains the complete operational platform — from PostgreSQL database design and MPesa 
payment integration to role-based access control and real-time staff analytics.

---

## 🏗 Backend Architecture

### Database Layer (PostgreSQL + Supabase)
- Normalized schema: `clients`, `appointments`, `services`, `payments`, `staff`, `inventory`, `memberships`
- Row Level Security (RLS) policies per role
- PostgreSQL triggers for automated commission and inventory management

### API Layer (Supabase Edge Functions)
| Function | Purpose |
|----------|---------|
| `mpesa-stk-push` | Initiates MPesa STK push to client phone |
| `payment-callback` | Handles Daraja payment confirmation webhook |
| `auth-role-claim` | Returns JWT role claims for RBAC middleware |

### Payment Integration
- Safaricom Daraja API v2 (MPesa STK Push & C2B)
- Idempotency handling to prevent duplicate charges
- Transaction ledger for audit trails and reconciliation

### Auth & Authorization
- JWT-based authentication with Supabase Auth
- Custom role claims: `owner`, `admin`, `technician`, `receptionist`
- Route-level permission enforcement

---

## 📁 Project Structure
