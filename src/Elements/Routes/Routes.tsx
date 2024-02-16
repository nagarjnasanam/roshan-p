import { Routes as AppRoutes, Route } from "react-router-dom";
import App from "../../App";
import TSEditor from "../TS-Editor/TSEditor";
import { useAtom } from "jotai";
import { userAtom } from "../../Store/atom";
import Auth from "../Auth/Auth";
import { fetchAuthSession } from "@aws-amplify/auth";
import { useEffect, useRef, useState } from "react";
import LineLoader from "../Loader/LineLoader";

export default function Routes() {
    const [user, setUser] = useAtom(userAtom);
    const mounted = useRef(false)
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            setIsloading(true)
            try {
                const currentUser = (await fetchAuthSession()).tokens ?? null;
                setIsloading(false)
                setUser(currentUser);
                console.log(currentUser?.idToken?.toString());
                console.log(currentUser);
            } catch (error) {
                setIsloading(true)
                console.error(error);
                console.log("Not signed in");
            }
        };
        if (mounted.current === false) {
            getUser()
        }

        mounted.current = true

    }, [setUser])

    if(isloading) {
        return <LineLoader />
    }
    if (user == null && !isloading) {
        return <Auth />
    }


    return (
        <AppRoutes>
            <Route path="/" element={<App />} />
            <Route path="/ts-editor" element={<TSEditor />} />
        </AppRoutes>
    )
}
