import React from 'react'
import './google.css'
import { auth,db } from '../firebase';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function SignInWithGoogle() {
  const navigate  = useNavigate();
  function googleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result)=>{
      console.log(result)
      const user = result.user
      if(result.user){
        await setDoc(doc(db,"users",user.uid),{
          email:user.email,
          firstname: user.displayName,
          photot : user.photoURL
      })
        toast.success('Logged in!!')
        navigate('/me')
      }
    })
  }
  return (
    <div>
      <button onClick={googleLogin} type="button" class="login-with-google-btn" >
          Sign in with Google
      </button>
    </div>
  )
}
