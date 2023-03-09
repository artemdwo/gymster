import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sbClient } from "./sb-client";

export interface UserProfile {
  username: string;
}

export interface GymsterUserInfo {
  session: Session | null;
  profile: UserProfile | null;
}

export function useSession(): GymsterUserInfo {
  const [userInfo, setUserInfo] = useState<GymsterUserInfo>({
    session: null,
    profile: null,
  });
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    sbClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      sbClient.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      });
    });
  }, []);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      listenToUserProfileChanges(userInfo.session.user.id).then(
        (newChannel) => {
          if (channel) {
            channel.unsubscribe();
          }
          setChannel(newChannel);
        }
      );
    } else if (!userInfo.session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }
  }, [userInfo.session]);

  async function listenToUserProfileChanges(userId: string) {
    const { data } = await sbClient
      .from("user_profiles")
      .select("*")
      .filter("user_id", "eq", userId);
    if (data?.[0]) {
      setUserInfo({ ...userInfo, profile: data?.[0] });
    } else {
      setReturnPath();
      navigate("/welcome");
    }
    return sbClient
      .channel(`public:user_profiles`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profiles",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
        }
      )
      .subscribe();
  }

  return userInfo;
}

export const setReturnPath = () => {
  localStorage.setItem("returnPath", window.location.pathname);
};
