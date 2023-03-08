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

CREATE POLICY "anyone can see profile" 
ON "public"."user_profiles" 
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);

CREATE POLICY "only owner can insert" 
ON "public"."user_profiles" 
AS PERMISSIVE FOR INSERT 
TO public 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "only owner can uodate" 
ON "public"."user_profiles" 
AS PERMISSIVE FOR UPDATE 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
