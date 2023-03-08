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
    )