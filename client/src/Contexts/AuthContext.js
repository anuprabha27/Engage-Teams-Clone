import React,{useContext,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';


const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const history = useHistory();

    useEffect(()=>{
            auth.onAuthStateChanged((user)=>{
                setUser(user);
                setLoading(false);
                if(user){
                    console.log("User logged in!")
                    const isLoggedIn = true;
                    localStorage.setItem('isLoggedIn',isLoggedIn);
                    if(user.displayName)
                        localStorage.setItem('username',user.displayName);
                    // else   
                    //     localStorage.setItem('username',user.email);
                    // history.push("/startCall");
                }
            })
    },[]);

    const value = {user};

    return(
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}