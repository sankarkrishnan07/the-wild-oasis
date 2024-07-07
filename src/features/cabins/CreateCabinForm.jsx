import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToUpdate = {}, onClose }) {
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isUpdateSession)
      updateCabin(
        { updateCabinData: { ...data, image }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? "modal" : ""}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount cannot be higher than the regular Price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isUpdateSession ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button>{isUpdateSession ? "Update" : "Create New"} cabin</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToUpdate: PropTypes.object,
  onClose: PropTypes.func,
};

export default CreateCabinForm;
