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

CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID REFERENCES auth.users (id) NOT NULL,
    workout_name TEXT,
    exercise_id UUID REFERENCES exercises (id) NOT NULL,
    tag_id UUID REFERENCES tags (id) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz NOT NULL DEFAULT now ()
);    

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access workouts" 
ON public.workouts 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID REFERENCES auth.users (id) NOT NULL,
    workout_id UUID REFERENCES workouts (id) NOT NULL,
    tag_id UUID REFERENCES tags (id) NOT NULL,
    exercise_name TEXT NOT NULL,
    exercise_type TEXT NOT NULL,
    exercise_details JSON NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz NOT NULL DEFAULT now ()
);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access exercises" 
ON public.exercises 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID REFERENCES auth.users (id) NOT NULL,
    exercise_id UUID REFERENCES exercises (id) NOT NULL,
    set_number INT NOT NULL,
    set_reps INT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now ()
);

ALTER TABLE sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "only owner can access sets" 
ON public.sets 
AS PERMISSIVE FOR ALL 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID REFERENCES auth.users (id) NOT NULL,
    tags TEXT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now ()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can access tags" 
ON public.tags 
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);
