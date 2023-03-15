CREATE TABLE
    user_profiles (
        user_id UUID PRIMARY KEY REFERENCES auth.users (id) NOT NULL,
        username TEXT UNIQUE NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now (),
        updated_at timestamptz NOT NULL DEFAULT now (),
        CONSTRAINT name_length CHECK (
            char_length(username) > 3
            AND char_length(username) < 15
        ),
        CONSTRAINT name_regex CHECK (
            username ~* '^[a-zA-Z0-9_]+$'
        )
    );

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "noone can see profile" 
ON public.user_profiles 
AS PERMISSIVE FOR SELECT 
TO public 
USING (auth.uid() = user_id);

CREATE POLICY "only owner can insert" 
ON public.user_profiles 
AS PERMISSIVE FOR INSERT 
TO public 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "only owner can update" 
ON public.user_profiles 
AS PERMISSIVE FOR UPDATE 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE
    exercise_types (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        user_id UUID REFERENCES auth.users (id) NOT NULL,
        exercise_type TEXT NOT NULL,
        exercise_name TEXT NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now (),
        updated_at timestamptz NOT NULL DEFAULT now ()
    );

ALTER TABLE exercise_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can access exercise_types" 
ON public.exercise_types 
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);

CREATE TABLE
    exercise_history (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        user_id UUID REFERENCES auth.users (id) NOT NULL,
        exercise_type_id UUID REFERENCES exercise_types (id) NOT NULL,
        exercise_details JSON NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now (),
        updated_at timestamptz NOT NULL DEFAULT now ()
    );

ALTER TABLE exercise_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access exercise_history" 
ON public.exercise_history 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE
    exercise_tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        user_id UUID REFERENCES auth.users (id) NOT NULL,
        tag_name TEXT NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now ()
    );

ALTER TABLE exercise_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access exercise_tags" 
ON public.exercise_tags 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE
    exercise_notes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        user_id UUID REFERENCES auth.users (id) NOT NULL,
        notes_contents TEXT NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now (),
        updated_at timestamptz NOT NULL DEFAULT now ()
    );

ALTER TABLE exercise_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access exercise_notes" 
ON public.exercise_notes 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);