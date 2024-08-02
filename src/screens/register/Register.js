import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TabContainer from "../../common/tabContainer/TabContainer";
import * as fetchApi from "../../util/fetch";
import { useForm } from "react-hook-form";

const Register = (props) => {
  const REGISTER_API_PATH = "users/register";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetchApi.postData(REGISTER_API_PATH, data);
    if (response.status === 200) {
      props.setLoggedIn(true);
      const user = await response.json();
      sessionStorage.setItem("uuid", user.id);
      sessionStorage.setItem("access-token", user.accessToken);
      props.closeModalHandler();
      alert("Registration successful,please login");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <TabContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl required>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            {...register("firstName", {
              required: true,
            })}
          />
          {errors.firstName && (
            <FormHelperText>
              <span className="red">Required</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        <FormControl required>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            {...register("lastName", {
              required: true,
            })}
          />
          {errors.lastName && (
            <FormHelperText>
              <span className="red">Required</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        <FormControl required>
          <InputLabel htmlFor="emailId">Email Id</InputLabel>
          <Input
            {...register("emailId", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.emailId && (
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
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {errors.password && (
            <FormHelperText>
              <span className="red">Rrequired</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        <FormControl required>
          <InputLabel htmlFor="mobile">Mobile No.</InputLabel>
          <Input
            {...register("mobile", {
              required: true,
              pattern: /\d+/,
            })}
          />
          {errors.mobile && (
            <FormHelperText>
              <span className="red">Enter valid mobile number</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          REGISTER
        </Button>
      </form>
    </TabContainer>
  );
};

export default Register;
