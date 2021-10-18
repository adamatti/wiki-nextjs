import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type useUserParams = {
  redirectTo?: string,
  redirectIfFound?: boolean,
}

export default function useUser(props: useUserParams = {}) {
  const {redirectTo = false,redirectIfFound = false} = props;

  console.log("component: useUser called"); 
  const response = useSWR("/api/user", fetcher);
  const { data: user, mutate: mutateUser, error } = response;

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser, error };
}