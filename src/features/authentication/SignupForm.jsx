import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, reset, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const { isSigningUp, signUp } = useSignUp();

  function onSubmit({ email, password, fullName }) {
    signUp(
      { email, password, fullName },
      {
        onSuccess: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please input a valid email address",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must contain atleast 8 characters",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password doesn't match",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningUp}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
