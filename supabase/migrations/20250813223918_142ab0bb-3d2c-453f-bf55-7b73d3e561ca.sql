-- Phase 1: Critical Data Protection - Implement Role-Based Access Control

-- 1. Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- 4. Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- 5. RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.is_admin());

-- 6. CRITICAL: Replace dangerous RLS policies for contact_messages
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;

-- New secure policy: Only admins can view contact messages
CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages
FOR SELECT
USING (public.is_admin());

-- Keep the existing insert policy for public form submissions
-- (The "Anyone can submit contact messages" policy remains unchanged)

-- 7. CRITICAL: Replace dangerous RLS policies for referrals
DROP POLICY IF EXISTS "Authenticated users can view referrals" ON public.referrals;

-- New secure policy: Only admins can view referrals
CREATE POLICY "Only admins can view referrals"
ON public.referrals
FOR SELECT
USING (public.is_admin());

-- Keep the existing insert policy for public referral submissions
-- (The "Anyone can submit referrals" policy remains unchanged)

-- 8. CRITICAL: Secure rate_limits table - restrict to service role and admins only
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;

-- New secure policies for rate_limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
USING (public.is_admin());

-- 9. Add trigger for updated_at on user_roles
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Create audit log table for sensitive data access
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    table_name TEXT NOT NULL,
    action TEXT NOT NULL,
    record_id UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (public.is_admin());

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (auth.role() = 'service_role');