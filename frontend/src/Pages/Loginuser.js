// import axios from "axios";
// import { useEffect } from "react";

// const Loginuser = ()=>{

//     const [user, setUser] = useState([]);

//         useEffect(()=>{

//             const token = localStorage.getItem("token");


//           const fetchuser = async()=>{
//                try{
//             const response =  await axios.get("http://localhost:5000/api/auth/loginuser",
//                  {
//                     headers:{Authorization:`Bearer ${token}`},
//                  })

//                  setUser(response.data);

//                  localStorage.setItem("user",response.data);

//                  console.log( "loginnnnnnnnnnnnnnnn daaaaaaaaaaaaaaataaaaaaaat",user);

            
//                }catch (err){
//                    console.error(err);
//                }
//           }

//           fetchuser();
            
//         },[])

        
//     return(
//         <div>

//         </div>
//     )

// }

// export default Loginuser;