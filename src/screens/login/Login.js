import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TabContainer from "../../common/tabContainer/TabContainer";
import * as fetchApi from "../../util/fetch";
import { useForm } from "react-hook-form";

const LOGIN_API_PATH = "auth/login";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetchApi.postData(
      LOGIN_API_PATH,
      {},
      {
        Authorization: "Basic " + window.btoa(data.email + ":" + data.password),
      }
    );
    if (response.status === 200) {
      props.setLoggedIn(true);
      const user = await response.json();
      sessionStorage.setItem("uuid", user.id);
      sessionStorage.setItem("access-token", user.accessToken);
      props.closeModalHandler();
    } else {
      const error = await response.json();
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <TabContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl required>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email && (
            <FormHelperText>
              <span className="red">Enter valid Email</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        <FormControl required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && (
            <FormHelperText>
              <span className="red">required</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        {props.loggedIn === true && (
          <FormControl>
            <span className="successText">Login Successful!</span>
          </FormControl>
        )}
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          LOGIN
        </Button>
      </form>
    </TabContainer>
  );
};

export default Login;
