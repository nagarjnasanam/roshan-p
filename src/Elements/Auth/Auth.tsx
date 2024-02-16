import { useState } from "react";
import { Amplify } from 'aws-amplify';
// import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut,  } from "aws-amplify/auth";
import { userAtom } from "../../Store/atom";
import { useAtom } from "jotai/react";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_MJ5E3Qpox',
      userPoolClientId: 'gc8svqv6lgffn6dbo2m40oq42',
      loginWith: {
        oauth: {
          domain: 'datranscribe.auth.us-east-1.amazoncognito.com',
          redirectSignIn: ["http://localhost:3000"],
          redirectSignOut: ["http://localhost:3000"],
          responseType: 'code',
          scopes: ['email', 'openid']
        }
      }
    }
  }
});

function Auth() {
  const [user] = useAtom(userAtom);
  // const [error, setError] = useState<string | null>(null);
  const [customState,] = useState<string | null>(null);

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload }) => {
  //     switch (payload.event) {
  //       case "signInWithRedirect":
  //         getUser();
  //         break;
  //       case "signInWithRedirect_failure":
  //         setError("An error has occurred during the OAuth flow.");
  //         break;
  //       case "customOAuthState":
  //         setCustomState(payload.data as string); // this is the customState provided on signInWithRedirect function
  //         break;
  //     }
  //   });

  //   // getUser();

  //   return unsubscribe;
  // }, []);

  // const getUser = async () => {
  //   try {
  //     const currentUser = (awai()).tokens ?? null;
  //     setUser(currentUser);
  //     console.log(currentUser?.idToken?.toString());
  //     console.log(currentUser);
  //   } catch (error) {
  //     console.error(error);
  //     console.log("Not signed in");
  //   }
  // };

  return (
    <div className="bg-[#c1d2f4] flex h-[100vh] flex-row justify-center items-center">
      <div className="flex items-center justify-center flex-col gap-y-4">
        <h1 className="text-lg text-center ">CCC DA Transcription</h1>
        <img className="w-[200px] h-[200px]" src="/Logo.png" alt="" />

        {user?.idToken?.payload === undefined ?
          <div>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
            <button className="w-full" onClick={() => signInWithRedirect({ provider: "TranscribeAD" })}>
              Login
            </button>
          </div>
          :
          <div>
            Logged in as &nbsp;
            {user?.idToken?.payload === undefined ? '' : user?.idToken.payload.email}
            &nbsp;&nbsp;<button onClick={() => signOut()}>Sign Out</button>
          </div>
        }
        <div>{customState}</div>
      </div>
    </div>
  );
}

export default Auth;
