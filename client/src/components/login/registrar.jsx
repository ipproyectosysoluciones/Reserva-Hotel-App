import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { createUsers, loginUser } from "../../redux/actions/userActions";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script"



const Register = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const clientID = "563826116941-ss2c1f2frbuav6s49998mhlg2rff7nhv.apps.googleusercontent.com"
    
    useEffect(() => {
        const start = () => {
         gapi.auth2.init({
             clientId: clientID
         })
        }
       gapi.load("client:auth2", start)
     },[])
     const handleSubmit = (e) => {
         e.preventDefault();
         handleRegister();
     }

     async function convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    


    const handleLogin = async () => {
        setError("");
    
        try {
          const response = await dispatch(loginUser({ email, password }));
    
          if (response && response.error) {
            setError(response.error.message);
            return;
          } else {
            navigate("/");
            setIsLoggedIn(true);
          }
        } catch (error) {
          setError("Error al registrar el usuario");
        }
      };
    

  
 
    const onSuccess = async (response) => {
        console.log(response);
      
        const profile = response.profileObj;
      
        if (profile) {
          setName(profile.name);
          setEmail(profile.email);
          setPassword("enginI123");
      
          if (profile.imageUrl) {
            const imageResponse = await fetch(profile.imageUrl);
            const imageBlob = await imageResponse.blob();
            const base64Image = await convertBlobToBase64(imageBlob);
            setBase64Image(base64Image);
      
          }
        }
      };
      
    
 
     const onFailure = (response) => {
         console.log("Something went error: ", response.error)
     }

     
     const handleRegister = async () => {
        setError("");
    
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError('Correo electrónico no válido');
            return;
        }
    
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            setError('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número');
            return;
        }
    
        try {
            let userData;
    
            if (name !== "" && email !== "" && password === "enginI123") {
                userData = { name, email, password, photo: base64Image };
                const response = await dispatch(createUsers(userData))
                    if (!response.error) {
                        handleLogin(email, password);
                    }
                    else {
                        setError(response.error.message);
                        return;
                    }
                
                
            } 
            if(name !== "" && email !== "" && password !== "enginI123"){
                userData = { name, email, password, photo: base64Image };

                const response = await dispatch(createUsers(userData))
                    if (response && response.error) {
                         setError(response.error.message);
                        return;
                    } else {
                        navigate("/verification");
                    }
            
                
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            setError("Error al registrar el usuario por favor mira tus informaciones", error);
        }
    }
    
    return (
      
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-semibold">Registrarse</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            name="name"
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="password"
                            type="password"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Registrarse
                    </button>
                </form>
                
                <p className="mt-4 text-sm text-center">
                    Ya tienes perfil?{" "}
                    <NavLink className="text-blue-500 hover:underline" to="/users/login">
                    Iniciar sesión
                    </NavLink>
                </p>
                
                {error && <p>{error}</p>}
            </div>

            <GoogleLogin 
            
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            />
        </div>
    );
}

export default Register;