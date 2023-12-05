import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { pt } from 'yup-locales';
import { useStores } from '../../stores';
import * as Sc from './styles';
import logo from '../../assets/logoColor.png';
yup.setLocale(pt);

export function Login() {
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorResponse, setErrorResponse] = useState('');

//   const { 
//   //   userStores: {
//   //   userData,
//   //   setUserData,
//   //   setToken,
//   //   token,
//   //   handleLocalUser,
//   //   localUser
//   // }, 
// } = useStores();

  async function handleLogin(data) {
    try {
      // const response = await instance.post('/login', {
      //   email: data.email,
      //   password: data.password
      // })
      // const user = {
      //   id: response.data.user.id,
      //   name: response.data.user.name,
      //   email: response.data.user.email,
      //   keepConnected: data.keepConnected,
      // setUserData(user);
      // setToken(response.data.token);
      // handleLocalUser(response.data.user);
      // // handlerGetOffice(token);
      // if (response.data.user.is_admin) {
      //   navigate('/dashboard');
      //   // handlerGetOffice(token);
      //   return;
      // }
      navigate('/home');
    } catch (error) {
      setErrorResponse(error.response.data.message);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleOpenWhatsapp() {
    const message = "Olá, Esqueci minha senha. Pode me ajudar?"
    const whatsappLink = `https://wa.me/5541984498900?text=T${message}`;
    window.open(whatsappLink);
  }

  // useEffect(() => {
  //   if (token) {

  //     if (localUser.is_admin) {
  //       navigate('/dashboard');
  //       return;
  //     }
  //     navigate('/home');
  //   }
  // }, [])


  return (
    <Sc.Container>
      <Sc.LeftContent>
        <header>
          <Sc.Image
            src={logo}
            alt="logo Bruna pereira"
          />
        </header>
        <Sc.FormContent
          // onSubmit={handleSubmit(handleLogin)}
        >
          <Sc.InputGroup>
            <label htmlFor="email">
              E-mail
              <Sc.Input
                isValid={!errors.email?.message}
                type="text"
                id="email"
                {...register('email')}
              />
            </label>
            {errors.email?.message && <Sc.ErrorMessage>{errors.email?.message}</Sc.ErrorMessage>}
          </Sc.InputGroup>

          <Sc.InputGroup>
            <label htmlFor="password">
              Senha
              <Sc.Input
                isValid={!errors.password?.message}
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
              />
              <Sc.Icon onClick={() => handleShowPassword()}>
                {showPassword ?
                  <FiEyeOff
                    size={24}
                    color="#A7A7A9"
                  /> :
                  <FiEye
                    size={24}
                    color="#A7A7A9"
                  />}
              </Sc.Icon>
            </label>
            <Sc.ErrorMessage>{errors.password?.message.replace('password', 'senha') ?? errorResponse}</Sc.ErrorMessage>
          </Sc.InputGroup>
          <Sc.InputGroupRow>
            <Sc.CheckBoxConteiner>
              <Sc.Input
                type="checkbox"
                id="keepConnected"
                {...register('keepConnected')}
              />
              <label htmlFor="keepConnected">Mantenha-me conectado</label>
            </Sc.CheckBoxConteiner>
            <Sc.LinkForgotPassword onClick={handleOpenWhatsapp}>Esqueci minha senha</Sc.LinkForgotPassword>
          </Sc.InputGroupRow>
          <button
            id="loginButton"
            type="submit"
            // disabled={isSubmitting}
            onClick={()=>navigate('/home')}
          >
            Entrar
          </button>
          <Sc.LinkContainer>
            <span>Ainda não tem conta?</span>
            <a id="signIn" onClick={handleOpenWhatsapp}>Cadastre-se aqui.</a>
          </Sc.LinkContainer>
        </Sc.FormContent>
      </Sc.LeftContent>
      <Sc.RightContent>
      </Sc.RightContent>
    </Sc.Container>
  );
}