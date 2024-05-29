import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

interface IFormInput {
    username: string
    password: string
}

const loginSchema = yup
  .object({
    username: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required()

export default function Login() {
    const navigate = useNavigate();
    const {login} = useAuth()
    const { register, handleSubmit, setError,
        formState:{errors} , 
     } = useForm<IFormInput>({resolver: yupResolver(loginSchema)})

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        try {
            login(data)
            navigate("/home");
        }catch(error){
            setError("password",{
                message : "Email or password incorrect"
            })
        }
    }

  return (
    <div className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 flex flex-col gap-5 text-2xl border rounded-lg shadow-2xl">
            <p className="text-center font-bold text-4xl">Login</p>
            <label className="flex gap-4">
                Username :  
                <input type="text" {...register("username")} className="border p-2 rounded-md"/>
            </label>
            <p className="text-red-500 text-center">{errors.username?.message}</p>
            <label  className="flex gap-4 justify-between"> 
                Password : 
                <input type="password" {...register("password")} className="border p-2 rounded-md"/>
            </label>
            <p className="text-red-500 text-center">{errors.password?.message}</p>
            <div className="flex justify-center">
                <button type="submit"  className="p-2 rounded-md bg-green-600 text-white">เข้าสู่ระบบ</button>
            </div>
        </form>
    </div>
  )
}
