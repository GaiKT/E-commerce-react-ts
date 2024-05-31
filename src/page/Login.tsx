import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

interface IFormInput {
    username: string
    password: string
}

//validate loginfrom schema
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
    <Box
        sx={{
            display : "flex",
            justifyContent : "center",
            alignItems : 'center',
            height : '100vh',
        }}
    >   
        <div>
            <Typography sx={{
                textAlign : 'center',
                fontSize : '2rem',
                backgroundColor : '#1976D2',
                color: 'white'
            }}>
               <StoreMallDirectoryIcon/> E-Commerce
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}
            className="flex p-10 rounded-md flex-col text-center shadow-md font-bold gap-4 bg-white"
            >   
                <p className="text-4xl">Login</p>
                <TextField 
                label="Username" 
                variant="outlined" 
                type="text"
                {...register("username")}
                helperText={errors.username?.message}
                />
                <TextField 
                label="Password" 
                type="password"
                {...register("password")}           
                variant="outlined" 
                helperText={errors.password?.message}
                />
                <Button
                    variant='contained'
                    type="submit"
                    sx={{
                        padding : 1
                    }}
                >
                    เข้าสู่ระบบ
                </Button>
            </form>
        </div>

    </Box>
  )
}
