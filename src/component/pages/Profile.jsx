import { React, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { DataContext } from "../../context/DataContext";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const { setData} = useContext(DataContext)

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                Cookies.set('myKey', user.uid)
                setData(true)
            } else {
                console.log("User is not logged in");
            }
        });
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await signOut(auth);
            Cookies.remove('myKey');
            window.location.href = "/login";
            console.log("User logged out successfully!");
            setData(false)
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }
    return (
        <div>
            {userDetails ? (
                <>
                    <div style={{ display: "flex", justifyContent: "center" }}>

                    </div>
                    <h3>Welcome {userDetails.firstname} 🙏🙏</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>Name: {userDetails.firstname}</p>
                        {console.log(userDetails.lastname)}
                        {userDetails.lastname != undefined ?
                        (<p>Last Name: {userDetails.lastname}</p>):(<></>)}
                        
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default Profile;